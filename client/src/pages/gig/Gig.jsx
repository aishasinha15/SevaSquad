import React, { useEffect } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import Review from "../../components/review/Review";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Gig() {
  const { id } = useParams();

  // Fetch gig data with error handling
  const {
    isLoading: gigLoading,
    error: gigError,
    data: gigData,
  } = useQuery({
    queryKey: ["gig", id],
    queryFn: async () => {
      try {
        const response = await newRequest.get(`/gigs/single/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to load gig data"
        );
      }
    },
    retry: 1, // Only retry once on failure
    enabled: !!id, // Only run query if we have an ID
  });

  // Fetch user data with error handling (only if gigData exists)
  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["user", gigData?.userId],
    queryFn: async () => {
      try {
        const response = await newRequest.get(`/users/${gigData.userId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!gigData?.userId, // Only run query if we have the user ID
  });

  // Error handling effect
  useEffect(() => {
    if (gigError) {
      toast.error(
        gigError.response?.data?.message || "Failed to load gig data"
      );
    }
    if (userError) {
      toast.error(
        userError.response?.data?.message || "Failed to load user data"
      );
    }
  }, [gigError, userError]);

  // Loading state
  if (gigLoading) {
    return (
      <div className="gig">
        <div className="container">
          <div className="loading">Loading gig details...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (gigError) {
    return (
      <div className="gig">
        <div className="container">
          <div className="error">
            <h2>Error Loading Gig</h2>
            <p>
              {gigError.response?.data?.message || "Please try again later"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!gigData) {
    return (
      <div className="gig">
        <div className="container">
          <div className="error">
            <h2>Gig Not Found</h2>
            <p>The requested gig could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  // const handleBookNowClick = async () => {
  //   const EXTENSION_ID = "ejnamnonhmmmgjobonhlegopdhmbngjb";

  //   try {
  //     if (!chrome?.runtime?.sendMessage) {
  //       throw new Error("Chrome extension API is not available");
  //     }

  //     // First, check if extension is installed and available
  //     const checkExtension = () => {
  //       return new Promise((resolve) => {
  //         chrome.runtime.sendMessage(
  //           EXTENSION_ID,
  //           { action: "ping" },
  //           (response) => {
  //             if (chrome.runtime.lastError) {
  //               resolve(false);
  //             } else {
  //               resolve(response?.status === "ok");
  //             }
  //           }
  //         );
  //       });
  //     };

  //     const isExtensionAvailable = await checkExtension();

  //     if (!isExtensionAvailable) {
  //       toast.error("Please install and enable the SevaPay wallet extension");
  //       return;
  //     }

  //     // If extension is available, send the open request
  //     chrome.runtime.sendMessage(
  //       EXTENSION_ID,
  //       {
  //         action: "open_extension",
  //         data: {
  //           gigId: id,
  //           price: gigData.price,
  //           title: gigData.title,
  //         },
  //       },
  //       (response) => {
  //         if (chrome.runtime.lastError) {
  //           console.error("Error:", chrome.runtime.lastError);
  //           toast.error("Failed to open SevaPay wallet");
  //         } else if (response?.success) {
  //           console.log("Extension opened successfully");
  //         } else {
  //           toast.error(response?.error || "Failed to open SevaPay wallet");
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(`Error: ${error.message}`);
  //   }
  // };

  const handleBookNowClick = async () => {
    const EXTENSION_ID = "ejnamnonhmmmgjobonhlegopdhmbngjb";

    try {
      if (!chrome?.runtime?.sendMessage) {
        throw new Error("Chrome extension API is not available");
      }

      // First, check if extension is installed and available
      const checkExtension = () => {
        return new Promise((resolve) => {
          chrome.runtime.sendMessage(
            EXTENSION_ID,
            { action: "ping" },
            (response) => {
              if (chrome.runtime.lastError) {
                resolve(false);
              } else {
                resolve(response?.status === "ok");
              }
            }
          );
        });
      };

      const isExtensionAvailable = await checkExtension();

      if (!isExtensionAvailable) {
        toast.error("Please install and enable the SevaPay wallet extension");
        return;
      }

      // If extension is available, first create the order
      try {
        const response = await newRequest.post(`/orders/${id}`);

        if (response.status === 200) {
          // Only open extension after successful order creation
          chrome.runtime.sendMessage(
            EXTENSION_ID,
            {
              action: "open_extension",
              data: {
                gigId: id,
                price: gigData.price,
                title: gigData.title,
                orderId: response.data.orderId, // Pass the order ID if needed by the extension
              },
            },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Error:", chrome.runtime.lastError);
                toast.error("Failed to open SevaPay wallet");
              } else if (response?.success) {
                console.log("Extension opened successfully");
                // You might want to redirect to the orders page after successful payment
                // navigate("/orders");
              } else {
                toast.error(response?.error || "Failed to open SevaPay wallet");
              }
            }
          );
        }
      } catch (err) {
        console.error("Error creating order:", err);
        toast.error(err.response?.data || "Failed to create order");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="gig">
      <ToastContainer />
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            SevaSquad &gt; {gigData.cat || "Service"} &gt; {gigData.title}
          </span>
          <h1>{gigData.title}</h1>

          {userLoading ? (
            <div className="user loading">Loading user details...</div>
          ) : userError ? (
            <div className="user error">Error loading user details</div>
          ) : (
            <div className="user">
              <img
                className="pp"
                src={userData?.img || "/img/noavatar.jpg"}
                alt="User Avatar"
              />
              <span>{userData?.username}</span>
              {!isNaN(gigData.totalStars / gigData.starNumber) && (
                <div className="stars">
                  {Array(Math.round(gigData.totalStars / gigData.starNumber))
                    .fill()
                    .map((_, i) => (
                      <img src="/img/star.png" alt="Star" key={i} />
                    ))}
                  <span>
                    {Math.round(gigData.totalStars / gigData.starNumber)}
                  </span>
                </div>
              )}
            </div>
          )}

          {gigData.cover ? (
            <div className="cover-image-container">
              <img
                src={gigData.cover}
                alt="Gig Cover"
                style={{
                  width: "80%", // Set width to 100% to make it responsive
                  height: "auto", // Automatically adjust height to maintain aspect ratio
                  objectFit: "cover", // Ensures the image covers the container without distortion
                }}
              />
            </div>
          ) : (
            <div className="no-cover">No cover image available</div>
          )}

          <h2>About This Gig</h2>
          <p>{gigData.desc}</p>

          {!userLoading && !userError && userData && (
            <div className="seller">
              <h2>About The Expert</h2>
              <div className="user">
                <img
                  className="pp"
                  src={userData.img || "/img/noavatar.jpg"}
                  alt="Seller Avatar"
                />
                <div className="info">
                  <span>{userData.username}</span>
                  {!isNaN(gigData.totalStars / gigData.starNumber) && (
                    <div className="stars">
                      {Array(
                        Math.round(gigData.totalStars / gigData.starNumber)
                      )
                        .fill()
                        .map((_, i) => (
                          <img src="/img/star.png" alt="Star" key={i} />
                        ))}
                      <span>
                        {Math.round(gigData.totalStars / gigData.starNumber)}
                      </span>
                    </div>
                  )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">
                      {userData.locality || "Not specified"}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">2 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English, Hindi</span>
                  </div>
                </div>
                <hr />
                <p>{userData.desc || "No description available"}</p>
              </div>
            </div>
          )}

          <Review gigId={id} />
        </div>

        <div className="right">
          <div className="price">
            <h3>{gigData.shortTitle}</h3>
            <h2>₹{gigData.price}</h2>
          </div>
          <p>{gigData.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="Clock Icon" />
              <span>Service Scheduled Within {gigData.deliveryTime} Days</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="Recycle Icon" />
              <span>{gigData.revisionNumber} visits</span>
            </div>
          </div>
          <div className="features">
            {gigData.features?.map((feature, index) => (
              <div className="item" key={index}>
                <img src="/img/greencheck.png" alt="Check" />
                <span>{feature}</span>
              </div>
            )) || <p>No features specified</p>}
          </div>
          <button onClick={handleBookNowClick}>Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;

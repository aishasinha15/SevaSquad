// import React from "react";
// import "./Add.scss";

// const Add = () => {
//   return (
//     <div className="add">
//       <div className="container">
//         <h1>Add New Gig</h1>
//         <div className="sections">
//           <div className="left">
//             <label htmlFor="">Title</label>
//             <input
//               type="text"
//               placeholder="e.g. I'll do something I'm really good at"
//             />
//             <label htmlFor="">Category</label>
//             <select name="cats" id="cats">
//               <option value="cleaning">Cleaning</option>
//               <option value="plumbing">Plumbing</option>
//               <option value="electrical">Electrical</option>
//               <option value="childcare">Childcare</option>
//               <option value="petcare">Pet Care</option>
//               <option value="gardening">Gardening & Landscaping</option>
//               <option value="painting">Painting</option>
//               <option value="carpentary">Carpentary</option>
//               <option value="emergency">Emergency</option>
//             </select>
//             <label htmlFor="">Cover Image</label>
//             <input type="file" />
//             <label htmlFor="">Upload Images</label>
//             <input type="file" multiple />
//             <label htmlFor="">Description</label>
//             <textarea
//               name=""
//               id=""
//               cols="30"
//               rows="16"
//               placeholder="Brief description to introduce your service to clients"
//             ></textarea>
//             <button>Create</button>
//           </div>

//           <div className="right">
//             <label htmlFor="">Service Title</label>
//             <input type="text" placeholder="e.g. Home cleaning" />
//             <label htmlFor="">Short Description</label>
//             <textarea
//               name=""
//               id=""
//               placeholder="Short description of the service you offer"
//               cols="30"
//               rows="10"
//             ></textarea>
//             <label htmlFor="">Service Duration (e.g. 2 hours)</label>
//             <input type="number" min={1} />
//             <label htmlFor="">Number of Revisions/Visits</label>
//             <input type="number" min={1} />
//             <label htmlFor="">Add Service Features</label>
//             <input type="text" placeholder="e.g. Cleaning bathrooms" />
//             <input type="text" placeholder="e.g. Cleaning floors" />
//             <input type="text" placeholder="e.g. Washing dishes" />
//             <input type="text" placeholder="e.g. Window cleaning" />
//             <label htmlFor="">Price (in ₹)</label>
//             <input type="number" min={100} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Add;

// import React, { useState } from "react";
// import axios from "axios"; // Ensure you have axios installed
// import newRequest from "../../utils/newRequest.js";
// import { useNavigate } from "react-router-dom";

// import "./Add.scss";

// const Add = () => {
//   const navigate = useNavigate();
//   const [id, setId] = useState("");
//   const [title, setTitle] = useState("");
//   const [cat, setCat] = useState("");
//   const [cover, setCover] = useState(null);
//   //const [uploadedImages, setUploadedImages] = useState([]);
//   const [desc, setDesc] = useState("");
//   const [shortTitle, setShortTitle] = useState("");
//   const [shortDesc, setShortDesc] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");
//   const [revisionNumber, setRevisionNumber] = useState(1);
//   const [features, setFeatures] = useState([]);
//   const [price, setPrice] = useState("");

//   // Handle file inputs
//   // const handleFileChange = (e) => {
//   //   if (e.target.name === "cover") {
//   //     setCover(e.target.files[0]); // Single file for cover image
//   //   }
//   //   // else if (e.target.name === "uploadedImages") {
//   //   setUploadedImages(e.target.files); // Multiple files for other images
//   // }
//   //};

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a FormData object to send both text and file data
//     const formData = new FormData();
//     formData.append("id", id);
//     formData.append("title", title);
//     formData.append("cat", cat);
//     formData.append("desc", desc);
//     formData.append("shortTitle", shortTitle);
//     formData.append("shortDesc", shortDesc);
//     formData.append("deliveryTime", deliveryTime);
//     formData.append("revisionNumber", revisionNumber);
//     formData.append("price", price);
//     console.log("Features array:", features);
//     formData.append("features", JSON.stringify(features[features.length - 1]));

//     if (cover) formData.append("cover", cover);

//     try {
//       const response = await newRequest.post("/gigs", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       navigate(`/gigs?cat=${cat}`);
//     } catch (error) {
//       console.error("Error creating gig:", error);
//     }
//   };

//   return (
//     <div className="add">
//       <div className="container">
//         <h1>Add New Gig</h1>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="sections">
//             <div className="left">
//               <label htmlFor="">Id</label>
//               <input
//                 type="text"
//                 placeholder="e.g. 1"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//               />
//               <label htmlFor="">Title</label>
//               <input
//                 type="text"
//                 placeholder="e.g. I'll do something I'm really good at"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <label htmlFor="">Category</label>
//               <select
//                 name="cats"
//                 id="cats"
//                 value={cat}
//                 onChange={(e) => setCat(e.target.value)}
//               >
//                 <option value="cleaning">Cleaning</option>
//                 <option value="plumbing">Plumbing</option>
//                 <option value="electrical">Electrical</option>
//                 <option value="childcare">Childcare</option>
//                 <option value="petcare">Petcare</option>
//                 <option value="gardening">Gardening</option>
//                 <option value="painting">Painting</option>
//                 <option value="carpentary">Carpentry</option>
//                 <option value="emergency">Emergency</option>
//               </select>
//               <label htmlFor="">Cover</label>
//               <input
//                 type="file"
//                 id="cover"
//                 name="cover" // Make sure this matches
//                 onChange={(e) => setCover(e.target.files[0])}
//               />
//               <label htmlFor="">Description</label>
//               <textarea
//                 cols="30"
//                 rows="16"
//                 placeholder="Brief description to introduce your service to clients"
//                 value={desc}
//                 onChange={(e) => setDesc(e.target.value)}
//               ></textarea>
//               <button type="submit">Create</button>
//             </div>

//             <div className="right">
//               <label htmlFor="">Service Title</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Home cleaning"
//                 value={shortTitle}
//                 onChange={(e) => setShortTitle(e.target.value)}
//               />
//               <label htmlFor="">Short Description</label>
//               <textarea
//                 placeholder="Short description of the service you offer"
//                 cols="30"
//                 rows="10"
//                 value={shortDesc}
//                 onChange={(e) => setShortDesc(e.target.value)}
//               ></textarea>
//               <label htmlFor="">Service Duration (e.g. 2 hours)</label>
//               <input
//                 type="number"
//                 min={1}
//                 value={deliveryTime}
//                 onChange={(e) => setDeliveryTime(e.target.value)}
//               />
//               <label htmlFor="">Number of Revisions/Visits</label>
//               <input
//                 type="number"
//                 min={1}
//                 value={revisionNumber}
//                 onChange={(e) => setRevisionNumber(e.target.value)}
//               />
//               <label htmlFor="">Add Service Features</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Cleaning bathrooms"
//                 onChange={(e) =>
//                   setFeatures((prev) => [...prev, e.target.value])
//                 }
//               />
//               <label htmlFor="">Price (in ₹)</label>
//               <input
//                 type="number"
//                 min={100}
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Add;

import React, { useState } from "react";
import axios from "axios";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import "./Add.scss";

const Add = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8800"; // Add this line
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null); // Add this line
  const [desc, setDesc] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [revisionNumber, setRevisionNumber] = useState(1);
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  // Modified file input handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    }
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim()) {
      setFeatures((prev) => [...prev, featureInput.trim()]);
      setFeatureInput(""); // Clear input after adding
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Clean up preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("cat", cat);
    formData.append("desc", desc);
    formData.append("shortTitle", shortTitle);
    formData.append("shortDesc", shortDesc);
    formData.append("deliveryTime", deliveryTime);
    formData.append("revisionNumber", revisionNumber);
    formData.append("price", price);
    //formData.append("features", JSON.stringify(features[features.length - 1]));
    formData.append("features", JSON.stringify(features)); // Send full array

    if (cover) {
      formData.append("cover", cover);
      console.log("Appending cover:", cover.name); // Add this log
    }
    try {
      const response = await newRequest.post("/gigs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", response.data); // Add this log
      navigate(`/gigs?cat=${cat}`);
    } catch (error) {
      console.error(
        "Error creating gig:",
        error.response?.data || error.message
      );
      console.error("Error creating gig:", error);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="sections">
            <div className="left">
              <label htmlFor="">Id</label>
              <input
                type="text"
                placeholder="e.g. 1"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="e.g. I'll do something I'm really good at"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="">Category</label>
              <select
                name="cats"
                id="cats"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              >
                <option value="cleaning">Cleaning</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="childcare">Childcare</option>
                <option value="petcare">Petcare</option>
                <option value="gardening">Gardening</option>
                <option value="painting">Painting</option>
                <option value="carpentary">Carpentry</option>
                <option value="emergency">Emergency</option>
              </select>
              <label htmlFor="">Cover</label>
              <input
                type="file"
                id="cover"
                name="cover"
                onChange={handleFileChange} // Use the new handler
              />
              {/* Add image preview */}
              {coverPreview && (
                <div className="image-preview">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    style={{
                      maxWidth: "200px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              )}
              <label htmlFor="">Description</label>
              <textarea
                cols="30"
                rows="16"
                placeholder="Brief description to introduce your service to clients"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <button type="submit">Create</button>
            </div>

            {/* Rest of your right section remains the same */}
            <div className="right">
              <label htmlFor="">Service Title</label>
              <input
                type="text"
                placeholder="e.g. Home cleaning"
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
              />
              <label htmlFor="">Short Description</label>
              <textarea
                placeholder="Short description of the service you offer"
                cols="30"
                rows="10"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              ></textarea>
              <label htmlFor="">Service Duration (e.g. 2 hours)</label>
              <input
                type="number"
                min={1}
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
              <label htmlFor="">Number of Revisions/Visits</label>
              <input
                type="number"
                min={1}
                value={revisionNumber}
                onChange={(e) => setRevisionNumber(e.target.value)}
              />
              <label htmlFor="">Features</label>
              <input
                type="text"
                placeholder="e.g. Cleaning bathrooms"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFeatureAdd()} // Add on Enter
              />
              <button type="button" onClick={handleFeatureAdd}>
                Add Feature
              </button>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>
                    {feature}{" "}
                    <button
                      className="cross"
                      onClick={() => removeFeature(index)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>

              <label htmlFor="">Price (in ₹)</label>
              <input
                type="number"
                min={100}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

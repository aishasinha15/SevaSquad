// import React from "react";
// import "./Message.scss";
// import { Link, useParams } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const Message = () => {
//   const { id } = useParams();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const queryClient = useQueryClient();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["messages"],
//     queryFn: () =>
//       newRequest.get(`/messages/${id}`).then((res) => {
//         console.log("Fetched messages:", res.data);
//         return res.data;
//       }),
//   });

//   const mutation = useMutation({
//     mutationFn: (message) => {
//       return newRequest.post(`/messages`, message);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["messages"]);
//     },
//     onError: (error) => {
//       console.error("Mutation error:", error); // Debug log
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({
//       conversationId: id,
//       desc: e.target[0].value,
//     });
//     e.target[0].value = "";
//   };

//   return (
//     <div className="message">
//       <div className="container">
//         <span className="breadcrumbs">
//           <Link
//             to="/messages"
//             className="link"
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           >
//             MESSAGES
//           </Link>{" "}
//           &gt; {data?.username || "User"} &gt;
//         </span>
//         {isLoading ? (
//           "loading"
//         ) : error ? (
//           "error"
//         ) : (
//           <div className="messages">
//             {data.map((m) => (
//               <div
//                 className={m.userId === currentUser._id ? "owner item" : "item"}
//                 key={m._id}
//               >
//                 <img
//                   src={
//                     m.userImg ||
//                     "https://img.freepik.com/free-photo/young-woman-cleaning-house_23-2147916565.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar"
//                   }
//                   alt="User"
//                 />

//                 <p>{m.desc}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         <hr />
//         <form className="write" onSubmit={handleSubmit}>
//           <textarea type="text" placeholder="write a message.."></textarea>
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Message;

// import React from "react";
// import "./Message.scss";
// import { Link, useParams } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const Message = () => {
//   const { id } = useParams();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const queryClient = useQueryClient();

//   // Keep the original messages query that's working
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["messages"],
//     queryFn: () =>
//       newRequest.get(`/messages/${id}`).then((res) => {
//         console.log("Fetched messages:", res.data);
//         return res.data;
//       }),
//   });

//   // Add a separate query for user data
//   const { data: userData } = useQuery({
//     queryKey: ["user", id],
//     queryFn: () =>
//       newRequest.get(`/users/${id}`).then((res) => {
//         console.log("Fetched user data:", res.data);
//         return res.data;
//       }),
//     // Don't let this query interfere with the UI if it fails
//     enabled: !!id,
//     onError: (error) => {
//       console.error("User data fetch error:", error);
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: (message) => {
//       return newRequest.post(`/messages`, message);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["messages"]);
//     },
//     onError: (error) => {
//       console.error("Mutation error:", error);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({
//       conversationId: id,
//       desc: e.target[0].value,
//     });
//     e.target[0].value = "";
//   };

//   return (
//     <div className="message">
//       <div className="container">
//         <span className="breadcrumbs">
//           <Link
//             to="/messages"
//             className="link"
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           >
//             MESSAGES
//           </Link>{" "}
//           &gt; {userData?.username || "User"} &gt;
//         </span>
//         {isLoading ? (
//           "loading"
//         ) : error ? (
//           "error"
//         ) : (
//           <div className="messages">
//             {data.map((m) => (
//               <div
//                 className={m.userId === currentUser._id ? "owner item" : "item"}
//                 key={m._id}
//               >
//                 <img
//                   src={
//                     (m.userId === currentUser._id
//                       ? currentUser.img
//                       : userData?.img) ||
//                     "https://img.freepik.com/free-photo/young-woman-cleaning-house_23-2147916565.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar"
//                   }
//                   alt="User"
//                 />
//                 <p>{m.desc}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         <hr />
//         <form className="write" onSubmit={handleSubmit}>
//           <textarea type="text" placeholder="write a message.."></textarea>
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Message;

// import React from "react";
// import "./Message.scss";
// import { Link, useParams } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const Message = () => {
//   const { id } = useParams();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const queryClient = useQueryClient();

//   // Keep the original messages query
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["messages"],
//     queryFn: () =>
//       newRequest.get(`/messages/${id}`).then((res) => {
//         console.log("Fetched messages:", res.data);
//         return res.data;
//       }),
//   });

//   // Get the other user's ID from the first message
//   const otherUserId =
//     data?.[0]?.userId === currentUser._id
//       ? data?.[0]?.conversationId
//           .split("-")
//           .find((id) => id !== currentUser._id)
//       : data?.[0]?.userId;

//   // Query for other user's data
//   const { data: otherUserData } = useQuery({
//     queryKey: ["user", otherUserId],
//     queryFn: () =>
//       newRequest.get(`/users/${otherUserId}`).then((res) => {
//         console.log("Fetched other user data:", res.data);
//         return res.data;
//       }),
//     enabled: !!otherUserId,
//     onError: (error) => {
//       console.error("Other user data fetch error:", error);
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: (message) => {
//       return newRequest.post(`/messages`, message);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["messages"]);
//     },
//     onError: (error) => {
//       console.error("Mutation error:", error);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({
//       conversationId: id,
//       desc: e.target[0].value,
//     });
//     e.target[0].value = "";
//   };

//   const getProfilePicture = (messageUserId) => {
//     const defaultPicture =
//       "https://img.freepik.com/free-photo/young-woman-cleaning-house_23-2147916565.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar";

//     if (messageUserId === currentUser._id) {
//       return currentUser.img || defaultPicture;
//     } else {
//       return otherUserData?.img || defaultPicture;
//     }
//   };

//   return (
//     <div className="message">
//       <div className="container">
//         <span className="breadcrumbs">
//           <Link
//             to="/messages"
//             className="link"
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           >
//             MESSAGES
//           </Link>{" "}
//           &gt; {otherUserData?.username || "User"} &gt;
//         </span>
//         {isLoading ? (
//           "loading"
//         ) : error ? (
//           "error"
//         ) : (
//           <div className="messages">
//             {data.map((m) => (
//               <div
//                 className={m.userId === currentUser._id ? "owner item" : "item"}
//                 key={m._id}
//               >
//                 <img
//                   src={getProfilePicture(m.userId)}
//                   alt={m.userId === currentUser._id ? "Me" : "Other User"}
//                   onError={(e) => {
//                     e.target.src =
//                       "https://img.freepik.com/free-photo/young-woman-cleaning-house_23-2147916565.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar";
//                   }}
//                 />
//                 <p>{m.desc}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         <hr />
//         <form className="write" onSubmit={handleSubmit}>
//           <textarea type="text" placeholder="write a message.."></textarea>
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Message;

import React from "react";
import "./Message.scss";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // First, fetch all messages
  const {
    isLoading,
    error,
    data: messages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        console.log("Fetched messages:", res.data);
        return res.data;
      }),
  });

  // Then, find the first message that's not from the current user
  const firstOtherUserMessage = messages?.find(
    (m) => m.userId !== currentUser._id
  );
  const otherUserId = firstOtherUserMessage?.userId;

  // Fetch other user's data
  const { data: otherUser } = useQuery({
    queryKey: ["user", otherUserId],
    queryFn: () =>
      newRequest.get(`/users/${otherUserId}`).then((res) => {
        console.log("Fetched other user:", res.data);
        return res.data;
      }),
    enabled: !!otherUserId, // Only run this query if we have the other user's ID
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = e.target[0].value.trim();
    if (!messageText) return;

    mutation.mutate({
      conversationId: id,
      desc: messageText,
    });
    e.target[0].value = "";
  };

  // Helper function to get the correct profile picture
  const getProfilePicture = (messageUserId) => {
    const defaultPicture =
      "https://img.freepik.com/free-photo/young-woman-cleaning-house_23-2147916565.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar";

    if (messageUserId === currentUser._id) {
      return currentUser.img || defaultPicture;
    }
    return otherUser?.img || defaultPicture;
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link
            to="/messages"
            className="link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            MESSAGES
          </Link>{" "}
          &gt;{" "}
          {otherUser?.username || (currentUser.isWorker ? "Client" : "Expert")}{" "}
          &gt;
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {messages?.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src={getProfilePicture(m.userId)}
                  alt={m.userId === currentUser._id ? "Me" : "Other User"}
                  onError={(e) => {
                    e.target.src =
                      "https://img.freepik.com/free-photo/young-woman-cleaning-house_23-2147916565.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar";
                  }}
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="write a message.."
            disabled={mutation.isLoading}
          />
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;

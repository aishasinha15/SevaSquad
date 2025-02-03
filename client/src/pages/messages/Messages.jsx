import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        console.log("Fetched conversations:", res.data);
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      console.log("Marking as read for ID:", id);
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      console.log("Mutation successful, refetching data...");
      queryClient.invalidateQueries(["conversations"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error); // Debug log
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const createConversationMutation = useMutation({
    mutationFn: (recipientId) =>
      newRequest.post("/conversations", { to: recipientId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]); // Refetch conversations after creation
    },
  });

  const handleStartConversation = () => {
    const recipientId = prompt("Enter the recipient's ID:");
    if (recipientId) {
      createConversationMutation.mutate(recipientId);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error..."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
            <button onClick={handleStartConversation}>
              Start New Conversation
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isWorker ? "Client" : "Expert"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Check if `data` exists and is an array before calling `.map()` */}
              {Array.isArray(data) && data.length > 0 ? (
                data.map((c) => (
                  <tr
                    className={
                      ((currentUser.isWorker && !c.readByExpert) ||
                        (!currentUser.isWorker && !c.readByClient)) &&
                      "active"
                    }
                    key={c.id}
                  >
                    <td>{currentUser.isWorker ? c.clientId : c.expertId}</td>
                    <td>
                      <Link
                        to={`/message/${c.id}`}
                        className="link"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          handleRead(c.id);
                        }}
                      >
                        {c?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isWorker && !c.readByExpert) ||
                        (!currentUser.isWorker && !c.readByClient)) && (
                        <>
                          <button
                            className="mark"
                            onClick={() => handleRead(c.id)}
                          >
                            Mark as Read
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No conversations available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;

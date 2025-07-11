import React, { useEffect, useState } from "react";
import "./MessageCus.css";
import MessageAPI from "@features/service/apiMessage";


export default function Message() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase() || "?";
  };


  // 1. Lấy danh sách tin nhắn cuối với từng người
  useEffect(() => {
    const fetchLatestUsers = async () => {
      try {
        const res = await MessageAPI.getLatestMessages();
        setUserList(res);
        if (res.length > 0) {
          setSelectedUser(res[0]);
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tin nhắn:", err);
      }
    };


    fetchLatestUsers();
  }, []);


  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await MessageAPI.getCurrentUserId();
        setCurrentUserId(id);
        console.log("👉 currentUserId:", id); // debug
      } catch (err) {
        console.error("Lỗi khi lấy currentUserId:", err);
      }
    };


    fetchUserId();
  }, []);


  // 2. Khi chọn user → lấy tin nhắn chi tiết
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await MessageAPI.getMessagesWithUser(selectedUser.userId);
        setMessageList(res);
      } catch (err) {
        console.error("Lỗi khi lấy tin nhắn với người dùng:", err);
      }
    };


    fetchMessages();
  }, [selectedUser]);


  // 3. Gửi tin nhắn
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;


    try {
      const sent = await MessageAPI.sendMessage({
        receiverId: selectedUser.userId,
        message: newMessage,
      });
      setMessageList((prev) => [...prev, sent]);
      setNewMessage("");
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };


  return (
    <div className="message-wrapper">
      <div className="sidebar">
        <h3>Danh sách người nhắn</h3>
        <div className="patient-list">
          {userList.length === 0 ? (
            <div>Chưa có tin nhắn nào</div>
          ) : (
            userList.map((u) => (
              <div
                key={u.userId}
                className={`patient-item ${
                  selectedUser?.userId === u.userId ? "active" : ""
                }`}
                onClick={() => setSelectedUser(u)}
              >
                <>
                  <div className="avatar-circle">{getInitial(u.userName)}</div>
                  <div className="text-info">
                    <div className="name">{u.userName}</div>
                    <div className="preview">{u.content}</div>
                  </div>
                </>
              </div>
            ))
          )}
        </div>
      </div>


      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h4>{selectedUser.userName}</h4>
            </div>


            <div className="chat-content">
              {messageList.length === 0 ? (
                <div className="no-messages">Chưa có tin nhắn nào</div>
              ) : (
                messageList.map((msg, index) => (
                  <div
                    key={index}
                    className={`message-bubble ${
                      msg.senderId === currentUserId ? "me" : "other"
                    }`}
                  >
                    <div className="text">{msg.content}</div>
                    <div className="time">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>


            <div className="chat-input">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Gửi</button>
            </div>
          </>
        ) : (
          <div className="chat-placeholder"></div>
        )}
      </div>
    </div>
  );
}

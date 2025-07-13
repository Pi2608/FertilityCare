import React, { useState } from 'react';
import './MessageCus.css';


const patients = [
  { id: 1, name: 'Bác sĩ Nguyễn Thị Hoa', avatar: 'https://i.pravatar.cc/100?img=1', lastMessage: 'Cảm ơn bác sĩ!' },
];


const sampleMessages = [
  { sender: 'patient', text: 'Chào em', time: '08:30' },
  { sender: 'doctor', text: 'Bác sĩ cần hỏi thông tin gì ạ?', time: '08:31' },
  { sender: 'patient', text: 'Tôi muốn gửi bạn vài thông tin về buổi khám hôm qua.', time: '08:32' },
];


export default function Message() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [messageList, setMessageList] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState('');


  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = { sender: 'doctor', text: newMessage, time: 'Bây giờ' };
    setMessageList([...messageList, newMsg]);
    setNewMessage('');
  };


  return (
    <div className="message-cus-wrapper">
      <div className="sidebar">
        <h3>Bác sĩ</h3>
        <div className="patient-list">
          {patients.map((p) => (
            <div
              key={p.id}
              className={`patient-item ${selectedPatient.id === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPatient(p)}
            >
              <img src={p.avatar} alt="avatar" />
              <div>
                <div className="name">{p.name}</div>
                <div className="preview">{p.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="chat-box">
        <div className="chat-header">
          <img src={selectedPatient.avatar} alt="avatar" />
          <h4>{selectedPatient.name}</h4>
        </div>


        <div className="chat-content">
          {messageList.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              <div className="text">{msg.text}</div>
              <div className="time">{msg.time}</div>
            </div>
          ))}
        </div>


        <div className="chat-input">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Gửi</button>
        </div>
      </div>
    </div>
  );
}




import React, { useState } from 'react';
import './Message.css';


const patients = [
  { id: 1, name: 'Nguyễn Thị Hoa', avatar: 'https://i.pravatar.cc/100?img=1', lastMessage: 'Cảm ơn bác sĩ!' },
  { id: 2, name: 'Trần Văn Linh & Vợ', avatar: 'https://i.pravatar.cc/100?img=2', lastMessage: 'Tôi có câu hỏi về kết quả...' },
  { id: 3, name: 'Phạm Thị Mai', avatar: 'https://i.pravatar.cc/100?img=3', lastMessage: 'Lịch siêu âm là khi nào?' },
  { id: 4, name: 'Lê Thị Hương', avatar: 'https://i.pravatar.cc/100?img=4', lastMessage: 'Tôi thấy hơi đau sau khi tiêm.' },
  { id: 5, name: 'Ngô Thị Lan', avatar: 'https://i.pravatar.cc/100?img=5', lastMessage: 'Bác sĩ cho tôi xin hướng dẫn...' },
];


const sampleMessages = [
  { sender: 'patient', text: 'Chào bác sĩ!', time: '08:30' },
  { sender: 'doctor', text: 'Chào bạn, bạn cần hỗ trợ gì?', time: '08:31' },
  { sender: 'patient', text: 'Tôi cần hỏi về kết quả hôm qua.', time: '08:32' },
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
    <div className="message-wrapper">
      <div className="sidebar">
      <h3> </h3>
        <h3>Bệnh nhân</h3>
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




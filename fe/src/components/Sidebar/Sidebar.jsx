import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // chứa CSS active

const Sidebar = ({ list, role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div id="sidebar">
      <div className="header">
        <h3>Trung tâm IVF</h3>
        <p>Cổng thông tin {role}</p>
      </div>

      <ul className="menu">
        {list && list.map((item, index) => (
          <li
            key={index}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => handleClick(item.path)}
          >
            <span className="icon">{item.icon}</span> {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

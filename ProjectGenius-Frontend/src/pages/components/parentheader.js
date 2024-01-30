import React from "react";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

const ParentHeader = ({ headerTitle, busNo, busImg }) => {

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <header className="drivers-header">
      <button type="button" onClick={handleGoBack}>
        <FaArrowLeft />
      </button>
      {busImg && (
        <div className="header-bus-img">
          <img src={busImg} alt="bus" />
        </div>
      )}
      <div className="header-bus-details">
        {headerTitle && <p>{headerTitle}</p>}
        {busNo && <span>{busNo}</span>}
      </div>
    </header>
  );
};

export default ParentHeader;

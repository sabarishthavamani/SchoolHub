import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Map from "./components/map";
import { IoMdCall } from "react-icons/io";
import { FaChevronUp } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";

const BusTracking = () => {
  const navigate = useNavigate()
  const [showDirection, setShowDirection] = useState(false);

  const handleShowDirection = () => {
    setShowDirection((prev) => !prev);
  };
  return (
    <div className="live-tracking-page">
      <Map />
      <div className={`bus-tracking-info ${showDirection ? "open-tracking-info" : "close-tracking-info"}`}>
        <div className="bus-info">
          <div className="bus-info-img">
            <img src="images/bus-marker.png" alt="bus" />
          </div>
          <div className="bus-details">
            <p>Bus No. 026</p>
            <span>Kumari - Bus Attendant </span>
          </div>
          <div className="bus-info-btn">
            <button type="button" className="info-call-btn" onClick={() => navigate('/bus-details')}>
              <BiSolidContact />
            </button>
            <button
              type="button"
              className="info-pop-btn"
              onClick={handleShowDirection}
            >
              <FaChevronUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTracking;
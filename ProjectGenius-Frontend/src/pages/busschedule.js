import React, { useState } from "react";
import { FaLocationDot, FaShop } from "react-icons/fa6";

import ParentHeader from "./components/parentheader";
import ParentNavBar from "./components/parentnavbar";

const BusSchedule = () => {
  const [activeTab, setActiveTab] = useState("PickUp");

  const renderRouteAddress = () => {
    switch (activeTab) {
      case "PickUp":
        return (
          <div className="bus-route-card">
            <h2>Pick Up - Bus Route</h2>
            <div className="route-card-container">
              <div className="bus-route-info">
                <span style={{ color: "#1A94FF" }}>
                  <FaShop />
                </span>
                <div className="bus-route-address">
                  <div>
                    <p>Your Stop</p>
                    <span>7.45 AM</span>
                  </div>
                  <h3>Anna Nagar</h3>
                  <span>Location/Address of the stop</span>
                </div>
              </div>
              <hr />
              <div className="bus-route-info">
                <span style={{ color: "#00AB56" }}>
                  <FaLocationDot />
                </span>
                <div className="bus-route-address">
                  <div>
                    <p>To School</p>
                    <span>8.30 AM</span>
                  </div>
                  <h3>13 Han Thuhyen, D.1, Madurai city</h3>
                </div>
              </div>
            </div>
          </div>
        );
      case "Drop":
        return (
          <div className="bus-route-card">
            <h2>Drop off trip - Bus Route</h2>
            <div className="route-card-container">
              <div className="bus-route-info">
                <span style={{ color: "#1A94FF" }}>
                  <FaShop />
                </span>
                <div className="bus-route-address">
                  <div>
                    <p>From School</p>
                    <span>3.45 PM</span>
                  </div>
                  <h3>13 Han Thuhyen, D.1, Madurai city</h3>
                </div>
              </div>
              <hr />
              <div className="bus-route-info">
                <span style={{ color: "#00AB56" }}>
                  <FaLocationDot />
                </span>
                <div className="bus-route-address">
                  <div>
                    <p>Your Stop</p>
                    <span>4.30 PM</span>
                  </div>
                  <h3>Anna Nagar</h3>
                  <span>Location/Address of the stop</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bus-schedule-page">
      <ParentHeader headerTitle={'Bus Route'} busNo={'Bus No. 026'} busImg={'images/bus-marker.png'} />
      <div className="bus-schedule-container">
        <div className="bus-schedule-tabs">
          <button type="button" style={activeTab === 'PickUp' ? {backgroundColor: '#FBF8BA', border: 'none'} : null} onClick={() => setActiveTab('PickUp')}>Pick Up Trip</button>
          <button type="button" style={activeTab === 'Drop' ? {backgroundColor: '#FBF8BA', border: 'none'} : null} onClick={() => setActiveTab('Drop')}>Drop-off Trip</button>
        </div>
        <div className="bus-details-card">
          <h2>Bus Details</h2>
          <div className="details-card-container">
            <div>
              <p>Bus Number</p>
              <h3>Bus No.26</h3>
            </div>
            <hr />
            <div>
              <p>Number Plate</p>
              <h3>TN 59 A 1234</h3>
            </div>
          </div>
        </div>
        {renderRouteAddress()}
      </div>
      <ParentNavBar />
    </div>
  );
};

export default BusSchedule;

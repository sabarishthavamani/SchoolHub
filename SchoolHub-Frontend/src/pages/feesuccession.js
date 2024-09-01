import React from "react";
import Sidebar from "./components/sidebar";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const FeeComplete = () => {
  const navigate = useNavigate();
  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />
        <div className="att-sheet">
          <div style={{ marginTop: "250px" }}>
            <p style={{ fontSize: 13 }}>Thank You For Your Payment</p>
            <img src="images/tik.png" />
            <span>Payment #123RGR231567Y Successful</span>

            <div className="sub-btnn button">
              <button
                type="button"
                className="receipt"
                onClick={navigate("/students")}
              >
                Generate Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeComplete;

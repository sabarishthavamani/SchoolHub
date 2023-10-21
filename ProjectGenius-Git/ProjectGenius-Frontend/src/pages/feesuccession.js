import React from 'react'
import Sidebar from './components/sidebar';


const FeeComplete = () => {
    return (
<div className="fee-collection">
  {/* <div className="fee-side-bar">
    <div className="fee-part-one">
      <div className="logo-content">
        <div className="logo">
          <img src="images/Polygon 3.png" />
          <span>
            <h2>Genius</h2>
          </span>
        </div>
      </div>
      <ul>
        <li>
          <div className="menu-bar">
            <img src="images/grey-file.png" />
            New Admission
          </div>
        </li>
        <li>
          <div className="menu-bar">
            <a href="students.html">
              <img
                src="images/person.png"
                alt=""
                style={{ paddingRight: 15 }}
              />
              Students
            </a>
          </div>
        </li>
        <li>
          <div className="menu-bar" style={{ color: "#905ef0" }}>
            <img src="images/blue-fee.png" alt="" />
            Fee Collection
          </div>
        </li>
        <li>
          <div className="menu-bar">
            <img src="images/setup.png" alt="" />
            Fee Setup
          </div>
        </li>
      </ul>
    </div>
    <div className="fee-part-two">
      <img src="images/Profile photo.png" alt="" />
      <div>
        <span>Sam Smith</span>
        <br />
        <span style={{ color: "#ccc" }}>Admin</span>
      </div>
      <i className="fa fa-sign-out" />
    </div>
  </div> */}
  <Sidebar />
  <div className="payment-success">
    <div className="success">
      <p style={{ fontSize: 13 }}>Thank You For Your Payment</p>
      <img src="images/tik.png" />
      <span>Payment #123RGR231567Y Successful</span>
      <button type="submit" className="receipt">
        Generate Receipt
      </button>
    </div>
  </div>
</div>

    )
}

export default FeeComplete;
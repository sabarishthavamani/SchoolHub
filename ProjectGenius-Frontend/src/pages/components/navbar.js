import React from 'react';

const Navbar = () => {
return(
        <div className="header">
      <div className="l-header">
        <p>New Student</p>
      </div>
      <div className="r-header">
        <a href="#">
          <img
            src="images/bell.png"
            alt=""
            title="notification"
            style={{ height: 25 }}
          />
        </a>
        <a href="#">
          <img
            src="images/setting.png"
            alt=""
            title="setting"
            style={{ height: 25 }}
          />
        </a>
        <div>
          <span>Sam Smith</span>
          <br />
          <span style={{ color: "#ccc" }}>Admin</span>
        </div>
        <img src="images/Profile photo.png" alt="" title="profile" />
      </div>
    </div> 
)
}
export default Navbar;
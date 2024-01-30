import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { NavLink } from "react-router-dom";

const ParentNavBar = () => {
  return (
    <nav className="drivers-nav">
      <NavLink
        to="/parent-home"
        exact
        className={({ isActive }) =>
          isActive ? "selected-drivers-nav-menu" : ""
        }
      >
        <MdOutlineHome size={26} />
        <p>Home</p>
      </NavLink>
      <NavLink 
      to="/student-profile"
      exact
      className={({ isActive }) =>
        isActive ? "selected-drivers-nav-menu" : ""
      }>
        <GoPerson size={26} />
        <p>Student Profile</p>
      </NavLink>
    </nav>
  );
};

export default ParentNavBar;
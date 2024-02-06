import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoBell } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import ParentNavBar from "./components/parentnavbar";

let parentHomePageMenu = [
  {
    id: "LIVE_BUS_TRACKING",
    title: "Live Bus Tracking",
    imgSrc: "images/bus-emoji.png",
    imgAlt: "bus",
    url: "/bus-tracking",
  },
  {
    id: "BUS_SCHEDULE",
    title: "Bus Schedule",
    imgSrc: "images/bus-map.png",
    imgAlt: "bus",
    url: "/bus-schedule",
  },
  {
    id: "BUS_DETAILS",
    title: "Bus Details",
    imgSrc: "images/busdetails.png",
    imgAlt: "bus",
    url: "/bus-details",
  },
  {
    id: "BUS_ATTENDANCE",
    title: "Attendance",
    imgSrc: "images/bus-attendance.png",
    imgAlt: "bus",
    url: "/bus-attendance",
  },
];

const ParentHomepage = () => {
  let navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const inputRef = useRef(null);

  const searchedMenu = parentHomePageMenu.filter((menuItem) =>
    menuItem.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleNoMenuPage = () => {
    setSearchInput('')
  }

  useEffect(() => {
    if (searchedMenu.length === 0) {
      inputRef.current.blur();
    }
  }, [searchedMenu]);

  const renderMenu = () => {
    if (searchedMenu.length !== 0) {
      return (
        <div className="homepage-menu-section">
          {searchedMenu.map((menuItem) => (
            <div
              key={menuItem.id}
              className="homepage-menu"
              onClick={() => navigate(menuItem.url)}
            >
              <img src={menuItem.imgSrc} alt={menuItem.imgAlt} />
              <span>{menuItem.title}</span>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="homepage-no-menu">
          <div className="homepage-no-menu-overlay" onClick={handleNoMenuPage}></div>
          <div className="no-menu-msg-container">
            <img src="images/no-menu.png" alt="no menu" />
            <h3>Sorry, we nearly found it!</h3>
            <p>Please try again</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="driver-homepage">
      <div className="homepage-header"></div>
      <div className="homepage-container">
        <nav className="homepage-nav">
          <span>
            <RxHamburgerMenu />
          </span>
          <h2>Genius Bus App</h2>
          <div className="homepage-nav-menus">
            <span className="notification-alert">
              <GoBell />
            </span>
            <span>
              <BsThreeDotsVertical />
            </span>
          </div>
        </nav>
        <div className="homepage-search">
          <span>
            <CiSearch />
          </span>
          <input
          autoFocus
            type="search"
            placeholder="Search"
            value={searchInput}
            ref={inputRef}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {renderMenu()}
      </div>
      <ParentNavBar />
    </div>
  );
};

export default ParentHomepage;

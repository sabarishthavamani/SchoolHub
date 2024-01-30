import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { GoBell } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import {useNavigate} from 'react-router-dom'

import ParentNavBar from './components/parentnavbar';

const ParentHomepage = () => {

    let navigate = useNavigate()

  return (
    <div className='driver-homepage'>
        <div className='homepage-header'></div>
        <div className='homepage-container'>
            <nav className='homepage-nav'>
                <span><RxHamburgerMenu /></span>
                <h2>Genius Bus App</h2>
                <div className='homepage-nav-menus'>
                    <span className='notification-alert'><GoBell /></span>
                    <span><BsThreeDotsVertical /></span>
                </div>
            </nav>
            <div className='homepage-search'>
                <span><CiSearch /></span>
                <input type='text' placeholder='Search' />
            </div>
            <div className='homepage-menu-section'>
                <div className='homepage-menu' onClick={() => navigate('/live-tracking')}>
                    <img src='images/bus-emoji.png' alt='bus' />
                    <span>Live Bus Tracking</span>
                </div>
                <div className='homepage-menu' onClick={() => navigate('/bus-schedule')}>
                    <img src='images/bus-map.png' alt='bus' />
                    <span>Bus Schedule</span>
                </div>
                <div className='homepage-menu' onClick={() => navigate('/bus-details')}>
                    <img src='images/busdetails.png' alt='bus' />
                    <span>Bus Details</span>
                </div>
                <div className='homepage-menu'>
                    <img src='images/bus-attendance.png' alt='bus' />
                    <span>Attendance</span>
                </div>
            </div>
        </div>
        <ParentNavBar />
    </div>
  )
}

export default ParentHomepage
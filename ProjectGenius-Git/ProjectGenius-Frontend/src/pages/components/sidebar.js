import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { removeAuthToken } from '../../lib/localstorage';

const Sidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLinkActive = (linkPath) => {
    return pathname === linkPath;
  };  

  return (
    <div className="side-bar">
      <div className="part-one">
        <div className="logo-content">
          <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/images/Polygon 3.png`} alt="" />
            <span>Genius</span>
          </div>
        </div>
        <ul>
          <li style={isLinkActive('/newadmission') ?
              {
                background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
              } : null}>
            <div className="menu-bar">
              <img src={`${process.env.PUBLIC_URL}/images/grey-file.png`} />
              <NavLink to='/newadmission' className={`mysidebar ${isLinkActive('/newadmission') ? 'activemysidebar' : null}`}>NewAdmission</NavLink>
            </div>

          </li>
          <li style={isLinkActive('/students') ? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            } : null}> 
            <div className="menu-bar" >
              <img src={`${process.env.PUBLIC_URL}/images/person.png`} alt="" />
              <NavLink to='/students' className={`mysidebar ${isLinkActive('/students') ? 'activemysidebar' : null}`}>Students</NavLink>
            </div>
          </li>
          <li style={isLinkActive('/feecollection') || isLinkActive('/feepay1/:name') || isLinkActive('/feepay2') || isLinkActive('/feepay3') || isLinkActive('/feecomplete') ? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            } : null}>
            <div className="menu-bar" >
              <img src={`${process.env.PUBLIC_URL}/images/fee.png`} alt="" />
              <NavLink to='/feecollection' className={`mysidebar ${isLinkActive('/feecollection') ? 'activemysidebar' : null}`}>Fee Collection</NavLink>
            </div>
          </li>
          <li style={isLinkActive('/feesetup') ? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            } : null}>
            <div className="menu-bar">
              <img src={`${process.env.PUBLIC_URL}/images/setup.png`} alt="" />
              <NavLink to='/feesetup' className={`mysidebar ${isLinkActive('/feesetup') ? 'activemysidebar' : null}`}>Fee Setup</NavLink>
            </div>
          </li>
        </ul>
      </div>
      <div className="part-two">
        <img src={`${process.env.PUBLIC_URL}/images/Profile photo.png`} alt="" />
        <div>
          <span>Sam Smith</span>
          <br />
          <span style={{ color: "#ccc" }}>Admin</span>
        </div>
        <button data-bs-toggle="tooltip" title="Logout!" data-bs-placement="right" className='adminlogout'><FontAwesomeIcon icon={faSignOut} /></button>
      </div>
    </div>
  )
}

export default Sidebar;
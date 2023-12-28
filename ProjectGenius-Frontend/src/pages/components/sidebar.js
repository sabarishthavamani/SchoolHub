import React,{useState} from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { removeAuthToken } from '../../lib/localstorage';

const Sidebar = (props) => {

  const {name,Id,teacherId} = props

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
            {isLinkActive('/newadmission') ? <img src={`${process.env.PUBLIC_URL}/images/file.png`} /> : <img src={`${process.env.PUBLIC_URL}/images/grey-file.png`} />}
              <NavLink to='/newadmission' className={`mysidebar ${isLinkActive('/newadmission') ? 'activemysidebar' : null}`}>NewAdmission</NavLink>
            </div>

          </li>
          <li style={isLinkActive('/students') || isLinkActive(`/sectionallocate/${Id}`) || isLinkActive('/multi-sectionallocate') ? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            } : null}> 
            <div className="menu-bar" >
            {isLinkActive('/students') || isLinkActive(`/sectionallocate/${Id}`) || isLinkActive('/multi-sectionallocate') ?  <img src= {`${process.env.PUBLIC_URL}/images/blue-student.png`} alt="" />  :  <img src= {`${process.env.PUBLIC_URL}/images/edu.png`} alt="" />}
              <NavLink to='/students' className={`mysidebar ${isLinkActive('/students') || isLinkActive(`/sectionallocate/${Id}`) || isLinkActive('/multi-sectionallocate') ? 'activemysidebar' : null}`}>Students</NavLink>
            </div>
          </li>
          <li style={isLinkActive(`/feecollection/${Id}`) || isLinkActive(`/feepayment/${name}`) || isLinkActive('/feecomplete') ? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            } : null}>
            <div className="menu-bar" >
            {isLinkActive(`/feecollection/${Id}`) ||  isLinkActive(`/feepayment/${name}`) || isLinkActive('/feecomplete') ? <img src={`${process.env.PUBLIC_URL}/images/blue-fee.png`} alt="" /> :<img src={`${process.env.PUBLIC_URL}/images/fee.png`} alt="" /> }
              <NavLink to={`/feecollection/${Id}`} className={`mysidebar ${isLinkActive(`/feecollection/${Id}`) ||  isLinkActive(`/feepayment/${name}`) || isLinkActive('/feecomplete') ? 'activemysidebar' : null}`}>Fee Collection</NavLink>
            </div>
          </li>
          <li style={isLinkActive('/feesetup') || isLinkActive('/feeslist')? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            } : null}>
            <div className="menu-bar">
             {isLinkActive('/feesetup') || isLinkActive('/feeslist') ? <img src={`${process.env.PUBLIC_URL}/images/blue-setup.png`} alt="" /> : <img src={`${process.env.PUBLIC_URL}/images/setup.png`} alt="" /> }
              <NavLink to='/feesetup' className={`mysidebar ${isLinkActive('/feesetup') || isLinkActive('/feeslist')? 'activemysidebar' : null}`}>Fee Setup</NavLink>
            </div>
          </li>
          <li
      style={
        isLinkActive('/teacher')  ? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            }: null} >
      <div className="menu-bar">
        {isLinkActive('/teacher') ? (
          <img src={`${process.env.PUBLIC_URL}/images/blue-contact.png`} alt="" />
        ) : (
          <img src={`${process.env.PUBLIC_URL}/images/person.png`} alt="" />
        )}
        <NavLink to='/teacher' className={`mysidebar ${isLinkActive('/teacher')  ? 'activemysidebar' : null}`}>Teacher</NavLink>
        
      </div>
    </li>
            <li  style={
        isLinkActive('/teacherview') || isLinkActive(`/teacherdetails/${Id}`) || isLinkActive(`/teacherschedule/${Id}`) ||isLinkActive(`/teachertimetable${teacherId}`) ? {
              background: 'linear-gradient(to right,#fde4cb,#fcfad3)'
            }: null}>
            <div className="menu-bar">
            {isLinkActive('/teacherview') ||  isLinkActive(`/teacherdetails/${Id}`) || isLinkActive(`/teacherschedule/${Id}`) ||isLinkActive(`/teachertimetable${teacherId}`) ? (
          <img src={`${process.env.PUBLIC_URL}/images/listblue.png`} alt="" />
        ) : (
          <img src={`${process.env.PUBLIC_URL}/images/listgrey.png`} alt="" />
        )}
              <NavLink to="/teacherview" className={`mysidebar ${isLinkActive('/teacherview') ||  isLinkActive(`/teacherdetails/${Id}`)|| isLinkActive(`/teacherschedule/${Id}`) || isLinkActive(`/teachertimetable${teacherId}`) ? 'activemysidebar' : null}`} >
                TeacherList
              </NavLink>
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
        <button data-bs-toggle="tooltip" title="Logout!" data-bs-placement="right" className='adminlogout' onClick={()=>{
          removeAuthToken()
          navigate('/login')
        }}><FontAwesomeIcon icon={faSignOut} /></button>
      </div>
    </div>
  )
}

export default Sidebar;
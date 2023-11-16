import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import { removeAuthToken } from '../../lib/localstorage'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const TeacherSidebar = () => {
    //hooks
    const { pathname } = useLocation()
    const navigate = useNavigate()
    return(
        <>
        <div className="side-menu-content">
        <div className="att-part-one">
            <div className="att-menu">
                <span>Track</span>
                <p className="am" style={pathname === '/teacher-attendance' ? { backgroundColor: '#f9f6b8' } : {}}><Link to="/teacher-attendance"><img src={`${process.env.PUBLIC_URL}/images/sheet.png`} alt="attendance" style={{marginRight: '18px'}} />Attendance Sheet</Link></p>
            </div>
            <div className="att-menu">
                <span>Analyze</span>
                <p className="am" style={pathname === '/teacher-dashboard' ? { backgroundColor: '#f9f6b8' } : {}}><Link to='/teacher-dashboard'><img src={`${process.env.PUBLIC_URL}/images/dashboard.png`} alt="dashboard" />Dashboard</Link></p>
                <p className="am" style={pathname === '/teacher-marksheet' ? { backgroundColor: '#f9f6b8' } : {}}><Link to="/teacher-marksheet" className="report"><img src={`${process.env.PUBLIC_URL}/images/report.png`} alt="report" />Report Card</Link></p>
            </div>
            <div className="att-menu">
                <span>Manage</span>
                <p className="am" style={pathname === '/teacher-student' ? { backgroundColor: '#f9f6b8' } : {}}><Link to="/teacher-student" className="child"><img src={`${process.env.PUBLIC_URL}/images/child.png`} alt="Student" />Student</Link></p>
            </div>
        </div>
        <div className="teacher-logout">
     <button data-bs-toggle="tooltip" title="Logout!" data-bs-placement="right" className='teachersignout' onClick={()=>{
       removeAuthToken()
       navigate('/teacher-login')
     }}>Logout<span><FontAwesomeIcon icon={faSignOut} /></span></button>
   </div>
    </div>
   </>
    )
}
export default TeacherSidebar

import React from 'react'

const TeacherHeader = () => (
        <div className="genius-header">
            <div className="genius-logo">
               <img src={`${process.env.PUBLIC_URL}/images/Polygon 3.png`} alt="logo" />
               <span>Genius</span>
            </div>
            <div className="scl-std">
                <img src={`${process.env.PUBLIC_URL}/images/profile-img.jpg.png`} alt="student" />
                <span>Simon James</span>
            </div>
        </div>
    )

export default TeacherHeader
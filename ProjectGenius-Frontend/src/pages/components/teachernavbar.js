import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TeacherMenuContext } from "../../context/teachermenucontext";
import { IoClose } from "react-icons/io5";

const TeacherHeader = () => {

  //context
  const { openMenu, toggleMenu  } = useContext(TeacherMenuContext);
  //state
  const [teacherInfo,setTeacherInfo] = useState('')
  useEffect(() => {
    const handleStorageChange = () => {
      setTeacherInfo(JSON.parse(localStorage.getItem('TEACHER_DATA')));
    };
    handleStorageChange()
  }, []);

  return (
    <div className="genius-header">
      <button
        className="teacher-ham-btn"
        type="button"
        onClick={() => toggleMenu()}
      >
        {openMenu ? <IoClose size={30} /> : <RxHamburgerMenu size={30} />}
      </button>
      <div className="genius-logo">
        <img
          src={`${process.env.PUBLIC_URL}/images/Polygon 3.png`}
          alt="logo"
        />
        <span>Genius</span>
      </div>
      <div className="scl-std">
                <img src={teacherInfo.teacherphoto} width={'40px'} height={'40px'} style ={{borderRadius:"50%"}}alt="student" />
                <span>{teacherInfo.name}</span>
            </div>
    </div>
  );
};
export default TeacherHeader;

import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
//import Actions
import { getSingleteacher } from '../actions/adminAction';
//hooks
import { useParams } from 'react-router-dom';

const TeacherDetail = ()=>{
const[data,setData] =useState('')
const {Id} =useParams()

const navigate = useNavigate()

const getData =async (id) =>{
  try{
   let {status,result} = await getSingleteacher(id)
   if(status == true){
    setData(result)
   }
  }catch(err){
    console.log(err,'---err')
  }
}
useEffect(() => {
  getData(Id)
}, [])
console.log(data,'---data')
return(
    <div className="teacher">
<Sidebar Id={Id}/>
  <div className="teacher-content" style={{ background: "#f7f7f8" }}>
    <div className="header">
      <div className="l-header">
        <p>Teacher Details</p>
      </div>
    </div>
    <div className="teacher-docs">
          <div className="left-docs" >
          <div className="doc-profile">
            <img src={data.teacherphoto}/>
            <div className="tchr-name">
              <p>{data.name}</p>
              <p>History Teacher</p>
            </div>
            <div className="tchr-adrs">
              <div className="ad">
                <i className="fa fa-phone" />
                <span>(+91){data.phoneNumber}</span>
              </div>
              <div className="ad">
                <i className="fa fa-envelope-o" />
                <span>{data.email}</span>
              </div>
              <div className="ad">
                <i className="fa fa-address-card-o" />
                <span>{data.permanentaddress}</span>
              </div>
            </div>
          </div>
          <div className="doc-details">
            <div className="abt" style={{ marginTop: 35 }}>
              <h3>About</h3>
              <p>
                Dedicated to fostering a passion for learning and encouraging
                intellectual growth in students, I am committed to delivering a
                dynamic and engaging educational experience.
              </p>
              <p>
                My teaching philosophy revolves around instilling critical
                thinking, creativity, and a thirst for knowledge.
              </p>
            </div>
            <div className="abt">
              <h3>Education</h3>
              <ul>
                <li>
                {data.higherqualification} 2013-2017
                </li>
                <li>{data.teachingcertificates} 2013-2017</li>
              </ul>
            </div>
            <div className="abt">
              <h3>Expertise</h3>
              <p>World History, Philosophy, Prehistoric, Culture, Ancient</p>
            </div>
          </div>
        </div>
        {/* )
      })} */}
      <div className="right-docs">
        <div className="assign-task">
          <button>+ Assign Task</button>
        </div>
        <div className="attendance att">
          <p style={{ color: "#ff3672" }}>Attendance</p>
          <p>30 Working Days</p>
          <ul>
            <li>23 Full Day</li>
            <li>04 Half Day</li>
            <li>06 Absent Day</li>
          </ul>
        </div>
        <div className="attendance sch">
          <p style={{ color: "#4a86f9" }}>Schedule</p>
          <p>History-Class VI &amp; VII</p>
          <p>Social Science - Class V</p>
          <button className="schedule" onClick={()=>{navigate('/teachertimetable')}}>
            <i className="fa fa-eye" style={{ marginRight: 8 }} />
            View Schedule
          </button>
        </div>
        <div className="attendance perform">
          <p style={{ color: "#10c87b" }}>Performance Metrics</p>
          <div className="perform-content">
            <div className="pro-bar">
              <progress
                value={75}
                min={0}
                max={100}
                style={{ visibility: "hidden", height: 0, width: 0 }}
              >
                75%
              </progress>
            </div>
            <div className="std-core">
              <p style={{ fontSize: 12, color: "#9e9e9e", width: "100%" }}>
                Student's Core
              </p>
              <ul>
                <li style={{ color: "#5dd9d4" }}>&gt;80%</li>
                <li style={{ color: "#ffe605" }}> &lt;70%</li>
                <li style={{ color: "#e66767" }}>&lt;40%;</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

)
}
export default TeacherDetail;
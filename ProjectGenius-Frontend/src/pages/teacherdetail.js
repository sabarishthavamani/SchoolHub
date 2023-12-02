import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
//import Actions
import { findschedulefordetails, getSingleteacher } from '../actions/adminAction';
//hooks
import { useParams } from 'react-router-dom';
import Attendance from './components/attendance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const TeacherDetail = ()=>{
const[data,setData] =useState('')
const[schedule,setSchedule] =useState('')
const [currentDaySchedule, setCurrentDaySchedule] = useState([]);
const [openAttendance, setOpenAttendance] = useState(false)
//params
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

const getSchedule =async () =>{
  try{
   const Scheduledata = {
    teacherId:data.teacherId
   }
   console.log(Scheduledata,'---sch')
   let {status,result} = await findschedulefordetails(Scheduledata)
   if(status == true){
    setSchedule(result)
   }
  }catch(err){
    console.log(err,'---err')
  }
}
useEffect(() => {
  getSchedule()
}, [data.teacherId])

useEffect(() => {
  // Process the schedule data when it changes
  if (schedule && schedule.schedule) {
    const processedData = schedule.schedule.map((dayData) => {
      const { day, periods } = dayData;
      const processedPeriods = Object.values(periods).filter(
        (period) => period.class && period.subject
      );
      return { day, periods: processedPeriods };
    });
    // Get the current day
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    // Filter the processed schedule for the current day
    const currentDayData = processedData.find(
      (dayData) => dayData.day.toLowerCase() === today.toLowerCase()
    );
    setCurrentDaySchedule(currentDayData || []);
  }
}, [schedule]);

const handlePopUp = () => {
  setOpenAttendance(prevState => !prevState)
}
 
return(
  <>
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
            <div>
            <img src={data.teacherphoto}/>
            </div>
            <div className="tchr-name">
            <p>{data.name}</p>
                <p>Subjects Handling</p>
                <p>{data.subjects}</p>
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
          <button type="button"><Link to={'/teacherschedule/'+(data._id)} style={{textDecoration:"none",color:"deeppink"}}>+ Assign Task</Link></button>
        </div>
        <div className="attendan att">
                <div>
                  <p style={{ color: "#ff3672" }}>Attendance</p>
                  <button type="button" className="att-button" onClick={handlePopUp}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ marginRight: 8 }}
                  />
                  View
                </button>
                </div>
                <ul>
                  <li>23 Present Days</li>
                  <li>06 Absent Days</li>
                  <li>04 Holiday</li>
                </ul>
              </div>
        <div className="attendan sch">
          <p style={{ color: "#4a86f9" }}>Schedule</p>
          {currentDaySchedule && currentDaySchedule.day ? (
            <div>
              <p>Day : {currentDaySchedule.day}</p>
              <div className='schedule-list'>
              <ul>
                {currentDaySchedule.periods.map((period, periodIndex) => (
                  <li key={periodIndex}>
                    {`${period.class} - ${period.subject}`}
                  </li>
                ))}
              </ul>
              </div>
            </div>
          ) : (
            <p>No schedule available for today.</p>
          )}
          <button className="schedule" onClick={()=>{navigate('/teachertimetable/'+(data.teacherId))}}>
            <i className="fa fa-eye" style={{ marginRight: 8 }} />
            View
          </button>
        </div>
        <div className="attendan perform">
          <p style={{ color: "#10c87b" }}>Teacher Status</p>
          <div className="perform-content">
            <table className='status-table'>
              <tr>
                <th>Grade</th>
                <th>Role</th>
                <th>Subject</th>
              </tr>
              <tr className='status-table-row'>
                <td>Preschool-A</td>
                <td>ClassTeacher</td>
                <td>Tamil</td>
              </tr>
              <tr className='status-table-row'>
                <td>LKG-A</td>
                <td>ClassTeacher</td>
                <td>Tamil</td>
              </tr>
              <tr className='status-table-row'>
                <td>LKG-A</td>
                <td>ClassTeacher</td>
                <td>Tamil</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{openAttendance && (
        <div className="calender-over-lay">
          <button type="button" onClick={handlePopUp} className="calender-close">
            Close
          </button>
        <Attendance />
      </div>
      )}
</>
)
}
export default TeacherDetail;
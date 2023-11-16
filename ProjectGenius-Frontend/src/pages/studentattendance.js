import React,{useState,useEffect} from 'react'
import TeacherHeader from './components/teachernavbar'
import TeacherSidebar from './components/teachersidebar'
import { viewStudent } from '../actions/adminAction'

const StudentAttendance = () => {
    const [attendanceRecord, setAttendanceRecord] = useState([])
    const [data,setData] = useState({})

    const handlePresent = (Id) => {
        
        setAttendanceRecord((prevState) => {
            if (!attendanceRecord.includes(Id)) {
                return [...prevState, Id]
            } else {
                const updatedAttendance = prevState.filter(each => each.studentId === Id)
                return updatedAttendance
            }
        });
    }
    console.log(attendanceRecord)
    const handleAbsent = (Id) => {
        setAttendanceRecord((prevState) => {
            if (attendanceRecord.includes(Id)) {
                const updatedAttendance = prevState.filter(each => each.studentId === Id)
                return updatedAttendance
            } else {
                return [...prevState, Id]
            }
        });
    }
    const getData = async () => {
        try {
          let { status, result } = await viewStudent();
          if (status === true) {
            setData(result)
          }
        } catch (err) {
          console.error(err);
        }
      };
      useEffect(() => {
        getData();
      }, []);
  return (
    <div className="attendance">
        <TeacherHeader />
        <div className="attendance-content">
        <TeacherSidebar />
          <div className="att-sheet">
                <div className="class-details">
                    <div className="std-class">
                        <label>className</label>
                        <select>
                            <option></option>
                            <option>Pre School</option>
                            <option>LKG</option>
                            <option>UKG</option>
                            <option>I</option>
                            <option>II</option>
                            <option>III</option>
                            <option>IV</option>
                            <option>V</option>
                            <option>VI</option>
                            <option>VII</option>
                            <option>VIII</option>
                            <option>IX</option>
                            <option>X</option>
                            <option>XI</option>
                            <option>XII</option>
                        </select>
                    </div>
                    <div className="std-class">
                        <label>Section</label>
                        <select>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                        </select>
                    </div>
                    <div className="std-class">
                        <label>Date</label>
                        <input type="date" />
                    </div>
                    <button className="sheet-button">Generate Sheet</button>
                </div>
                <div className="att-record">
                    <p>Attendance Sheet</p>
                    <table className="sheet">
                        <thead>
                            <tr className="sheet-head">
                                <th>
                                    <span className="p-a prs">P</span>
                                    <span className="p-a abs">A</span>
                                </th>
                                <th>Student Name</th>
                                <th>Student ID</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data.map((item,key)=>{
                                return(
                                    <tr className="sheet-body" key={key}>
                                    <td>
                                    <label className="lab" style={{marginRight: '8px'}}>
                                            <input type="checkbox"  onChange={() => handlePresent(item.studentId)} checked={attendanceRecord.includes(item.studentId)} />
                                            <span className="checking"></span>
                                        </label>
                                        <label className="lab">
                                            <input type="checkbox" onChange={() => handleAbsent(item.studentId)} checked={attendanceRecord.includes(item.studentId)}/>
                                            <span className="cross"></span>
                                        </label>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.studentId}</td>
                                    <td>{attendanceRecord.includes(item.studentId) !== null && <span className={attendanceRecord.includes(item.studentId) ? "present" : "absent"}>{attendanceRecord.includes(item.studentId) ? "Present" : "Absent"}</span>}</td>
                                </tr>
                                )
                            })}
                            {/* <tr className="sheet-body">
                                <td>
                                <label className="lab" style={{marginRight: '8px'}}>
                                        <input type="checkbox"  onChange={handlePresent} checked={attendanceStatus===true} />
                                        <span className="checking"></span>
                                    </label>
                                    <label className="lab">
                                        <input type="checkbox" onChange={handleAbsent} checked={attendanceStatus===false}/>
                                        <span className="cross"></span>
                                    </label>
                                </td>
                                <td>Maria DB</td>
                                <td>2023473</td>
                                <td>{attendanceStatus !== null && <span className={attendanceStatus ? "present" : "absent"}>{attendanceStatus ? "Present" : "Absent"}</span>}</td>
                            </tr>
                            <tr className="sheet-body">
                                <td>
                                <label className="lab" style={{marginRight: '8px'}}>
                                        <input type="checkbox"  onChange={handlePresent} checked={attendanceStatus===true} />
                                        <span className="checking"></span>
                                    </label>
                                    <label className="lab">
                                        <input type="checkbox" onChange={handleAbsent} checked={attendanceStatus===false}/>
                                        <span className="cross"></span>
                                    </label>
                                </td>
                                <td>Maria DB</td>
                                <td>2023473</td>
                                <td>{attendanceStatus !== null && <span className={attendanceStatus ? "present" : "absent"}>{attendanceStatus ? "Present" : "Absent"}</span>}</td>
                            </tr>
                            <tr className="sheet-body">
                                <td>
                                <label className="lab" style={{marginRight: '8px'}}>
                                        <input type="checkbox"  onChange={handlePresent} checked={attendanceStatus===true} />
                                        <span className="checking"></span>
                                    </label>
                                    <label className="lab">
                                        <input type="checkbox" onChange={handleAbsent} checked={attendanceStatus===false}/>
                                        <span className="cross"></span>
                                    </label>
                                </td>
                                <td>Maria DB</td>
                                <td>2023473</td>
                                <td>{attendanceStatus !== null && <span className={attendanceStatus ? "present" : "absent"}>{attendanceStatus ? "Present" : "Absent"}</span>}</td>
                            </tr>
                            <tr className="sheet-body">
                                <td>
                                <label className="lab" style={{marginRight: '8px'}}>
                                        <input type="checkbox"  onChange={handlePresent} checked={attendanceStatus===true} />
                                        <span className="checking"></span>
                                    </label>
                                    <label className="lab">
                                        <input type="checkbox" onChange={handleAbsent} checked={attendanceStatus===false}/>
                                        <span className="cross"></span>
                                    </label>
                                </td>
                                <td>Maria DB</td>
                                <td>2023473</td>
                                <td>{attendanceStatus !== null && <span className={attendanceStatus ? "present" : "absent"}>{attendanceStatus ? "Present" : "Absent"}</span>}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <button className="sheet-submit">Submit</button>
          </div>
        </div>
    </div>
  )
}

export default StudentAttendance
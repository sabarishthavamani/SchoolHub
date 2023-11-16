import React,{useState,useEffect} from 'react'
import TeacherHeader from './components/teachernavbar'
import TeacherSidebar from './components/teachersidebar'
import { viewStudent } from '../actions/adminAction'

const StudentAttendance = () => {
    const [attendanceRecord, setAttendanceRecord] = useState({})
    const [data,setData] = useState({})

    const handlePresent = (id, status) => {
        setAttendanceRecord((prevState) => ({...prevState, [id]:status}))
    }

    const handleAbsent = (id, status) => {
        setAttendanceRecord((prevState) => ({...prevState, [id]:status}))
    }
    console.log(attendanceRecord)
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
                                        <input type="checkbox"  onChange={() => handlePresent(item.studentId, 'present')} checked={attendanceRecord[item.studentId] === 'present'} />
                                        <span className="checking"></span>
                                    </label>
                                    <label className="lab">
                                        <input type="checkbox" onChange={() => handleAbsent(item.studentId, 'absent')} checked={attendanceRecord[item.studentId] === 'absent'}/>
                                        <span className="cross"></span>
                                    </label>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.studentId}</td>
                                <td><span className={attendanceRecord[item.studentId] ? attendanceRecord[item.studentId] === 'present' ? "present" : "absent" : null}>{attendanceRecord[item.studentId] ? attendanceRecord[item.studentId] === 'present' ? "Present" : "Absent" : null}</span></td>
                            </tr>
                                )
                            })}
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
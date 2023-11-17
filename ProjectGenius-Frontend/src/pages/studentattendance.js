import React,{useState,useEffect} from 'react'
import TeacherHeader from './components/teachernavbar'
import TeacherSidebar from './components/teachersidebar'

import { findsection } from '../actions/teacherAction'
import toastAlert from '../lib/toast'

const initialFormValue ={
    "admissiongrade":"",
    "section":""
}
const StudentAttendance = () => {
    const [attendanceRecord, setAttendanceRecord] = useState({});
    const [data,setData] = useState({});
    const [formValue,setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [inputErrors,setInputErrors] = useState({});


    const {admissiongrade,section} = formValue;

    const handlePresent = (id, status) => {
        setAttendanceRecord((prevState) => ({...prevState, [id]:status}))
    }

    const handleAbsent = (id, status) => {
        setAttendanceRecord((prevState) => ({...prevState, [id]:status}))
    }
    console.log(attendanceRecord)
    
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setInputErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null, // Clear the error for this input
        }));
        setFormValue({...formValue,...{[name]:value}})        
    }
    const getData = async () => {
        try {
            let Data ={
                admissiongrade:admissiongrade,
                section:section,
            }
          let { status, result,errors,message } = await findsection(Data);
          if (status === true) {
            setData(result)
          }
          if(status === false){
            if(errors){
                setErrors(errors)
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    admissiongrade:errors.admissiongrade,
                    section:errors.section
                  }))
            }
            else if(message){
               toastAlert('error',message)
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
    console.log(data,'---data')
  return (
    <div className="attendance">
        <TeacherHeader />
        <div className="attendance-content">
        <TeacherSidebar />
          <div className="att-sheet">
                <div className="class-details">
                    <div className="std-class">
                        <label>className</label>
                        <select name='admissiongrade' value={admissiongrade} onChange={handleChange}>
                            <option></option>
                            <option>Preschool</option>
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
                        <span className='attendance-error'>{inputErrors.admissiongrade}</span>
                    </div>
                    <div className="std-class">
                        <label>Section</label>
                        <select name='section' value={section} onChange={handleChange}>
                            <option />
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                        </select>
                        <span className='attendance-error'>{inputErrors.section}</span>
                    </div>
                    <div className="std-class">
                        <label>Date</label>
                        <input type="date" />
                    </div>
                    <button className="sheet-button" type='button' onClick={getData}>Generate Sheet</button>
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
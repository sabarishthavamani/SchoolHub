import React, { useState } from 'react'
import { FaEdit, FaEye } from "react-icons/fa";
//components
import TeacherHeader from './components/teachernavbar'
import TeacherSidebar from './components/teachersidebar'
//Actions
import { findmarksheet } from '../actions/teacherAction';
//Lib
import toastAlert from '../lib/toast';

const initialFormValue = {
    'admissiongrade': "",
    "section": "",
    "exam": ""
}
const StudentMarksheet = () => {
    const [data, setData] = useState('');
    const [errors, setErrors] = useState({});
    const [inputErrors, setInputErrors] = useState({})
    const [formValue, setFormValue] = useState(initialFormValue)

    const { admissiongrade, section, exam } = formValue;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null, // Clear the error for this input
        }));
        setFormValue({ ...formValue, ...{ [name]: value } })
    }

    const getData = async () => {
        try {
            let Data = {
                admissiongrade: admissiongrade,
                section: section,
                exam: exam
            }
            let { status, result, errors, message } = await findmarksheet(Data);
            if (status === true) {
                setData(result)
            }
            if (status === false) {
                if (errors) {
                    setErrors(errors)
                    setInputErrors((prevErrors) => ({
                        ...prevErrors,
                        admissiongrade: errors.admissiongrade,
                        section: errors.section,
                        exam: errors.exam
                    }))
                } 
                else if (message) {
                    toastAlert('error', message)
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    console.log(data, '---data')

    return (
        <div className="attendance">
            <TeacherHeader />
            <div className="attendance-content">
                <TeacherSidebar />
                <div className="att-sheet">
                    <div className="class-details">
                        <div className="stdmark-class">
                            <label>class</label>
                            <select onChange={handleChange} value={admissiongrade} name='admissiongrade'>
                                <option></option>
                                <option>Preschool</option>
                                <option>LKG</option>
                                <option>UKG</option>
                                <option>Class 1</option>
                                <option>Class 2</option>
                                <option>Class 3</option>
                                <option>Class 4</option>
                                <option>Class 5</option>
                                <option>Class 6</option>
                                <option>Class 7</option>
                                <option>Class 8</option>
                                <option>Class 9</option>
                                <option>Class 10</option>
                                <option>Class 11</option>
                                <option>Class 12</option>
                            </select>
                            <span className='attendance-error'>{inputErrors.admissiongrade}</span>
                        </div>
                        <div className="stdmark-class">
                            <label>Section</label>
                            <select value={section} onChange={handleChange} name='section'>
                                <option></option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                                <option>D</option>
                                <option>E</option>
                                <option>F</option>
                            </select>
                            <span className='attendance-error'>{inputErrors.section}</span>
                        </div>
                        <div className="stdmark-class">
                            <label>Exam Name</label>
                            <select value={exam} onChange={handleChange} name='exam'>
                                <option></option>
                                <option>Quarterly Examination</option>
                                <option>Half Yearly Examination</option>
                                <option>Annual Examination</option>
                            </select>
                            <span className='attendance-error'>{inputErrors.exam}</span>
                        </div>
                        <button className="sheet-button" type="button" onClick={getData}>View Report Card</button>
                    </div>
                    <div className="mark-record">
                        <p>Student Marksheet</p>
                        <table className="mark-sheet">
                            <thead>
                                <tr className="sheet-head">
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Subject 1</th>
                                    <th>Subject 2</th>
                                    <th>Subject 3</th>
                                    <th>Subject 4</th>
                                    <th>Subject 5</th>
                                    <th>Total Marks</th>
                                    <th>view</th>
                                </tr>
                            </thead>
                            
                                { data && data.marks.map((item,key) => {
                                    return(
                                        <tbody>
                                        <tr className="sheet-body" key={key}>
                                        <td>{item.studentId}</td>
                                        <td>{item.name}</td>
                                        <td><span className="sub1">{item.subjects.subject1}</span></td>
                                        <td><span className="sub2">{item.subjects.subject2}</span></td>
                                        <td><span className="sub3">{item.subjects.subject3}</span></td>
                                        <td><span className="sub4">{item.subjects.subject4}</span></td>
                                        <td><span className="sub5">{item.subjects.subject5}</span></td>
                                        <td><span className="total">{item.total}</span></td>
                                        <td className="eye"><FaEdit /></td>
                                    </tr>
                                    </tbody>
                                )
                                })}
                               
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentMarksheet
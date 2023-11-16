import React from 'react'
import TeacherHeader from './components/teachernavbar'
import TeacherSidebar from './components/teachersidebar'

const StudentMarksheet = () => {
  return (
    <div className="attendance">
        <TeacherHeader />
        <div className="attendance-content">
          <TeacherSidebar />
          <div className="att-sheet">
                <div className="class-details">
                    <div className="stdmark-class">
                        <label>class</label>
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
                    <div className="stdmark-class">
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
                    <div className="stdmark-class stc">
                        <label>Exam Name</label>
                        <select>
                            <option></option>
                            <option>Quarterly Examination</option>
                            <option>Half Yearly Examination</option>
                            <option>Annual Examination</option>
                        </select>
                    </div>
                </div>
                <button className="sheet-button">Generate Report Card</button>
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
                        <tbody>
                            <tr className="sheet-body">
                                <td>2023473</td>
                                <td>Maria DB</td>
                                <td><span className="sub1">83</span></td>
                                <td><span className="sub2">53</span></td>
                                <td><span className="sub3">87</span></td>
                                <td><span className="sub4">96</span></td>
                                <td><span className="sub5">74</span></td>
                                <td><span className="total">457</span></td>
                                <td className="eye"><i class="fa-solid fa-eye"></i></td>
                            </tr>
                            <tr class="sheet-body">
                                <td>2023473</td>
                                <td>Robert Fox</td>
                                <td><span class="sub1">83</span></td>
                                <td><span class="sub2">53</span></td>
                                <td><span class="sub3">87</span></td>
                                <td><span class="sub4">96</span></td>
                                <td><span class="sub5">74</span></td>
                                <td><span class="total">457</span></td>
                                <td className="eye"><i className="fa-solid fa-eye"></i></td>
                            </tr>
                            <tr className="sheet-body">
                                <td>2023473</td>
                                <td>Cody Fisher</td>
                                <td><span className="sub1">83</span></td>
                                <td><span className="sub2">53</span></td>
                                <td><span className="sub3">87</span></td>
                                <td><span className="sub4">96</span></td>
                                <td><span className="sub5">74</span></td>
                                <td><span className="total">457</span></td>
                                <td className="eye"><i className="fa-solid fa-eye"></i></td>
                            </tr>
                            <tr className="sheet-body">
                                <td>2023473</td>
                                <td>Devon Lane</td>
                                <td><span className="sub1">83</span></td>
                                <td><span className="sub2">53</span></td>
                                <td><span className="sub3">87</span></td>
                                <td><span className="sub4">96</span></td>
                                <td><span className="sub5">74</span></td>
                                <td><span className="total">457</span></td>
                                <td className="eye"><i className="fa-solid fa-eye"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="sheet-submit">Submit</button>
            </div>
        </div>
    </div>
  )
}

export default StudentMarksheet
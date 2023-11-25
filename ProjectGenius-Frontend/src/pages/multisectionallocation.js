import React, { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import SelectedStudentsTable from "./components/selectedstudentstable";
import { Groupsectionallocation } from "../actions/adminAction";
import toastAlert from "../lib/toast";

const MultiSectionAllocation = () => {

  const { state } = useLocation();
  const { studentData } = state
  const studentsList = studentData.formattedData
  const grade = studentData.sortGrade

  const [data, setData] = useState([]);
  const [section, setSection] = useState('')
  const [errorMsg, setErrorMsg] = useState(false)
 
  const navigate = useNavigate()
  const getData = () => {
    setData(studentsList);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSection = (e) => {
    setSection(e.target.value)
  }

  const handleSave = async (req,res) => {
    if(section === ""){
      return setErrorMsg(true)
    }
    try{
      const finalData = 
      {
        admissiongrade :grade,
        section:section,
        students : [...data]
      }
    const {status,message} = await Groupsectionallocation(finalData)
    if(status === true){
      setData([]);
      toastAlert('success',message)
      navigate('/students')
      setErrorMsg(false)
    }
    if(status === false){
      toastAlert('error',message)
    }
    }
    catch(err){
      console.log(err,'--err')
    }
    
  }

  return (
    <div className="fee-collection">
      <Sidebar />
      <div className="fee-content">
        <Navbar pageTitle={"Section Allotment"} />
        <div className="fee-form">
          <div className="fee-form-header">
            <span>Student Section Allotment</span>
          </div>
          <form action="" className="fee">
            <div className="fee-form-content">
              <div className="fee-left" style={{height: '300px'}}>
                <SelectedStudentsTable selectedStudents={data} />
              </div>
              <div className="fee-right">
                <div className="fee-box">
                  <label htmlFor="">Grade</label>
                  <input type="text" name="admissiongrade" value={grade} />
                </div>
                <div className="fee-box">
                  <label>Section</label>
                  <select name="section" onChange={handleSection} value={section}>
                    <option value="">Select section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                  </select>
                  {errorMsg &&  <span className='text-error'>*select section</span> }
                </div>
              </div>
            </div>
            <div className="process-btn">
              <button type="button" onClick={handleSave}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiSectionAllocation;

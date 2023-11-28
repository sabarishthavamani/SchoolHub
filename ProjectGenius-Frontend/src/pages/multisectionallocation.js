import React, { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
//import Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import SelectedStudentsTable from "./components/selectedstudentstable";
//import Action
import { GroupVerifysection, Groupsectionallocation } from "../actions/adminAction";
//import Lib
import toastAlert from "../lib/toast";

const MultiSectionAllocation = () => {

  const { state } = useLocation();
  const { studentData } = state
  const studentsList = studentData.formattedData
  const grade = studentData.sortGrade

  const [data, setData] = useState([]);
  const [Result,setResult] = useState({});
  const [section, setSection] = useState('')

 
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
    if(section === "" || section === "Select section"){
      return null
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
      
    }
    if(status === false){
      toastAlert('error',message)
    }
    }
    catch(err){
      console.log(err,'--err')
    }
    
  }

  const getSection = async () =>{
    try{
      let Sectiondata = {
        students : [...data]
      }
     let {status,result} = await GroupVerifysection(Sectiondata)
     console.log(result,'--res')
     if (status === true && result !== null) {
      setSection(result.section);
      setResult(result)
    }
  } catch (err) {
    console.log(err, '--err');
  }
  }
  
  useEffect(() => {
    getSection()
  }, [data])
console.log(Result,'---Result')
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
                  {/* <select name="section" onChange={handleSection} value={section}>
                    <option value="">Select section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                  </select>
                  {errorMsg &&  <span className='text-error'>*select section</span> } */}
      <select name="section" onChange={handleSection} value={section}>
                   {Result && Result.section ? (
      <>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
        <option>G</option>
      </>
    ) : (
      <>
        <option value=''>Select section</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
        <option>G</option>
      </>
    )}
  </select>
  {/* Render an error message if getSection has Result */}
  {Result && Result.section ? ( (Result.section === section) ? 
  (<span className='text-error'>❌Section already allocated</span>):
  (<span style={{color:"green",fontSize:"11px", fontWeight:"500"}}>
✅Section Changed</span>)):(section === '' && <span className='text-error'>*select section</span>)}
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

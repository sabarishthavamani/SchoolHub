import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
//import actions
import {
  GroupVerifysection,
  Sectionallocation,
  Verifysection,
  Verifysinglesection,
  getSinglestudent,
  updatesinglesection,
} from "../actions/adminAction";
//import lib
import toastAlert from "../lib/toast";
import AdminSidebar from "./components/Adminsidebar";
import AdminHeader from "./components/AdminHeader";

const initialFormValue = {
  name: "",
  studentId: "",
  admissiongrade: "",
  section: "",
};

const SectionAllocation = () => {
  // hooks
  const navigate = useNavigate();
  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [NameId, setNameId] = useState({});
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [data, setData] = useState(null);

  //params
  const { Id } = useParams();

  const { name, studentId, admissiongrade, section } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
    setFormValue({ ...formValue, ...{ [name]: value } });
  };
  const students = {
    name: name,
    studentId: studentId,
  };
  const getData = async (id) => {
    try {
      let { status, result } = await getSinglestudent(id);
      if (status === true) {
        setFormValue((prevFormValue) => ({ ...prevFormValue, ...result }));
        setNameId(result);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  useEffect(() => {
    getData(Id);
  }, []);

  const getSection = async () => {
    try {
      let Sectiondata = {
        students: { ...students },
      };
      let { status, result } = await Verifysinglesection(Sectiondata);
      if (status === true && result !== null) {
        setFormValue(result);
        setData(result);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  useEffect(() => {
    getSection();
  }, [students]);

  console.log(data, "---data");
  const handleRemove = async () => {
    try {
      console.log(formValue, "---value");
      let Updatedata = {
        students: {
          name: NameId.name,
          studentId: NameId.studentId,
        },
        section: section,
        admissiongrade: NameId.admissiongrade,
      };
      console.log(Updatedata, "---update");
      let { status, message } = await updatesinglesection(Updatedata);
      if (status === true) {
        setFormValue({});
        setData(null);
        toastAlert("success", message);
      }
    } catch (err) {
      console.log(err, "---err");
    }
  };

  const handleSubmit = async () => {
    try {
      let data = {
        students: {
          name: NameId.name,
          studentId: NameId.studentId,
        },
        section: section,
        admissiongrade: NameId.admissiongrade,
      };
      console.log(data, "---data");
      let { status, message, errors } = await Sectionallocation(data);
      if (status === true) {
        setFormValue(initialFormValue);
        toastAlert("success", message);
        setErrors({});
        navigate(`/students`);
      }
      if (status === false) {
        if (errors) {
          setErrors(errors);
          // Update the inputErrors state for each input with an error
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            section: errors.section,
          }));
        }
        if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {
      console.log(err, "...err");
    }
  };

  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />
        <div className="att-sheet">
          <h2 className="dashboard-title">New Student</h2>

          <div
            className="class-details"
            style={{ width: "85%", borderRadius: "15px" }}
          >
            <form className="myform" action="" style={{ marginTop: "35px" }}>
              <div className="field-box">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.name}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">Grade</label>
                <input
                  type="text"
                  name="admissiongrade"
                  value={admissiongrade}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.admissiongrade}</span>

                <div className="field-box">
                  <label>Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={studentId}
                    onChange={handleChange}
                  />
                  <span className="text-error">{inputErrors.studentId}</span>
                </div>
                <div className="field-box">
                  <label>Section</label>
                  <select
                    name="section"
                    value={section}
                    onChange={handleChange}
                  >
                    {data && data.section ? (
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
                        <option value="">Select section</option>
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
                  {/* Render an error message if getSection has data */}
                  {data && data.section ? (
                    data.section === section ? (
                      <span className="text-error">
                        ❌Section already allocated
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "green",
                          fontSize: "11px",
                          fontWeight: "500",
                        }}
                      >
                        ✅Section Changed
                      </span>
                    )
                  ) : (
                    <span className="text-error">{inputErrors.section}</span>
                  )}
                </div>
                {data && data.section ? (
                  data.section === section ? (
                    <button
                      type="button"
                      className="removebutton"
                      onClick={handleRemove}
                    >
                      Remove Section
                    </button>
                  ) : null
                ) : null}
              </div>
            </form>
          </div>
          <div className="sub-btnn button">
            <button type="button" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAllocation;

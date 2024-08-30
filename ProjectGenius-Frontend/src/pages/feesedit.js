import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//lib
import toastAlert from '../lib/toast';
//actions
import { feeUpdate, getSinglefees } from '../actions/adminAction';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/Adminsidebar';

const initialFormValue = {
  grade: '',
  term1: '',
  term2: '',
  term3: '',
};

const FeesEdit = () => {
  // navigate
  const navigate = useNavigate();
  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  // params
  const { Id } = useParams();

  const { admissiongrade, term1, term2, term3 } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null, // Clear the error for this input
    }));
    setFormValue({ ...formValue, ...{ [name]: value } });
  };

  const handleSubmit = async () => {
    try {
      let data = {
        admissiongrade: admissiongrade,
        term1: term1,
        term2: term2,
        term3: term3,
        Id: Id,
      };
      let { status, message, errors } = await feeUpdate(data);
      if (status === true) {
        setFormValue(initialFormValue);
        toastAlert('success', message);
        navigate('/feeslist');
      }
      if (status === false) {
        if (errors) {
          setErrors(errors);
          // Update the inputErrors state for each input with an error
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            admissiongrade: errors.admissiongrade,
            term1: errors.term1,
            term2: errors.term2,
            term3: errors.term3,
          }));
        }
        if (message) {
          toastAlert('error', message);
        }
      }
    } catch (err) {
      console.log(err, '...err');
    }
  };

  const getData = async (id) => {
    try {
      let { status, result } = await getSinglefees(id);
      if (status === true) {
        setFormValue(result);
        setData(result);
      }
    } catch (err) {
      console.log(err, '--err');
    }
  };

  useEffect(() => {
    getData(Id);
  }, [Id]);

  return (
    <>
      <div className="attendance">
        <AdminHeader />
        <div className="attendance-content">
          <AdminSidebar />
          <div className="att-sheet">
            <h2 className="dashboard-title">Edit Fees for Grade: {data.admissiongrade}</h2>

            <div className="class-details" style={{ width: "85%", borderRadius: "15px" }}>
              <form className="myform" action="" style={{ marginTop: "35px" }}>
                <div className="field-box">
                  <label htmlFor="">
                    Grade<sup>*</sup>
                  </label>
                  <select name="admissiongrade" value={admissiongrade} onChange={handleChange}>
                    <option>Select Grade</option>
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
                  <span className="text-error">{inputErrors.admissiongrade}</span>
                </div>
                <div className="field-box">
                  <label>Fee Amount - Term 1</label>
                  <input type="text" value={term1} name="term1" onChange={handleChange} />
                  <span className="text-error">{inputErrors.term1}</span>
                </div>
                <div className="field-box">
                  <label>Fee Amount - Term 2</label>
                  <input type="text" value={term2} name="term2" onChange={handleChange} />
                  <span className="text-error">{inputErrors.term2}</span>
                </div>
                <div className="field-box">
                  <label>Fee Amount - Term 3</label>
                  <input type="text" value={term3} name="term3" onChange={handleChange} />
                  <span className="text-error">{inputErrors.term3}</span>
                </div>
              </form>
            </div>

            <div className="sub-btnn">
              <div className="sub-btnn button">
                <button type="button" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeesEdit;

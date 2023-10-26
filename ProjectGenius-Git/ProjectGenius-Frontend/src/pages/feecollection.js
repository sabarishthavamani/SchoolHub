import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

//lib
import toastAlert from '../lib/toast';

//actions
import { feeCollection, viewFees } from '../actions/userAction';

const initialFormValue = {
  name: '',
  studentId: '',
  dueamount: '',
  paymentterm: [],
  grade:'',
  feeSetupData:'',
  

}
const options = [
  { label: 'Term 1', value: 'term1' },
  { label: 'Term 2', value: 'term2' },
  { label: 'Term 3', value: 'term3' },
];

const FeeCollection = () => {

  // hooks
  const navigate = useNavigate();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const[errors,setErrors] =useState({});
  const { name, studentId, dueamount, paymentterm, grade,  feeSetupData } = formValue;

 const fetchFeeSetupData = async () => {
    try {
      let {status,result} = await viewFees(); // Call the updated feeSetup API
      if (status === true) {
        console.log(result,'---result')
        setFormValue({ ...formValue, feeSetupData: result });
      } 
    } catch (error) {
      console.error(error);
      toastAlert('error', 'Failed to fetch fee setup data');
    }
  }

  useEffect(() => {
    // Fetch fee setup data from the API and store it in state
    fetchFeeSetupData();
  }, []);

  const handleSelectChange = (selectedOptions) => {
    // Extract the values from selectedOptions
    const selectedValues = selectedOptions.map(option => option.value);
  
    // Find the object that matches the selected grade
    const selectedGradeData = feeSetupData.find(gradeData => gradeData.grade === grade);
  
    if (selectedGradeData) {
      // Calculate the dueamount based on the selected terms and the selected grade's data
      let totalDueAmount = 0;
      selectedValues.forEach((term) => {
        if (selectedGradeData[term]) {
          totalDueAmount += selectedGradeData[term];
        }
      });
  
      console.log("Selected Values:", selectedValues);
      console.log("Total Due Amount:", totalDueAmount);
  
      setFormValue({ ...formValue, paymentterm: selectedValues, dueamount: totalDueAmount });
    }
  };
  

  const CustomOption = ({ children, innerProps, isSelected }) => (
    <div {...innerProps} className={isSelected ? 'option selected' : 'option'}>
      <input type="checkbox" readOnly checked={isSelected} />
      <span className="checkmark">{isSelected && '✔'}</span>
      {children}
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, ...{ [name]: value } })
  }
  const handleSubmit = async () => {
    try {

      let data = {
        name: name,
        studentId: studentId,
        dueamount: dueamount,
        paymentterm: paymentterm,
        grade:grade,
      }
      let { status, message, errors } = await feeCollection(data)
      if (status === true) {
        setFormValue(initialFormValue)
        toastAlert('success', message)
        setErrors({})
        navigate(`/feepay1/${name}`);            
      } else if (status === false) {
        if(errors) {
          setErrors(errors)
        }
        if (message) {
          toastAlert('error', message)
        }
      
      }

    } catch (err) {
      console.log(err, '...err')
    }
  }
  
  return (
    <div className="fee-collection">
      <Sidebar />
      <div className="fee-content">
        <Navbar pageTitle={'Fee Collection'} />
        <div className="fee-form">
          <div className="fee-form-header">
            <span>Student Fee Collection</span>
          </div>
          <form action="" className="fee">
            <div className="fee-form-content">
              <div className="fee-left">
                <div className="fee-box">
                  <label>
                    Name<sup>*</sup>
                  </label>
                  <input type="text" name="name" value={name} onChange={handleChange} />
                  <span className='text-error'>{errors.name}</span>
                </div>
                <div className="fee-box">
                  <label htmlFor="">
                    Grade<sup>*</sup>
                  </label>
                  <select name="grade" value={grade} onChange={handleChange}>
                    <option >Select Grade</option>
                    <option >Preschool</option>
                    <option >LKG</option>
                    <option >UKG</option>
                    <option >Class 1</option>
                    <option >Class 2</option>
                    <option >Class 3</option>
                    <option >Class 4</option>
                    <option >Class 5</option>
                    <option >Class 6</option>
                    <option >Class 7</option>
                    <option >Class 8</option>
                    <option >Class 9</option>
                    <option >Class 10</option>
                    <option >Class 11</option>
                    <option >Class 12</option>
                  </select>
                  <span className='text-error'>{errors.grade}</span>
                </div>
                <div className="fee-box">
                  <label>Due Amount</label>
                  <input type="text" name="dueamount" value={dueamount} onChange={handleChange} />
                </div>
              </div>
              <div className="fee-right">
                <div className="fee-box">
                  <label>Student ID</label>
                  <input type="text" name="studentId" value={studentId} onChange={handleChange} />
                  <span className='text-error'>{errors.studentId}</span>
                </div>
                <div className="fee-box">
        <label>Payment Term</label>
        <Select
          options={options}
          value={options.filter(option => paymentterm.includes(option.value))}
          onChange={handleSelectChange}
          isMulti
          closeMenuOnSelect={false}
          components={{
            Option: CustomOption,
          }}
        />
                  <span className='text-error'>{errors.paymentterm}</span>
      </div>
              </div>
            </div>
            <div className="process-btn">
              <button type="button"  onClick={handleSubmit}>Process to Pay</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeeCollection;
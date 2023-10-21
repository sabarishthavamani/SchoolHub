import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

//lib
import toastAlert from '../lib/toast';

//actions
import { feeSetup } from '../actions/userAction';

const initialFormValue = {
  name: '',
  studentId: '',
  feeconcession: '',
  dueamount: '',
  paymentterm: '',
  amountpayable: '',
  feeconcession: '',

}
const options = [
  { label: 'Term 1', value: 'Term1' },
  { label: 'Term 2', value: 'Term2' },
  { label: 'Term 3', value: 'Term3' },
];

const FeeCollection = () => {

  // hooks
  const navigate = useNavigate();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { name, studentId, dueamount, paymentterm, amountpayable, feeconcession } = formValue;

  const handleSelectChange = (selectedOptions) => {
    setFormValue({ ...formValue, paymentterm: selectedOptions });
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
        amountpayable: amountpayable,
        feeconcession: feeconcession,
      }
      let { status, message } = await feeSetup(data)
      if (status === true) {
        setFormValue(initialFormValue)
        toastAlert('success', message)
        // navigate('/feecollection')              
      } else if (status === false) {
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
                </div>
                <div className="fee-box">
                  <label>Due Amount</label>
                  <input type="text" name="dueamount" value={dueamount} onChange={handleChange} />
                </div>
                <div className="fee-box">
                  <label>Payment Term</label>
                  <Select
            options={options}
            value={formValue.paymentterm}
            onChange={handleSelectChange}
            isMulti
            closeMenuOnSelect={false}
            components={{
              Option: CustomOption,
            }}
          />
                </div>
              </div>
              <div className="fee-right">
                <div className="fee-box">
                  <label>Student ID</label>
                  <input type="text" name="studentId" value={studentId} onChange={handleChange} />
                </div>
                <div className="fee-box">
                  <label>
                    Fee Concession<sup>*</sup>
                  </label>
                  <input type="text" name="feeconcession" value={feeconcession} onChange={handleChange} />
                </div>
                <div className="fee-box">
                  <label>Amount Payable</label>
                  <input type="text" name="amountpayable" value={amountpayable} onChange={handleChange} />
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
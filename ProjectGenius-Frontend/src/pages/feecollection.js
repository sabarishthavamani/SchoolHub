import React, { useState } from 'react';
import Select from 'react-select';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

const options = [
    { label: 'Term 1', value: 'Term1' },
    { label: 'Term 2', value: 'Term2' },
    { label: 'Term 3', value: 'Term3' },
  ];

const FeeCollection = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selectedValues) => {
      setSelectedOptions(selectedValues);
    };
    const CustomOption = ({ children, innerProps, isSelected }) => (
        <div {...innerProps} className={isSelected ? 'option selected' : 'option'}>
          <input type="checkbox" readOnly checked={isSelected} />
          <span className="checkmark">{isSelected && '✔'}</span>
          {children}
        </div>
      );
return(
<div className="fee-collection">
  <Sidebar/>
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
              <input type="text" name="" />
            </div>
            <div className="fee-box">
              <label>Due Amount</label>
              <input type="text" name="" />
              </div>
            <div className="fee-box">
              <label>Payment Term</label>
              <Select
      options={options}
      value={selectedOptions}
      onChange={handleChange}
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
              <input type="text" name="" />
            </div>
            <div className="fee-box">
              <label>
                Fee Concession<sup>*</sup>
              </label>
              <input type="text" name="" />
            </div>
            <div className="fee-box">
              <label>Amount Payable</label>
              <input type="text" name="" />
            </div>
          </div>
        </div>
        <div className="process-btn">
          <button type="submit">Process to Pay</button>
        </div>
      </form>
    </div>
  </div>
</div>
)
}

export default FeeCollection;
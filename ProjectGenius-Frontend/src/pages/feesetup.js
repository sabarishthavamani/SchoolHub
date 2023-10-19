import React from 'react'
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';


const FeeSetup = () => {
    return(
        <div className="fee-collection">
  <Sidebar />
  <div className="fee-content">
  <Navbar pageTitle={'Fee Setup'} />
    <div className="fee-setup">
      <div className="fee-setup-header">
        <span>Student Fee Setup</span>
      </div>
      <form action="" className="setup-form">
        <div className="setup-content">
          <div className="setup-left">
            <div className="setup-box">
              <label htmlFor="">
                Grade<sup>*</sup>
              </label>
              <select name="" id="">
                <option value="">Select Grade</option>
                <option value="">Preschool</option>
                <option value="">LKG</option>
                <option value="">UKG</option>
                <option value="">Class 1</option>
                <option value="">Class 2</option>
                <option value="">Class 3</option>
                <option value="">Class 4</option>
                <option value="">Class 5</option>
                <option value="">Class 6</option>
                <option value="">Class 7</option>
                <option value="">Class 8</option>
                <option value="">Class 9</option>
                <option value="">Class 10</option>
                <option value="">Class 11</option>
                <option value="">Class 12</option>
              </select>
            </div>
          </div>
          <div className="setup-right">
            <div className="setup-box">
              <label>Fee Amount - Term 1</label>
              <input type="text" />
            </div>
            <div className="setup-box">
              <label>Fee Amount - Term 2</label>
              <input type="text" />
            </div>
            <div className="setup-box">
              <label>Fee Amount - Term 3</label>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className="save-changes">
          <button>Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</div>

    )
}

export default FeeSetup;
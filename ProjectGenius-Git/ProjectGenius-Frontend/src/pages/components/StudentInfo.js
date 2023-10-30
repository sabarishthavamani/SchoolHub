import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const StudentInfo = (props) => {
    const {studentDetails, toggleStudentInfo,IMAGE_URL} = props
    const {name, contactNumber, email, permanentaddress, photo} = studentDetails
    return(
        <>
        <div className="student-right">
        <button className='close-btn' onClick={() => toggleStudentInfo(false)}><FontAwesomeIcon icon={faXmark} /></button>
        <div className="std-personal-info" id="information">
          <div className="std-image">
         <img src={`${IMAGE_URL}/${photo}`} alt="" width={'70px'}/>
          </div>
          <div className="std-name">
            <span>{name}</span>
          </div>
          <div className="std-history">
            <div className="adrs">
              <i className="fa fa-envelope-o" />
              <span>{email}</span>
            </div>
            <div className="adrs">
              <i className="fa fa-phone" />
              <span>(+91){contactNumber}</span>
            </div>
            <div className="adrs">
              <i className="fa fa-address-card-o" />
              <span>{permanentaddress}</span>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default StudentInfo
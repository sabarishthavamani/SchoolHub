import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

//actions
import { viewFees } from '../actions/userAction';

const FeesList = () =>{
//state
const [data,setData] = useState();

//navigate
const navigate = useNavigate()

const getData = async () => {
    try {
      let { status, result } = await viewFees();
      if (status === true) {
        setData(result)
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  },[]);

  //navigate to fees edit
  const editFees = (id) => {
    navigate('/fees-edit/' + id)
  }
  return (
    <div className="teacher">
   <Sidebar />
    <div className="teacher-content" style={{ background: "#f7f7f8" }}>
      <div className="header">
        <div className="l-header">
          <p>Fees List</p>
        </div>
        <div className="middle-header-right" style={{ width: 600 }}>
          <input type="search" />
          <img src="images/filter.png" />
        </div>
      </div>
      <div className="tchr-table" >
        <table className="tchr-info">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Term1</th>
              <th>Term2</th>
              <th>Term3</th>
              <th>Updated Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {data && data.length > 0 && data.map((item,key)=>{
                    return(
                        <tr className="tchr-row" >
               
                        <td className="profile">
                        {item.admissiongrade}
                        </td>
                        <td>{item.term1}</td>
                        <td>
                         {item.term2}
                        </td>
                        <td>
                         {item.term3}
                        </td>
                        <td>{item.updateddate}</td>
                        <td className="edit" id="ed">
                                  <div className="dropdown">
                                    <FontAwesomeIcon icon={faEllipsis} className="dropdown-toggle" data-bs-toggle="dropdown" />
                                    <ul className="dropdown-menu" style={{ background: "#fafafa" }}>
                                      <li className="edit-box">
                                        <a className="dropdown-item" href="#" style={{ color: "blue" }}  onClick={() => editFees(item._id)} >
                                          <i className="fa fa-pencil" style={{ color: "blue" }} />
                                          Edit
                                        </a>
                                      </li>
                                      <li className="edit-box">
                                        <a className="dropdown-item" href="#" >
                                          <i className="fa fa-tags" />
                                          More
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" style={{ color: "red" }} >
                                            <i
                                              className="fa fa-trash-o"
                                              style={{ color: "red", marginRight: 10 }}
                                            />
                                            Clear
                                          </a>
                                      </li  >
                                    </ul>
                                  </div>
                                </td>
                      </tr>
                    )
                })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  )
}

export default FeesList
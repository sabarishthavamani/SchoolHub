import React, { useEffect, useState } from "react";

import { getAllVehicle } from "../actions/adminAction";
import Sidebar from "./components/sidebar";

import { useNavigate , useParams} from "react-router-dom";

//react confirm pop-up package
import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";

import { deleteVehicleDetail } from "../actions/adminAction";

import toastAlert from "../lib/toast";

//fontawesome pacakage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faMoneyCheck,
  faSchool,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

const VehicleList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loaderView, setLoaderView] = useState(true);

  const getData = async () => {
    try {
      let { status, result } = await getAllVehicle();

      if (status) {
        const vehicleData = await result.filter(
          (each) =>
            each.active === 1
        );
        setLoaderView(false);
        setData(vehicleData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const editVehicle = async (Id) => {
    navigate(`/vehicle-edit/${Id}`);
  };

  const deleteVehicle = async (Id) => {
    try {
      let { status, message } = await deleteVehicleDetail(Id);
      if (status === true) {
        toastAlert("success", message);
        getData();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };

  //confirmation pop-up box
  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    // action
    if (action) {
      deleteVehicle(Id);
    }
  };

  const routeAllocation = (Id) => {
    navigate(`/route-allocate/${Id}`)
  }

  const renderUserView = () => {
    if (loaderView) {
      return (
        <div className="loader-view-container">
          <div class="spinner-box">
            <div class="pulse-container">
              <div class="pulse-bubble pulse-bubble-1"></div>
              <div class="pulse-bubble pulse-bubble-2"></div>
              <div class="pulse-bubble pulse-bubble-3"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="std-table">
          <table className="std-info">
            <thead>
              <tr>
                <th>S.No</th>
                <th>vehicle No</th>
                <th>Vehicle Type</th>
                <th>Register Number</th>
                <th>Manufacturer</th>
                <th>Status</th>
                <th>Route</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, key) => {
                  return (
                    <tr className="std-row" key={key}>
                      <td>{key + 1}</td>
                      <td>{item.vehicleNumber}</td>
                      <td>{item.vehicleType}</td>
                      <td>{item.vehicleRegisterNumber.toUpperCase()}</td>
                      <td>{item.manufacturer.toUpperCase()}</td>
                      <td>{item.status}</td>
                      <td>{item.vehicleRoute}</td>
                      <td className="edit" id="ed">
                        <div className="dropdown">
                          <FontAwesomeIcon
                            icon={faEllipsis}
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                          />
                          <ul
                            className="dropdown-menu"
                            style={{ background: "#fafafa", padding: "0" }}
                          >
                            <li className="edit-box">
                              <a
                                className="dropdown-item"
                                href="#"
                                style={{ color: "blue" }}
                                onClick={() => editVehicle(item._id)}
                              >
                                <i
                                  className="fa fa-pencil"
                                  style={{ color: "blue" }}
                                />
                                Edit
                              </a>
                            </li>
                            <li className="edit-box">
                              <Button
                                className="pop-up-button"
                                onClick={() => openBasic(item._id)}
                              >
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  style={{ color: "red" }}
                                >
                                  <i
                                    className="fa fa-trash-o"
                                    style={{ color: "red", marginRight: 10 }}
                                  />
                                  Clear
                                </a>
                              </Button>
                            </li>
                            <li className="edit-box">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => routeAllocation(item._id)}
                                style={{ color: "revert-layer" }}
                              >
                                <FontAwesomeIcon
                                  icon={faSchool}
                                  style={{
                                    color: "revert-layer",
                                    marginRight: "5px",
                                  }}
                                />
                                Rout Allocate
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Vehicle Details</p>
          </div>
          <div className="middle-header-right">
            <input
              type="search"
              placeholder="search"
              //   onChange={handleSearchInput}
              //   value={userSearchInput}
            />
          </div>
        </div>
        {renderUserView()}
      </div>
      {/* {showDriverInfo && (
            <DriverInfo
              IMAGE_URL={IMAGE_URL}
              driverDetails={clickedDriverDetails}
              toggleDriverInfo={toggleDriverInfo}
            />
          )} */}
    </div>
  );
};

export default VehicleList;

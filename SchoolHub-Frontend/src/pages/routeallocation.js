import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

//react confirm pop-up package
import "react-alert-confirm/lib/style.css";
import AlertConfirm from "react-alert-confirm";

import { IoTrash } from "react-icons/io5";

import toastAlert from "../lib/toast";

import {
  getSingleVehicle,
  vehicleAllocate,
  getVehicleRouteData,
  updateVehicleRouteData,
} from "../actions/adminAction";

const initialState = {
  vehicleNumber: "",
  vehicleRegisterNumber: "",
  busStartingPoint: "",
  busStartingTime: "",
  busStops: [],
};

const RouteAllocation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { Id } = params;

  const [routeData, setRouteData] = useState(initialState);
  const [vehicleData, setVehicleData] = useState("");
  const [updateRouteData, setUpdateRouteData] = useState(false);

  const getVehicleData = async (Id) => {
    try {
      let { status, result } = await getSingleVehicle(Id);
      if (status === true) {
        setVehicleData(result);
        setRouteData((prev) => ({
          ...prev,
          vehicleNumber: result.vehicleNumber,
          vehicleRegisterNumber: result.vehicleRegisterNumber,
          busStartingPoint: result.vehicleRoute,
          busStartingTime: result.busStartingTime
        }));

        // Call getVehicleRoute here, after vehicleData is set
        await fetchVehicleRoute(result.vehicleNumber);
      } else if (status === false) {
        navigate("/vehicleview");
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };

  const fetchVehicleRoute = async (vehicleNumber) => {
    try {
      let { status, result } = await getVehicleRouteData({
        vehicleNumber: vehicleNumber,
      });
      if (status === true) {
        setRouteData((prev) => ({
          ...prev,
          busStartingTime: result.busStartingTime,
          busStops: [...result.busStops]
        }));
        setUpdateRouteData(true);
      } else if (status === false) {
        setUpdateRouteData(false);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };

  useEffect(() => {
    getVehicleData(Id);
  }, [Id]);

  const handleBusStartingTime = (event) => {
    const { value } = event.target;

    setRouteData((prev) => ({
      ...prev,
      busStartingTime: value,
    }));
  };

  const addStop = () => {
    setRouteData((prev) => {
      return {
        ...prev,
        busStops: [
          ...prev.busStops,
          {
            id: uuid(),
            stop: "",
            timing: "",
          },
        ],
      };
    });
  };

  const handleClearAll = () => {
    setRouteData((prev) => {
      return {
        ...prev,
        busStops: [],
      };
    });
  };

  const openBasic = async () => {
    const [action] = await AlertConfirm(
      "Are you sure, you want to clear all the stops"
    );
    // action
    if (action) {
      handleClearAll();
    }
  };

  const handleAddStop = (event, id) => {
    setRouteData((prev) => {
      return {
        ...prev,
        busStops: prev.busStops.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              stop: event.target.value,
            };
          } else {
            return item;
          }
        }),
      };
    });
  };

  const handleTimingChange = (event, id) => {
    const { value } = event.target;
    setRouteData((prev) => ({
      ...prev,
      busStops: prev.busStops.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            timing: value,
          };
        } else {
          return item;
        }
      }),
    }));
  };

  const handleRemoveStop = (id) => {
    setRouteData((prev) => ({
      ...prev,
      busStops: prev.busStops.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = async () => {
    const checkStopFields = routeData.busStops.every(
      (item) => item.stop !== "" && item.timing !== ""
    );
    if (!(routeData.busStartingTime && checkStopFields)) {
      return toastAlert("error", "Fill all the required field");
    }
    if (!updateRouteData) {
      try {
        let { status, message } = await vehicleAllocate(routeData);
        if (status === true) {
          setRouteData({});
          setVehicleData({});
          toastAlert("success", message);
          navigate(`/vehicleview`);
        }
      } catch (err) {
        console.log(err, "...err");
      }
    } else {
      try {
        let { status, message } = await updateVehicleRouteData(routeData);
        if (status === true) {
          setRouteData({});
          setVehicleData({});
          setUpdateRouteData(false);
          toastAlert("success", message);
          navigate(`/vehicleview`);
        }
      } catch (err) {
        console.log(err, "...err");
      }
    }
  };

  return (
    <div className="fee-collection">
      <Sidebar />
      <div className="fee-content">
        <Navbar pageTitle={"Route Allocation"} />
        <div className="fee-setup">
          <div className="fee-setup-header">
            <span>Route Allocation</span>
          </div>
          <div className="route-allocate-container">
            <form className="route-allocate-form">
              <div className="route-allocate-part-one">
                <div className="route-allocate-input">
                  <label htmlFor="vehicleNumber">
                    Vehicle Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    id="vehicleNumber"
                    value={routeData.vehicleNumber}
                    readOnly
                  />
                </div>
                <div className="route-allocate-input">
                  <label htmlFor="vehicleRegistrationNumber">
                    Vehicle Register Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="vehicleRegistrationNumber"
                    id="vehicleRegistrationNumber"
                    value={routeData.vehicleRegisterNumber.toUpperCase()}
                    readOnly
                  />
                </div>
              </div>
              <div className="route-allocate-part-two">
                <div className="route-allocate-part-two-sections">
                  <div className="route-allocate-input">
                    <label htmlFor="busStartingPoint">
                      Bus Starting Point<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="busStartingPoint"
                      id="busStartingPoint"
                      value={routeData.busStartingPoint}
                      readOnly
                    />
                  </div>
                  <div className="route-allocate-input">
                    <label htmlFor="busStartingTime">
                      Bus Starting Time<sup>*</sup>
                    </label>
                    <input
                      type="time"
                      name="busStartingTime"
                      id="busStartingTime"
                      value={routeData.busStartingTime}
                      onChange={(e) => handleBusStartingTime(e)}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="add-route-allocate-control">
              <button
                type="button"
                className="btn btn-success rounded-pill"
                onClick={addStop}
              >
                Add Stop
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill"
                onClick={openBasic}
              >
                Clear All
              </button>
            </div>
            <div className="stop-allocate-sections">
              {routeData.busStops.map((item, index) => {
                return (
                  <div className="stop-allocate-inputs" key={index}>
                    <div className="route-allocate-input">
                      <div className="d-flex align-items-center">
                        <label htmlFor={`stop${index + 1}`}>
                          {`Bus Stop ${index + 1}`}
                          <sup>*</sup>
                          <span
                            className="text-danger ms-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveStop(item.id)}
                          >
                            <IoTrash size={20} />
                          </span>
                        </label>
                      </div>
                      <input
                        name={`stop${index + 1}`}
                        id={`stop1${index + 1}`}
                        value={item.stop}
                        onChange={(event) => handleAddStop(event, item.id)}
                      />
                    </div>
                    <div className="driver-allocate-input">
                      <label htmlFor={`timing${index + 1}`}>
                        {`Stop ${index + 1} Timing`}
                        <sup>*</sup>
                      </label>
                      <input
                        type="time"
                        name={`timing${index + 1}`}
                        id={`timing${index + 1}`}
                        value={item.timing}
                        onChange={(event) => handleTimingChange(event, item.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="teacher-allocation-btn">
            <button
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteAllocation;

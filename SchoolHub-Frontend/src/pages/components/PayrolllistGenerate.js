// import React, { useEffect, useState } from "react";
// import Sidebar from "./components/sidebar";
// // import Payrollfilter from "./components/payrollFilter";
// import {
//   leaveDisplay,
//   payrollsalary,
//   salaryformUpdate,
//   viewDriver,
//   viewTeacher,
// } from "../actions/adminAction";
// import axios from "axios";
// import toastAlert from "../lib/toast";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import {
//   PDFDownloadLink,
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
// } from "@react-pdf/renderer";
// // import generatePDF from "../pages/payslipPdf";
// import DownloadIcon from "@mui/icons-material/Download";
// import { Leavelistmonth } from "../../actions/adminAction";

// const PayrolllistGenerate = () => {
//   const [loaderView, setLoaderView] = useState(true);
//   const [data, setData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [isMonthInDatabase, setIsMonthInDatabase] = useState(false);
//   const navigator = useNavigate();
//   const [submitDisable, setsubmitDisable] = useState(false);
//   const [formValue, setFormValue] = useState({
//     leaveType: "All",
//     month: "",
//   });
//   const catagoryhandleSubmit = async () => {
//     const { leaveType, month } = formValue;
//     if (formValue) {
//       setLoaderView(true);
//       setSelectedCategory(formValue);
//       setSelectedMonth(month);
//       setsubmitDisable(true);
//       getData();
//     }
//   };

//   const goback = () => {
//     navigator("/payrollList");
//   };
//   const [dataFromDatabase, setDataFromDatabase] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (formValue.month !== "") {
//           const response = await salaryformUpdate(formValue, formValue.month);
//           setDataFromDatabase(response);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [formValue.month]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValue({ ...formValue, [name]: value });
//   };

//   const fetchTeacherAndDriverData = async () => {
//     try {
//       const [teacherData, leaveData, driverData] = await Promise.all([
//         viewTeacher(),
//         Leavelistmonth(),
//         viewDriver(),
//       ]);

//       if (teacherData.status && leaveData.status && driverData.status) {
//         const totalDaysMap = {};

//         const filteredLeaves = leaveData.result.filter((leaveItem) => {
//           let totalDays = leaveItem.leaveDates.length; 
//           leaveItem.leaveDates.forEach((leaveDateObj) => {
//             const leaveDate = new Date(leaveDateObj.date);
//             if (leaveDate.getMonth() === parseInt(selectedMonth) - 1) {
//               totalDays++;
//             }
//           });
//           leaveItem.numofDays = totalDays.toString();
//           return true;
//         });
        
//         filteredLeaves.forEach((leaveItem) => {
//           if (leaveItem.approval === "Accept" && leaveItem.leaveType === "LOP") {
//             totalDaysMap[leaveItem.employeeId] =
//               (totalDaysMap[leaveItem.employeeId] || 0) +
//               parseInt(leaveItem.numofDays);
//           }
//         });
        

//         const totaldaysformonth = 30;

//         const teacherResult = teacherData.result.map((teacherItem) => {
//           const totalworkingdays =
//             totaldaysformonth - (totalDaysMap[teacherItem.teacherId] || 0);
//           const salarycalculation = teacherItem.grossSalary / totaldaysformonth;
//           const netsalary = salarycalculation * (totalworkingdays || 0);
//           const Netsalary = Math.round(netsalary / 10) * 10;
//           const selectedYear = selectedMonth ? new Date().getFullYear() : "";

//           return {
//             category: "Teacher",
//             employeeId: teacherItem.teacherId,
//             name: teacherItem.name,
//             currentSalary: teacherItem.currentsalary,
//             grossSalary: teacherItem.grossSalary,
//             numofDays: totalDaysMap[teacherItem.teacherId] || 0,
//             totalworkingdays,
//             totaldaysformonth,
//             Netsalary,
//             month: selectedMonth,
//             year: selectedYear,
//           };
//         });

//         const driverResult = driverData.result.map((driverItem) => {
//           const totalworkingdays =
//             totaldaysformonth - (totalDaysMap[driverItem.driverId] || 0);
//           const salarycalculation = driverItem.grossSalary / totaldaysformonth;
//           const netsalary = salarycalculation * (totalworkingdays || 0);
//           const Netsalary = Math.round(netsalary / 10) * 10;
//           const selectedYear = selectedMonth ? new Date().getFullYear() : "";

//           return {
//             category: "Driver",
//             employeeId: driverItem.driverId,
//             name: driverItem.name,
//             currentSalary: driverItem.currentsalary,
//             grossSalary: driverItem.grossSalary,
//             numofDays: totalDaysMap[driverItem.driverId] || 0,
//             totalworkingdays,
//             totaldaysformonth,
//             Netsalary,
//             month: selectedMonth,
//             year: selectedYear,
//           };
//         });

//         return [...teacherResult, ...driverResult];
//       } else {
//         return [];
//       }
//     } catch (error) {
//       console.error(
//         "Error occurred while fetching teacher and driver data:",
//         error
//       );
//       return [];
//     }
//   };

//   const getData = async () => {
//     try {
//       if (selectedMonth) {
//         let result = [];

//         result = await fetchTeacherAndDriverData();

//         setLoaderView(false);
//         setData(result);
//       }
//     } catch (error) {
//       console.error("Error occurred while fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [selectedMonth]);

//   const Close = () => {
//     window.location.reload();
//     setData([]);
//     setsubmitDisable(false);
//   };

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const getMonthName = (monthNumber) => {
//     return monthNames[monthNumber - 1];
//   };

//   const handleSubmit = async () => {
//     try {
//       const EmployeePaySlip = data.map((item) => ({
//         ...item,
//         month: getMonthName(item.month),
//       }));

//       const response = await payrollsalary({ EmployeePaySlip });

//       if (response && response.status === true) {
//         toastAlert("success", response.message);
//         // window.location.reload();
//         navigator("/payrollList");
//       } else {
//         toastAlert("error", response.message || "Failed to save payroll data.");
//       }
//     } catch (error) {
//       console.error("Error occurred while saving payroll data:", error);
//       toastAlert(
//         "error",
//         "Failed to save payroll data. Please try again later."
//       );
//     }
//   };

//   const renderUserView = () => {
//     const isMonthSelected = selectedMonth !== null;
//     const renderButtons = isMonthSelected;

//     return (
//       <>
//         <div className="std-table">
//           {/* {renderButtons && ( */}
//           <table className="std-info">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Month</th>
//                 <th>Current Salary</th>
//                 <th>Gross Salary</th>
//                 <th>Total N.O.D</th>
//                 <th>Working Days</th>
//                 <th>L.O.P</th>
//                 <th>Net Salary</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr className="std-row" key={index}>
//                   <td>{index + 1}</td>
//                   <td>{item.employeeId}</td>
//                   <td>{item.name}</td>
//                   <td>{`${getMonthName(item.month)} ${item.year}`}</td>
//                   <td>{item.currentSalary}</td>
//                   <td>{item.grossSalary}</td>
//                   <td>{item.totaldaysformonth}</td>
//                   <td>{item.totalworkingdays}</td>
//                   <td>{item.numofDays}</td>
//                   <td>{item.Netsalary || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//             {renderButtons && (
//               <thead>
//                 <tr>
//                   <th>
//                     <button
//                       style={{ textAlign: "right" }}
//                       className="tchr-month-att-btn"
//                       onClick={handleSubmit}
//                     >
//                       Submit
//                     </button>
//                   </th>
//                   <th></th>
//                   <th>
//                     <button
//                       style={{ textAlign: "left" }}
//                       className="tchr-month-att-btn"
//                       onClick={Close}
//                     >
//                       Close
//                     </button>
//                   </th>
//                 </tr>
//               </thead>
//             )}
//           </table>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="student-container">
//       <Sidebar />
//       <div className="middle-content">
//         <div className="middle-header">
//           <div className="l-header">
//             <p>Generate Pay-Slip</p>
//           </div>
//           <div className="middle-header-right">
//             <select
//               name="month"
//               value={formValue.month}
//               onChange={handleChange}
//               disabled={submitDisable}
              
//             >
//               <option value="">Select Month</option>
//               {monthNames.map((month, index) => (
//                 <option key={index} value={index + 1}>
//                   {month}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {formValue.month && (
//             <button
//               type="submit"
//               className="tchr-month-att-btn"
//               onClick={catagoryhandleSubmit}
//               disabled={submitDisable}
//             >
//               Filter
//             </button>
//           )}
//           {!formValue.month && (
//             <button
//               type="submit"
//               className="tchr-month-att-btn"
//               onClick={goback}
//             >
//               Go-Back
//             </button>
//           )}

//           <div className="middle-header-right">
//             <input type="search" placeholder="search" />
//           </div>
//         </div>
//         {renderUserView()}
//       </div>
//     </div>
//   );
// };

// export default PayrolllistGenerate;

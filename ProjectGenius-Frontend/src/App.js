import { BrowserRouter, Routes, Route } from 'react-router-dom'

//context-provider
import { MenuContextProvider } from './context/teachermenucontext';

//import CondionRoute
import ConditionRoute from './Routes/conditionroute';

//import pages
import Login from './pages/login';
import Verify from './pages/passcodeverify';
import NewAdmission from './pages/studentadmission';
import Students from './pages/studentlist';
import StudentEdit from './pages/studentedit';
import FeeCollection from './pages/feecollection';
import FeeComplete from './pages/feesuccession';
import FeeSetup from './pages/feesetup';
import Teacher from './pages/teacheradmission';
import TeacherList from './pages/teacherlist';
import TeacherEdit from './pages/teacheredit';
import TeacherDetail from './pages/teacherdetail';
import TimeTable from './pages/teachertimetable';
import FeePayment from './pages/feepayment';
import PaymentFailure from './pages/paymentfailure';
import FeesList from './pages/feeslist';
import FeesEdit from './pages/feesedit';
import TeacherLogin from './pages/teacherlogin';
import StudentAttendance from './pages/studentattendance';
import StudentMarksheet from './pages/studentmarksheet';
import TeacherSignup from './pages/teachersignup';
import Home from './pages/home';
import SectionAllocation from './pages/sectionallocate';
import Page404 from './pages/404';
import StudentLogin from './pages/studentlogin';
import StudentSignup from './pages/studentsignup';
import ParentSignup from './pages/parentsignup';
import TeacherSchedule from './pages/teacherschedule';
import TeacherDashboard from './pages/teacherdashboard';
import StudentDashboard from './pages/studentdashboard';
import MultiSectionAllocation from './pages/multisectionallocation';
import TeacherAllocation from './pages/teacherallocation';
import GenerateReport from './pages/studentmarksheetgenerate';
import TeacherChangepassword from './pages/teacherchangepassword';
import TeacherForgetpassword from './pages/teacherforgetpassword';
import TeacherResetpassword from './pages/teacherresetpassword';
import ParentHomepage from './pages/parenthomepage';
import Driver from './pages/driveradmission';
import DriverList from './pages/driverlist';
import ProfileDetails from './pages/profileDetails';
import BusDetails from './pages/busdetails';
import BusSchedule from './pages/busschedule';
import BusAttendance from './pages/busattendance'
import BusTracking from './pages/bustracking';
import VehicleAdmission from './pages/vehicleadmission';
import VehicleList from './pages/vehiclelist';
import VehicleEdit from './pages/vehicleedit';
import DriverEdit from './pages/driveredit';
import RouteAllocation from './pages/routeallocation';
import LeaveForm from './pages/components/leaveForm';
import LeaveDetails from './pages/components/leaveDetails';
import LeaveSchedule from './pages/leaveschedule';
import PayrollForm from './pages/components/payrollForm';
import LeaveApproval from './pages/leaveApproval';
import Teacherleaveappliedlist from './pages/components/teacherleaveAppliedlist';
import EmployeeleaveEdit from './pages/employeeleaveEdit';
import Payrollfilter from './pages/components/payrollFilter';
import BusAllocate from './pages/busallocate';
import BusAllocateList from './pages/busallocationlist';
import PayrollList from './pages/payrollList';
import StudentResetpassword from './pages/studentrestpassword';
import StudentForgetpassword from './pages/studentforgetpassword';
import StudentChangepassword from './pages/studentchangepassword';
import StudentMarksheetList from './pages/singlemarklist';
import StudentTimeTable from './pages/timetable';
import PunchingForm from './pages/punchingform';
import AssignHomework from './pages/assignhomework';
import StudentHomeWork from './pages/studenthomework';
import ParentLogin from './pages/parentlogin';
import DriverSignup from './pages/driversignup';
import DriverLogin from './pages/driverlogin';
import DriverDashboard from './pages/driverdashboard';
import PayrolllistGenerate from './pages/PayrolllistGenerate';
import BusAttendanceSheet from './pages/busattendancesheet';
// import Attendancedriver from './pages/components/attendance.driver';
import LeaveFormdriver from './pages/components/atendance.driver';
import AttendanceDriver from './pages/components/atendance.driver';
import Adminnotificationfrom from './pages/components/adminnotificationfrom';
import Adminnotificationlist from './pages/components/adminnotificationlist';
import AdminnotificationUpdate from './pages/components/adminnotificationUpdate';
import EmployeeAttendanceGenerate from './pages/employeeattendancegenerate';
import EmployeeAttendance from './pages/employeeattendance';


import HomeworkScheduler from './pages/homeworkscheduler';
import ParentsMeeting from './pages/parents-meeting';
import MeetingScheduler from './pages/meetingscheduler';
import ParentMarksheetList from './pages/viewmarksheetforparent';
import AllMeetingList from './pages/allmeetinglist';
import ProfileDetailsDriver from './pages/profileDetailsDriver';
import Driverleaveappliedlist from './pages/components/driverleaveappliedlist';
import Employeepayroll from './pages/components/employeepayroll';
import AdminBoard from './pages/components/Adminboard';
import Newpage from './pages/newpage';
import Newpageform from './pages/newpageform';

function App() {
  return (
    <MenuContextProvider>
    <div className="App">
      {/* Routes */}
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<ConditionRoute type="public"><Home /></ConditionRoute>} />
          <Route path="/home" element={<ConditionRoute type="public"><Home /></ConditionRoute>} />
          <Route path="/login" element={<ConditionRoute type="public"><Login /></ConditionRoute>} />
          <Route path="/verify" element={<ConditionRoute type="public"><Verify /></ConditionRoute>} />
          <Route path="/newadmission" element={<ConditionRoute type="public"><NewAdmission /></ConditionRoute>} />
          <Route path="/students" element={<ConditionRoute type="public"><Students /></ConditionRoute>} />
          <Route path="/student-edit/:Id" element={<ConditionRoute type="public"><StudentEdit /></ConditionRoute>} />
          <Route path="/feecollection/:Id" element={<ConditionRoute type="public"><FeeCollection /></ConditionRoute>} />
          <Route path="/feepayment/:name" element={<ConditionRoute type="public"><FeePayment /></ConditionRoute>} />
          <Route path="/feecomplete" element={<ConditionRoute type="public"><FeeComplete /></ConditionRoute>} />
          <Route path="/feesetup" element={<ConditionRoute type="public"><FeeSetup /></ConditionRoute>} />
          <Route path="/teacher" element={<ConditionRoute type="public"><Teacher /></ConditionRoute>} />
          <Route path="/teacherview" element={<ConditionRoute type="public"><TeacherList /></ConditionRoute>} />
          <Route path="/teacher-edit/:Id" element={<ConditionRoute type="public"><TeacherEdit /></ConditionRoute>} />
          <Route path="/teacherdetails/:Id" element={<ConditionRoute type="public"><TeacherDetail /></ConditionRoute>} />
          <Route path="/teacherschedule/:Id" element={<ConditionRoute type="public"><TeacherSchedule /></ConditionRoute>} />
          <Route path="/student-timetable/:id" element={<ConditionRoute type="public"><StudentTimeTable /></ConditionRoute>} />
          <Route path="/teachertimetable/:teacherId" element={<ConditionRoute type="public"><TimeTable /></ConditionRoute>} />
          <Route path="/paymentfailure" element={<ConditionRoute type="public"><PaymentFailure /></ConditionRoute>} />
          <Route path="/feeslist" element={<ConditionRoute type="public"><FeesList /></ConditionRoute>} />
          <Route path="/fees-edit/:Id" element={<ConditionRoute type="public"><FeesEdit /></ConditionRoute>} />
          <Route path="/sectionallocate/:Id" element={<ConditionRoute type="public"><SectionAllocation /></ConditionRoute>} />
          <Route path="/teacher-allocate/:Id" element={<ConditionRoute type="public"><TeacherAllocation /></ConditionRoute>} />
          <Route path="/driver-allocate/:Id" element={<ConditionRoute type="public"><BusAllocate /></ConditionRoute>} />
          <Route path="/busallocateview" element={<ConditionRoute type="public"><BusAllocateList /></ConditionRoute>} />
          <Route path="/multi-sectionallocate" element={<ConditionRoute type="public"><MultiSectionAllocation /></ConditionRoute>} />
          <Route path="/driver" element={<ConditionRoute type="public"><Driver /></ConditionRoute>} />
          <Route path="/driverview" element={<ConditionRoute type="public"><DriverList /></ConditionRoute>} />
          <Route path="/vehicle" element={<ConditionRoute type="public"><VehicleAdmission /></ConditionRoute>} />
          <Route path="/vehicleview" element={<ConditionRoute type="public"><VehicleList /></ConditionRoute>} />
          <Route path="/vehicle-edit/:Id" element={<ConditionRoute type="public"><VehicleEdit /></ConditionRoute>} />
          <Route path="/driver-edit/:Id" element={<ConditionRoute type="public"><DriverEdit /></ConditionRoute>} />
          <Route path="/route-allocate/:Id" element={<ConditionRoute type="public"><RouteAllocation /></ConditionRoute>} />
          <Route path="/teacher-login" element={<ConditionRoute type="public"><TeacherLogin /></ConditionRoute>} />
          <Route path="/teacher-signup" element={<ConditionRoute type="public"><TeacherSignup /></ConditionRoute>} />
          <Route path="/teacher-changepassword" element={<ConditionRoute type="public"><TeacherChangepassword /></ConditionRoute>} />
          <Route path="/student-changepassword" element={<ConditionRoute type="public"><StudentChangepassword /></ConditionRoute>} />
          <Route path="/teacher-forgetpassword" element={<ConditionRoute type="public"><TeacherForgetpassword /></ConditionRoute>} />
          <Route path="/student-forgetpassword" element={<ConditionRoute type="public"><StudentForgetpassword /></ConditionRoute>} />
          <Route path="/teacher-resetpassword/:Id" element={<ConditionRoute type="public"><TeacherResetpassword /></ConditionRoute>} />
          <Route path="/student-resetpassword/:Id" element={<ConditionRoute type="public"><StudentResetpassword /></ConditionRoute>} />
          <Route path="/teacher-attendance" element={<ConditionRoute type="public"><StudentAttendance /></ConditionRoute>} />
          <Route path="/teacher-marksheet" element={<ConditionRoute type="public"><StudentMarksheet /></ConditionRoute>} />
          <Route path="/student-marksheet" element={<ConditionRoute type="public"><StudentMarksheetList /></ConditionRoute>} />
          <Route path="/student-homework" element={<ConditionRoute type="public"><AssignHomework /></ConditionRoute>} />
          <Route path="/view-student-homework" element={<ConditionRoute type="public"><StudentHomeWork /></ConditionRoute>} />
          <Route path="/teacher-dashboard" element={<ConditionRoute type="public"><TeacherDashboard /></ConditionRoute>} />
          <Route path="/student-dashboard" element={<ConditionRoute type="public"><StudentDashboard /></ConditionRoute>} />
          <Route path="/student-login" element={<ConditionRoute type="public"><StudentLogin /></ConditionRoute>} />
          <Route path="/student-signup" element={<ConditionRoute type="public"><StudentSignup /></ConditionRoute>} />
          <Route path="/parent-login" element={<ConditionRoute type="public"><ParentLogin /></ConditionRoute>} />
          <Route path="/parent-signup" element={<ConditionRoute type="public"><ParentSignup /></ConditionRoute>} />
          <Route path="/parent-home" element={<ConditionRoute type="public"><ParentHomepage /></ConditionRoute>} />
          <Route path="/profile-details" element={<ConditionRoute type="public"><ProfileDetails /></ConditionRoute>} />
          <Route path="/profile-detailsDriver" element={<ConditionRoute type="public"><ProfileDetailsDriver /></ConditionRoute>} />
          <Route path="/bus-details" element={<ConditionRoute type="public"><BusDetails /></ConditionRoute>} />
          <Route path="/bus-schedule" element={<ConditionRoute type="public"><BusSchedule /></ConditionRoute>} />
          <Route path="/bus-attendance" element={<ConditionRoute type="public"><BusAttendance /></ConditionRoute>} />
          <Route path="/bus-tracking" element={<ConditionRoute type="public"><BusTracking /></ConditionRoute>} />
          <Route path="/teacher-generatecard" element={<ConditionRoute type="public"><GenerateReport /></ConditionRoute>} />
          <Route path="/LeaveForm" element={<ConditionRoute type="public"><LeaveForm /></ConditionRoute>} />
          <Route path="/LeaveForm-driver" element={<ConditionRoute type="public"><AttendanceDriver /></ConditionRoute>} />
          <Route path="/leaveDetails" element={<ConditionRoute type="public"><LeaveDetails /></ConditionRoute>} />
          <Route path="/teacherleaveappliedlist" element={<ConditionRoute type="public"><Teacherleaveappliedlist /></ConditionRoute>} />
          <Route path="/employeepayroll" element={<ConditionRoute type="public"><Employeepayroll /></ConditionRoute>} />
          <Route path="/driverleaveappliedlist" element={<ConditionRoute type="public"><Driverleaveappliedlist /></ConditionRoute>} />
          <Route path="/payrollList" element={<ConditionRoute type="public"><PayrollList /></ConditionRoute>} />
          <Route path="/PayrolllistGenerate" element={<ConditionRoute type="public"><PayrolllistGenerate /></ConditionRoute>} />
          <Route path="/punchingform" element={<ConditionRoute type="public"><PunchingForm /></ConditionRoute>} />
          {/* Redirecting to 404 page*/}
          <Route path="*" element={<ConditionRoute type="public"><Page404 /></ConditionRoute>} />
          <Route path="/driver-signup" element={<ConditionRoute type="public"><DriverSignup /></ConditionRoute>} />
          <Route path="/driver-login" element={<ConditionRoute type="public"><DriverLogin /></ConditionRoute>} />
          <Route path="/driver-dashboard" element={<ConditionRoute type="public"><DriverDashboard /></ConditionRoute>} />
          {/* <Route path="/attendance-driver" element={<ConditionRoute type="public"><Attendancedriver /></ConditionRoute>} /> */}
          <Route path="/Employee-attendancegenerate" element={<ConditionRoute type="public"><EmployeeAttendanceGenerate /></ConditionRoute>} />
          <Route path="/Employee-attendance" element={<ConditionRoute type="public"><EmployeeAttendance /></ConditionRoute>} />

{/*  */}
          <Route path="/employeeleaveEdit/:id" element={<ConditionRoute type="public"><EmployeeleaveEdit /></ConditionRoute>} />
          <Route path="/leaveapplicationupdate/:leaveDataListId" element={<ConditionRoute type="public"><LeaveApproval /></ConditionRoute>} />
          <Route path="/PayrollForm" element={<ConditionRoute type="public"><PayrollForm /></ConditionRoute>} />
          <Route path='/LeaveSchedule' element={<ConditionRoute type="public"><LeaveSchedule /></ConditionRoute>} />
          <Route path='/bus-attendance-sheet' element={<ConditionRoute type="public"><BusAttendanceSheet /></ConditionRoute>} />
          <Route path="/adminnotificationfrom" element={<ConditionRoute type="public"><Adminnotificationfrom /></ConditionRoute>} />
          <Route path="/adminnotificationlist" element={<ConditionRoute type="public"><Adminnotificationlist /></ConditionRoute>} />
          <Route path="/adminnotificationUpdate/:id" element={<ConditionRoute type="public"><AdminnotificationUpdate /></ConditionRoute>} />


          <Route path="/homework-scheduler" element={<ConditionRoute type="public"><HomeworkScheduler /></ConditionRoute>} />
          <Route path="/meeting-scheduler" element={<ConditionRoute type="public"><MeetingScheduler /></ConditionRoute>} />
          <Route path="/parent-marksheetview" element={<ConditionRoute type="public"><ParentMarksheetList /></ConditionRoute>} />
          <Route path='/parents-meeting' element={<ConditionRoute type="public"><ParentsMeeting /></ConditionRoute>} />
          <Route path='/all-meeting-list' element={<ConditionRoute type="public"><AllMeetingList /></ConditionRoute>} />
          <Route path='/AdminBoard' element={<ConditionRoute type="public"><AdminBoard /></ConditionRoute>} />
          <Route path='/Newpage' element={<ConditionRoute type="public"><Newpage /></ConditionRoute>} />
          <Route path='/Newpageform' element={<ConditionRoute type="public"><Newpageform /></ConditionRoute>} />


        </Routes>
      </BrowserRouter>
    </div>
    </MenuContextProvider>
  );
}

export default App;

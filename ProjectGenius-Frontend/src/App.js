import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
import ParentLogin from './pages/parentlogin';
import ParentSignup from './pages/parentsignup';
import TeacherSchedule from './pages/teacherschedule';
import TeacherDashboard from './pages/teacherdashboard';
import MultiSectionAllocation from './pages/multisectionallocation';
import TeacherAllocation from './pages/teacherallocation';

function App() {
  return (
    <div className="App">
      {/* Routes */}
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<ConditionRoute type="public"><Home /></ConditionRoute>} />
          <Route path="/home" element={<ConditionRoute type="public"><Home /></ConditionRoute>} />
          <Route path="/login" element={<ConditionRoute type="public"><Login /></ConditionRoute>} />
          <Route path="/verify" element={<ConditionRoute type="private"><Verify /></ConditionRoute>} />
          <Route path="/newadmission" element={<ConditionRoute type="private"><NewAdmission /></ConditionRoute>} />
          <Route path="/students" element={<ConditionRoute type="private"><Students /></ConditionRoute>} />
          <Route path="/student-edit/:Id" element={<ConditionRoute type="private"><StudentEdit /></ConditionRoute>} />
          <Route path="/feecollection/:Id" element={<ConditionRoute type="private"><FeeCollection /></ConditionRoute>} />
          <Route path="/feepayment/:name" element={<ConditionRoute type="private"><FeePayment /></ConditionRoute>} />
          <Route path="/feecomplete" element={<ConditionRoute type="private"><FeeComplete /></ConditionRoute>} />
          <Route path="/feesetup" element={<ConditionRoute type="private"><FeeSetup /></ConditionRoute>} />
          <Route path="/teacher" element={<ConditionRoute type="private"><Teacher /></ConditionRoute>} />
          <Route path="/teacherview" element={<ConditionRoute type="private"><TeacherList /></ConditionRoute>} />
          <Route path="/teacher-edit/:Id" element={<ConditionRoute type="private"><TeacherEdit /></ConditionRoute>} />
          <Route path="/teacherdetails/:Id" element={<ConditionRoute type="private"><TeacherDetail /></ConditionRoute>} />
          <Route path="/teacherschedule/:Id" element={<ConditionRoute type="private"><TeacherSchedule /></ConditionRoute>} />
          <Route path="/teachertimetable/:teacherId" element={<ConditionRoute type="private"><TimeTable /></ConditionRoute>} />
          <Route path="/paymentfailure" element={<ConditionRoute type="private"><PaymentFailure /></ConditionRoute>} />
          <Route path="/feeslist" element={<ConditionRoute type="private"><FeesList /></ConditionRoute>} />
          <Route path="/fees-edit/:Id" element={<ConditionRoute type="private"><FeesEdit /></ConditionRoute>} />
          <Route path="/sectionallocate/:Id" element={<ConditionRoute type="private"><SectionAllocation /></ConditionRoute>} />
          <Route path="/teacher-allocate/:Id" element={<ConditionRoute type="private"><TeacherAllocation /></ConditionRoute>} />
          <Route path="/teacher-login" element={<ConditionRoute type="public"><TeacherLogin /></ConditionRoute>} />
          <Route path="/teacher-signup" element={<ConditionRoute type="public"><TeacherSignup /></ConditionRoute>} />
          <Route path="/teacher-attendance" element={<ConditionRoute type="private2"><StudentAttendance /></ConditionRoute>} />
          <Route path="/teacher-marksheet" element={<ConditionRoute type="private2"><StudentMarksheet /></ConditionRoute>} />
          <Route path="/teacher-dashboard/:teacherId" element={<ConditionRoute type="private2"><TeacherDashboard /></ConditionRoute>} />
          <Route path="/student-login" element={<ConditionRoute type="private2"><StudentLogin /></ConditionRoute>} />
          <Route path="/student-signup" element={<ConditionRoute type="private2"><StudentSignup /></ConditionRoute>} />
          <Route path="/parent-login" element={<ConditionRoute type="private2"><ParentLogin /></ConditionRoute>} />
          <Route path="/parent-signup" element={<ConditionRoute type="private2"><ParentSignup /></ConditionRoute>} />
          <Route path="/multi-sectionallocate" element={<ConditionRoute type="public"><MultiSectionAllocation /></ConditionRoute>} />
          {/* Redirecting to 404 page*/}
          <Route path="*" element={<ConditionRoute type="public"><Page404 /></ConditionRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

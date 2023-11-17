
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import Routes
import ConditionRoute from './Routes/conditionroute';

//pages
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

function App() {
  return (
    <div className="App">
       <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<ConditionRoute type="public"><Home /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/home" element={<ConditionRoute type="public"><Home /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<ConditionRoute type="public"><Login /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/verify" element={<ConditionRoute type="private"><Verify /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/newadmission" element={<ConditionRoute type="private"><NewAdmission /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/students" element={<ConditionRoute type="private"><Students /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/student-edit/:Id" element={<ConditionRoute type="private"><StudentEdit /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feecollection/:Id" element={<ConditionRoute type="private"><FeeCollection /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feepayment/:name" element={<ConditionRoute type="private"><FeePayment /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feecomplete" element={<ConditionRoute type="private"><FeeComplete /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feesetup" element={<ConditionRoute type="private"><FeeSetup /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teacher" element={<ConditionRoute type="private"><Teacher /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teacherview" element={<ConditionRoute type="private"><TeacherList /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teacher-edit/:Id" element={<ConditionRoute type="private"><TeacherEdit /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teacherdetails/:Id" element={<ConditionRoute type="private"><TeacherDetail /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teachertimetable" element={<ConditionRoute type="private"><TimeTable /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/paymentfailure" element={<ConditionRoute type="private"><PaymentFailure /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feeslist" element={<ConditionRoute type="private"><FeesList /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/fees-edit/:Id" element={<ConditionRoute type="private"><FeesEdit /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/sectionallocate/:Id" element={<ConditionRoute type="private"><SectionAllocation /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teacher-login" element={<ConditionRoute type="public"><TeacherLogin /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teacher-signup" element={<ConditionRoute type="public"><TeacherSignup /></ConditionRoute>} />
        </Routes>
        <Routes>
        <Route path="/teacher-attendance" element={<ConditionRoute type="private2"><StudentAttendance /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teacher-marksheet" element={<ConditionRoute type="private2"><StudentMarksheet /></ConditionRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

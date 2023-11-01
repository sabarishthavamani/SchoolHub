
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

function App() {
  return (
    <div className="App">
       <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<ConditionRoute type="public"><Login /></ConditionRoute>} />
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
          <Route path="/feecollection" element={<ConditionRoute type="private"><FeeCollection /></ConditionRoute>} />
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
          <Route path="/teacherdetails" element={<ConditionRoute type="private"><TeacherDetail /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/teachertimetable" element={<ConditionRoute type="private"><TimeTable /></ConditionRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

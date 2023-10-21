
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import Routes
import ConditionRoute from './Routes/conditionroute';

//pages
import Login from './pages/login';
import Verify from './pages/passcodeverify';
import NewAdmission from './pages/newadmission';
import Students from './pages/students';
import StudentEdit from './pages/studentedit';
import FeeCollection from './pages/feecollection';
import FeePay1 from './pages/feepay1';
import FeePay2 from './pages/feepay2';
import FeePay3 from './pages/feepay3';
import FeeComplete from './pages/feesuccession';
import FeeSetup from './pages/feesetup';




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
          <Route path="/feepay1" element={<ConditionRoute type="private"><FeePay1 /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feepay2" element={<ConditionRoute type="private"><FeePay2 /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feepay3" element={<ConditionRoute type="private"><FeePay3 /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feecomplete" element={<ConditionRoute type="private"><FeeComplete /></ConditionRoute>} />
        </Routes>
        <Routes>
          <Route path="/feesetup" element={<ConditionRoute type="private"><FeeSetup /></ConditionRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

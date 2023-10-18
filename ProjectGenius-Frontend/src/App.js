
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import Routes
import ConditionRoute from './Routes/conditionroute';

//pages
import Login from './pages/login';
import Verify from './pages/passcodeverify';
import NewAdmission from './pages/newadmission';
import Students from './pages/students';
import StudentEdit from './pages/studentedit';




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
      </BrowserRouter>
    </div>
  );
}

export default App;

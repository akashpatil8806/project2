import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import EditMemberModal from './Compontents/EditMemberModal';
import MembersTable from './Compontents/MembersTable';
import DemoLogin from "./Compontents/Login/DemoLogin"
import SignUp from "./Compontents/SignUP/SignUp"
import DashBoard from "./Compontents/DashBorad/DashBoard"
import Tenants from './Compontents/Tenants/Tenants';
import Rent from "./Compontents/Rent/Rent"
// import RentRecord from "./Compontents/RentRecords/RentData"
import MaintenanceForm from './Compontents/MaintenanceForm/MaintenanceForm';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
     
      <Routes>
      <Route path="/DashBoard" element={<DashBoard />} /> 

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<DemoLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/Rent" element={<Rent/>} />
        {/* <Route path='/RentData' element={<RentRecord/>}/> */}
        {/* <Route path="/rent-data" element={<RentData />} /> */}

        <Route path="/MaintenanceForm" element={<MaintenanceForm/>} />
        
       
      </Routes>
      {/* <DashBoard/> */}
      </Router>
);



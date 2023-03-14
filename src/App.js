import './App.css';
import { TimeSheetUIComponent } from './components/TimeSheetUI.js';
import { React } from "react";
import { NavbarComponent } from "./components/Navbar.js";
import {BrowserRouter as Router, HashRouter, Route, Routes} from "react-router-dom";
import Login from './Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


export default function App() { 


  return(
    <HashRouter>
    <NavbarComponent/>
    
    <Routes>
    <Route path="/timesheet" element={<TimeSheetUIComponent/>} />
    <Route path="/login" element={<Login/>} />
    </Routes>
    </HashRouter>
  )
        



          
    
};
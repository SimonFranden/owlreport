import './App.css';
import { TimeSheetUIComponent } from './components/TimeSheetUI.js';
import { React } from "react";
import { NavbarComponent } from "./components/Navbar.js";
import {BrowserRouter as Router, HashRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return (
    <div>
      <HashRouter>
      <NavbarComponent/>
        <Routes>
          <Route path="/timesheet" element={<TimeSheetUIComponent/>} />
        </Routes>
      </HashRouter>
      </div>
  )
};
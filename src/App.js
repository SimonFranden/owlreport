import './App.css';
import'./css/style.css'
import { TimeSheetUIComponent } from './components/TimeSheetUI.js';
import { React , Component} from "react";
import { NavbarComponent } from "./components/Navbar.js";
import {BrowserRouter as Router, HashRouter, Route, Routes} from "react-router-dom";
import Login from './Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';



class App extends Component {


  render () {
    let logindata = sessionStorage.getItem('LoggedIn');
    
    if (logindata){
      return(
        <HashRouter>
        <NavbarComponent/>
        
        <Routes>
        <Route path="/" element= { logindata ? <TimeSheetUIComponent/> : <Login/>}/>
        <Route path="/timesheet" element={<TimeSheetUIComponent/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
        </HashRouter>
      )
    }
    else
    {
      return(
        <HashRouter>
        <Routes>
        <Route path="/" element= {<Login/>}/>
        </Routes>
        </HashRouter>
      )
    }

  }

}

export default App;
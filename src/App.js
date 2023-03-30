import './App.css';
import'./css/style.css'
import { TimeSheetUIComponent } from './components/TimeSheetUI.js';
import { React , Component} from "react";
import { NavbarComponent } from "./components/Navbar.js";
import {BrowserRouter as Router, HashRouter, Route, Routes} from "react-router-dom";
import Login from './Login';
import ProjectsPage from './components/ProjectsPage';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';



class App extends Component {

//Log out function
  handleLogout = () => {
    sessionStorage.removeItem('LoggedIn');
    window.location = '/login';
  }

  render() {
    //Renders app if user is accepted in the Login Function
    let logindata = sessionStorage.getItem('LoggedIn');
    if (logindata) {
      return (
        <HashRouter>
          <NavbarComponent handleLogout={this.handleLogout} />
          <Routes>
            <Route path="/" element={logindata ? <TimeSheetUIComponent /> : <Login />} />
            <Route path="/timesheet" element={<TimeSheetUIComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<ProjectsPage />} />
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
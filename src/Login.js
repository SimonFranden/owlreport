import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {ApiUrl} from './configParams.js';


//Login Function
function Login() {
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ApiUrl + 'Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })       
      })

      

      if (response.ok) {
        response.json()
        .then(data => {
          sessionStorage.setItem('Username', data.username)
          sessionStorage.setItem('UserFName', data.fName)
          sessionStorage.setItem('UserLName', data.lName)
          sessionStorage.setItem('UserSecretKey', data.secretKey)
          console.log(data);
        })
        sessionStorage.setItem('LoggedIn', true);
        window.location.reload();

        
        
      } else {
        response.json()
        .then(json => setError(json.message))
        //setError(response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  //Login Form
  return (
      <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
  
                <div className="mb-md-5 mt-md-4 pb-5">
  
                  <h2 className="fw-bold mb-2 text-uppercase">Välkommen</h2>
                  <p className="text-white-50 mb-5">Logga in med Användarnamn och Lösenord</p>
  
                  <form onSubmit={handleSubmit}>
                  <div className="form-outline form-white mb-4">
                  <input type="text" onChange={handleUsernameChange} id="typeUsername" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typeUsername">Anändarnamn</label>
                  </div>
  
                    <div className="form-outline form-white mb-4">
                      <input type="password" onChange={handlePasswordChange} id="typePasswordX" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typePasswordX">Lösenord</label>
                    </div>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Logga in</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
}

export default Login;

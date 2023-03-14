import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7063/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      if (response.ok) {
        alert("Inloggning Godkänd");
      } else {
        response.json()
        .then(json => setError(json.message))
        //setError(response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Välkommen</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="username" className="form-label">Användarnamn</label>
                <input type="text" onChange={handleUsernameChange} className="form-control" id="username" placeholder="Användarnamn" name="username" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">Lösenord</label>
                <input type="password" onChange={handlePasswordChange} className="form-control" id="password" placeholder="Löserord" name="password" />
              </div>
              <div className="form-group form-check mb-4">
                <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                <label className="form-check-label" htmlFor="remember">
                  Kom ihåg
                </label>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">Logga In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

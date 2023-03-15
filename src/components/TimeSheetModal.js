import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function TimeSheetModal() {
    
  


    const [value, setvalue] = useState(null);
    const [inputs, setInputs] = useState({});
    
    const [projects, setProjects] = useState([])
    useEffect(()=> {

            fetch('https://localhost:7063/api/project/')
            .then(res => res.json())
            .then(data => {
              setProjects(data)
            })},[])
    
      const handleChange = (event) => {
        console.log(event);
      const name = event.target.name;
      const value = event.target.value;
      
      setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
      event.preventDefault();
                 
      let body = inputs;
      body["userName"] = sessionStorage.getItem('UserFName') + " " + sessionStorage.getItem('UserLName');    

      fetch('https://localhost:7063/api/timereport/',{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
      window.location.reload();
    }
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setInputs({});
        setShow(true);
        setvalue(null);
    } 

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Rapportera tid
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tidsrapportering</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <form onSubmit={handleSubmit}>
            <label>Vilken dag?
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                name="date"
                value={value}
                onChange={(newvalue)=>{                   
                    setvalue(newvalue)                   
                    inputs["date"] = newvalue.toISOString().slice(0, 10);
                }
              }
                />
            </LocalizationProvider>

        </label>
        <label>Vilket projekt?:
        <select name="projectId" value={inputs.projectId ?inputs.projectId : ''} onChange={handleChange}>
        <option value="" disabled={true}>-</option>
        {projects.map((option, i) => (
              <option key={i} value={option.projectId}>{option.projectName}</option>
            ))}
        </select>
          </label>

          <label>Timmar arbetade?:
          <input 
            name="hoursWorked"
            type="number"
            value={inputs.hoursWorked} 
            onChange={handleChange}
          />
          </label>

          <label>Kommentar:
          <input 
            name="comment"
            type="text"
            value={inputs.comment} 
            onChange={handleChange}
          />
          </label>
          
      </form>

        </Modal.Body>

        <Modal.Footer>
            <button className="bg-dark text-white font-bold py-2 px-4 rounded"
                onClick={handleClose}
            >
                Stäng
            </button>
            <button className="bg-primary text-white font-bold py-2 px-4 rounded" 
                onClick={handleSubmit}
            >
                Rapportera
            </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
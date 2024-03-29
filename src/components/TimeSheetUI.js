import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TimeSheetModal from './TimeSheetModal';
import {ApiUrl} from '../configParams.js';


// TimeReport UI

export const TimeSheetUIComponent = () => {

  const [timeReports, setTimereports] = useState([]);
  const [projectHours, setProjectHours] = useState([]);

  useEffect(() => {
    fetch(ApiUrl + 'timereport/')
      .then(res => res.json())
      .then(data => {
        setTimereports(data)
      });
  }, []);

  useEffect(() => {
    fetch('https://localhost:7063/api/timereport/total-hours')
      .then(res => res.json())
      .then(data => {
        setProjectHours(data)
      });
  }, []);

    return (
    <div>

        <div className="report-table">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Comment</TableCell>
              <TableCell align="center">Project</TableCell>
              <TableCell align="center">Hours</TableCell>
              <TableCell align="center">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeReports.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.comment}</TableCell>
                <TableCell align="center">{row.projectName}</TableCell>
                <TableCell align="center">{row.hoursWorked}</TableCell>
                <TableCell align="center">{row.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        </div>
      <TimeSheetModal/>
    </div>
    )
}


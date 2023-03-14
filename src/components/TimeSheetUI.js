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



// TimeReport UI

export const TimeSheetUIComponent = () => {

  const [timeReports, setTimereports] = useState([])
  useEffect(()=> {

          fetch('https://localhost:7063/api/timereport/')
          .then(res => res.json())
          .then(data => {
            setTimereports(data)
          })},[])

    return (
    <div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </div>
        <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Comment</TableCell>
              {/* <TableCell align="right">Project</TableCell> */}
              <TableCell align="right">Hours</TableCell>
              <TableCell align="right">Username</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeReports.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.comment}</TableCell>
                {/* <TableCell align="right">{row.projectname}</TableCell> */}
                <TableCell align="right">{row.hoursWorked}</TableCell>
                <TableCell align="right">{row.userName}</TableCell>
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



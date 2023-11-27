import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SelectedStudentsTable = ({selectedStudents}) => {
  console.log(selectedStudents, 'mohan')
  return (
    <TableContainer component={Paper} sx={{mt: 2}} >
      <Table stickyHeader sx={{ maxWidth: '100%', maxHeight: '300px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Student Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedStudents.map((eachStudent, index) => (
            <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>{eachStudent.name}</TableCell>
            <TableCell>{eachStudent.studentId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SelectedStudentsTable
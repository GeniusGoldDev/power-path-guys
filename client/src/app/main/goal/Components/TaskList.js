import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const tasks = [
  { task: "Morning Run", planned: "30 mins", status: "✔️ Completed" },
  { task: "Drink 2L Water", planned: "2 Liters", status: "❌ Not Completed" },
];

const TaskList = () => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" style={{ padding: "10px" }}>
        Task List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Planned</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.task}</TableCell>
              <TableCell>{item.planned}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;

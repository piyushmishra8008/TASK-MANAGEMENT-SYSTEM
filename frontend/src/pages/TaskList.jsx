import React, { useEffect, useState } from "react";
import { Paper, TableContainer } from "@mui/material";
import api from "../services/api";
import { Link as RouterLink } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Select, MenuItem, FormControl, InputLabel, Stack
} from "@mui/material";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const fetchTasks = async () => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (priorityFilter) params.priority = priorityFilter;
    const res = await api.get("/tasks", { params });
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, [statusFilter, priorityFilter]);

  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const updated = { ...task, status: task.status === "Pending" ? "Completed" : "Pending" };
    await api.put(`/tasks/${task._id}`, updated);
    fetchTasks();
  };

  return (
    <DashboardLayout>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </Stack>
   <Paper sx={{ borderRadius: "16px", overflow: "hidden" }}>
  <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Due</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((t) => (
            <TableRow  key={t._id} hover sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell><RouterLink to={`/tasks/${t._id}`}>{t.title}</RouterLink></TableCell>
              <TableCell>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}</TableCell>
              <TableCell>{t.priority}</TableCell>
              <TableCell>
                <Button onClick={() => toggleStatus(t)} variant="outlined" size="small">
                  {t.status}
                </Button>
              </TableCell>
              <TableCell>
                <Button size="small" component={RouterLink} to={`/edit/${t._id}`}>Edit</Button>
                <Button size="small" color="error" onClick={() => deleteTask(t._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       </TableContainer>
</Paper>
    </DashboardLayout>
  );
}

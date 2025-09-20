import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  useEffect(() => {
    if (id) {
      api.get(`/tasks/${id}`).then((res) => {
        const t = res.data;
        setTask({
          ...t,
          dueDate: t.dueDate ? t.dueDate.substring(0, 10) : "",
        });
      });
    }
  }, [id]);

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/tasks/${id}`, task);
    } else {
      await api.post("/tasks", task);
    }
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {id ? "Edit Task" : "Create New Task"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                required
                label="Task Title"
                name="title"
                value={task.title}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                value={task.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />

              <TextField
                type="date"
                name="dueDate"
                label="Due Date"
                InputLabelProps={{ shrink: true }}
                value={task.dueDate}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                select
                label="Priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>

              <TextField
                select
                label="Status"
                name="status"
                value={task.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  {id ? "Update Task" : "Create Task"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

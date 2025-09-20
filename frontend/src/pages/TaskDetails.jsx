import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import { Edit, ArrowBack, CheckCircle, Schedule } from "@mui/icons-material";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/tasks/${id}`).then((res) => setTask(res.data));
  }, [id]);

  if (!task) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Stack spacing={2}>
            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {task.title}
            </Typography>

            {/* Chips for Status + Priority */}
            <Stack direction="row" spacing={2}>
              <Chip
                label={task.status}
                color={task.status === "Completed" ? "success" : "warning"}
                icon={
                  task.status === "Completed" ? <CheckCircle /> : <Schedule />
                }
              />
              <Chip
                label={`Priority: ${task.priority}`}
                color={
                  task.priority === "High"
                    ? "error"
                    : task.priority === "Medium"
                    ? "warning"
                    : "success"
                }
              />
            </Stack>

            <Divider />

            {/* Description */}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Description
              </Typography>
              <Typography color="text.secondary">
                {task.description || "No description provided."}
              </Typography>
            </Box>

            <Divider />

            {/* Due Date */}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Due Date
              </Typography>
              <Typography color="text.secondary">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "—"}
              </Typography>
            </Box>

            <Divider />

            {/* Actions */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                component={RouterLink}
                to={`/edit/${task._id}`}
              >
                Edit Task
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

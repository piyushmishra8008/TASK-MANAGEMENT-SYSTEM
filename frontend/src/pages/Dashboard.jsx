import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Tooltip as MuiTooltip } from "@mui/material";
import { Tooltip as RechartTooltip, ResponsiveContainer, Cell } from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/tasks");
      const tasks = res.data;

      setStats({
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "Completed").length,
        pending: tasks.filter((t) => t.status === "Pending").length,
      });

      setRecent(tasks.slice(-5).reverse()); // last 5 tasks
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Tasks", value: stats.total, color: "#1565c0" },
    { title: "Completed", value: stats.completed, color: "#2e7d32" },
    { title: "Pending", value: stats.pending, color: "#ed6c02" },
  ];

  const pieData = [
    { name: "Completed", value: stats.completed, color: "#2e7d32" },
    { name: "Pending", value: stats.pending, color: "#ed6c02" },
  ];

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Dashboard
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        {cards.map((c) => (
          <Grid item xs={12} sm={4} key={c.title}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                color: "#fff",
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${c.color}, ${c.color}CC)`,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <Typography variant="h6">{c.title}</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {c.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Task Status Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, borderRadius: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Task Status Overview
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, borderRadius: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Recent Tasks
            </Typography>
            <List>
              {recent.length > 0 ? (
                recent.map((task, idx) => (
                  <React.Fragment key={task._id}>
                    <ListItem
                      sx={{
                        borderRadius: "12px",
                        mb: 1,
                        bgcolor: "#f9f9f9",
                        "&:hover": { bgcolor: "#f1f1f1" },
                      }}
                    >
                      <ListItemText
                        primary={task.title}
                        secondary={`Status: ${task.status} | Due: ${
                          task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "Not set"
                        }`}
                      />
                    </ListItem>
                    {idx < recent.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  No recent tasks found.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

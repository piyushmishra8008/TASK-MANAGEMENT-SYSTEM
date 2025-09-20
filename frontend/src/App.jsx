import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./pages/Tasklist";
import TaskForm from "./pages/TaskForm";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

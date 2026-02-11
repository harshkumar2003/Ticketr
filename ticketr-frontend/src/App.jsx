import React from "react";
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./page/Dashboard.jsx";
import Settings from "./page/Settings.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import MyTickets from "./page/MyTickets.jsx";
import AllTickets from "./page/AllTickets.jsx";
import CreateTicket from "./page/CreateTicket.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import ResolveTicket from "./page/ResolveTicket.jsx";
import AssignTicket from "./page/AssignTicket.jsx";
import CloseTicket from "./page/CloseTicket.jsx";
import Unauthorized from "./page/Unauthorized.jsx";
import AllUsers from "./page/AllUsers.jsx";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* APP LAYOUT (loads user) */}
      <Route element={<AppLayout />}>
        {/* COMMON */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/* USER */}
        <Route
          path="/my-tickets"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <MyTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <CreateTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resolve-ticket"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <ResolveTicket />
            </ProtectedRoute>
          }
        />
        {/* ADMIN */}
        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AllTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/assign"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AssignTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/close"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CloseTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AllUsers />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

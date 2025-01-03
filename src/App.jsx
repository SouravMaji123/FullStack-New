import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddJob, Login, Register, NotFound, Dashboard,FolderManager, Formbuilder,FormBot,Landingpage} from "../pages/index";
import ProtectedRoute from "../components/ProtectedRoute"; // For routes requiring login

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Formbuilder route*/}
           {/* <Route
          path="/formbuilder"
          element={
            <ProtectedRoute>
              <Formbuilder />
            </ProtectedRoute>
          }
        /> */}
         <Route path="/formbuilder" element={<Formbuilder />} />
         <Route path="/formbot/:formId" element={<FormBot />} />
         <Route path="/" element={<Landingpage />} />

        <Route
          path="/addjob"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editjob/:folderId"
          element={
            <ProtectedRoute>
              <FolderManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


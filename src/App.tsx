// import { useState } from 'react'

import { Navigate, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Auth/Login"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const NotebookView = React.lazy(() => import("./Pages/NotebookView"));
const Layout = React.lazy(() => import("./Layout/Layout"));
const NotebookList = React.lazy(() => import("./Notebook/NotebookList"));
const Signup = React.lazy(() => import("./Auth/Signup"));
// const Notebook = React.lazy(() => import("./pages/Notebook"));


function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="notebooks" element={<NotebookList />} />
              <Route path="notebook/:id" element={<NotebookView />} />
              {/* <Route path="ai-helper" element={<AIHelper />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />


            {/* Pages that shouldn't have Navbar/Sidebar/Footer */}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notebook/:id" element={<NotebookView />} />
            <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

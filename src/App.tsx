// import { useState } from 'react'

import { Navigate, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Auth/Login"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const Resources = React.lazy(() => import("./Pages/Resources"));
const Layout = React.lazy(() => import("./Layout/Layout"));
const HomeLayout = React.lazy(() => import("./HomeLayout/Layout"));
const NotebookList = React.lazy(() => import("./Notebook/NotebookList"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const AI = React.lazy(() => import("./Pages/AIAssistant"));
const Features = React.lazy(() => import("./Pages/Features"));
// const Notebook = React.lazy(() => import("./pages/Notebook"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Home layout */}
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ai" element={<AI />} />
              <Route path="resources" element={<Resources />} />
              <Route path="features" element={<Features />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            {/* Note Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="notebooks" element={<NotebookList />} />
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

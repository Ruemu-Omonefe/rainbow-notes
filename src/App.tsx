// import { useState } from 'react'

import { Navigate, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import React, { Suspense } from "react";
import { Skeleton } from "@mui/material";
const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Auth/Login"));
const Resources = React.lazy(() => import("./Pages/Resources"));
const Layout = React.lazy(() => import("./Layout/Layout"));
const HomeLayout = React.lazy(() => import("./HomeLayout/Layout"));
const NotebookList = React.lazy(() => import("./Notebook/NotebookList"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const AI = React.lazy(() => import("./Pages/AIAssistant"));
const Features = React.lazy(() => import("./Pages/Features"));
const Notebooks = React.lazy(() => import("./Notebook/NotebookList"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={
          <div className="">
            <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
            <Skeleton variant="rectangular"  height={400} />
            <Skeleton variant="rectangular"  height={200} />
          </div>
        }>
          <Routes>
            {/* Home layout */}
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="ai" element={<AI />} />
              <Route path="resources" element={<Resources />} />
              <Route path="features" element={<Features />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            {/* Note Layout */}
            <Route path="/" element={<Layout />}>
              <Route path="notebooks" element={<Notebooks />} />
              <Route path="notebooks" element={<NotebookList />} />
              {/* <Route path="ai-helper" element={<AIHelper />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

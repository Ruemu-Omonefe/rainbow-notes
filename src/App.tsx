// import { useState } from 'react'

import { Navigate, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import React, { Suspense } from "react";
import { Skeleton } from "@mui/material";
import NotAuthorized from "./Common/NotAuthorized/NotAuthorized";
import OAuthSuccess from "./Pages/OauthSuccess";
import { useSelector } from "react-redux";
import RouterHooksProvider from "./shared/services/RouterHookProvider";
import { RootState } from "./store";
import Profile from "./Notebook/Profile";
import RequireMobileScreen from "./Layout/RequireMobile";
const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Auth/Login"));
const Resources = React.lazy(() => import("./Pages/Resources"));
const Layout = React.lazy(() => import("./Layout/Layout"));
const HomeLayout = React.lazy(() => import("./HomeLayout/Layout"));
const NotebookList = React.lazy(() => import("./Notebook/NotebookList"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const AI = React.lazy(() => import("./Pages/AIAssistant"));
const Features = React.lazy(() => import("./Pages/Features"));
const NotebookItem = React.lazy(() => import("./Notebook/NotebookItem"));

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  return (
    <>
      <Router>
        <RouterHooksProvider />
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
            <Route path="/" element={isAuthenticated ? <Layout /> : <NotAuthorized/>}>
              <Route path="notebooks" element={<NotebookList />} />
              <Route path="notebook/:id" element={<NotebookItem />} />
              <Route path="profile" element={ <RequireMobileScreen><Profile /></RequireMobileScreen>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route path="oauth-success" element={<OAuthSuccess />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

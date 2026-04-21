// import { useState } from 'react'

import { Navigate, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import React, { Suspense } from "react";
import NotAuthorized from "./Common/NotAuthorized/NotAuthorized";
import OAuthSuccess from "./Pages/OauthSuccess";
import { useSelector } from "react-redux";
import RouterHooksProvider from "./shared/services/RouterHookProvider";
import { RootState } from "./store";
import Profile from "./Notebook/Profile";
import RequireMobileScreen from "./Layout/RequireMobile";
import Home from "./Pages/Home";
import HomeLayout from "./HomeLayout/Layout";
const Login = React.lazy(() => import("./Auth/Login"));
const Resources = React.lazy(() => import("./Pages/Resources"));
const Layout = React.lazy(() => import("./Layout/Layout"));
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
        <Routes>
          {/* Home layout */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="ai" element={<Suspense fallback={null}><AI /></Suspense>} />
            <Route path="resources" element={<Suspense fallback={null}><Resources /></Suspense>} />
            <Route path="features" element={<Suspense fallback={null}><Features /></Suspense>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          {/* Note Layout */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Suspense fallback={null}>
                  <Layout />
                </Suspense>
              ) : (
                <NotAuthorized />
              )
            }
          >
            <Route path="notebooks" element={<Suspense fallback={null}><NotebookList /></Suspense>} />
            <Route path="notebook/:id" element={<Suspense fallback={null}><NotebookItem /></Suspense>} />
            <Route path="profile" element={ <RequireMobileScreen><Profile /></RequireMobileScreen>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="login" element={<Suspense fallback={null}><Login /></Suspense>} />
          <Route path="register" element={<Suspense fallback={null}><Signup /></Suspense>} />
          <Route path="oauth-success" element={<OAuthSuccess />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

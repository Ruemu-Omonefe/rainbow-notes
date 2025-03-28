// import { useState } from 'react'

import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./Auth/Login"

function App() {

  return (
    <>
      <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notebook/:id" element={<NotebookView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

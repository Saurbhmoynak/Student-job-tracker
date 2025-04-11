import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Home from "./pages/Home"


function App() {

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" exact element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

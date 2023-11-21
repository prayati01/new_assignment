import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ProjectCreate from "./pages/ProjectCreate"
import ProjectEdit from "./pages/ProjectEdit"
import ProjectList from "./pages/ProjectList"
import ProjectShow from "./pages/ProjectShow"
import Registration from "./pages/Registration"
import Skill from "./pages/Skill"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/dashboard" element={<ProjectList />} />
        <Route path="/create" element={<ProjectCreate />} />
        <Route path="/edit/:id" element={<ProjectEdit />} />
        <Route path="/show/:id" element={<ProjectShow />} />
        <Route path="/skill" element={<Skill/>} />
      </Routes>
    </Router>
  );
}

export default App;
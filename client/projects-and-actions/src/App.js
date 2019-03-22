import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function Project({ project, id, deleteProject }) {
  return (
    <div className="project-wrapper">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <span onClick={() => deleteProject(id)}>X</span>
    </div>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);

  const deleteProject = id => {
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/projects/${id}`)
      .then(res => {
        fetchData();
      })
      .catch(err => console.log(err));
  };

  const fetchData = () => {
    axios
      .get('http://localhost:4000/api/projects')
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app">
      <h1>Projects: </h1>
      {projects.map(project => (
        <Project
          project={project}
          id={project.id}
          key={project.id}
          deleteProject={deleteProject}
        />
      ))}
    </div>
  );
}

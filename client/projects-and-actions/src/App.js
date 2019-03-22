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

function FormAddOrUpdateProject({ addProject }) {
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addProject({
      name: project,
      description
    });
    setProject('');
    setDescription('');
  };

  return (
    <div className="add-or-update-form">
      <h3>Add Project:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Title"
          value={project}
          onChange={e => setProject(e.target.value)}
        />{' '}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />{' '}
        <button>{'Add Project'}</button>
      </form>
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

  const addProject = project => {
    axios
      .post('http://localhost:4000/api/projects', project)
      .then(res => {
        fetchData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="app">
      <h1>Projects: </h1>
      <div className="main-content">
        <div className="projects">
          {projects.map(project => (
            <Project
              project={project}
              id={project.id}
              key={project.id}
              deleteProject={deleteProject}
            />
          ))}
        </div>
        <FormAddOrUpdateProject addProject={addProject} />
      </div>
    </div>
  );
}

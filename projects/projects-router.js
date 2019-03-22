const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// handles URLS beginning with /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving projects.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.getProjectActions(req.params.id);
    project[0]
      ? res.status(200).json(project)
      : res.status(404).json({ message: 'The project could not be found.' });
  } catch (error) {
    console.log(error);
    res.status(500),
      json({
        message: 'Error retrieving the project.'
      });
  }
});

router.post('/', async (req, res) => {
  const projectName = req.body.name;
  const projectDescription = req.body.description;
  if (!projectName || !projectDescription) {
    res.status(400).json({
      message: 'Bad request, submit name and description of project.'
    });
  } else {
    try {
      const project = await Projects.insert(req.body);
      res.status(201).json(project);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the project.'
      });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    project
      ? res.status(201).json(project)
      : res.status(404).json({ message: 'The project could not be found.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messgae: 'Error updating project.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    count
      ? res.status(200).json({
          message: 'The project has been removed.'
        })
      : res.status(404).json({ message: 'The project could not be found.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messgage: 'Error deleting project.'
    });
  }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');

const server = express();

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
  res.send(`<h1>Welcome<h1>`);
});

// routing
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;

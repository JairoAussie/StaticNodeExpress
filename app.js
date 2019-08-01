//constants to load modules and get the json file
const express = require('express');
const data = require('./data.json');
const projects = data.projects;
//create an express app
const app = express();

//serve static files
app.use('/static', express.static('public'));
//set pug to template enfine
app.set('view engine', 'pug');

//get index, send the projects
app.get('/', (req, res) => {
    res.render('index',{projects});
});
//get about
app.get('/about', (req, res) => {
    res.render('about');
});

//get projects, each project has its own id, so it receives its own data
app.get('/project/:id', (req, res) => {
    res.render('project', {
        project_name: projects[req.params.id].project_name,
        description: projects[req.params.id].description,
        technologies: projects[req.params.id].technologies,
        live_link: projects[req.params.id].live_link,
        github_link: projects[req.params.id].github_link,
        image_urls: projects[req.params.id].image_urls
    });
});

//handling errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});
//app working in the port 3000
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
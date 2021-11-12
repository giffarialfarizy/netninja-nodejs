const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  // res.send('<h1>Giffari Alfarizy page</h1>');
  // res.sendFile('./views/index.html', { root: __dirname });
  const blogs = [
    { title: 'Yoshi find eggs', snippet: 'lorem ipsum dolor' },
    { title: 'Mario find stars', snippet: 'loreng ipzum dolar' },
    { title: 'How to defeat bowser', snippet: ':tada:' },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.send('<h1>About page</h1>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});
// 404 page
// if it did not find match
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Blog = require('./models/blog');

// express app
const app = express();

// Connect to mongodb
const dbURI =
  'mongodb+srv://giffari:DragonFly123@firstcluster.he2uo.mongodb.net/first-database?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // listen for requests
  .then((result) => app.listen(3000))
  // catch error
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//   console.log('new request made: ');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   // console.log(req);
//   next();
// });

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// save new blog
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'another new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// find All
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// find by ID
app.get('/single-blog', (req, res) => {
  Blog.findById('618f3b8bfaadbddadfefb9ef')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// routes
app.get('/', (req, res) => {
  // res.send('<h1>Giffari Alfarizy page</h1>');
  // res.sendFile('./views/index.html', { root: __dirname });

  // const blogs = [
  //   { title: 'Yoshi find eggs', snippet: 'lorem ipsum dolor' },
  //   { title: 'Mario find stars', snippet: 'loreng ipzum dolar' },
  //   { title: 'How to defeat bowser', snippet: ':tada:' },
  // ];
  // res.render('index', { title: 'Home', blogs });
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Home', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });

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

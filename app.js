const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// API untuk menampilkan semua blog?
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// redirect
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// pindah halaman aja
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
// if it did not find match
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

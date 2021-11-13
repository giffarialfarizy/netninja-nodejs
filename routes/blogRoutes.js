const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

// GET all
// diganti dari 'blogs/' menjadi '/' biar jadi reusable
router.get('/', blogController.blog_index);

// pindah halaman aja
router.get('/create', blogController.blog_create_get);

// POST request
router.post('/', blogController.blog_create_post);

// GET by id
router.get('/:id', blogController.blog_details);

// DELETE request
router.delete('/:id', blogController.blog_delete);

module.exports = router;

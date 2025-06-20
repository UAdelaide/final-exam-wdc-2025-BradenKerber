var express = require('express');
var router = express.Router();

router.get()

router.get('/api/dogs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
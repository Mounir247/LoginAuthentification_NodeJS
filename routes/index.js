const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

//Login page
router.get('/login', (req, res)=> res.render('Login'));

//Register page
router.get('/register', (req, res)=> res.render('Register'));

//Payment page
router.get('/payment', (req, res)=> res.render('payment'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;

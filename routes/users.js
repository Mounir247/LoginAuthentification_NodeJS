const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User model
const User = require('../models/User');
//Login page
router.get('/login', (req, res)=> res.render('Login'));

//Register page
router.get('/register', (req, res)=> res.render('Register'));


//Register Handle
router.post('/register', (req, res)=>{
   const {name, email, number, password, password2}=req.body;
   let errors = [];

   //Check required fields
   if(!name || !email || !number || !password || !password2 ){
       errors.push({msg: 'please fill in all fields'})
   }

   //Check passwords match
   if(password !== password2){
       errors.push({msg : 'Les mots de passe ne correspondent pas'});
   }

   //Check pass length
   if(password.length <6){
       errors.push({msg : 'le mot de passe doit contenir au moins 6 caractéres'});
   }

   if(errors.length > 0){
       res.render('register', {
           errors,
           name,
           email,
           number,
           password,
           password2
       });
   }else{
       //Validation passed
       User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Cet email existe déja' });
          res.render('register', {
            errors,
            name,
            email,
            number,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            number,
            password
          });

              //Hash password
              bcrypt.genSalt(10, (err, salt)=> 
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  //set password to hashed
                  newUser.password = hash;
                  //Save user
                  newUser.save()
                  .then(user => {
                      req.flash('success_msg', 'Votre compte a été créé, vous pouvez maintenant vous connecter');
                    res.redirect('/users/login');
                  })
                  .catch(err=> console.log(err));
              }))
           }
       })
   }

});
//Login handle
router.post('/login', (req,res,next)=>{
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req,res,next);
});

//Logout Handle


router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Vous étes déconnecté');
  res.redirect('/users/login');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User model
const User = require('../models/User');
const Inbox = require('../models/Inbox')







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
                    res.redirect('/login');
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
    failureRedirect: '/login',
    failureFlash: true
  })(req,res,next);
});



//Inbox Handle

router.post('/inbox' ,(req,res)=>{
  const {  object, message}=req.body;
  console.log('11111111111111111111110');
  console.log(req.body);
  let errors = [];

   //Check required fields
   if(  !object || !message ){
    errors.push({msg: 'Veuillez remplir les champs'})
    console.log('1 et DEMIIIIIII');
}
if(errors.length > 0){
  console.log('1er IF 222222222222222222');
  res.render('inbox', {
    
      object,
      message
  });
}else {
  console.log('1er ELSE 33333333333333333');
  const newInbox = new Inbox({
    
    object,
    message
  });
  console.log('SORTI DU ELSE 4444444444444444444');
  console.log(newInbox);
  newInbox.save()
 
  .then(inbox => {
      req.flash('success_msg', 'Votre Message a été envoyé, vous pouvez aller chier');
    res.redirect('/dashboard');
  })
  .catch(err=> console.log(err));
      }
  })













//Logout Handle


router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Vous étes déconnecté');
  res.redirect('/login');
});

module.exports = router;
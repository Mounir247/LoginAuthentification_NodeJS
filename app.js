const PORT = process.env.PORT || 5050;
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mounir247:mounir247@cluster1-gj2sf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const app = express();



client.connect(err => {
  const collection = client.db("test").collection("devices");
 // perform actions on the collection object
  client.close();
});



//Style css
app.use('/public', express.static('public'))
//Passport config
require('./config/passport')(passport);

//DB config
// const db = require('./config/keys').mongoURI;
const db = 'mongodb+srv://mounir247:mounir247@cluster1-gj2sf.mongodb.net/test?retryWrites=true&w=majority';

//Connect to Mongo
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const conn = mongoose.connection;
conn.once('open', () => { console.log('MDB connected'); });
conn.on('error', (err) => {console.log('MDB ERR ', err); });
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
// Connect flash
  app.use(flash());

  //Global vars
  app.use((req,res,next)=> {
      res.locals.success_msg =req.flash('success_msg');
      res.locals.error_msg =req.flash('error_msg');
      res.locals.error =req.flash('error');
      next();

  })

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`server started on port ${PORT}`));


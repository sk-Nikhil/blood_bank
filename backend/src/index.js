const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv= require('dotenv');                //dotenv
const router = require('./router.js');          //routes
const session = require('express-session');     //express-session
require('./db/mongoose.js');                    //mongoose connection
// passport
const passport = require('passport')                            //passport
const initializePassport = require('./passport.config.js')      //passport config

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(router);                    //routes

// passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport)

app.listen(process.env.port, ()=>{
    console.log(`server started on port ${process.env.port}`);
});
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');                     //express-session
const cors = require('cors');
const dotenv= require('dotenv');                                //dotenv
const router = require('./router.js');                          //routes
require('./db/mongoose.js');                                    //mongoose connection
const passport = require('passport');                            //passport
const initializePassport = require('./passport.config.js')      //passport config

dotenv.config();
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());                                 //initializing passport
app.use(passport.session());
initializePassport(passport);

app.use(cookieParser());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(router);                                                //routes

app.listen(process.env.port, ()=>{
    console.log(`server started on port ${process.env.port}`);
});
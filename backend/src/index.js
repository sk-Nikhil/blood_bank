const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');                     //express-session
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');                                //dotenv
const router = require('./router.js');                          //routes
require('./db/mongoose.js');                                    //mongoose connection
const passport = require('passport');                            //passport
const initializePassport = require('./passport.config.js')      //passport config

dotenv.config();
const oneDay = 1000*60*60*24;
app.use(sessions({ 
    secret: process.env.sessionKey,
    saveUninitialized: true,
    cookie: {maxAge:oneDay},
    resave: false   
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());                                 //initializing passport
app.use(passport.session());
initializePassport(passport);

app.use(cors());
app.use(bodyparser.json());
app.use(router);                                                //routes

app.listen(process.env.port, () => {
    console.log(`server started on port ${process.env.port}`);
});
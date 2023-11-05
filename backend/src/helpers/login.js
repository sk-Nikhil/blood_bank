const generateToken = require('../middleware/generateToken');
const passport = require('passport');

async function login(req,res,next){
    passport.authenticate('login', {session:true}, (err, user)=>{
        if(err || !user){
            res.send({"validationError":"Invalid username or password"});
            return;
        }
        req.login(user, {session:false}, (err)=>{
            if(err){
                return res.send(err);
            }
            const successToken = generateToken(user);
            return res.send({"success":successToken});
        })
    })
    (req,res,next);
}

module.exports = {
    login
}
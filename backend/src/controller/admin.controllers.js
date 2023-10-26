const adminService = require('../services/admin.service.js')
const generateToken = require('../middleware/generateToken');
const passport = require('passport');

async function login(req,res, next){
    passport.authenticate('login',{session:false}, (err, user)=>{
        if(err || !user){
            res.send({failure:"Invalid usrename of password"});
            return;
        }
        req.login(user, {session:false}, (err)=>{
            if(err){
                console.log(err);
                res.redirect('http://localhost:8081/signup')
                // res.send(err);
                // return;
            }
            const token = generateToken(user);
            res.send({"success":token});
        })
    })
    (req,res,next);
}

async function signup(req,res){
    try{
        const response = await adminService.addAdmin(req.body)
        res.send(response)
    }
    catch(err){
        console.log(err.message)
        res.send(err.message)
    }
}

module.exports = {
    login,
    signup
}
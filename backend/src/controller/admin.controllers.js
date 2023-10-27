const adminService = require('../services/admin.service.js')
const generateToken = require('../middleware/generateToken');
const passport = require('passport');

async function login(req,res,next){
    passport.authenticate('login',{session:false},  (err, user)=>{
        if(err || !user){
            res.send({failure:"Invalid usrename of password"});
            return;
        }
        req.login(user, {session:false}, (err)=>{
            if(err){
                console.log(err);
                return res.send(err);
            }

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7); 
            // res.cookie('user', user, { expires:expirationDate, httpOnly: true, sameSite: 'Lax'});
            const successToken = generateToken(user);
            return res.send({"success":successToken});
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
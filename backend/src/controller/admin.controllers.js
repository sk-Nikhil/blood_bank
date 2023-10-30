const adminService = require('../services/admin.service.js')
const generateToken = require('../middleware/generateToken');
const passport = require('passport');

async function login(req,res,next){
    passport.authenticate('login',  (err, user)=>{
        if(err || !user){
            res.send({failure:"Invalid usrename of password"});
            return;
        }
        req.login(user, {session:false}, (err)=>{
            if(err){
                console.log(err);
                return res.send(err);
            }
            const successToken = generateToken(user);
            return res.send({"success":successToken});
        })
    })
    (req,res,next);
}

async function signup(req,res){
    try{
        const response = await adminService.addAdmin(req.body);
        res.send(response);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function getAllEnquiries(req,res){
    try{
        const response = await adminService.getAllEnquiries();
        res.send(response);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({error:err.message});
    }
}

async function getPendingEnquiries(req,res){
    try{
        const response = await adminService.getPendingEnquiries();
        res.status(500).send(response);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({error:err.message});
    }
}

async function getTotalPendingEnquiries(req,res){
    try{
        const response = await adminService.getTotalPendingEnquiries();
        res.json({data:response});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
}
module.exports = {
    login,
    signup,
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries
}
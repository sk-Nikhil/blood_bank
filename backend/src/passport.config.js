const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin.js');

const initializePassport = (passport)=>{
    passport.use('login',new LocalStrategy(
        async (email, password, done) => {
            try {
                const user = await Admin.findOne({email});
                if(user == null){
                    return done(null, false);
                }
                if(await bcrypt.compare(password, user.password)){
                    return done(null, {_id:user._id, role:user.role});
                }
                else{
                    return done(null, false);
                }
            }
            catch (error) {
                console.log(error.message);
                return done(error);
            }
        }
    ));
}

module.exports = initializePassport;
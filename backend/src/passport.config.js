const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin.js');

const initializePassport = (passport)=>{
    passport.use('login',new LocalStrategy(
        async (email, password, done) => {
            const user = await Admin.findOne({email});
            if(user == null){
                return done(null, false);
            }

            try {
                if(await bcrypt.compare(password, user.password)){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            }
            catch (error) {
                console.log(error.message)
                return done(error);
            }
        }
    ));
    passport.serializeUser((email, done)=>{
        done(null, email)
    });
    passport.deserializeUser((email,  done) => {
        done(null, email );
    });
}

module.exports = initializePassport;
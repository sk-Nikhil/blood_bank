const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(token) {
        try{
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            if(decodedToken.role === 'user')
                next()
            else{
                return res.status(401).send({invalidToken:"unverified user"});
            }
        }
        catch(err){
            // console.log(err.message);   
            return res.status(401).send({invalidToken:"unverified user"});
        }
    }
    else{
        return res.status(401).send({invalidToken:"unauthorized access"});
    }
}

module.exports = verifyToken;
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            if (decodedToken.role === 'admin')
                next()
            else {
                console.log(token)
                return res.send({ invalidToken: "unverified user" });
            }
        }
        catch (err) {
            return res.status(401).send({ invalidToken: "unverified user" });
        }
    }
    else {
        return res.status(401).send({ invalidToken: "unauthorized access" });
    }
}

module.exports = verifyToken;
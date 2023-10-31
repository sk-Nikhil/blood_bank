const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const token = jwt.sign(user,process.env.SECRET_KEY, { expiresIn: '1h' });
    return {token, role:user.role};
}

module.exports = generateToken;
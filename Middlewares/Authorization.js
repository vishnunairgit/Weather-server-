const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1]
        jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
            console.log(decodedToken, '-----decodedToken-------admin');
            if (decodedToken && decodedToken.Role === 1) {
                req.userId = decodedToken.userId
                next();
            } else {
                res.status(401).json({ message: 'unauthorized user ' })
            }
        })

    } catch (error) {
        // console.log(error);
        res.status(401).json({ message: 'unauthorized user ' })

    }
}


module.exports = { adminAuth }
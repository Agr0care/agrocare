const jwt = require("jsonwebtoken");
const secretKey = process.env["AUTH_SECRET"];

const verifyToken = (token) => {
    const decode = jwt.verify(token, secretKey);
    if(!decode) {
        return new Error("Token is invalid.");
    }

    return decode;
}

module.exports = verifyToken;
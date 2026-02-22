const jwt = require("jsonwebtoken");
const User = require("../models/User");


//This middleware will protect routes that require a logged-in user later
const protect = async (req, res, next) => {
    try{
        let token;

        //Check if the token exists in the authorization header
        if (
            req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token"});
        }

        //To verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach the user without password to the request object
        req.user = await User.findById(decoded.id).select("-password");

        next(); //To move on to the actual route handler
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed"});
    }
};

module.exports = { protect };
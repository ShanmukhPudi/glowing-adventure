const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate a JWT token using the user's ID
const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );
};


//@route POST/api/auth/signup
//@access public
const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body; // destructuring sign up elements from req body

        //to check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "Email already registered"});
        }

        const user = await User.create({ name, email, password}); //to create a new user -- password gets hashed via pre-save

        //to send back token and basic user info
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

//@route POST/api/auth/login
//@access public

const login = async (req, res) => {
    try{
        const { email, password} = req.body;

        //find the user by email
        const user = await User.findOne({ email });
        if (!user){
            return res.status(401).json({ message: "Invalid email or password "});
        }

        //to compare entered password with the hashed password on db
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password "});
        }

        //to send back the token and besic user info
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };
const bcryptjs = require('bcryptjs'); // Ensure bcryptjs is imported
const USERS = require('../models/UserModels'); // Assuming you have a User model defined
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const register = async (req, res) => {
    try {
        // Check if email is already registered
        const existingEmail = await USERS.findOne({ Email: req.body.Email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        // Check if phone number is already registered
        const existingPhoneNumber = await USERS.findOne({ Phonenumber: req.body.Phonenumber });
        if (existingPhoneNumber) {
            return res.status(409).json({ message: 'Phone number is already registered' });
        }

        // Hash the password before saving it to the database
        const hash = await bcryptjs.hash(req.body.password, saltRounds);

        // Create a new user instance
        const newUser = new USERS({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Phonenumber: req.body.Phonenumber,
            Role:req.body.Role,
            password: hash,
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: "Sign-up successful" });
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const login = async (req, res) => {
    try {
        const { Email, password } = req.body;

        // Find user by UserName in the database
        const user = await USERS.findOne({ Email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or password' });
        }

        // Compare hashed password with input password
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, Role:user?.Role }, process.env.JWT_PASSWORD, { expiresIn: '3h' });

        // Return success message and token
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { register, login };

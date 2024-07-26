require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        const dbUrl = process.env.MONGODB_URL;
        if (!dbUrl) {
            throw new Error('MONGODB_URL is not defined in the environment variables.');
        }
        const connection = await mongoose.connect(dbUrl);
        console.log('Moodle MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase;

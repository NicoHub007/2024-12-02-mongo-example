console.log('i have been updated');
import db from './db/conn.mjs';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// in order to use the grades.mjs for my routes,
// i need to import the file
// then i need to use those grades routes for anything matching /api/grades
import grades from './routes/grades.mjs';

// process.env is what allows me to access the .env
// PORT is what it was called in the .env file
const PORT = process.env.PORT || 5050;
const app = express();

// middleware
app.use(express.json());

// routes
// generic route that is the root of the application
app.get('/', (req, res) => {
    res.send("Welcome to the API.  Documentation could go here, or you could redirect to documentation")
})

app.use('/api/grades', grades);

// Global error handling after the routes
app.use((err, _req, res, next) => {
    res.status(500).send('seems like we messed up somewhere');
})

// start the express application
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
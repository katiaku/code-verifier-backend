const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Define the first route of APP
app.get('/', (req, res) => {
    res.send('APP Express + TS + Swagger + Mongoose');
});

// Execute APP and listen requests to PORT
app.listen(port, () => {
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`);
});

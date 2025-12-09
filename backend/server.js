const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection'); 


connectDb();
const app = express(); 
const port = process.env.PORT || 5000; 

//middleware to parse JSON
app.use(express.json());

// using middleware to parse JSON
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// chl gya server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

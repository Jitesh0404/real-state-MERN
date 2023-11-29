const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const app = express();


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to DB");
}).catch(()=>{
    console.log("Opps!! Could not connect to DB");
})


app.listen(3001,()=>{
    console.log("Server running on port : 3000");
})
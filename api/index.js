const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Opps!! Could not connect to DB");
  });

app.use("/api/user", userRouter);

app.listen(3001, () => {
  console.log("Server running on port : 3001");
});

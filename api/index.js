const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/auth.route")
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json())
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Opps!! Could not connect to DB");
  });

app.listen(3001, () => {
  console.log("Server running on port : 3001");
});
app.use("/api/user", userRouter);
app.use("/api/auth",authRouter)

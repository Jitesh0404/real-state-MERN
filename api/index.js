const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/auth.route");
const listingRouter = require("./routes/listing.route");
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client-side origin
  credentials: true,
}));
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
app.use("/api/auth", authRouter);
app.use('/api/listing',listingRouter)


//middleware to handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error !";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

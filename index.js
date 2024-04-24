require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const stripeRoutes = require("./routes/stripepayment.js")

//db conncetion
// mongodb+srv://mahisingh8561:<password>@cluster0.6v5jv1q.mongodb.net/?retryWrites=true&w=majority
// "mongodb+srv://mahisingh8561:6hbQJ-3R-QY9eTB@cluster0.nxcwe.mongodb.net/googleclone?retryWrites=true&w=majority",


mongoose
  .connect(
    "mongodb+srv://mahisingh8561:6hbQJ-3R-QY9eTB@cluster0.6v5jv1q.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

// const db = mongoose.connection;

// module.exports = db;

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv:/
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
// }) 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// app.use((req, res, next) => {
//   // Allow requests from any origin
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Allow specific HTTP methods
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

//   // Allow specific headers
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );

//   // Allow credentials such as cookies
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Handle preflight request
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }

//   // Continue to the next middleware
//   next();
// });

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", stripeRoutes);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});


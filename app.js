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

const db = mongoose.connection;

module.exports = db;

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv:/

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

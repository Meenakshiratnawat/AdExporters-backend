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


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


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


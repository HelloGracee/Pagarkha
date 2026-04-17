const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reviews", reviewRoutes);

app.use(express.json()); // MUST be there
app.use("/api/products", productRoutes);
// MongoDB connect
mongoose.connect("mongodb://localhost:27017/pagarkha")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
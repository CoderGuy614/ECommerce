const express = require("express");
const mongoose = require("mongoose");

// import routes
const userRoutes = require("./routes/user");

require("dotenv").config();

//App
const app = express();

//DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));

//Routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port ${port}`));

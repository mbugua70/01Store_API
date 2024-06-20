require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productRouter = require("./routes/products");
const MONGODB_STRING = process.env.MONGODB_STRING;
const PORT = process.env.PORT || 4040;

mongoose
  .connect(MONGODB_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to the database and listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


// middleware
app.use(express.json());


// apis
app.use("/api/v1/products", productRouter);

//error handling middleware
app.use(errorHandlerMiddleware)
app.use(notFound);
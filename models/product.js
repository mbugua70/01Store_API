const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name must be provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, "Product price must be provided"],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeStamps: true }
);


const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
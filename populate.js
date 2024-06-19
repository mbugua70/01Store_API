require('dotenv').config();

const connectDB = require("./connect");
const ProductModel = require("./models/product");
const jsonProducts = require("./products.json");

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_STRING);
        await ProductModel.deleteMany();
        await ProductModel.create(jsonProducts);

        // debug success message
        console.log("Success!!!!");
        process.exit(0)
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

start();
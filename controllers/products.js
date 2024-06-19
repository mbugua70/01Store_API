const asyncWrapper = require("../middleware/asyncWrapper");


const getProducts = asyncWrapper(
    async (req, res) => {
    //    code to find product from the databse and send back the response
      res.status(200).json({msg: "All products"});
    }
)

module.exports = getProducts;
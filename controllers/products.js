const asyncWrapper = require("../middleware/asyncWrapper");
const ProductModel = require("../models/product");

const getProducts = asyncWrapper(async (req, res) => {
  //    code to find product from the databse and send back the response
  const products = await ProductModel.find({});

  res.status(200).json({ products });
});

const getProductStatic = asyncWrapper(async (req, res) => {
  //    code to find product from the databse and send back the response
  const { featured, company, name, sort} = req.query;
  const objectQuery = {};

  if (featured) {
    objectQuery.featured = featured === "true" ? true : false;
  }

  if (company) {
    objectQuery.company = company;
  }

  if(name) {
    // objectQuery.name = name;
    // using mongodb query params
    objectQuery.name = {$regex: name, $options: "i"}
  }

   let results = ProductModel.find(objectQuery);

   if(sort) {
     const chainedSorted = sort.split(',').join(' ');
     console.log(chainedSorted);
     results = results.sort(chainedSorted);
   }else{
    results = results.sort('createdAt')
   }

   const products = await results

  // const products = await ProductModel.find(objectQuery).limit(10).sort({name: -1});
  // console.log(products);
  res.status(200).json({ products, iniBit: products.length });
});

module.exports = {
  getProducts,
  getProductStatic,
};

// sorting
// this is based on the alphabetical order or accending or descending order
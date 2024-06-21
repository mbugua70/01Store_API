const asyncWrapper = require("../middleware/asyncWrapper");
const ProductModel = require("../models/product");

const getProducts = asyncWrapper(async (req, res) => {
  //    code to find product from the databse and send back the response
  const products = await ProductModel.find({ price: { $gt: 100 } })
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(1);

  res.status(200).json({ products, inHibit: products.length });
});

const getProductStatic = asyncWrapper(async (req, res) => {
  //    code to find product from the databse and send back the response
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const objectQuery = {};

  if (featured) {
    objectQuery.featured = featured === "true" ? true : false;
  }

  if (company) {
    objectQuery.company = company;
  }

  if (name) {
    // objectQuery.name = name;
    // using mongodb query params
    objectQuery.name = { $regex: name, $options: "i" };
  }

  // numeric filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        objectQuery[field] = { [operator]: Number(value) };
      }
    });

    console.log(objectQuery);
  }

  let results = ProductModel.find(objectQuery);

  // code for sorting filtering

  if (sort) {
    const chainedSorted = sort.split(",").join(" ");
    console.log(chainedSorted);
    results = results.sort(chainedSorted);
  } else {
    results = results.sort("createdAt");
  }

  // code for field filtering
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    results = results.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  results = results.skip(skip).limit(limit);

  console.log(page);
  console.log(limit);
  const products = await results;

  // const products = await ProductModel.find(objectQuery).limit(10).sort({name: -1}).limit(10).select('name price').skip(5);
  // console.log(products);
  res.status(200).json({ products, iniBit: products.length });
});

module.exports = {
  getProducts,
  getProductStatic,
};

// sorting
// this is based on the alphabetical order or accending or descending order
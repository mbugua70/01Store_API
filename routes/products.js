const express = require("express");
const router = express.Router();

const { getProducts, getProductStatic } = require("../controllers/products");

// router code
router.route("/").get(getProductStatic);
router.route("/static").get(getProducts);


module.exports = router;
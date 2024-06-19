const express = require("express");
const router = express.Router();

const getProducts = require("../controllers/products");


// router code
router.route("/").get(getProducts);

module.exports = router;
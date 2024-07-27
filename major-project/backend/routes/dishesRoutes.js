const express = require("express");
const router = express.Router();

const{getDishes}= require("../controllers/dishesController");

router.get("/dishes",getDishes);

module.exports = router;
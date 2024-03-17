var express = require('express');
var router = express.Router();
var controller = require("../controllers/travel");

/* Get Travel page */
console.log("Running travel.js file at app_server, routes")
router.get('/', controller.travel);
module.exports = router;
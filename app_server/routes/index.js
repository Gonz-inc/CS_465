var express = require('express');
var router = express.Router();
var controller = require("../controllers/mains"); 

/* Get homepage */
console.log(" At app_server routes index")
router.get('/', controller.index);

module.exports = router;
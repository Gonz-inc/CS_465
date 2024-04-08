const express = require('express');
const router = express.Router();

// This is the import via path to the controllers/trips file in app_api
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); // Attach the GET method handler

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)

module.exports = router;


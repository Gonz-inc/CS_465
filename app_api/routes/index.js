const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens. 

// This is the import via path to the controllers/trips file in app_api
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    //console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    //console.log('Auth Header:' + authHeader);

    if(authHeader == null) {
        console.log('Auth Header Required but not present');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length <1) {
        console.log('Not enough tokens in Auth Header" '+
        headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    //console.log('Token: ' + token);
    if(token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }
    //console.log(process.env.JWT_SECRET);
    //console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.authj = verified; // Set the auth paramto the decoded object
    });
    next();
}

// define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

// Defines route for login endpoint.
router 
    .route('/login')
    .post(authController.login);

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // Attach the GET method handler
    .post(authenticateJWT, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;



const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

const register = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"})
    }
    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: ''
        });
    user.setPassword(req.body.password)
    const q = await user.save();

    if(!q) {
        return res
            .status(400)
            .json(err);
    }
    else {
        const token = user.generateJWT();
        return res
            .status(200)
            .json(token);
    }
};

const login = (req, res) => {
    // Validation message that both email and password are present.
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    // passport module authentication
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            // If authentication process crosses an error
            return res
                .status(404)
                .json(err);
        }
        if (user) {
            // Here if the authentication process is successful a JWT is generated.
            const token = user.generateJWT();
            res
              .status(200)
              .json({token});
        }
        else{
        // If the authentication fails due to bad credentials an error is returned.
        res
          .status(404)
          .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done) => {   // Asynchronous keyword added to make it asynchronous. 
        try {                               // Added a try catch block reason was for handle potential error when logging in. 
            const user = await User.findOne({ email: username }).exec(); // changed variable name from q to user for my better understanding.

            if (!user) {
                return done(null, false, { message: 'Incorrect Username' });
            }

            const isValidPassword = await user.validPassword(password); // awaits for password validation this is where i think the issue came from.

            if (!isValidPassword) {
                return done(null, false, { message: 'Incorrect Password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

// passport.serializeUser((user, done) =>{

// });

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecert,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // console.log('access token', accessToken);
    // console.log('refresh token', refreshToken);
    // console.log('profile', profile);
    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                //means we have record alread
                done(null, existingUser);
            } else {
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        })

}));
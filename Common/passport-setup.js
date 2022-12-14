const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});
// used to deserialize the user
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    request.user = profile;
    done(null, profile)
}));

passport.use(new facebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET_ID,
    callbackURL: "http://localhost:3000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']
},// facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        console.log(profile)
        return done(null, profile)
    })
);

// passport.use(new LinkedInStrategy({
//     clientID: process.env.LINKEDIN_CLIENT_ID,
//     clientSecret: process.env.LINKEDIN_SECRET_ID,
//     callbackURL: "http://localhost:3000/linkedin/callback",
//     scope: ['r_emailaddress', 'r_liteprofile'],
// }, function (token, tokenSecret, profile, done) {
//     return done(null, profile);
// }
// ));
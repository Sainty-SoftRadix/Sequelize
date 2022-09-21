const express = require("express");
const bodyParser = require("body-parser");
const Users = require("./Routers/users.router")
const Posts = require("./Routers/posts.router")
const Comments = require("./Routers/comments.router");
const auth = require("./Routers/auth.router");
const Profiles = require("./Routers/profiles.router");
const Likes = require("./Routers/likes.router")
const { verifyJWTToken } = require("./Common/helper")

const path = require("path");
const passport = require("passport");
const session = require('express-session')
require('./Common/passport-setup');
const app = express();
app.use(bodyParser.json());

//Setting up cookies
app.use(session({
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
//Passport Initialized
app.use(passport.initialize());
//Setting Up Session
app.use(passport.session())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index')
})
app.use("/user", verifyJWTToken, Users);
app.use("/post", verifyJWTToken, Posts);
app.use("/comment", verifyJWTToken, Comments);
app.use("/profiles", verifyJWTToken, Profiles);
app.use("/like", verifyJWTToken, Likes);
app.use("/auth", auth);

//GOOGLE SOCIAL SIGNUP
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/failed', (req, res) => res.send('You Failed to log in!'));
app.get('/good', (req, res) => {
    console.log(req.user.photos[0].value)
    res.render('pages/profile.ejs', {
        name: req.user.displayName,
        pic: req.user._json.picture,
        email: req.user.emails[0].value,
        profile: "google"
    })
});
app.get('/auth/google/callback',
    passport.authenticate('google',
        { failureRedirect: '/failed' }),
    (req, res) => {
        res.redirect("/good");
    })
//FACEBOOK SOCIAL SIGNUP
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/failed'
    }
    ));

app.get('/profile', (req, res) => {
    console.log("----->", req.user)
    res.render('pages/profile', {
        name: req.user.displayName,
        pic: req.user.photos[0].value,
        email: req.user.emails[0].value,
        profile: "facebook", // get the user out of session and pass to template
    });
})

app.get('/logout', function (req, res) {
    //req.logout();
    res.redirect('/');
});

app.get("/chatapp", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, () => {
    console.log("Server running at port 3000 successfully");
})
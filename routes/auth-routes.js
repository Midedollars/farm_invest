const router = require('express').Router();
const passport = require('passport');
const express = require('express');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/'); 
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}));


// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate("google"), (req, res) => {
    // res.send('you reached the redirect URI');
    res.redirect('/profile');
});


module.exports = router;
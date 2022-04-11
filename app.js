const express = require('express')
const { json, urlencoded } = require('express')
const { Helpers, genericErrors, constants } = require('./utils')
const { notFoundApi } = genericErrors
const { WELCOME, v1 } = constants
const apiRoutes = require('./routes/v1')
const config = require('./config/config')
const db = require('./database/postgresql')
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');


const {
  GenericHelper: { errorResponse, successResponse }
} = Helpers

const app = express()
// adds middleware that parses requests whose content-type is application/json
app.use(json())
// adds middleware that parses requests with x-www-form-urlencoded data encoding
app.use(urlencoded({ extended: true }))
// adds a heartbeat route for the culture
// create home route
app.get('/auth', (req, res) => {
  res.render('home', { user: req.user });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});
// app.get('/', (req, res) => successResponse(res, { message: WELCOME }))
// serves v1 api routes
app.use(v1, apiRoutes)
// catches 404 errors and forwards them to error handlers
app.use((req, res, next) => {
  next(notFoundApi)
})
//handles all forwarded errors
app.use((err, req, res, next) => errorResponse(req, res, err))

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.COOKIEKEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);



const dotenv = require("dotenv");
dotenv.config();
const { DATABASE_URI } = process.env;

// initialize the port constant
const port = config.PORT || 3000
// server listens for connections
app.listen(port, async () => {
  try {
    await mongoose.connect('mongodb+srv://space-ex:12345@cluster0.kh4cu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log(`Database Is Not Connected`);
  }
  console.log('Server started listening on port', port)
})
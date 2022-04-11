const express = require('express')
const { json, urlencoded } = require('express')
const { Helpers, genericErrors, constants } = require('./utils')
const { notFoundApi } = genericErrors
const { WELCOME, v1 } = constants
const apiRoutes = require('./routes/v1')
const config = require('./config/config')
const db = require('./database/postgresql')


const {
  GenericHelper: { errorResponse, successResponse }
} = Helpers

const app = express()
// adds middleware that parses requests whose content-type is application/json
app.use(json())
// adds middleware that parses requests with x-www-form-urlencoded data encoding
app.use(urlencoded({ extended: true }))
// adds a heartbeat route for the culture
app.get('/', (req, res) => successResponse(res, { message: WELCOME }))
// serves v1 api routes
app.use(v1, apiRoutes)
// catches 404 errors and forwards them to error handlers
app.use((req, res, next) => {
  next(notFoundApi)
})
//handles all forwarded errors
app.use((err, req, res, next) => errorResponse(req, res, err))



// initialize the port constant
const port = config.PORT || 3000
// server listens for connections
app.listen(port, () => {
  console.log('Server started listening on port', port)
})
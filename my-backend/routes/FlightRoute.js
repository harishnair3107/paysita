const express = require('express')
const router = express.Router()
const {AirportList,searchFlight }= require('../FlightbookingAPI')

router.get('/flightAirport',AirportList)
router.post('/flightSearch',searchFlight)

module.exports = router
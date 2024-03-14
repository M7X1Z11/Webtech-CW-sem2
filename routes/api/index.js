// Import the express framework
const express = require('express')

// Import the event_router module
const event_router = require('./event')

// Create a new router instance
const router = express.Router()

// Register the event_router as a child router under the '/event' path
router.use('/event', event_router)

// Export the router module
module.exports = router

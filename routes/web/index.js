// Import the express framework
const express = require('express')

// Import the home_router module for handling routes related to home
const home_router = require('./home')

// Create a new router instance
const router = express.Router()

// Register the home_router as a child router under the root path '/'
router.use('/', home_router)

// Export the router module
module.exports = router

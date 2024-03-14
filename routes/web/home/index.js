// Import the express framework
const express = require('express')

// Create a new router instance
const router = express.Router()

// Import the home_controller module for handling web requests related to home
const home_controller = require('../../../controllers/web/home')

// Define routes and their corresponding controller methods
router.get('/', home_controller.index)  // Route for displaying home page
router.get('/add', home_controller.add) // Route for displaying add event page
router.get('/update', home_controller.update) // Route for displaying update event page
router.get('/update/:id', home_controller.update) // Route for displaying update event page with specific ID

// Export the router module
module.exports = router

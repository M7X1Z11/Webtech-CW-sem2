// Import the express framework and express-validator for validation
const express = require('express')
const { validationResult } = require('express-validator')

// Import validation functions for event operations
const {
	addEventValidation,
	updateEventValidation,
	deleteEventValidation,
} = require('../../../validators/event')

// Create a new router instance
const router = express.Router()

// Import event controller module
const event_controller = require('../../../controllers/api/event')

// Define routes for handling CRUD operations on events
router.get('/', (req, res) => {
    // Handle GET request to retrieve all events
	event_controller.getAll(req, res)
})

router.post('/', addEventValidation(), (req, res) => {
    // Validate request body using addEventValidation middleware
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
        // If there are validation errors, return a 400 response with error details
		return res.status(400).json({ errors: errors.array() })
	}

    // Call the create method in the event controller to add a new event
	event_controller.create(req, res)
})

router.put('/:id', updateEventValidation(), (req, res) => {
    // Validate request body using updateEventValidation middleware
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
        // If there are validation errors, return a 400 response with error details
		return res.status(400).json({ errors: errors.array() })
	}

    // Call the update method in the event controller to update an existing event
	event_controller.update(req, res)
})

router.delete('/:id', deleteEventValidation(), (req, res, next) => {
    // Validate request parameters using deleteEventValidation middleware
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
        // If there are validation errors, return a 400 response with error details
		return res.status(400).json({ errors: errors.array() })
	}

    // Call the delete method in the event controller to delete an event
	event_controller.delete(req, res)
})

// Export the router module
module.exports = router

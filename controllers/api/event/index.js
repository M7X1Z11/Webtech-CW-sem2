// Import the event service module
const event_service = require('../../../services/event')

// Define event controller methods
const event_controller = {
    // Get all events
	getAll(req, res) {
		res.json(event_service.getAll())
	},

    // Create a new event
	create(req, res) {
		res.status(201).json(event_service.create(req, res))
	},

    // Update an existing event
	update(req, res) {
        // Call the update method from the event service to update the event
		const event = event_service.update(req.params.id, req.body)

        // Check if the event was successfully updated
		if (event) {
            // If updated, send the updated event as a JSON response
			res.json(event)
		} else {
            // If event not found, send a 404 status and error message
			res.status(404).send('Event was not found')
		}
	},

    // Delete an event
	delete(req, res) {
        // Retrieve the event by ID from the event service
		const event = event_service.getById(req.params.id)

        // Check if the event exists
		if (event) {
            // If event exists, delete it from the event service
			event_service.delete(req.params.id)
            // Send a 204 status indicating successful deletion
			res.status(204).send('Event was deleted successfully')
		} else {
            // If event not found, send a 404 status and error message
			res.status(404).send('Event was not found')
		}
	},
}

// Export the event controller module
module.exports = event_controller

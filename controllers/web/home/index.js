// Import the event service module
const event_service = require('../../../services/event')

// Define home controller methods
const home_controller = {
    // Render the home page
	index: async (req, res) => {
		res.render('home')
	},

    // Render the add event page
	add: async (req, res) => {
		res.render('home/add_update', { mode: 'Add' })
	},

    // Render the update event page with data of the specified event
	update: async (req, res) => {
        // Retrieve event data by ID from the event service
		const eventData = await event_service.getById(req.params.id)
        // Render the update event page with mode set to 'Update' and eventData
		res.render('home/add_update', { mode: 'Update', eventData: eventData })
	},
}

// Export the home controller module
module.exports = home_controller

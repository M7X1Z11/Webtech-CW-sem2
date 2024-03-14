// Import the fs module for file system operations
const fs = require('fs')

// Import the events array from the global.mock_db file
const events = require(global.mock_db)

// Define an event service object with methods for handling events
const event_service = {
    // Method to retrieve all events
	getAll() {
		return events
	},
    // Method to retrieve an event by its ID
	getById(id) {
		return events.find(t => t.id == id)
	},
    // Method to create a new event
	create(req, res) {
        // Generate a new ID for the event
		let new_id = genRandId(4)

        // Extract event data from the request body
		const event = req.body

        // Create a new event object with the generated ID
		const new_event = {
			id: new_id,
			event: event,
		}

        // Add the new event to the events array
		events.push(new_event)

        // Write the updated events array to the file
		writeToFile(events)

        // Return the newly created event
		return new_event
	},
    // Method to update an existing event
	update(id, updateData) {
        // Find the index of the event with the specified ID
		const eventIndex = events.findIndex(t => t.id == id)

        // If the event is not found, return null
		if (eventIndex === -1) {
			return null
		}

        // Merge the update data into the existing event object
		events[eventIndex].event = {
			...events[eventIndex].event,
			...updateData,
		}

        // Write the updated events array to the file
		writeToFile(events)

        // Return the updated event
		return events[eventIndex]
	},
    // Method to delete an event by its ID
	delete(id) {
        // Find the index of the event with the specified ID
		const index = events.findIndex(u => u.id == id)
        
        // Remove the event from the events array
		events.splice(index, 1)
        
        // Write the updated events array to the file
		writeToFile(events)
	},
}

// Function to write the events array to the file
let writeToFile = async users => {
    // Write the events array to the file in JSON format with proper indentation
	await fs.writeFileSync(global.mock_db, JSON.stringify(users, null, 4), 'utf8')
}

// Function to generate a random ID of specified length
let genRandId = count => {
	let result = ''
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	for (let i = 0; i < count; i++) {
        // Generate a random character from the characters string and append it to the result
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

// Export the event_service object to make it accessible from other modules
module.exports = event_service

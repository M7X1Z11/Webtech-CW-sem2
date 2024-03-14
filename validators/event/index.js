// Import necessary modules and services
const { body, param } = require('express-validator')
const event_service = require('../../services/event')

// Define validation middleware for adding an event
const addEventValidation = () => {
	return [
		// Validate event name
		body('eventName')
			.notEmpty()
			.withMessage('Event name must not be empty')
			.isLength({ min: 8, max: 255 })
			.withMessage('Event name must be between 8 and 255 characters long'),

		// Validate event date and time format
		body('eventDateTime')
			.notEmpty()
			.withMessage('Event date time must not be empty')
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,
				'g'
			)
			.withMessage(
				'Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'
			),

		// Validate event location
		body('eventLocation').notEmpty().withMessage('Location must not be empty'),

		// Validate event description
		body('eventDescription').notEmpty().withMessage('Description must not be empty'),
	]
}

// Define validation middleware for deleting an event
const deleteEventValidation = () => {
	return [
		// Validate event ID and check if it exists in the database
		param('id').custom(async id => {
			const exists = await event_service.getById(id)
			if (!exists) {
				throw new Error('Event was not found')
			}
		}),
	]
}

// Define validation middleware for updating an event
const updateEventValidation = () => {
	return [
		// Validate event ID and check if it exists in the database
		param('id').custom(async id => {
			const exists = await event_service.getById(id)
			if (!exists) {
				throw new Error('Event was not found')
			}
		}),

		// Validate event name
		body('eventName')
			.notEmpty()
			.withMessage('Event name must not be empty')
			.isLength({ min: 8, max: 255 })
			.withMessage('Event name must be between 8 and 255 characters long'),

		// Validate event date and time format
		body('eventDateTime')
			.notEmpty()
			.withMessage('Event date time must not be empty')
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,
				'g'
			)
			.withMessage(
				'Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'
			),

		// Validate event location
		body('eventLocation').notEmpty().withMessage('Location must not be empty'),

		// Validate event description
		body('eventDescription').notEmpty().withMessage('Description must not be empty'),
	]
}

// Export the validation middleware functions
module.exports = {
	addEventValidation,
	updateEventValidation,
	deleteEventValidation,
}

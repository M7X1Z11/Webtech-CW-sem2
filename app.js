// Importing required modules
const express = require('express'); // Importing Express framework
const body_parser = require('body-parser'); // Importing body-parser middleware for parsing incoming request bodies
const path = require('path'); // Importing path module for working with file and directory paths

// Setting up the path to the mock database file
global.mock_db = path.join(__dirname, './data/mock_db.json');

// Importing route modules for web and API routes
const web_route = require('./routes/web'); // Importing web routes
const api_route = require('./routes/api'); // Importing API routes

// Creating an Express application instance
const app = express();

// Setting the view engine to use Pug templates
app.set('view engine', 'pug');

// Serving static files from the 'public' directory for CSS and JavaScript files
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

// Parsing incoming JSON request bodies
app.use(express.json());

// Parsing incoming URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Mounting API routes under the '/api' prefix and web routes under the root '/'
app.use('/api', api_route); // Mounting API routes
app.use('/', web_route); // Mounting web routes

// Redirecting all other requests to the root URL
app.use((req, res) => {
    res.redirect('/');
});

// Setting up the server to listen on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`)); // Starting the server and logging a message once it's running

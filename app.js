// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express"),
      httpApp = express(),
      httpsApp = express(),
      http = require("http"),
      https = require("https"),
      path = require("path"),
      fs = require("fs")

// Set up port numbers, defaulting to 80 and 443 if not specified in environment variables
const HTTP_PORT = process.env.HTTP_PORT | 80;
const HTTPS_PORT = process.env.HTTPS_PORT | 443;

// Set the view engine for the HTTPS app to EJS
httpsApp.set("view engine", "ejs");

// Create and start the HTTP server
http.createServer(httpApp).listen(HTTP_PORT, () => {
    console.log(`Server is running at ${HTTP_PORT} port.`)
});

// Create and start the HTTPS server with SSL/TLS configuration
https.createServer(
    {
        cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
        key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
        passphrase: "changeme"
    }, httpsApp
).listen(HTTPS_PORT, () => {
    console.log(`Server is running at ${HTTPS_PORT} port.`)
});

// Middleware to redirect all HTTP requests to HTTPS
httpApp.use((req, res) => {
    const redirectURL = `https://${req.headers.host}${req.url}`;
    res.redirect(301, redirectURL)
})

// Route handler for the root path, rendering the index.ejs template
httpsApp.get("/", (req, res) => {
    res.render(path.join(__dirname, "template", "index.ejs"))
})

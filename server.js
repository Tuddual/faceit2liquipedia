'use strict';
const express = require('express');
const faceit = require("./back/routes/faceit");
const path = require('path');

const app = express()
const PORT = process.env.PORT || 8080;

// set up routes
app.use("/faceit", faceit);

// add front page
app.use(express.static(path.join(__dirname, './public')));

// connect express server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));

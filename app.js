
/* Setup app */
const express = require('express');
const app = express();

/* Declare port */
const PORT = 3000;


/* Start the application */
app.listen(PORT, ()=>{console.log(`Server is listening on port ${PORT}...`)});

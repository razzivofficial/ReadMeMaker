const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const User = require('./routes/Users')

const dbconnect = require('./db/db');


dbconnect()

const app = express();
app.use(cors());
const port = 3000

app.use(bodyParser.json());


app.use('/users',User);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
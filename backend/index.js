const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const User = require('./routes/Users')
const Editor = require('./routes/Editor')

const dbconnect = require('./db/db');


dbconnect()

const app = express();
app.use(cors());
const port = 5000

app.use(bodyParser.json());


app.use('/users',User);
app.use('/editor',Editor);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
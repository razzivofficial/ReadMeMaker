const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const User = require('./routes/Users')
const Editor = require('./routes/Editor')
const Feed = require('./routes/Feedback')
const geminiRoutes = require('./routes/gemini');

const dbconnect = require('./db/db');


dbconnect()

const app = express();
app.use(cors());
const port = 5000

app.use(bodyParser.json());


app.use('/users',User);
app.use('/editor',Editor);
app.use('/feed',Feed);
app.use('/generate', geminiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
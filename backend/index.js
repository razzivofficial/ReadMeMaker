const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./routes/Users");
const dbconnect = require("./db/db");

dbconnect();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", User); // Updated route

const port = process.env.PORT || 5000; // Use the PORT environment variable provided by Vercel

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

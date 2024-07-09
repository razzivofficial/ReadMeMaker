require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const mongoose = require('mongoose')

async function dbconnect(){
    DBURL = MONGO_URL
    DBNAME = "Readme"

    try{
        await mongoose.connect(DBURL+"/"+DBNAME)
        console.log("DB Connected")
    }
    catch(error){
        console.log(error)
    }
}


module.exports = dbconnect
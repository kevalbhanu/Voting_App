const mongoose = require('mongoose');
const URL = 'mongodb://localhost:27017/Voting_App';

mongoose.connect(URL);
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to Mongo Db Server");
})

db.on('error',(err)=>{
    console.error('Error:',err);
})
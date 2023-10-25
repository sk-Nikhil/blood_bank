const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://taskapp:Nikhil29@clusters.yst9fuj.mongodb.net/blood_bank_data?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    ssl:true
})
.then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log(err);
})

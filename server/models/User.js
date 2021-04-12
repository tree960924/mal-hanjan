const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {type : String, requierd : true, unique: true},
    pw : {type : String, requierd : true},
    name : {type : String, requierd : true},
    birth : {type : Date, requierd : true},
    gender : {type : String, requierd : true},
    email : {type : String, requierd : true}
})

module.exports = mongoose.model('User', userSchema);
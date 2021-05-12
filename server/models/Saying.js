const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
    name : {type : String, requierd : true},
    born : {type : String},
    died : {type : String},
    introduce : {type : String}
})

const commentSchema = new mongoose.Schema({
    content : {type : String, requierd:true},
    user_id : {type : String},
    date : {type:Date, default:Date.now}
})

const sayingSchema = new mongoose.Schema({
    sentence : {type : String, requierd : true},
    speaker : speakerSchema,
    source : {type : String},
    tags : [String],
    comments : [commentSchema]
})

sayingSchema.methods.addComment = function(content, user_id){
    this.comments.push({"content" : content, "user_id" : user_id});
    return this.save();
}

module.exports = mongoose.model('Saying', sayingSchema);
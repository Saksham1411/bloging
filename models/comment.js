const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
},{ timestamps:true});

module.exports = mongoose.model("Comment",commentSchema);
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:'',
        max:50
    },
    description:{
        type:String,
        default:''
    },
    start:{
        type:Number,
        required:true
    },
    end:{
        type:Number,
        required:true
    },
    priority:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Task",taskSchema);

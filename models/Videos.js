import mongoose from "mongoose";

const VidSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    time: { 
        type: Date, 
        default: Date.now()
    },
    vidUrl: { 
        type: String, 
        required: true 
    },      
    desc:{
        type: String,
    },
    tags:[{
        type: String,
    }]
},{collection:'videos'});

export default mongoose.model("Meme", VidSchema);
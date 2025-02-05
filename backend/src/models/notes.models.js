import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    notesName:{
        type: String,
        required: [true,"notesName is required"],
        trim: true
    },
    title: {
        type: String,
        required: [true,"title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true,"description is required"],
    },
    author:{
        type: String
    },
    img:{
        type: String
    },
    createdOn:{
        type: Date,
        default: new Date().getTime()
    }
},{
    timestamps: true
})

const Notes = mongoose.model("Notes",noteSchema);
export default Notes;
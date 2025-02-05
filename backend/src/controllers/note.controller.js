import Notes from "../models/notes.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"




// endpoint to add a note
export const addNote = asyncHandler(async (req , res ) =>{


    const {notesName, title , description } = req.body

    if(
        [notesName , title , description].some((x) => x.trim()=== "")
    ){
        throw new ApiError(400 , "all fields are required");
    }


    const newNote = await Notes.create({
        notesName,
        title,
        description,
        author:req.user.username

    })

    await newNote.save()

    if(!newNote){
        throw new ApiError(400 , "something went wrong while adding note");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200 , newNote,"note added successfully")
    )


})

//endpoint to edit a note 

export const editNote = asyncHandler(async(req , res ) =>{

    const {id} = req.params

    const {notesName, title , description } = req.body

    if(
        [notesName , title , description].some((x) => x.trim()=== "")
    ){
        throw new ApiError(400 , "all fields are required");
    }

    const updatedNote = await Notes.findByIdAndUpdate(
        id,
        {
            $set:{
                notesName,
                title,
                description
            }
        },
        {new:true}
    )

    if(!updatedNote){
        throw new ApiError(400 , "something went wrong while updating note");
    }

    await updatedNote.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200 , updatedNote,"note updated successfully")
    )
})

// ednpoint to get all notes 

export const getAllNotes = asyncHandler(async (req , res ) =>{

    if(!req.user.username){
        throw new ApiError(400 , "user not found");
    }
    const notes = await Notes.find({author:req.user.username}).sort({createdOn:-1})

    if(!notes){
        throw new ApiError(400 , "something went wrong while getting notes");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200 , notes,"notes fetched successfully")
    )

})
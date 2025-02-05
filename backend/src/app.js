import express from  "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(express.json({limit:"10mb"})); // adjust the limit as needed
app.use(express.urlencoded({
    limit:"10mb",
    extended:true
}));
app.use(express.static("public"));
app.use(cookieParser());


// import routes

import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/note.routes.js"


// routes declaration 
app.use("/user",userRoutes)
app.use("/notes",notesRoutes)


export default app
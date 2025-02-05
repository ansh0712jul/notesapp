import { Router } from "express";
import { addNote, editNote, getAllNotes } from "../controllers/note.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-note").post(verifyJwt, addNote);
router.route("/update-note/:id").patch(verifyJwt,editNote);
router.route("/get-notes").get(verifyJwt, getAllNotes);

export default router;
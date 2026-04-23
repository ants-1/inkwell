import { Router } from "express";
import {
  getAllNotesController,
  getNoteController,
  createNoteController,
  updateNoteController,
  deleteNoteController,
  renderMarkdownController,
} from "./noteController";
import { verifyToken } from "../../middleware/authMiddleware";

const router = Router();

router.get("/users/:userId/notes", verifyToken, getAllNotesController);
router.get("/notes/:id", verifyToken, getNoteController);
router.post("/users/:userId/notes", verifyToken, createNoteController);
router.put("/notes/:id", verifyToken, updateNoteController);
router.delete("/notes/:id", verifyToken, deleteNoteController);
router.get("/notes/:id/render", verifyToken, renderMarkdownController);

export default router;
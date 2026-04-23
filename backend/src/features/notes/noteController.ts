import { Request, Response, NextFunction } from "express";
import {
  getNoteService,
  getAllNotesService,
  updateNoteService,
  deleteNoteService,
  createNoteService,
  renderMarkdownService,
} from "./noteService";

export const getAllNotesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params as { userId: string };

    const { notes } = await getAllNotesService(userId);

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

export const getNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    const { note } = await getNoteService(id);

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const createNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params as { userId: string };
    const { title, content } = req.body;

    const { note } = await createNoteService(title, content, userId);

    res
      .status(200)
      .json({ success: true, message: "Note sucessfully created", data: note });
  } catch (error) {
    next(error);
  }
};

export const updateNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params as { id: string };
  const { title, content } = req.body;

  const { note } = await updateNoteService(id, title, content);

  res.status(200).json({
    success: true,
    message: "Note updated sucessfully",
    data: note,
  });
};

export const deleteNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params as { id: string };

  const { message } = await deleteNoteService(id);

  res.status(200).json({
    success: true,
    message,
    data: [],
  });
};

export const renderMarkdownController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params as { id: string };

  const { html } = await renderMarkdownService(id);

  res.status(200).json({
    success: true,
    data: html,
  });
};

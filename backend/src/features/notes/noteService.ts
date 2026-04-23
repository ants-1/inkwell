import { ApiError } from "../../utils/apiError";
import { renderMarkdown } from "../../utils/renderMarkdown";
import Note, { INote } from "../notes/noteModel";
import { createNoteSchema, updateNoteSchema } from "./noteValidation";

export const getAllNotesService = async (userId: string) => {
  const notes: INote[] | null = await Note.find({ user: userId }).populate(
    "user",
  );

  if (!notes) {
    throw new ApiError("Notes not found", 404, "NOT_FOUND");
  }

  return {
    notes,
  };
};

export const getNoteService = async (id: string) => {
  const note: INote | null = await Note.findById(id);

  if (!note) {
    throw new ApiError("Not not found", 404, "NOT_FOUND");
  }

  return {
    note,
  };
};

export const createNoteService = async (
  title: string,
  content: string,
  userId: string,
) => {
  const result = createNoteSchema.safeParse({
    title,
    content,
    userId,
  });

  if (!result.success) {
    throw result.error;
  }

  const note = {
    title,
    content,
    user: userId,
  };

  const newNote: INote = await Note.create(note);

  return {
    note: newNote,
  };
};

export const updateNoteService = async (
  id: string,
  title: string,
  content: string,
) => {
  const result = updateNoteSchema.safeParse({
    title,
    content,
  });

  if (!result.success) {
    throw result.error;
  }

  const note = await Note.findById(id);

  if (!note) {
    throw new ApiError("Note does not exist", 404, "NOT_FOUND");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true, runValidators: true },
  );

  return {
    note: updatedNote,
  };
};

export const deleteNoteService = async (id: string) => {
  const deletedNote = await Note.findByIdAndDelete(id);

  if (!deletedNote) {
    throw new ApiError("Note does not exist", 404, "NOT_FOUND");
  }

  return {
    message: "Note successfully deleted",
  };
};

export const renderMarkdownService = async (id: string) => {
  const note = await Note.findById(id);

  if (!note) {
    throw new ApiError("Note not found", 404, "NOT_FOUND");
  }

  const html = renderMarkdown(note.content);

  return {
    html,
  };
};

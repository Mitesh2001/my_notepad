'use server';

import { connectToDatabase } from "./mongodb";
import { Note, NoteModel } from "./types";

export const fetchNoteBySlug = async (slug: Note['slug']): Promise<Note | null> => {
    const note = await NoteModel.findOne({ slug }).lean();
    return note;
}

export const createNote = async (data: Omit<Note, "_id">): Promise<Note> => {
    const newNote = new NoteModel(data);
    return await newNote.save();
}

export const handleContentChange = async (slug: Note['slug'], content: Note['content']) => {
    const note = await fetchNoteBySlug(slug);

    if (note && note.content === content) {
        return;
    }

    if (!note) {
        await createNote({ slug, content });
    } else {
        await updateContentByNoteId(note._id, content);
    }

}

export const updateContentByNoteId = async (noteId: Note['_id'], content: string) => {
    await connectToDatabase();
    await NoteModel.updateOne({ _id: noteId }, { $set: { content } });
};
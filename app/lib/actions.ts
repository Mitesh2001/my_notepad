'use server';

import { Note, NoteModel } from "./types";
import { redirect } from 'next/navigation';

export const fetchNoteBySlug = async (slug: Note['slug']): Promise<Note | null> => {
    const note = await NoteModel.findOne({ slug }).lean();
    return note;
}

export const fetchNoteBySharedSlug = async (sharedSlug: Note['sharedSlug']): Promise<Note | null> => {
    const note = await NoteModel.findOne({ sharedSlug }).lean();
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
        await createNote({ slug, content, sharedSlug: null });
    } else {
        await updateNoteById(note._id, { content });
    }
}

export const addSharedLinkSlug = async (slug: Note['slug'], sharedSlug: Note['sharedSlug']) => {
    const note = await fetchNoteBySlug(slug);
    if (note && note.sharedSlug !== sharedSlug) {
        await updateNoteById(note._id, { sharedSlug });
    }
}

export const updateNoteById = async (noteId: Note['_id'], data: Partial<Note>) => {
    await NoteModel.updateOne({ _id: noteId }, { $set: { ...data } });
}

export const changeSlug = async (currentSlug: Note['slug'], newSlug: Note['slug']) => {

    const note = await fetchNoteBySlug(currentSlug);
    if (!note) {
        redirect(`/${newSlug}`);
    }

    const noteWithNewSlug = await fetchNoteBySlug(newSlug);
    if (noteWithNewSlug && note !== noteWithNewSlug) {
        throw new Error("Invalid or taken URL");
    }

    await updateNoteById(note._id, { slug: newSlug }).then(() => {
        redirect(`/${newSlug}`);
    });
}
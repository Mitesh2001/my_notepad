import { Schema, Types, Model, model, models } from "mongoose";

export interface Counts {
    word: number,
    char: number
}

export interface Note {
    _id: Types.ObjectId;
    slug: string;
    content: string;
    sharedSlug?: string | null;
};

export type NoteModelType = Model<Note>;

const noteSchema = new Schema<Note, NoteModelType>({
    slug: { type: String, require: true, unique: true },
    content: { type: String, require: false, default: "" },
    sharedSlug: { type: String, require: false, sparse: true, default: null }
})

export const NoteModel: NoteModelType = models.Note || model('Note', noteSchema);
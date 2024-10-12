'use client'

import { FC, ChangeEventHandler, useState } from 'react'
import { handleContentChange } from '../lib/actions';
import { Counts, Note } from '../lib/types';
import { debounce, getCharCount, getWordCount } from '../lib/helper';
import Link from 'next/link';

interface NoteAreaProps {
    slug: string;
    newNoteSlug: string;
    defaultContent?: Note['content'];
};

const NoteArea: FC<NoteAreaProps> = ({ slug, newNoteSlug, defaultContent = "" }) => {

    const [counts, setcounts] = useState<Counts>({ word: getWordCount(defaultContent), char: getCharCount(defaultContent) });

    const changeContentHandler: ChangeEventHandler<HTMLTextAreaElement> = async (event) => {
        setcounts({ word: getWordCount(event.target.value), char: getCharCount(event.target.value) })
        await handleContentChange(slug, event.target.value);
    }

    const copyEditableLink = async () => {
        const editableLink = `${window.location.origin}/${slug}`;
        navigator.clipboard.writeText(editableLink).then(() => {
            alert("Editable link copied to clipboard!");
        });
    }

    return (
        <>
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-xl font-semibold text-blue-600">My Notepad </h1>
                <div className="flex space-x-10">
                    <Link href={newNoteSlug} className='text-gray-600 hover:text-gray-800 text-2xl'>
                        +
                    </Link>
                </div>
            </div>

            <div className="w-full h-96 py-4 rounded-md text-lg bg-white">
                <textarea
                    id="comment"
                    name="comment"
                    className="w-full h-full bg-transparent outline-none resize-none"
                    placeholder=''
                    defaultValue={defaultContent}
                    onChange={debounce(changeContentHandler, 200)}
                />
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Words: {counts.word} | Chars: {counts.char}</span>
                <div className="flex space-x-2">
                    <button className="text-blue-600" onClick={copyEditableLink} type='button'>Editable Link</button>
                    {/* <button className="text-blue-600" disabled>Share Link</button> */}
                </div>
            </div>
        </>
    )
}

export default NoteArea;
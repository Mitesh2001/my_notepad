'use client'

import { FC, ChangeEventHandler, useState } from 'react'
import { handleContentChange, addSharedLinkSlug } from '../lib/actions';
import { Counts, Note } from '../lib/types';
import { debounce, generateSlug, getCharCount, getWordCount } from '../lib/helper';
import Link from 'next/link';

interface NoteAreaProps {
    slug: string;
    newNoteSlug: string;
    defaultContent?: Note['content'];
    defaultNoteId?: string;
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

    const generateAndCopySharedLink = async () => {
        const generateSharedSlug = generateSlug();
        await addSharedLinkSlug(slug, generateSharedSlug);
        const sharedLink = `${window.location.origin}/share/${generateSharedSlug}`;
        navigator.clipboard.writeText(sharedLink).then(() => {
            alert("Shared link copied to clipboard!");
        });
    }

    return (
        <>
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-xl font-semibold text-blue-600">Clip Note</h1>
                <div className="flex space-x-10">
                    <Link href={newNoteSlug} className='text-gray-600 hover:text-gray-800 text-2xl'>
                        +
                    </Link>
                </div>
            </div>

            <div className="w-full h-[27rem] py-4 rounded-md text-lg bg-white note-content">
                <textarea
                    id="comment"
                    name="comment"
                    className="block w-full bg-white text-black font-sans border-0 resize-none outline-none leading-5 text-[15px]"
                    placeholder=''
                    defaultValue={defaultContent}
                    onChange={debounce(changeContentHandler, 200)}
                    style={{
                        fontFamily: "font-family: Arial, Helvetica, sans-serif"
                    }}
                    autoFocus={defaultContent.length === 0}
                />
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Words: {counts.word} | Chars: {counts.char}</span>
                <div className="flex space-x-2">
                    <button className="text-blue-600" onClick={copyEditableLink} type='button'>Editable Link </button>
                    {
                        counts.char > 0 && <button className="text-blue-600" onClick={generateAndCopySharedLink}>Share Link</button>
                    }
                </div>
            </div>
        </>
    )
}

export default NoteArea;
'use client'

import { FC, ChangeEventHandler, useState } from 'react'
import { handleContentChange } from '../lib/actions';
import { Counts, Note } from '../lib/types';
import { debounce, getCharCount, getWordCount } from '../lib/helper';

const NoteArea: FC<{ slug: string, defaultContent?: Note['content'] }> = ({ slug, defaultContent = "" }) => {

    const [counts, setcounts] = useState<Counts>({ word: getWordCount(defaultContent), char: getCharCount(defaultContent) });

    const changeContentHandler: ChangeEventHandler<HTMLTextAreaElement> = async (event) => {
        setcounts({ word: getWordCount(event.target.value), char: getCharCount(event.target.value) })
        await handleContentChange(slug, event.target.value);
    }

    return (
        <>
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h1 className="text-2xl font-semibold text-blue-600">My Notepad</h1>
                {/* <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-gray-800">+</button>
                    <button className="text-gray-600 hover:text-gray-800">✎</button>
                    <button className="text-gray-600 hover:text-gray-800">👤</button>
                </div> */}
            </div>

            <div>
                <textarea
                    id="comment"
                    name="comment"
                    className="w-full h-96 p-4 text-lg border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder='Write your notes here...'
                    defaultValue={defaultContent}
                    onChange={debounce(changeContentHandler, 200)}
                />
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Words: {counts.word} | Chars: {counts.char}</span>
                <div className="flex space-x-2">
                    <button className="text-blue-600" disabled>Editable Link</button>
                    <button className="text-blue-600" disabled>Share Link</button>
                </div>
            </div>
        </>
    )
}

export default NoteArea;

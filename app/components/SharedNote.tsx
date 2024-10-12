'use client'

import React, { FC, useState } from 'react';
import { Counts, Note } from '../lib/types';
import { getCharCount, getWordCount } from '../lib/helper';

interface SharedNoteProps {
    content: Note['content'];
};

const SharedNote: FC<SharedNoteProps> = ({ content }) => {

    const [counts] = useState<Counts>({ word: getWordCount(content), char: getCharCount(content) });

    return (
        <>
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-xl font-semibold text-blue-600">Clip Note </h1>
            </div>

            <div className="w-full h-96 py-4 rounded-md text-lg bg-white">
                <textarea
                    id="comment"
                    name="comment"
                    className="w-full h-full bg-transparent outline-none resize-none"
                    placeholder=''
                    defaultValue={content}
                    readOnly
                />
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Words: {counts.word} | Chars: {counts.char}</span>
            </div>
        </>
    )
}

export default SharedNote

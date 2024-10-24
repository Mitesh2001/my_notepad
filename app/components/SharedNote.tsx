'use client'

import React, { FC, useState } from 'react';
import { Counts, Note } from '../lib/types';
import { getCharCount, getWordCount } from '../lib/helper';
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface SharedNoteProps {
    content: Note['content'];
};

const SharedNote: FC<SharedNoteProps> = ({ content }) => {

    const [counts] = useState<Counts>({ word: getWordCount(content), char: getCharCount(content) });
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(content).then(() => {
            setCopied(true);
        });
    }

    return (
        <>
            <div className="flex justify-between items-center pb-4 border-b">
                <Link href={window.location.origin}>
                    <h1 className="text-xl font-semibold text-blue-600 cursor-pointer">Clip Note </h1>
                </Link>
                <div className="flex space-x-10">
                    {
                        copied ? <button className="text-green-600 text-2xl" disabled>
                            <CheckIcon className='h-5 ' />
                        </button> : <button onClick={copyToClipboard} className="text-gray-500 hover:text-gray-800 text-2xl">
                            <ClipboardIcon className='h-5' />
                        </button>
                    }
                </div>
            </div>

            <div className="w-full h-[calc(100vh-213px)] py-4 rounded-md text-lg bg-white note-content">
                <textarea
                    id="comment"
                    name="comment"
                    className="block w-full h-full bg-white text-black font-sans border-0 resize-none outline-none leading-5 text-[15px]"
                    placeholder=''
                    defaultValue={content}
                    style={{
                        fontFamily: "font-family: Arial, Helvetica, sans-serif"
                    }}
                />
            </div>

            <div className="mt-4 flex justify-between items-center min-h-[28px]">
                <span className="text-sm text-gray-500">Words: {counts.word} | Chars: {counts.char}</span>
            </div>
        </>
    )
}

export default SharedNote
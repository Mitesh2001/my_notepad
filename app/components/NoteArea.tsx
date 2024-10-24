'use client'

import { FC, ChangeEventHandler, useState } from 'react'
import { handleContentChange, addSharedLinkSlug } from '../lib/actions';
import { Counts, Note } from '../lib/types';
import { debounce, generateSlug, getCharCount, getWordCount } from '../lib/helper';
import Link from 'next/link';
import {
    ArrowUturnRightIcon, PencilIcon, PlusIcon, LinkIcon
} from '@heroicons/react/24/outline';
import ChangeUrlModal from './ChangeUrlModal';

interface NoteAreaProps {
    slug: string;
    newNoteSlug: string;
    defaultContent?: Note['content'];
    defaultNoteId?: string;
};

const NoteArea: FC<NoteAreaProps> = ({ slug, newNoteSlug, defaultContent = "" }) => {

    const [counts, setcounts] = useState<Counts>({ word: getWordCount(defaultContent), char: getCharCount(defaultContent) });
    const [isEditUrlDialogVisible, setIsEditUrlDialogVisible] = useState<boolean>(false);

    const changeContentHandler: ChangeEventHandler<HTMLTextAreaElement> = async (event) => {
        setcounts({ word: getWordCount(event.target.value), char: getCharCount(event.target.value) })
        await handleContentChange(slug, event.target.value);
    }

    const copyEditableLink = async () => {
        const editableLink = `${window.location.origin}/${slug}`;
        await navigator.clipboard.writeText(editableLink).then(() => {
            alert("Editable link copied to clipboard!");
        });
    }

    const generateAndCopySharedLink = async () => {
        const generateSharedSlug = generateSlug();
        await addSharedLinkSlug(slug, generateSharedSlug);
        const sharedLink = `${window.location.origin}/share/${generateSharedSlug}`;
        await navigator.clipboard.writeText(sharedLink).then(() => {
            alert("Shared link copied to clipboard!");
        });
    }

    return (
        <>
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-xl font-semibold text-blue-600">Clip Note</h1>
                <div className="flex space-x-5">
                    <Link href={newNoteSlug}>
                        <PlusIcon className='h-5 w-5 text-gray-600 hover:text-gray-800 text-2xl' />
                    </Link>
                    <PencilIcon
                        className='h-5 w-4 text-gray-500 hover:text-gray-800 text-2xl cursor-pointer'
                        onClick={() => setIsEditUrlDialogVisible(true)}
                    />
                </div>
            </div>

            <div className="w-full h-[calc(100vh-213px)] py-4 rounded-md text-lg bg-white note-content">
                <textarea
                    id="comment"
                    name="comment"
                    className="block w-full h-full bg-white text-black font-sans border-0 resize-none outline-none leading-5 text-[15px]"
                    placeholder=''
                    defaultValue={defaultContent}
                    onChange={debounce(changeContentHandler, 200)}
                    style={{
                        fontFamily: "font-family: Arial, Helvetica, sans-serif"
                    }}
                    autoFocus={defaultContent.length === 0}
                />
            </div>

            <div className="mt-4 flex max-sm:flex-col max-sm:gap-2 justify-between items-center min-h-[28px]">
                <span className="text-sm text-gray-500">Words: {counts.word} | Chars: {counts.char}</span>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-md px-2.5 py-1 text-sm text-blue-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                        onClick={copyEditableLink}
                    >
                        <LinkIcon aria-hidden="true" className="-ml-0.5 h-4 w-4" />
                        Editable Link
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-md px-2.5 py-1 text-sm text-blue-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                        onClick={generateAndCopySharedLink} disabled={counts.char === 0}
                    >
                        <ArrowUturnRightIcon aria-hidden="true" className="-ml-0.5 h-4 w-4" />
                        Share Link
                    </button>
                </div>
            </div>
            {isEditUrlDialogVisible && <ChangeUrlModal closeModal={() => setIsEditUrlDialogVisible(false)} slug={slug} />}
        </>
    )
}

export default NoteArea;
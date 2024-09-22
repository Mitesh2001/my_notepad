'use client'

import { FC, ChangeEventHandler } from 'react'
import { handleContentChange } from '../lib/actions';
import { Note } from '../lib/types';
import { debounce } from '../lib/helper';

const NoteArea: FC<{ slug: string, defaultContent?: Note['content'] }> = ({ slug, defaultContent = "" }) => {

    const changeContentHandler: ChangeEventHandler<HTMLTextAreaElement> = async (event) => {
        await handleContentChange(slug, event.target.value);
    }

    return (
        <div>
            <div className="mt-2">
                <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={defaultContent} onChange={debounce(changeContentHandler, 200)}
                />
            </div>
        </div>
    )

}

export default NoteArea

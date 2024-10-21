'use client'

import { FC, useState } from "react"
import { Note } from "../lib/types";
import { changeSlug } from "../lib/actions";

interface ChangeUrlModalProps {
    closeModal: () => void;
    slug: Note['slug'];
}

const ChangeUrlModal: FC<ChangeUrlModalProps> = ({ slug, closeModal }) => {

    const [errorMessage, seterrorMessage] = useState<string | null>(null);
    const [newUrl, setNewUrl] = useState<string>("");

    const changeUrl = async () => {
        if (!newUrl || newUrl === slug) return;
        try {
            await changeSlug(slug, newUrl);
            closeModal();
            seterrorMessage(null);
        } catch {
            seterrorMessage("Invalid or taken URL");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4 text-center">Change URL</h2>
                <input
                    type="text"
                    placeholder="Enter new URL"
                    className="w-full p-2 border border-gray-300 mb-2 rounded focus:outline-none"
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                />
                {errorMessage && (
                    <span className="text-red-600 text-sm">{errorMessage}</span>
                )}
                <div className="flex justify-end gap-3">
                    <button
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={changeUrl}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeUrlModal

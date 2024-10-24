'use client'

import { FC, useState } from "react"
import { Note } from "../lib/types";
import { changeSlug } from "../lib/actions";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ChangeUrlModalProps {
    closeModal: () => void;
    slug: Note['slug'];
}

const ChangeUrlModal: FC<ChangeUrlModalProps> = ({ slug, closeModal }) => {

    const [errorMessage, seterrorMessage] = useState<string | null>(null);
    const [newUrl, setNewUrl] = useState<string>("");

    const changeUrl = async () => {
        if (!newUrl) return;
        if (newUrl === slug) {
            closeModal();
            return;
        }
        try {
            await changeSlug(slug, newUrl);
        } catch {
            seterrorMessage("Invalid or taken URL");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white px-6 py-4 rounded-lg shadow-lg w-96 max-sm:mx-6">
                <h2 className="font-semibold mb-4 text-center">Change URL</h2>
                <div className="flex flex-col">
                    <div className="flex gap-3 mb-3">
                        <input
                            type="text"
                            placeholder="Enter new URL"
                            className="w-full p-2 border text-center h-8 border-gray-300 rounded focus:outline-none"
                            value={newUrl}
                            onChange={e => setNewUrl(e.target.value)}
                        />
                        <div className="flex justify-end gap-1">
                            <button
                                className="text-white px-2 py-1 rounded bg-gray-400 focus:outline-none"
                                onClick={changeUrl}
                            >
                                Change
                            </button>
                            <button
                                className="text-white px-2 py-1 rounded bg-gray-400 focus:outline-none"
                                onClick={closeModal}
                            >
                                <XMarkIcon className="h-5 w-4" />
                            </button>
                        </div>
                    </div>
                    <span className="text-red-600 text-sm font-semibold h-5">{errorMessage}</span>
                </div>
            </div>
        </div>
    )
}

export default ChangeUrlModal

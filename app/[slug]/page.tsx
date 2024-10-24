
import { notFound } from 'next/navigation';
import { NextPage } from 'next';
import NoteArea from '../components/NoteArea';
import { fetchNoteBySlug } from '../lib/actions';
import { generateSlug } from '../lib/helper';

interface SlugPageProps {
    params: {
        slug: string;
    };
}

const Page: NextPage<SlugPageProps> = async ({ params }) => {

    const { slug } = params;

    if (!slug) {
        notFound();
    }

    const note = await fetchNoteBySlug(slug);

    const newNoteSlug = generateSlug();

    return (
        <div className="container max-sm:mx-3 p-6 bg-white border border-solid rounded-sm border-[#d9d9d9]">
            <NoteArea {...{ slug, newNoteSlug }} defaultContent={note?.content} />
        </div>
    );
}

export default Page
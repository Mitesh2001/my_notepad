
import { notFound } from 'next/navigation';
import { NextPage } from 'next';
import NoteArea from '../components/NoteArea';
import { fetchNoteBySlug } from '../lib/actions';

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

    return (
        <div className="container p-6 bg-white rounded-lg shadow-lg">
            <NoteArea {...{ slug }} defaultContent={note?.content} />
        </div>
    );
}

export default Page
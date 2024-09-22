
import { notFound } from 'next/navigation';
import NoteArea from '../components/NoteArea';
import { NextPage } from 'next';
import { fetchNoteBySlug } from '../lib/actions';

interface SlugPageProps {
    params: {
        slug: string;
    };
}

const Page: NextPage<SlugPageProps> = async ({ params }) => {
    const { slug } = params;

    const note = await fetchNoteBySlug(slug);

    if (!slug) {
        notFound();
    }

    return (
        <div>
            <NoteArea {...{ slug }} defaultContent={note?.content} />
        </div>
    );
}

export default Page
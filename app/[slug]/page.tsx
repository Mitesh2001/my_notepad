
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
        <div>
            <NoteArea {...{ slug }} defaultContent={note?.content} />
        </div>
    );
}

export default Page
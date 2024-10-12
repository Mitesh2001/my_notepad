
import { notFound } from 'next/navigation';
import { NextPage } from 'next';
import { fetchNoteBySharedSlug } from '@/app/lib/actions';
import SharedNote from '@/app/components/SharedNote';

interface SlugPageProps {
    params: {
        sharedSlug: string;
    };
}

const Page: NextPage<SlugPageProps> = async ({ params }) => {

    const { sharedSlug } = params;

    if (!sharedSlug) {
        notFound();
    }

    const note = await fetchNoteBySharedSlug(sharedSlug);

    if (!note) {
        notFound();
    }

    return (
        <div className="container p-6 bg-white rounded-lg shadow-lg">
            <SharedNote content={note.content} />
        </div>
    );

}

export default Page
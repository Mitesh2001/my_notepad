
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
        <div className="container max-sm:mx-3 p-6 bg-white border rounded-sm border-[#d9d9d9]">
            <SharedNote content={note.content} />
        </div>
    );

}

export default Page
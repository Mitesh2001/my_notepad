
import { notFound } from 'next/navigation';
import NoteArea from '../components/NoteArea';
import { NextPage } from 'next';

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

    return (
        <div>
            <NoteArea {...{ slug }} defaultContent={""} />
        </div>
    );
}

export default Page

import { notFound } from 'next/navigation';
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
            <h1>Server-Side Rendered Slug: {slug}</h1>
            <p>This page was generated for the slug: {slug}</p>
        </div>
    );

    // return (
    //     <div>
    //         <NoteArea {...{ slug }} defaultContent={""} />
    //     </div>
    // );
}

export default Page
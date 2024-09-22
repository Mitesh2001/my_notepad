
import { notFound } from 'next/navigation';

interface SlugPageProps {
    params: {
        slug: string;
    };
}

export default function SlugPage({ params }: SlugPageProps) {
    const { slug } = params;

    // Optionally, you can perform any server-side logic based on the slug
    // For example, you can validate the slug, fetch data, etc.

    // Example of basic slug validation
    if (!slug) {
        notFound();
    }

    return (
        <div>
            <h1>Server-Side Rendered Slug: {slug}</h1>
            {/* Render any server-fetched data or content based on the slug */}
        </div>
    );
}
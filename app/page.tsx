'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateRandomSlug } from './utils/generateSlug';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const randomSlug = generateRandomSlug();
    // Redirect to the generated slug
    router.push(`/${randomSlug}`);
  }, [router]);

  // Optionally, you can return a loading state while the redirect happens
  return <div>Redirecting...</div>;
}
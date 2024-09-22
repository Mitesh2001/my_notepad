import { redirect } from 'next/navigation';
import { generateRandomSlug } from './utils/generateSlug';

const HomePage = () => {

  const randomSlug = generateRandomSlug();

  redirect(`/${randomSlug}`);
}

export default HomePage;
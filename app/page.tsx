import { redirect } from "next/navigation";
import { generateRandomSlug } from "./utils/generateSlug";

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const randomSlug = generateRandomSlug();
  redirect(randomSlug);
}

export default HomePage;
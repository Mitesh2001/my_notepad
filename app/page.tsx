import { redirect } from "next/navigation";
import { generateSlug } from "./lib/helper";

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const randomSlug = generateSlug();
  redirect(randomSlug);
}

export default HomePage;
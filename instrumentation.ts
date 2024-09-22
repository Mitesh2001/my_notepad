import { connectToDatabase } from "./app/lib/mongodb"

export const register = async () => {
    await connectToDatabase();
}
import mongoose from 'mongoose';

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const cached: { conn: mongoose.Connection | null, promise?: Promise<mongoose.Connection> } = { conn: null };

export const connectToDatabase = async () => {
    // If a connection is already cached, return it
    if (cached.conn) {
        return cached.conn;
    }

    // If there is no connection promise, create a new one
    if (!cached.promise) {
        cached.promise = mongoose.connect(uri)
            .then((mongoose) => {
                console.log('Database connected successfully');
                return mongoose.connection;
            })
            .catch((err) => {
                console.error('Error connecting to the database:', err);
                throw new Error('Failed to connect to the database');
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed');
    }

    return cached.conn;
};
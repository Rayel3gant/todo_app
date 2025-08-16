import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URL!);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(1);
  }
};

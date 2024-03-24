import mongoose from "mongoose";

export async function connectMongoDb() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    connection.on("error", (err) => {
      console.log(
        `MongoDB connection error please make sure DB is UP and Running ${err}`
      );
      process.exit();
    });
  } catch (error) {
    console.error(`MongoDB connection failed` + error);
  }
}

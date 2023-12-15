import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log(">>>> DB coneect");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

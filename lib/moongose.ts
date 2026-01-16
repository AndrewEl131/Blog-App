import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://endi123467_db_user:Xt4yj0xUX7JzY2xg@cluster0.g3o548l.mongodb.net/?appName=Cluster0");
        console.log("connected to database!");
    } catch (error: any) {
        console.log(error.message);
    }
}

export default connectToDB
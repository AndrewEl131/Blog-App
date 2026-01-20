import { Model, Schema, models, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: null
    },
},
{ timestamps: true },
)

export default models.User || model("User", userSchema);
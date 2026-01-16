import mongoose, { model, models, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    slug: {
        type: String
    },
    likedBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default models.Post || model("Post", PostSchema);

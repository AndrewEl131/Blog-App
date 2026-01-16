import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      default: "Anonymous",
    },

    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;

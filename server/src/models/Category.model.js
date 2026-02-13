import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    icon: {
      type: String,
      default: "💰", // optional (UI use)
    },

    color: {
      type: String,
      default: "#6366f1", // optional (charts)
    },

    isDefault: {
      type: Boolean,
      default: false, // system vs user-created
    },
  },
  { timestamps: true }
);

/* 🚫 Prevent duplicate category per user & type */
categorySchema.index({ user: 1, name: 1, type: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;

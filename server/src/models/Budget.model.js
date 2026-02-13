import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    month: {
      type: Number, // 0–11 (JS month)
      required: true,
      min: 0,
      max: 11,
    },

    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

/* 🚫 One budget per category per month per user */
budgetSchema.index(
  { user: 1, category: 1, month: 1, year: 1 },
  { unique: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;

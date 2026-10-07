import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main_portfolio",
    },
    hero: { type: mongoose.Schema.Types.Mixed, default: {} },
    about: { type: mongoose.Schema.Types.Mixed, default: {} },
    services: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    footer: { type: mongoose.Schema.Types.Mixed, default: {} },
    customSections: { type: Array, default: [] },
    visibility: { type: mongoose.Schema.Types.Mixed, default: {} },
    theme: { type: mongoose.Schema.Types.Mixed, default: {} },
    passcode: { type: String, default: "rohit123" },
  },
  {
    timestamps: true,
  }
);

export const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);

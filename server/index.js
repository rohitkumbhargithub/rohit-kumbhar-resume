import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { Portfolio } from "./models/Portfolio.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health Check
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.json({ status: "ok", database: "connected", timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ status: "error", database: "disconnected", error: err.message });
  }
});

// GET Portfolio Data
app.get("/api/portfolio", async (req, res) => {
  try {
    await connectDB();
    const doc = await Portfolio.findOne({ key: "main_portfolio" });
    if (!doc) {
      return res.json({ exists: false, data: null });
    }
    res.json({
      exists: true,
      data: {
        hero: doc.hero,
        about: doc.about,
        services: doc.services,
        projects: doc.projects,
        footer: doc.footer,
        customSections: doc.customSections,
        visibility: doc.visibility,
        theme: doc.theme,
      },
      updatedAt: doc.updatedAt,
    });
  } catch (err) {
    console.error("GET /api/portfolio error:", err);
    res.status(500).json({ error: "Failed to fetch portfolio data from MongoDB", details: err.message });
  }
});

// POST / Save Portfolio Data
app.post("/api/portfolio", async (req, res) => {
  try {
    const { data, passcode } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Missing portfolio data payload" });
    }

    await connectDB();
    const existing = await Portfolio.findOne({ key: "main_portfolio" });

    // Validate passcode if existing document has one
    const expectedPasscode = existing?.passcode || process.env.ADMIN_PASSCODE || "rohit123";
    if (passcode && passcode !== expectedPasscode) {
      return res.status(401).json({ error: "Unauthorized: Invalid passcode" });
    }

    const updatePayload = {
      hero: data.hero,
      about: data.about,
      services: data.services,
      projects: data.projects,
      footer: data.footer,
      customSections: data.customSections || [],
      visibility: data.visibility || {},
      theme: data.theme || {},
    };

    const updated = await Portfolio.findOneAndUpdate(
      { key: "main_portfolio" },
      { $set: updatePayload },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      success: true,
      message: "Portfolio data successfully saved to MongoDB!",
      updatedAt: updated.updatedAt,
    });
  } catch (err) {
    console.error("POST /api/portfolio error:", err);
    res.status(500).json({ error: "Failed to save portfolio data to MongoDB", details: err.message });
  }
});

// Update Passcode
app.post("/api/portfolio/passcode", async (req, res) => {
  try {
    const { currentPasscode, newPasscode } = req.body;
    await connectDB();
    const existing = await Portfolio.findOne({ key: "main_portfolio" });
    const current = existing?.passcode || process.env.ADMIN_PASSCODE || "rohit123";

    if (currentPasscode !== current) {
      return res.status(401).json({ error: "Incorrect current passcode" });
    }

    if (!newPasscode || newPasscode.trim().length < 4) {
      return res.status(400).json({ error: "New passcode must be at least 4 characters" });
    }

    await Portfolio.findOneAndUpdate(
      { key: "main_portfolio" },
      { $set: { passcode: newPasscode.trim() } },
      { upsert: true }
    );

    res.json({ success: true, message: "Passcode updated successfully in MongoDB!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update passcode in MongoDB", details: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});

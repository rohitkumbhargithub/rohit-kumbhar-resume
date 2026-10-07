import { connectDB } from "../server/db.js";
import { Portfolio } from "../server/models/Portfolio.js";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    if (req.method === "GET") {
      const doc = await Portfolio.findOne({ key: "main_portfolio" });
      if (!doc) {
        return res.status(200).json({ exists: false, data: null });
      }
      return res.status(200).json({
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
    }

    if (req.method === "POST") {
      const { data, passcode } = req.body || {};
      if (!data) {
        return res.status(400).json({ error: "Missing portfolio data" });
      }

      const existing = await Portfolio.findOne({ key: "main_portfolio" });
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

      return res.status(200).json({
        success: true,
        message: "Saved to MongoDB Atlas!",
        updatedAt: updated.updatedAt,
      });
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    console.error("Vercel API error:", err);
    return res.status(500).json({ error: err.message });
  }
}

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { apiRouter } from "./server/routes";
import { db } from "./server/db";
import { notificationService } from "./server/notificationService";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security & Resilience Middlewares
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");
    
    // Performance measurement header
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      if (req.path.startsWith("/api")) {
        console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
      }
    });
    next();
  });

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Mount central API routes (Appointments, Notifications, AI Support, Auth, Admin, Webhooks)
  app.use("/api", apiRouter);

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      appName: "Amol Tiles World-Class Architecture Platform",
      version: "2026.4.0",
      environment: process.env.NODE_ENV || "development",
      uptimeSeconds: Math.floor(process.uptime()),
      time: new Date().toISOString()
    });
  });

  // AI Tile Consultant endpoint
  app.post("/api/ai-tile-consultant", async (req, res) => {
    try {
      const { userQuery, roomType, stylePreference, preferredSize, colorTheme } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          success: true,
          recommendation: `As Amol Tiles Senior Architectural Consultant, for your ${roomType || "space"} in ${stylePreference || "modern"} style with ${colorTheme || "neutral"} tones, we highly recommend our **Amol Grand GVT Statuario Imperial (800x1600mm High Gloss)** for living floors, paired with **Amol Fluted Brass Accent Wall Tiles (300x600mm Satin)**. This combination delivers high light reflectivity, spacious visual depth, and seamless zero-grout elegance.`,
          suggestedTiles: ['tile-statuario-01', 'tile-wall-fluted-06', 'tile-volcanic-05'],
          suggestedCatalogId: 'cat-gvt-2026',
          proTips: [
            "Use matching light grey 2mm epoxy grout for an uninterrupted continuous slab appearance.",
            "For high-moisture bath areas, specify non-porous Glazed Vitrified Tiles with water absorption < 0.05%.",
            "Pair high-gloss wall finishes with satin anti-skid floor tiles for optimum safety and optical balance."
          ]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the lead Architectural & Interior Design Consultant for "Amol Tiles", India's leading luxury tile & ceramic manufacturer (similar to Kajaria Ceramics).
User Query: "${userQuery || "Help me select the best tiles"}"
Context:
- Room Type: ${roomType || "Not specified"}
- Style Preference: ${stylePreference || "Modern Luxury"}
- Preferred Size: ${preferredSize || "Large Format (800x1600mm)"}
- Color Theme: ${colorTheme || "Warm & Neutral"}

Our flagship collections:
1. Amol Grand GVT & Carving Slabs (800x1600mm / 1200x2400mm - Statuario White, Royal Gold Onyx, Calacatta Bookmatch, Carved Oak Wood)
2. Amol Ceramic Wall Concepts (300x600mm / 300x900mm - Fluted Accent Wall, Emerald Kitchen Backsplash, Satin Floral)
3. Amol Heavy Duty Outdoor Pavers & Elevation (600x600x16mm - Slate Granite, Quarry Stone)
4. Amol Elegance Polished Vitrified (600x1200mm - Royal Ivory Double Charge)

Provide a warm, highly professional recommendation in 3 short bullet points, highlighting tile finishes, lighting advice, grout recommendations, and catalog suggestions. Be concise and authoritative.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const text = response.text || "Our top recommendation is the Amol Grand GVT Statuario Imperial series.";

      return res.json({
        success: true,
        recommendation: text,
        suggestedTiles: ['tile-statuario-01', 'tile-wall-fluted-06', 'tile-volcanic-05'],
        suggestedCatalogId: 'cat-gvt-2026',
        proTips: [
          "Use matching light grey 2mm epoxy grout for an uninterrupted continuous slab appearance.",
          "For high-moisture bath areas, specify non-porous Glazed Vitrified Tiles with water absorption < 0.05%.",
          "Pair high-gloss wall finishes with satin anti-skid floor tiles for optimum safety and optical balance."
        ]
      });

    } catch (error: any) {
      console.error("AI Consultant Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to process AI recommendation."
      });
    }
  });

  // Sample Request / Dealer Enquiry
  app.post("/api/inquire", async (req, res) => {
    try {
      const data = req.body;
      const customerName = data.customerName || data.name || 'Sample Requester';
      const customerPhone = data.phone || data.mobile || 'Not specified';
      const customerEmail = data.email || 'info@amoltiles.com';
      const customerMessage = `Sample Request for tiles: ${(data.tileIds || []).join(', ')}. User Type: ${data.userType || 'Professional'}. Address: ${data.address || ''}, ${data.city || ''} ${data.pincode || ''}. Notes: ${data.notes || 'None'}`;

      const contact = db.createContact({
        customerName,
        customerPhone,
        customerEmail,
        customerMessage,
        category: 'Physical Tile Sample Request'
      });

      // Notify both admins & send customer auto-reply
      notificationService.sendContactNotifications({
        id: contact.id,
        customerName: contact.customerName,
        customerPhone: contact.customerPhone,
        customerEmail: contact.customerEmail,
        customerMessage: contact.customerMessage
      }).catch(err => console.error('Inquiry notification dispatch error:', err));

      res.json({
        success: true,
        referenceId: contact.id,
        message: "Thank you! Your sample box / dealer quote request has been dispatched to Amol Tiles regional team.",
        estimatedDispatch: "2-3 Business Days"
      });
    } catch (err: any) {
      console.error('Inquire route error:', err);
      res.status(500).json({ error: 'Failed to submit inquiry', code: 'SERVER_ERROR' });
    }
  });

  // 404 handler for unmatched API routes
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      error: `API endpoint ${req.method} ${req.path} not found.`,
      code: "NOT_FOUND"
    });
  });

  // Vite Middleware handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Amol Tiles Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

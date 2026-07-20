var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_better_sqlite3 = __toESM(require("better-sqlite3"), 1);
var import_vite = require("vite");
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var db = new import_better_sqlite3.default("cms.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS cms_data (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  CREATE TABLE IF NOT EXISTS cms_media (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.use(import_express.default.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/cms/all", (req, res) => {
    try {
      const stmt = db.prepare("SELECT key, value FROM cms_data");
      const rows = stmt.all();
      const data = {};
      rows.forEach((row) => {
        data[row.key] = row.value;
      });
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/cms/batch", (req, res) => {
    try {
      const payload = req.body;
      const insert = db.prepare("INSERT OR REPLACE INTO cms_data (key, value) VALUES (?, ?)");
      const transaction = db.transaction((dataObj) => {
        for (const [key, val] of Object.entries(dataObj)) {
          insert.run(key, typeof val === "object" ? JSON.stringify(val) : String(val));
        }
      });
      transaction(payload);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/media/:key", (req, res) => {
    try {
      const { key } = req.params;
      const stmt = db.prepare("SELECT value FROM cms_media WHERE key = ?");
      const row = stmt.get(key);
      if (row) {
        res.json({ success: true, value: row.value });
      } else {
        res.status(404).json({ success: false, message: "Media not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/media", (req, res) => {
    try {
      const { key, value } = req.body;
      if (!key || !value) {
        res.status(400).json({ success: false, message: "Key and value are required" });
        return;
      }
      const stmt = db.prepare("INSERT OR REPLACE INTO cms_media (key, value) VALUES (?, ?)");
      stmt.run(key, value);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/cms/delete/:key", (req, res) => {
    try {
      const { key } = req.params;
      const stmt = db.prepare("DELETE FROM cms_data WHERE key = ?");
      stmt.run(key);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api/")) {
        return next();
      }
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}
startServer().catch((err) => {
  console.error("[Server] Startup failed:", err);
});
//# sourceMappingURL=server.cjs.map

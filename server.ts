import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_enterprise_2026_change_in_production';

// Initialize SQLite database
const db = new Database('cms.db');

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

// Ensure tables exist
db.exec(`
  CREATE TABLE IF NOT EXISTS cms_data (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cms_media (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size TEXT NOT NULL,
    url TEXT NOT NULL,
    resolution TEXT,
    optimized INTEGER DEFAULT 1,
    compression_ratio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cms_articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    video TEXT,
    tags TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cms_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cms_audit_logs (
    id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    role TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    ip_address TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default Admin User if none exists
const existingAdmin = db.prepare('SELECT id FROM cms_users WHERE email = ?').get('admin@playstation.com');
if (!existingAdmin) {
  const adminId = 'usr-admin-1';
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare(`
    INSERT INTO cms_users (id, email, password_hash, name, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(adminId, 'admin@playstation.com', hashedPassword, 'المهندس إسلام عرفة', 'admin');
}

// Authentication Middleware
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If no token, attach default guest or allow public read operations
    req.user = { id: 'usr-guest', email: 'guest@playstation.com', role: 'viewer', name: 'زائر' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      req.user = { id: 'usr-guest', email: 'guest@playstation.com', role: 'viewer', name: 'زائر' };
      return next();
    }
    req.user = decoded;
    next();
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Middlewares
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled CSP to allow Vite dynamic scripts and media previews
    crossOriginEmbedderPolicy: false
  }));

  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Body Parsing with high limits for Media uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Request logger & rate limiting tracker
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  app.use((req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || '127.0.0.1';
    const now = Date.now();
    const windowMs = 60 * 1000;
    const limit = 200;

    const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count++;
    }
    rateLimitMap.set(ip, record);

    if (record.count > limit) {
      res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
      return;
    }
    next();
  });

  // Attach Token Auth
  app.use('/api', authenticateToken);

  // ==========================================
  // REST API ENDPOINTS
  // ==========================================

  // 1. Health Check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'online',
      system: 'Playstation POS Enterprise CMS',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  });

  // 2. Authentication API
  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
      }

      const user = db.prepare('SELECT * FROM cms_users WHERE email = ?').get(email) as any;
      if (!user) {
        res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        return;
      }

      const validPassword = bcrypt.compareSync(password, user.password_hash);
      if (!validPassword) {
        res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        return;
      }

      const tokenPayload = { id: user.id, email: user.email, role: user.role, name: user.name };
      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

      // Log login event
      db.prepare(`
        INSERT INTO cms_audit_logs (id, user_name, role, action, details, ip_address)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run('log-' + Date.now(), user.name, user.role, 'تسجيل دخول ناجح', 'تم الدخول إلى لوحة التحكم', req.ip);

      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, role: user.role, name: user.name }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  app.get('/api/auth/me', (req: AuthenticatedRequest, res: Response) => {
    if (!req.user || req.user.id === 'usr-guest') {
      res.status(401).json({ success: false, message: 'غير مصرح' });
      return;
    }
    res.json({ success: true, user: req.user });
  });

  // 3. CMS Content REST API
  // GET /api/cms/content - Fetch all site configuration
  app.get('/api/cms/content', (req: Request, res: Response) => {
    try {
      const rows = db.prepare('SELECT key, value FROM cms_data').all() as { key: string; value: string }[];
      const data: Record<string, string> = {};
      rows.forEach(row => {
        data[row.key] = row.value;
      });
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // GET /api/cms/content/:key - Fetch specific key
  app.get('/api/cms/content/:key', (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      const row = db.prepare('SELECT value FROM cms_data WHERE key = ?').get(key) as { value: string } | undefined;
      if (row) {
        res.json({ success: true, key, value: row.value });
      } else {
        res.status(404).json({ success: false, message: 'Key not found' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // POST /api/cms/content/batch - Save multiple CMS keys instantly
  app.post('/api/cms/content/batch', (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const insert = db.prepare('INSERT OR REPLACE INTO cms_data (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');

      const transaction = db.transaction((dataObj: Record<string, any>) => {
        for (const [key, val] of Object.entries(dataObj)) {
          const formattedVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
          insert.run(key, formattedVal);
        }
      });

      transaction(payload);
      res.json({ success: true, timestamp: new Date().toISOString() });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // PUT /api/cms/content/:key - Update a single CMS key
  app.put('/api/cms/content/:key', (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const formattedVal = typeof value === 'object' ? JSON.stringify(value) : String(value);

      db.prepare('INSERT OR REPLACE INTO cms_data (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)').run(key, formattedVal);
      res.json({ success: true, key, value });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // DELETE /api/cms/content/:key - Delete a key
  app.delete('/api/cms/content/:key', (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      db.prepare('DELETE FROM cms_data WHERE key = ?').run(key);
      res.json({ success: true, message: `Key ${key} deleted` });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // 4. Articles / Blog REST API
  app.get('/api/cms/articles', (req: Request, res: Response) => {
    try {
      const rows = db.prepare('SELECT * FROM cms_articles ORDER BY created_at DESC').all() as any[];
      const articles = rows.map(r => ({
        ...r,
        tags: r.tags ? JSON.parse(r.tags) : []
      }));
      res.json({ success: true, articles });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  app.post('/api/cms/articles', (req: Request, res: Response) => {
    try {
      const article = req.body;
      const id = article.id || 'art-' + Date.now();
      const tagsJson = JSON.stringify(article.tags || []);

      db.prepare(`
        INSERT OR REPLACE INTO cms_articles (id, title, slug, category, author, date, read_time, description, content, image, video, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        article.title,
        article.slug,
        article.category || 'عام',
        article.author || 'المهندس إسلام عرفة',
        article.date || new Date().toISOString().split('T')[0],
        article.readTime || '5 دقائق',
        article.description || '',
        article.content || '',
        article.image || '',
        article.video || '',
        tagsJson
      );

      res.json({ success: true, article: { ...article, id } });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  app.delete('/api/cms/articles/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      db.prepare('DELETE FROM cms_articles WHERE id = ?').run(id);
      res.json({ success: true, id });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // 5. Media Library REST API
  app.get('/api/cms/media', (req: Request, res: Response) => {
    try {
      const rows = db.prepare('SELECT * FROM cms_media ORDER BY created_at DESC').all() as any[];
      const mediaFiles = rows.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type,
        size: r.size,
        url: r.url,
        resolution: r.resolution,
        optimized: Boolean(r.optimized),
        compressionRatio: r.compression_ratio,
        createdAt: r.created_at
      }));
      res.json({ success: true, mediaFiles });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // GET /api/media/:key or /api/cms/media/:id (Fetch raw media Base64 data)
  app.get('/api/media/:key', (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      // Search in cms_media or cms_data
      const mediaRow = db.prepare('SELECT url FROM cms_media WHERE id = ?').get(key) as { url: string } | undefined;
      if (mediaRow) {
        res.json({ success: true, value: mediaRow.url });
        return;
      }

      const dataRow = db.prepare('SELECT value FROM cms_data WHERE key = ?').get(key) as { value: string } | undefined;
      if (dataRow) {
        res.json({ success: true, value: dataRow.value });
        return;
      }

      res.status(404).json({ success: false, message: 'Media asset not found' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  app.post('/api/cms/media', (req: Request, res: Response) => {
    try {
      const { id, key, name, type, size, url, value, resolution, optimized, compressionRatio } = req.body;
      const mediaId = id || key || 'med-' + Date.now();
      const mediaUrl = url || value || '';

      db.prepare(`
        INSERT OR REPLACE INTO cms_media (id, name, type, size, url, resolution, optimized, compression_ratio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        mediaId,
        name || 'uploaded_media',
        type || 'image/jpeg',
        size || '100 KB',
        mediaUrl,
        resolution || '1080x1080',
        optimized ? 1 : 0,
        compressionRatio || '75%'
      );

      // Also store in cms_data for legacy compatibility with db:// keys
      const dataKey = mediaId.startsWith('media_file_') ? mediaId : `media_file_${mediaId}`;
      db.prepare('INSERT OR REPLACE INTO cms_data (key, value) VALUES (?, ?)').run(dataKey, mediaUrl);

      res.json({
        success: true,
        media: {
          id: mediaId,
          name: name || 'uploaded_media',
          type: type || 'image/jpeg',
          size: size || '100 KB',
          url: mediaUrl,
          resolution,
          optimized: true
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  app.delete('/api/cms/media/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      db.prepare('DELETE FROM cms_media WHERE id = ?').run(id);
      db.prepare('DELETE FROM cms_data WHERE key = ?').run(`media_file_${id}`);
      db.prepare('DELETE FROM cms_data WHERE key = ?').run(id);
      res.json({ success: true, id });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // 6. Audit Logs REST API
  app.get('/api/cms/logs', (req: Request, res: Response) => {
    try {
      const rows = db.prepare('SELECT * FROM cms_audit_logs ORDER BY timestamp DESC LIMIT 100').all() as any[];
      res.json({ success: true, logs: rows });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  app.post('/api/cms/logs', (req: AuthenticatedRequest, res: Response) => {
    try {
      const { action, details } = req.body;
      const userName = req.user?.name || 'مدير النظام';
      const role = req.user?.role || 'admin';

      db.prepare(`
        INSERT INTO cms_audit_logs (id, user_name, role, action, details, ip_address)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run('log-' + Date.now(), userName, role, action, details || '', req.ip);

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Serve Frontend with Vite (Dev) or Express Static (Production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Enterprise Server] Online on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch(err => {
  console.error('[Enterprise Server] Critical error during boot:', err);
});

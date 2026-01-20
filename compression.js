const express = require('express');
const compression = require('compression');

const app = express();

/**
 * ================================
 * GZIP CONFIGURATION
 * ================================
 */
app.use(
  compression({
    // Minimum response size to compress (bytes)
    // 1024 = 1 KB
    threshold: 1024,

    // Compression level (1 = fastest, 9 = best compression)
    // Recommended: 4–6 for APIs
    level: 6,

    // Filter: decide WHEN to compress
    filter: (req, res) => {
      // ❌ Don't compress if client says no
      if (req.headers['x-no-compression']) {
        return false;
      }

      // ❌ Don't compress already compressed content
      const type = res.getHeader('Content-Type');
      if (type && type.includes('image')) {
        return false;
      }

      // ✅ Default compression behavior
      return compression.filter(req, res);
    }
  })
);

/**
 * ================================
 * SAMPLE API (POST LIST)
 * ================================
 */
app.get('/posts', (req, res) => {
  const posts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    description: 'This is a sample post description',
    author: 'Admin',
    createdAt: new Date().toISOString()
  }));

  res.json({ posts });
});

/**
 * ================================
 * SMALL RESPONSE (gzip skipped)
 * ================================
 */
app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = 2508;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

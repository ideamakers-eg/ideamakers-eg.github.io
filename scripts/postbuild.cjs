const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const blogFilePath = path.join(rootDir, 'src', 'components', 'Blog.tsx');
const indexFilePath = path.join(rootDir, 'dist', 'index.html');

console.log('\n==================================================');
console.log('🚀 ENTERPRISE ROUTING & SEO PRE-RENDERING SCRIPT');
console.log('==================================================\n');

if (!fs.existsSync(indexFilePath)) {
  console.error('❌ Error: dist/index.html does not exist. Please run npm run build first.');
  process.exit(1);
}

const originalHtml = fs.readFileSync(indexFilePath, 'utf8');

// Read and parse Blog.tsx for DEFAULT_ARTICLES to extract slugs, titles, and descriptions dynamically
let articlesText = '';
try {
  const blogContent = fs.readFileSync(blogFilePath, 'utf8');
  const startIdx = blogContent.indexOf('const DEFAULT_ARTICLES');
  const endIdx = blogContent.indexOf('export const Blog');
  if (startIdx !== -1 && endIdx !== -1) {
    articlesText = blogContent.substring(startIdx, endIdx);
  }
} catch (e) {
  console.warn('⚠️ Warning: Could not extract DEFAULT_ARTICLES text automatically:', e);
}

const articles = [];
if (articlesText) {
  let pos = 0;
  while (true) {
    const startObj = articlesText.indexOf('{', pos);
    if (startObj === -1) break;
    
    let braceCount = 1;
    let endObj = -1;
    for (let i = startObj + 1; i < articlesText.length; i++) {
      if (articlesText[i] === '{') braceCount++;
      if (articlesText[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endObj = i;
          break;
        }
      }
    }
    
    if (endObj === -1) break;
    
    const objText = articlesText.substring(startObj, endObj + 1);
    pos = endObj + 1;
    
    const slugMatch = objText.match(/slug:\s*['"`]([^'"`]+)['"`]/);
    const titleMatch = objText.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const descMatch = objText.match(/description:\s*['"`]([^'"`]+)['"`]/);
    const dateMatch = objText.match(/date:\s*['"`]([^'"`]+)['"`]/);
    const authorMatch = objText.match(/author:\s*['"`]([^'"`]+)['"`]/);
    const imageMatch = objText.match(/image:\s*['"`]([^'"`]+)['"`]/);
    
    if (slugMatch && titleMatch && descMatch) {
      articles.push({
        slug: slugMatch[1],
        title: titleMatch[1],
        description: descMatch[1],
        date: dateMatch ? dateMatch[1] : '2026-06-15',
        author: authorMatch ? authorMatch[1] : 'المهندس إسلام عرفة',
        image: imageMatch ? imageMatch[1] : 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&q=80&w=800'
      });
    }
  }
}

console.log(`✅ Successfully extracted ${articles.length} blog articles from Blog.tsx!`);

// Setup target origin
const targetOrigin = 'https://ideamakers-eg.github.io';

// Helper to update HTML metadata and JSON-LD structured data
function updateMeta(html, targetPath, title, description, image, type = 'website', articleData = null) {
  let updated = html;
  const canonicalUrl = targetPath ? `${targetOrigin}/${targetPath}` : targetOrigin;
  
  // 1. Replace <title>
  updated = updated.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  
  // 2. Replace description
  updated = updated.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`);
  
  // 3. Replace canonical href
  updated = updated.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  
  // 4. Replace Open Graph tags
  updated = updated.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  updated = updated.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
  updated = updated.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`);
  updated = updated.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${type}" />`);
  if (image) {
    updated = updated.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${image}" />`);
  }
  
  // 5. Replace Twitter tags
  updated = updated.replace(/<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);
  updated = updated.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:title" content="${title}" />`);
  updated = updated.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:description" content="${description}" />`);
  if (image) {
    updated = updated.replace(/<meta\s+property="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:image" content="${image}" />`);
  }
  
  // 6. JSON-LD Structured Data
  let ldJson = '';
  if (articleData) {
    ldJson = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "datePublished": articleData.date,
      "author": {
        "@type": "Person",
        "name": articleData.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "IDEA Makers",
        "logo": {
          "@type": "ImageObject",
          "url": `${targetOrigin}/assets/logo/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };
  } else {
    ldJson = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "IDEA Makers PlayStation POS",
      "operatingSystem": "Windows",
      "applicationCategory": "BusinessApplication",
      "url": canonicalUrl,
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "4000",
        "highPrice": "10000",
        "priceCurrency": "EGP",
        "offerCount": "3"
      },
      "description": description,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150"
      },
      "featureList": [
        "Offline Operation",
        "Lifetime Ownership",
        "Device Control",
        "Business Intelligence Reports",
        "Unlimited Devices"
      ]
    };
  }
  
  updated = updated.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${JSON.stringify(ldJson, null, 2)}\n</script>`
  );
  
  return updated;
}

// 1. Update the main dist/index.html with the absolute canonical URL
const updatedRootHtml = updateMeta(
  originalHtml,
  '',
  'نظام إدارة صالات البلايستيشن | IDEA Makers PlayStation POS | سستم كاشير احترافي',
  'امتلك أقوى PlayStation lounge management system. نظام أوفلاين 100%، ملكية مدى الحياة بدون اشتراكات. سستم كاشير بلايستيشن احترافي لإدارة الوقت والأرباح والأجهزة.'
);
fs.writeFileSync(indexFilePath, updatedRootHtml, 'utf8');
console.log('✨ Updated root dist/index.html with canonical URLs!');

// List of pages to generate
const staticPages = [
  // Blog List Page
  {
    path: 'blog',
    title: 'المدونة | مقالات تخصصية في إدارة صالات البلايستيشن - IDEA Makers',
    description: 'تصفح أقوى المقالات والكتيبات التخصصية والعملية لإدارة صالات البلايستيشن ومقاهي الجيمنج بنجاح، لمنع التسريب المالي وزيادة الأرباح.',
    image: 'https://picsum.photos/seed/blog/1200/630'
  },
  // SEO Architecture Page
  {
    path: 'seo-architecture',
    title: 'هيكل موقع صالات البلايستيشن وسيو 2026 | IDEA Makers',
    description: 'تخطيط وهيكل موقع نظام إدارة صالات البلايستيشن وسيو التصدّر والتحويل. تصفح تفاصيل صفحات الخدمات والمشاكل والأسعار والدول.',
    image: 'https://picsum.photos/seed/seo/1200/630'
  },
  // Site Map Page
  {
    path: 'site-map',
    title: 'خريطة الموقع لبرنامج إدارة صالات البلايستيشن | IDEA Makers',
    description: 'خريطة الموقع الكاملة وهيكل الروابط لبرنامج إدارة صالات البلايستيشن وسستم الكاشير. تصفح جميع المقالات والدول والخدمات والمشاكل بالتفصيل.',
    image: 'https://picsum.photos/seed/sitemap/1200/630'
  },
  // Country Pages
  {
    path: 'playstation-pos-egypt',
    title: 'برنامج إدارة صالات البلايستيشن في مصر | IDEA Makers',
    description: 'سستم كاشير بلايستيشن المتكامل في جمهورية مصر العربية. امتلك أقوى نظام أوفلاين 100% لإدارة صالتك ومدفوعات البوفيه مع دعم فني متكامل بملكية مدى الحياة.',
    image: 'https://picsum.photos/seed/egypt/1200/630'
  },
  {
    path: 'playstation-pos-saudi',
    title: 'برنامج إدارة صالات البلايستيشن في السعودية | IDEA Makers',
    description: 'سستم كاشير بلايستيشن المتكامل في المملكة العربية السعودية. أوفلاين بالكامل، ملكية مدى الحياة وبدون اشتراكات شهرية متكررة لتحقيق أقصى ربحية لصالتك.',
    image: 'https://picsum.photos/seed/saudi/1200/630'
  },
  {
    path: 'playstation-pos-uae',
    title: 'برنامج إدارة صالات البلايستيشن في الإمارات | IDEA Makers',
    description: 'نظام إدارة صالات البلايستيشن في دولة الإمارات العربية المتحدة. تحكم كامل بالأجهزة وجرد البوفيه ومراقبة التدفقات المالية بالثانية وبملكية مدى الحياة.',
    image: 'https://picsum.photos/seed/uae/1200/630'
  },
  {
    path: 'playstation-pos-kuwait',
    title: 'برنامج إدارة صالات البلايستيشن في الكويت | IDEA Makers',
    description: 'سستم كاشير بلايستيشن المتكامل في دولة الكويت. نظام أوفلاين متطور لمراقبة الأجهزة والأرباح وجرد الكافتيريا بكفاءة بالغة بدون أي اشتراك شهري.',
    image: 'https://picsum.photos/seed/kuwait/1200/630'
  },
  {
    path: 'playstation-pos-qatar',
    title: 'برنامج إدارة صالات البلايستيشن في قطر | IDEA Makers',
    description: 'سستم كاشير بلايستيشن المتكامل في دولة قطر. تحكم كامل وحساب للوقت بالثانية ومراقبة الخزينة لحماية استثماراتك بملكية كاملة مدى الحياة.',
    image: 'https://picsum.photos/seed/qatar/1200/630'
  }
];

// Generate standard static pages
staticPages.forEach(page => {
  const pageDir = path.join(rootDir, 'dist', page.path);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  
  const pageHtml = updateMeta(
    originalHtml,
    page.path,
    page.title,
    page.description,
    page.image
  );
  
  fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml, 'utf8');
  console.log(`📁 Generated physical route: /${page.path}/index.html (200 OK & Custom SEO)`);
});

// Generate individual article pages
articles.forEach(article => {
  const articlePath = `blog/${article.slug}`;
  const pageDir = path.join(rootDir, 'dist', 'blog', article.slug);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  
  const pageHtml = updateMeta(
    originalHtml,
    articlePath,
    `${article.title} - مدونة IDEA Makers`,
    article.description,
    article.image,
    'article',
    article
  );
  
  fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml, 'utf8');
  console.log(`📝 Generated physical article: /blog/${article.slug}/index.html (200 OK & Custom Article SEO)`);
});

// 2. Clone dist/index.html to dist/404.html to serve as a fail-safe fallback for GitHub Pages
const fallbackFilePath = path.join(rootDir, 'dist', '404.html');
fs.copyFileSync(indexFilePath, fallbackFilePath);
console.log('🛡️ Generated fail-safe fallback: dist/404.html cloned successfully!');

console.log('\n==================================================');
console.log('🎉 ALL ROUTES SUCCESSFULLY PRE-RENDERED!');
console.log('==================================================\n');

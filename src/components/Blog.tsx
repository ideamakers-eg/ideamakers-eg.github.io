import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaRenderer } from './MediaRenderer';
import { fetchCmsContentFromSupabase, saveCmsContentBatchToSupabase, uploadMediaToSupabaseStorage, subscribeToSupabaseRealtime } from '../lib/supabase';
import { 
  BookOpen, Calendar, Clock, User, ArrowRight, Share2, Sparkles, 
  AlertTriangle, TrendingUp, Cpu, ChevronLeft, Lock, Key, Eye, 
  Trash2, Edit, Plus, LogOut, CheckCircle2, RefreshCw, Save, X, Image as ImageIcon,
  Video, Send, MessageSquare, Heart, Mail, AlertCircle, Info, Upload, Globe, FileText, Layers, Tag,
  Search, SlidersHorizontal, Settings, ShieldCheck, Check, Code, Share, ExternalLink
} from 'lucide-react';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
  video?: string;
  tags: string[];
  content: string;
  status?: 'published' | 'draft' | 'scheduled';
  scheduledAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLdSchema?: string;
}

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&q=80&w=800', label: 'لوحة تحكم بلايستيشن' },
  { url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', label: 'صالة ألعاب إضاءة نيون' },
  { url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800', label: 'إدارة مالية وحسابات' },
  { url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', label: 'أجهزة بلايستيشن وأذرع' },
  { url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800', label: 'ألعاب فيديو ترفيهية' },
  { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', label: 'بيزنس واستثمار حديث' }
];

const DEFAULT_ARTICLES: Article[] = [];

export const Blog: React.FC<{ 
  onBackToLanding: () => void;
  onNavigateToForm: () => void;
}> = ({ onBackToLanding, onNavigateToForm }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [openArticleFaq, setOpenArticleFaq] = useState<number | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const toastTimeoutRef = React.useRef<any>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Comments state
  const [commentsByArticle, setCommentsByArticle] = useState<Record<string, { id: number; name: string; date: string; text: string; likes: number; likedByUser?: boolean }[]>>({});

  const handleAddComment = (slug: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      name: commentName.trim(),
      date: 'الآن',
      text: commentText.trim(),
      likes: 0,
      likedByUser: false
    };

    setCommentsByArticle(prev => ({
      ...prev,
      [slug]: [newComment, ...(prev[slug] || [])]
    }));

    setCommentName('');
    setCommentText('');
    showToast('تمت إضافة تعليقك بنجاح!', 'success');
  };

  const handleLikeComment = (slug: string, commentId: number) => {
    setCommentsByArticle(prev => {
      const list = prev[slug] || [];
      const updated = list.map(c => {
        if (c.id === commentId) {
          const liked = !c.likedByUser;
          return {
            ...c,
            likedByUser: liked,
            likes: liked ? c.likes + 1 : c.likes - 1
          };
        }
        return c;
      });
      return { ...prev, [slug]: updated };
    });
  };

  useEffect(() => {
    if (!selectedArticle) {
      setScrollProgress(0);
      setShowBackToTop(false);
      return;
    }
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(currentScroll / totalScroll);
      }
      setShowBackToTop(currentScroll > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle]);

  // GOOGLE TECHNICAL SEO ENGINE - DYNAMIC METADATA & SCHEMA ORCHESTRATION
  useEffect(() => {
    const origin = window.location.origin || "https://ideamakers.org";

    if (!selectedArticle) {
      document.title = "IDEA Makers | مدونة إدارة وتأمين صالات الجيمنج والبلايستيشن";
      const staleJsonLd = document.getElementById("seo-jsonld");
      if (staleJsonLd) staleJsonLd.remove();
      const staleCanonical = document.querySelector("link[rel='canonical']");
      if (staleCanonical) staleCanonical.remove();
      return;
    }

    const seoTitle = selectedArticle.metaTitle || `${selectedArticle.title} | مدونة صناع الفكرة`;
    document.title = seoTitle;

    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", selectedArticle.canonicalUrl || `${origin}/blog/${selectedArticle.slug}`);

    const updateMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let meta = document.querySelector(`meta[${attributeName}='${attributeValue}']`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attributeName, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", contentValue);
    };

    updateMetaTag("name", "description", selectedArticle.metaDescription || selectedArticle.description);
    updateMetaTag("name", "keywords", selectedArticle.tags.join(", "));
    updateMetaTag("name", "author", selectedArticle.author);

    updateMetaTag("property", "og:title", selectedArticle.ogTitle || seoTitle);
    updateMetaTag("property", "og:description", selectedArticle.ogDescription || selectedArticle.description);
    updateMetaTag("property", "og:image", selectedArticle.ogImage || selectedArticle.image);
    updateMetaTag("property", "og:url", `${origin}/blog/${selectedArticle.slug}`);
    updateMetaTag("property", "og:type", "article");
    updateMetaTag("property", "og:locale", "ar_EG");
    updateMetaTag("property", "og:site_name", "IDEA Makers | صُنّاع الفكرة");

    updateMetaTag("property", "article:published_time", selectedArticle.date);
    updateMetaTag("property", "article:author", selectedArticle.author);
    updateMetaTag("property", "article:section", selectedArticle.category);

    updateMetaTag("name", "twitter:card", selectedArticle.twitterCard || "summary_large_image");
    updateMetaTag("name", "twitter:title", selectedArticle.ogTitle || seoTitle);
    updateMetaTag("name", "twitter:description", selectedArticle.ogDescription || selectedArticle.description);
    updateMetaTag("name", "twitter:image", selectedArticle.ogImage || selectedArticle.image);

    let combinedSchema: any;
    if (selectedArticle.jsonLdSchema) {
      try {
        combinedSchema = JSON.parse(selectedArticle.jsonLdSchema);
      } catch (e) {
        console.warn('Invalid JSON-LD schema string in article, generating standard schema');
      }
    }

    if (!combinedSchema) {
      const breadcrumbSchema = {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": origin },
          { "@type": "ListItem", "position": 2, "name": "المدونة التعليمية", "item": `${origin}/blog` },
          { "@type": "ListItem", "position": 3, "name": selectedArticle.category, "item": `${origin}/blog?category=${encodeURIComponent(selectedArticle.category)}` },
          { "@type": "ListItem", "position": 4, "name": selectedArticle.title, "item": `${origin}/blog/${selectedArticle.slug}` }
        ]
      };

      const articleSchema = {
        "@type": "BlogPosting",
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${origin}/blog/${selectedArticle.slug}` },
        "headline": selectedArticle.title,
        "description": selectedArticle.description,
        "image": [selectedArticle.image],
        "datePublished": selectedArticle.date,
        "author": { "@type": "Person", "name": selectedArticle.author },
        "publisher": { "@type": "Organization", "name": "IDEA Makers" }
      };

      combinedSchema = {
        "@context": "https://schema.org",
        "@graph": [breadcrumbSchema, articleSchema]
      };
    }

    let scriptTag = document.getElementById("seo-jsonld") as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "seo-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = typeof combinedSchema === 'string' ? combinedSchema : JSON.stringify(combinedSchema);

    return () => {
      const tag = document.getElementById("seo-jsonld");
      if (tag) tag.remove();
    };
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedArticle) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveHeading(visibleEntry.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    const timeoutId = setTimeout(() => {
      const headings = document.querySelectorAll('h2[id^="heading-"], h3[id^="heading-"]');
      headings.forEach((heading) => observer.observe(heading));
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [selectedArticle]);

  const articleHeadings = React.useMemo(() => {
    if (!selectedArticle) return [];
    const lines = selectedArticle.content.split('\n');
    const list: { id: string; text: string; level: number }[] = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
        const isSub = trimmed.startsWith('### ');
        const text = trimmed.replace(/^#{2,3}\s+/, '').trim();
        const id = `heading-${text.replace(/\s+/g, '-').toLowerCase()}`;
        list.push({ id, text, level: isSub ? 3 : 2 });
      }
    });
    return list;
  }, [selectedArticle]);

  // Admin and Panel State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [blogLoginAttempts, setBlogLoginAttempts] = useState(0);
  const [blogLockoutTime, setBlogLockoutTime] = useState<number | null>(null);

  useEffect(() => {
    if (blogLockoutTime) {
      const interval = setInterval(() => {
        if (Date.now() >= blogLockoutTime) {
          setBlogLockoutTime(null);
          setBlogLoginAttempts(0);
          setLoginError('');
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [blogLockoutTime]);
  
  // Article Editor Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'social' | 'schema'>('general');
  const [isUploading, setIsUploading] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('نصائح إدارية');
  const [formImage, setFormImage] = useState('');
  const [formVideo, setFormVideo] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formAuthor, setFormAuthor] = useState('المهندس إسلام عرفة');
  const [formSlug, setFormSlug] = useState('');
  const [formStatus, setFormStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [formScheduledAt, setFormScheduledAt] = useState('');

  // SEO Fields
  const [formMetaTitle, setFormMetaTitle] = useState('');
  const [formMetaDescription, setFormMetaDescription] = useState('');
  const [formCanonicalUrl, setFormCanonicalUrl] = useState('');

  // Social Fields
  const [formOgTitle, setFormOgTitle] = useState('');
  const [formOgDescription, setFormOgDescription] = useState('');
  const [formOgImage, setFormOgImage] = useState('');
  const [formTwitterCard, setFormTwitterCard] = useState<'summary' | 'summary_large_image'>('summary_large_image');

  // JSON-LD
  const [formJsonLdSchema, setFormJsonLdSchema] = useState('');

  // Load Articles directly from Supabase
  const loadArticles = async () => {
    const cmsContent = await fetchCmsContentFromSupabase();
    if (cmsContent && cmsContent['playstation_pos_blog_articles']) {
      try {
        const parsed = JSON.parse(cmsContent['playstation_pos_blog_articles']);
        if (Array.isArray(parsed)) {
          setArticles(parsed);
        } else {
          setArticles([]);
        }
      } catch (e) {
        setArticles([]);
      }
    } else {
      setArticles([]);
    }
  };

  useEffect(() => {
    loadArticles();
    
    // Subscribe to Supabase Realtime changes for instant live updates across all clients & devices
    const unsubscribeRealtime = subscribeToSupabaseRealtime((key, value) => {
      if (key === 'playstation_pos_blog_articles' || key === 'playstation_pos_blog_posts') {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            setArticles(parsed);
          }
        } catch (e) {}
      }
    });

    const handleCmsChanged = () => {
      loadArticles();
    };
    window.addEventListener('cms-content-changed', handleCmsChanged);

    return () => {
      unsubscribeRealtime();
      window.removeEventListener('cms-content-changed', handleCmsChanged);
    };
  }, []);

  // Sync state with direct URL paths
  useEffect(() => {
    if (articles.length === 0) return;
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      const match = path.match(/\/blog\/([a-zA-Z0-9-]+)/);
      if (match && match[1]) {
        const found = articles.find(a => a.slug === match[1]);
        if (found) {
          setSelectedArticle(found);
          document.title = `${found.title} - مدونة IDEA Makers`;
        }
      } else if (path === '/blog') {
        setSelectedArticle(null);
        document.title = `المدونة | مقالات تخصصية في إدارة صالات البلايستيشن - IDEA Makers`;
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, [articles]);

  const saveArticlesToStore = async (newArticles: Article[]) => {
    setArticles(newArticles);
    await saveCmsContentBatchToSupabase({
      playstation_pos_blog_articles: JSON.stringify(newArticles),
    });
    window.dispatchEvent(new Event('cms-content-changed'));
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    const newPath = `/blog/${article.slug}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ articleSlug: article.slug }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogList = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedArticle(null);
    const newPath = '/blog';
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo(0, 0);
  };

  const handleShare = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${article.slug}`;
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      showToast('تم نسخ رابط المقال لمشاركته بنجاح!', 'success');
    }
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (blogLockoutTime && Date.now() < blogLockoutTime) {
      const remainingSeconds = Math.ceil((blogLockoutTime - Date.now()) / 1000);
      setLoginError(`❌ تم قفل محاولات الدخول مؤقتاً لحماية النظام! يرجى الانتظار ${remainingSeconds} ثانية.`);
      return;
    }

    const normalizedUser = username.trim().toLowerCase();
    const normalizedPass = password.trim();

    const validUser = normalizedUser === 'ideamakers_ceo';
    const validPass = normalizedPass === 'IM_SecureGate_2026_@_PS';

    if (validUser && validPass) {
      setIsAdmin(true);
      setShowLoginModal(false);
      setShowAdminPanel(true);
      setLoginError('');
      setUsername('');
      setPassword('');
      setBlogLoginAttempts(0);
      showToast('مرحباً بك في لوحة تحكم مدونة Supabase CMS', 'success');
    } else {
      const nextAttempts = blogLoginAttempts + 1;
      setBlogLoginAttempts(nextAttempts);
      if (nextAttempts >= 5) {
        const lockUntil = Date.now() + 3 * 60 * 1000;
        setBlogLockoutTime(lockUntil);
        setLoginError('🚨 تم رصد محاولة اقتحام! تم حظر الإدخال وقفل النظام لمدة 3 دقائق لحماية البيانات.');
      } else {
        setLoginError(`❌ بيانات الدخول غير صحيحة! متبقي ${5 - nextAttempts} محاولات.`);
      }
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminPanel(false);
    setIsEditing(false);
    showToast('تم تسجيل الخروج من لوحة الإدارة بنجاح.', 'info');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\u0621-\u064A\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Handle Cover File Upload to Supabase Storage
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    showToast('جاري رفع صورة الغلاف إلى Supabase Storage...', 'info');

    try {
      const result = await uploadMediaToSupabaseStorage(file, file.name, {
        folder: 'blog-covers',
        resolution: '1080p',
        optimized: true,
      });

      if (result && result.url) {
        setFormImage(result.url);
        if (!formOgImage) setFormOgImage(result.url);
        showToast('تم رفع غلاف المقال وحفظه في Supabase بنجاح!', 'success');
      } else {
        showToast('تعذر رفع الصورة إلى Supabase، يمكنك إدخال الرابط المباشر.', 'error');
      }
    } catch (err) {
      console.error('Error uploading blog cover:', err);
      showToast('حدث خطأ أثناء رفع ملف الصورة.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Clear Form
  const clearForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormContent('');
    setFormCategory('نصائح إدارية');
    setFormImage('');
    setFormVideo('');
    setFormTags('');
    setFormAuthor('المهندس إسلام عرفة');
    setFormSlug('');
    setFormStatus('published');
    setFormScheduledAt('');
    setFormMetaTitle('');
    setFormMetaDescription('');
    setFormCanonicalUrl('');
    setFormOgTitle('');
    setFormOgDescription('');
    setFormOgImage('');
    setFormTwitterCard('summary_large_image');
    setFormJsonLdSchema('');
    setActiveTab('general');
  };

  const startCreateArticle = () => {
    setEditingArticle(null);
    clearForm();
    setIsEditing(true);
  };

  const startEditArticle = (article: Article) => {
    setEditingArticle(article);
    setFormTitle(article.title || '');
    setFormDescription(article.description || '');
    setFormContent(article.content || '');
    setFormCategory(article.category || 'نصائح إدارية');
    setFormImage(article.image || '');
    setFormVideo(article.video || '');
    setFormTags(article.tags ? article.tags.join(', ') : '');
    setFormAuthor(article.author || 'المهندس إسلام عرفة');
    setFormSlug(article.slug || '');
    setFormStatus(article.status || 'published');
    setFormScheduledAt(article.scheduledAt || '');
    setFormMetaTitle(article.metaTitle || '');
    setFormMetaDescription(article.metaDescription || '');
    setFormCanonicalUrl(article.canonicalUrl || '');
    setFormOgTitle(article.ogTitle || '');
    setFormOgDescription(article.ogDescription || '');
    setFormOgImage(article.ogImage || '');
    setFormTwitterCard(article.twitterCard || 'summary_large_image');
    setFormJsonLdSchema(article.jsonLdSchema || '');
    setActiveTab('general');
    setIsEditing(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim() || !formContent.trim()) {
      showToast('الرجاء تعبئة كافة الحقول الأساسية (العنوان، الملخص، المحتوى)!', 'error');
      return;
    }

    const calculatedReadTime = `${Math.max(2, Math.ceil(formContent.split(/\s+/).length / 120))} دقائق`;
    const todayStr = new Date().toISOString().split('T')[0];
    const slugToUse = formSlug.trim() || generateSlug(formTitle) || `article-${Date.now()}`;

    const newArticle: Article = {
      slug: slugToUse,
      title: formTitle.trim(),
      description: formDescription.trim(),
      content: formContent.trim(),
      category: formCategory.trim() || 'نصائح إدارية',
      image: formImage.trim() || PRESET_IMAGES[0].url,
      video: formVideo.trim() || undefined,
      tags: formTags ? formTags.split(',').map(t => t.trim()).filter(Boolean) : ['بلايستيشن'],
      author: formAuthor.trim() || 'المهندس إسلام عرفة',
      date: editingArticle ? editingArticle.date : todayStr,
      readTime: editingArticle ? editingArticle.readTime : calculatedReadTime,
      status: formStatus,
      scheduledAt: formStatus === 'scheduled' ? formScheduledAt : undefined,
      metaTitle: formMetaTitle.trim() || undefined,
      metaDescription: formMetaDescription.trim() || undefined,
      canonicalUrl: formCanonicalUrl.trim() || undefined,
      ogTitle: formOgTitle.trim() || undefined,
      ogDescription: formOgDescription.trim() || undefined,
      ogImage: formOgImage.trim() || undefined,
      twitterCard: formTwitterCard,
      jsonLdSchema: formJsonLdSchema.trim() || undefined,
    };

    let updatedArticles: Article[] = [];
    if (editingArticle) {
      updatedArticles = articles.map(a => a.slug === editingArticle.slug ? newArticle : a);
    } else {
      if (articles.some(a => a.slug === slugToUse)) {
        showToast('هذا الرابط/العنوان مستخدم بالفعل! الرجاء تعيين Slug مختلف.', 'error');
        return;
      }
      updatedArticles = [newArticle, ...articles];
    }

    await saveArticlesToStore(updatedArticles);
    setIsEditing(false);
    setEditingArticle(null);
    clearForm();
    showToast('تم حفظ ونشر المقال في Supabase بنجاح!', 'success');
  };

  const deleteArticle = async (slug: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً من Supabase؟')) {
      const updated = articles.filter(a => a.slug !== slug);
      await saveArticlesToStore(updated);
      if (selectedArticle?.slug === slug) {
        setSelectedArticle(null);
      }
      showToast('تم حذف المقال من قاعدة بيانات Supabase بنجاح.', 'success');
    }
  };

  const parseTextWithLinks = (text: string): React.ReactNode => {
    if (!text) return "";
    
    const parseBold = (str: string, baseKey: string): React.ReactNode[] => {
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const subParts: React.ReactNode[] = [];
      let subLastIndex = 0;
      let subMatch;
      while ((subMatch = boldRegex.exec(str)) !== null) {
        if (subMatch.index > subLastIndex) {
          subParts.push(str.substring(subLastIndex, subMatch.index));
        }
        subParts.push(
          <strong key={`${baseKey}-b-${subMatch.index}`} className="font-extrabold text-white">
            {subMatch[1]}
          </strong>
        );
        subLastIndex = boldRegex.lastIndex;
      }
      if (subLastIndex < str.length) {
        subParts.push(str.substring(subLastIndex));
      }
      return subParts;
    };

    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(...parseBold(text.substring(lastIndex, matchIndex), `prev-${matchIndex}`));
      }
      
      const linkText = match[1];
      const linkUrl = match[2];
      
      parts.push(
        <button
          key={`link-${matchIndex}`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const slug = linkUrl.replace('/blog/', '').replace('/', '');
            const found = articles.find(a => a.slug === slug);
            if (found) {
              handleArticleClick(found);
            }
          }}
          className="text-primary hover:text-purple-400 underline font-semibold transition-colors mx-1 inline bg-transparent border-none p-0 cursor-pointer align-baseline"
        >
          {parseBold(linkText, `link-text-${matchIndex}`)}
        </button>
      );
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(...parseBold(text.substring(lastIndex), `post-${lastIndex}`));
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
  };

  const renderArticleContent = (content: string) => {
    if (!content) return null;
    
    const blocks: string[] = [];
    let currentBlock = '';
    let inCodeBlock = false;
    let inTable = false;
    
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('```')) {
        if (inCodeBlock) {
          currentBlock += '\n' + line;
          blocks.push(currentBlock);
          currentBlock = '';
          inCodeBlock = false;
        } else {
          if (currentBlock.trim()) {
            blocks.push(currentBlock);
          }
          currentBlock = line;
          inCodeBlock = true;
        }
        continue;
      }
      
      if (inCodeBlock) {
        currentBlock += '\n' + line;
        continue;
      }

      if (trimmedLine.startsWith('|')) {
        if (!inTable) {
          if (currentBlock.trim()) {
            blocks.push(currentBlock);
          }
          currentBlock = line;
          inTable = true;
        } else {
          currentBlock += '\n' + line;
        }
        continue;
      } else {
        if (inTable) {
          blocks.push(currentBlock);
          currentBlock = '';
          inTable = false;
        }
      }

      if (trimmedLine === '') {
        if (currentBlock.trim()) {
          blocks.push(currentBlock);
          currentBlock = '';
        }
      } else {
        if (currentBlock) {
          currentBlock += '\n' + line;
        } else {
          currentBlock = line;
        }
      }
    }
    if (currentBlock.trim()) {
      blocks.push(currentBlock);
    }

    return (
      <div className="prose-arabic space-y-8">
        {blocks.map((block, idx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('```')) {
            const codeLines = trimmed.split('\n');
            const lang = codeLines[0].replace(/^```/, '').trim();
            const codeContent = codeLines.slice(1, -1).join('\n');
            return (
              <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl dir-ltr">
                {lang && (
                  <div className="bg-white/5 px-4 py-2 text-xs font-mono text-primary border-b border-white/5 flex items-center justify-between">
                    <span>{lang}</span>
                    <span className="text-gray-500 text-[10px]">كود برمجي</span>
                  </div>
                )}
                <pre className="p-4 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  <code>{codeContent}</code>
                </pre>
              </div>
            );
          }

          if (trimmed.startsWith('|')) {
            const tableLines = trimmed.split('\n').filter(l => l.trim().startsWith('|'));
            if (tableLines.length >= 2) {
              const parseRow = (rowStr: string) => 
                rowStr.split('|').slice(1, -1).map(c => c.trim());

              const headerRow = parseRow(tableLines[0]);
              const dataRows = tableLines.slice(2).map(parseRow);

              return (
                <div key={idx} className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.01] shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-primary/20 border-b border-white/10">
                          {headerRow.map((h, hIdx) => (
                            <th key={hIdx} className="p-4 font-black text-white text-right">
                              {parseTextWithLinks(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {dataRows.map((rCells, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                            {rCells.map((cell, cIdx) => (
                              <td key={cIdx} className="p-4 text-gray-300 font-normal">
                                {parseTextWithLinks(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }
          }

          if (trimmed.startsWith('###')) {
            const titleText = trimmed.replace(/^###\s*/, '');
            const headingId = `heading-${titleText.replace(/\s+/g, '-').toLowerCase()}`;
            return (
              <h3 
                key={idx} 
                id={headingId}
                className="scroll-mt-32 border-r-4 border-primary pr-3 flex items-center justify-start gap-2 text-xl font-bold text-white mt-6 mb-3"
              >
                {parseTextWithLinks(titleText)}
              </h3>
            );
          }

          if (trimmed.startsWith('##')) {
            const titleText = trimmed.replace(/^##\s*/, '');
            const headingId = `heading-${titleText.replace(/\s+/g, '-').toLowerCase()}`;
            return (
              <h2 
                key={idx} 
                id={headingId}
                className="scroll-mt-32 text-2xl sm:text-3xl font-black text-white mt-8 mb-4 border-b border-white/10 pb-3"
              >
                {parseTextWithLinks(titleText)}
              </h2>
            );
          }

          if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.includes('\n* ') || trimmed.includes('\n- ')) {
            const lines = trimmed.split('\n');
            return (
              <ul key={idx} className="space-y-4 my-6 list-none pr-2">
                {lines.map((line, lIdx) => {
                  const cleaned = line.replace(/^[\*\-]\s*/, '').trim();
                  if (!cleaned) return null;
                  const boldMatch = cleaned.match(/^([^*:-]+)[:-]/);
                  return (
                    <li key={lIdx} className="flex gap-3 items-start">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2.5 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                      <div className="flex-1 text-right text-gray-200 leading-relaxed text-base">
                        {boldMatch ? (
                          <>
                            <strong className="text-white font-extrabold">{boldMatch[1]}:</strong>
                            {parseTextWithLinks(cleaned.substring(boldMatch[0].length))}
                          </>
                        ) : (
                          parseTextWithLinks(cleaned)
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          }

          if (trimmed.startsWith('>')) {
            const quoteContent = trimmed.replace(/^>\s*/, '').replace(/^"|"\s*$/g, '');
            return (
              <blockquote key={idx} className="relative bg-gradient-to-l from-primary/5 to-transparent p-6 sm:p-8 rounded-2xl border-r-4 border-primary text-white italic my-8 text-right font-medium leading-relaxed">
                <span className="absolute top-4 left-4 text-primary/20 text-6xl font-serif select-none pointer-events-none">”</span>
                <p className="text-base sm:text-lg text-gray-100 font-medium relative z-10 leading-relaxed font-cairo">
                  "{parseTextWithLinks(quoteContent)}"
                </p>
              </blockquote>
            );
          }

          return (
            <p key={idx} className="text-base sm:text-lg text-gray-200 leading-[2] font-normal text-right">
              {parseTextWithLinks(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  // Filter visible articles for Visitors vs Admin
  const nowIso = new Date().toISOString();
  const visibleArticles = articles.filter(article => {
    // If user is Admin, show all
    if (isAdmin) return true;
    
    // Check status
    const status = article.status || 'published';
    if (status === 'draft') return false;
    if (status === 'scheduled') {
      if (!article.scheduledAt) return false;
      return article.scheduledAt <= nowIso;
    }
    return true;
  });

  const categories = ['الكل', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = visibleArticles.filter(article => {
    const matchesCategory = selectedCategory === 'الكل' || article.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-primary selection:text-white pb-20 dir-rtl text-right">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[500] px-6 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl font-bold text-sm ${
              toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
              toast.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
              'bg-primary/10 border-primary/30 text-primary'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackToBlogList}
            className="flex items-center gap-3 group cursor-pointer text-right"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white font-cairo">مدونة IDEA Makers CMS</h1>
              <p className="text-xs text-gray-400">إدارة ومحتوى حي مباشر من Supabase</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  لوحة تحكم الأدمن
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-primary" />
                دخول الإدارة
              </button>
            )}

            <button
              onClick={onBackToLanding}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للرئيسية
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: ARTICLE DETAILS */}
        {selectedArticle ? (
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="max-w-4xl mx-auto"
          >
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-primary/20 z-[300] pointer-events-none">
              <div 
                className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>

            <button 
              onClick={handleBackToBlogList}
              className="flex items-center gap-2 text-gray-400 hover:text-primary mb-6 transition-colors font-bold text-sm cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة لقائمة المقالات
            </button>

            <div className="space-y-4 mb-8 text-right">
              <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-black px-3 py-1.5 rounded-lg inline-block">
                {selectedArticle.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug font-cairo">
                {selectedArticle.title}
              </h1>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-video mb-8 border border-white/10 shadow-2xl">
              <MediaRenderer 
                src={selectedArticle.image} 
                type="image" 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  وقت القراءة: {selectedArticle.readTime}
                </span>
              </div>

              <button 
                onClick={(e) => handleShare(selectedArticle, e)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-all font-bold text-xs sm:text-sm cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                مشاركة المقال
              </button>
            </div>

            {selectedArticle.video && (
              <div className="mb-10 bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4">
                  <Video className="w-4.5 h-4.5 text-primary" />
                  فيديو توضيحي مرفق
                </h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <MediaRenderer src={selectedArticle.video} type="video" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Content Render */}
            <div className="mb-12">
              {renderArticleContent(selectedArticle.content)}
            </div>

            {/* Tags */}
            {selectedArticle.tags && selectedArticle.tags.length > 0 && (
              <div className="border-t border-white/10 pt-6 mb-12 flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-bold text-gray-400 ml-2">الوسوم:</span>
                {selectedArticle.tags.map((tag, idx) => (
                  <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-white/10 pt-10 mt-10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                التعليقات والمناقشات
              </h3>

              <form onSubmit={(e) => handleAddComment(selectedArticle.slug, e)} className="mb-8 space-y-4 bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">الاسم *</label>
                    <input
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="اسمك الكريم..."
                      className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-right text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">التعليق *</label>
                  <textarea
                    required
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="اكتب تعليقك أو استفسارك هنا..."
                    className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl p-4 text-xs text-right text-white leading-relaxed"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  إرسال التعليق
                </button>
              </form>

              {/* List Comments */}
              <div className="space-y-4">
                {(commentsByArticle[selectedArticle.slug] || []).map((c) => (
                  <div key={c.id} className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">{c.name}</span>
                      <span className="text-gray-500">{c.date}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{c.text}</p>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleLikeComment(selectedArticle.slug, c.id)}
                        className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                          c.likedByUser ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Heart className="w-3 h-3" />
                        <span>{c.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.article>
        ) : (

          /* VIEW: LIST OF ARTICLES */
          <div className="space-y-8">
            
            {/* Search & Category Filter */}
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن مقال أو كلمة دلالية..."
                    className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-2xl pr-11 pl-4 py-3 text-xs text-white"
                  />
                </div>

                {isAdmin && (
                  <button
                    onClick={startCreateArticle}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    إنشاء مقال جديد
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => {
                  const status = article.status || 'published';
                  return (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/40 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        {/* Cover image */}
                        <div className="relative aspect-video overflow-hidden">
                          <MediaRenderer src={article.image} type="image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 flex-wrap">
                            <span className="bg-black/60 backdrop-blur-md text-primary border border-primary/30 text-[10px] font-black px-2.5 py-1 rounded-lg">
                              {article.category}
                            </span>
                            {isAdmin && (
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${
                                status === 'published' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                                status === 'draft' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' :
                                'bg-blue-500/20 border-blue-500/40 text-blue-400'
                              }`}>
                                {status === 'published' ? 'منشور' : status === 'draft' ? 'مسودة' : 'مجدول'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Text Body */}
                        <div className="p-6 space-y-3">
                          <h3 
                            onClick={() => handleArticleClick(article)}
                            className="text-lg font-bold text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {article.title}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                            {article.description}
                          </p>
                        </div>
                      </div>

                      {/* Footer Info & Admin Actions */}
                      <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] text-gray-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-primary" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>

                        {isAdmin ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEditArticle(article)}
                              className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
                              title="تعديل"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteArticle(article.slug)}
                              className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors cursor-pointer"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleArticleClick(article)}
                            className="text-primary font-bold flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            قراءة المقال
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white/[0.02] border border-white/10 p-12 rounded-3xl text-center space-y-4">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">لا توجد مقالات متوفرة حالياً</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  {isAdmin ? 'قم بالنقر على "إنشاء مقال جديد" لإضافة أول مقال في قاعدة بيانات Supabase.' : 'لم يتم نشر أي مقالات بعد، يرجى العودة لاحقاً.'}
                </p>
                {isAdmin && (
                  <button
                    onClick={startCreateArticle}
                    className="bg-primary hover:bg-primary/90 text-white font-bold text-xs px-6 py-3 rounded-xl inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة مقال الآن
                  </button>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* ADMIN PANEL & EDITOR MODAL */}
      <AnimatePresence>
        {showAdminPanel && (
          <div className="fixed inset-0 z-[400] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-white/10 w-full max-w-4xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">إدارة مدونة Supabase CMS</h2>
                    <p className="text-xs text-gray-400">تحكم كامل بالمقالات والسيو والتخزين السحابي</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={startCreateArticle}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    مقال جديد
                  </button>
                  <button
                    onClick={() => setShowAdminPanel(false)}
                    className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {isEditing ? (
                /* EDITOR FORM */
                <form onSubmit={handleSaveArticle} className="space-y-6">
                  
                  {/* Tabs Header */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setActiveTab('general')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'general' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      المحتوى الأساسي
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('seo')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'seo' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      إعدادات SEO والروابط
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('social')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'social' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      سوشيال ميديا (OpenGraph)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('schema')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'schema' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      JSON-LD Schema
                    </button>
                  </div>

                  {/* TAB 1: GENERAL */}
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1.5">عنوان المقال *</label>
                          <input
                            type="text"
                            required
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            placeholder="عنوان المقال الجذاب..."
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1.5">القسم / التصنيف *</label>
                          <input
                            type="text"
                            required
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            placeholder="مثال: نصائح إدارية, مقارنات تقنية..."
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1.5">حالة النشر *</label>
                          <select
                            value={formStatus}
                            onChange={(e) => setFormStatus(e.target.value as any)}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                          >
                            <option value="published">منشور فوري (Published)</option>
                            <option value="draft">مسودة (Draft)</option>
                            <option value="scheduled">مجدول (Scheduled)</option>
                          </select>
                        </div>

                        {formStatus === 'scheduled' && (
                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1.5">تاريخ ووقت النشر المجدول</label>
                            <input
                              type="datetime-local"
                              value={formScheduledAt}
                              onChange={(e) => setFormScheduledAt(e.target.value)}
                              className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1.5">اسم الكاتب</label>
                          <input
                            type="text"
                            value={formAuthor}
                            onChange={(e) => setFormAuthor(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Image Upload & Presets */}
                      <div className="space-y-3 bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                        <label className="block text-xs font-bold text-gray-300">صورة الغلاف (Cover Image)</label>
                        
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                          <input
                            type="url"
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            placeholder="رابط مباشر أو اختر ملفاً للرفع..."
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white flex-1"
                          />

                          <label className="bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0">
                            <Upload className="w-4 h-4" />
                            {isUploading ? 'جاري الرفع...' : 'رفع من جهازك (Supabase)'}
                            <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" disabled={isUploading} />
                          </label>
                        </div>

                        {/* Presets Grid */}
                        <div className="pt-2">
                          <p className="text-[11px] text-gray-400 mb-2">أو اختر صورة ممتازة بنقرة واحدة:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                            {PRESET_IMAGES.map((img) => (
                              <button
                                key={img.url}
                                type="button"
                                onClick={() => setFormImage(img.url)}
                                className={`relative aspect-video rounded-xl overflow-hidden border transition-all ${
                                  formImage === img.url ? 'border-primary ring-2 ring-primary/50' : 'border-white/10 opacity-70 hover:opacity-100'
                                }`}
                              >
                                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">الملخص / الوصف المختصر *</label>
                        <textarea
                          required
                          rows={2}
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          placeholder="ملخص المقال الشيق..."
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl p-3 text-xs text-white leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">الكلمات الدلالية (Tags) - مفصولة بفاصلة</label>
                        <input
                          type="text"
                          value={formTags}
                          onChange={(e) => setFormTags(e.target.value)}
                          placeholder="بلايستيشن, سيو, أرباح, تشغيل..."
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">محتوى المقال (Markdown) *</label>
                        <textarea
                          required
                          rows={10}
                          value={formContent}
                          onChange={(e) => setFormContent(e.target.value)}
                          placeholder="اكتب المحتوى الكامل..."
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl p-4 text-xs text-white leading-relaxed font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SEO */}
                  {activeTab === 'seo' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">رابط المقال المخصص (Slug)</label>
                        <input
                          type="text"
                          value={formSlug}
                          onChange={(e) => setFormSlug(e.target.value)}
                          placeholder="مثال: playstation-lounge-guide"
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">عنوان السيو (Meta Title)</label>
                        <input
                          type="text"
                          value={formMetaTitle}
                          onChange={(e) => setFormMetaTitle(e.target.value)}
                          placeholder="إذا تركته فارغاً سيستخدم عنوان المقال الرئيسي"
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">وصف السيو (Meta Description)</label>
                        <textarea
                          rows={3}
                          value={formMetaDescription}
                          onChange={(e) => setFormMetaDescription(e.target.value)}
                          placeholder="إذا تركته فارغاً سيستخدم ملخص المقال"
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl p-3 text-xs text-white leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">الرابط المرجعي الأصلي (Canonical URL)</label>
                        <input
                          type="url"
                          value={formCanonicalUrl}
                          onChange={(e) => setFormCanonicalUrl(e.target.value)}
                          placeholder="https://ideamakers.org/blog/my-slug"
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 3: SOCIAL */}
                  {activeTab === 'social' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">عنوان OpenGraph (مشاركة الفيسبوك والواتساب)</label>
                        <input
                          type="text"
                          value={formOgTitle}
                          onChange={(e) => setFormOgTitle(e.target.value)}
                          placeholder="العنوان الظاهر عند المشاركة..."
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">وصف OpenGraph</label>
                        <textarea
                          rows={2}
                          value={formOgDescription}
                          onChange={(e) => setFormOgDescription(e.target.value)}
                          placeholder="الوصف الظاهر عند المشاركة..."
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl p-3 text-xs text-white leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">صورة OpenGraph المخصصة</label>
                        <input
                          type="url"
                          value={formOgImage}
                          onChange={(e) => setFormOgImage(e.target.value)}
                          placeholder="رابط الصورة المعروضة على مواقع التواصل..."
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">نوع كارت تويتر (Twitter Card)</label>
                        <select
                          value={formTwitterCard}
                          onChange={(e) => setFormTwitterCard(e.target.value as any)}
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                        >
                          <option value="summary_large_image">صورة كبيرة (Summary Large Image)</option>
                          <option value="summary">كارت مختصر (Summary)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: JSON-LD */}
                  {activeTab === 'schema' && (
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-gray-300">مخطط JSON-LD المخصص (Custom JSON-LD Schema)</label>
                      <p className="text-[11px] text-gray-400">اتركه فارغاً ليقوم المحرك بتوليد Schema معتمد ومطابق لشروط جوجل تلقائياً.</p>
                      <textarea
                        rows={8}
                        value={formJsonLdSchema}
                        onChange={(e) => setFormJsonLdSchema(e.target.value)}
                        placeholder='{"@context":"https://schema.org","@type":"NewsArticle", ...}'
                        className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl p-4 text-xs text-emerald-400 leading-relaxed font-mono dir-ltr"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      <Save className="w-4 h-4" />
                      حفظ في Supabase
                    </button>
                  </div>
                </form>
              ) : (

                /* ARTICLES LIST IN ADMIN PANEL */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">إجمالي المقالات المكتشفة: ({articles.length})</h3>
                  </div>

                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                    {articles.map((article) => (
                      <div key={article.slug} className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={article.image} alt={article.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                          <div className="min-w-0 text-right">
                            <h4 className="text-xs font-bold text-white truncate">{article.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                                {article.category}
                              </span>
                              <span className="text-[10px] text-gray-400">{article.date}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md border ${
                                article.status === 'published' || !article.status ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                                article.status === 'draft' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                'bg-blue-500/10 border-blue-500/30 text-blue-400'
                              }`}>
                                {article.status === 'published' || !article.status ? 'منشور' : article.status === 'draft' ? 'مسودة' : 'مجدول'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => startEditArticle(article)}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2 rounded-xl transition-all cursor-pointer"
                            title="تعديل المقال"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteArticle(article.slug)}
                            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 p-2 rounded-xl transition-all cursor-pointer"
                            title="حذف المقال"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[450] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-white/10 w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-white">تسجيل دخول كاتب / مدير المدونة</h3>
                </div>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="p-1.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-2xl text-xs font-bold leading-relaxed">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">اسم المستخدم *</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="اسم المستخدم الإداري..."
                    className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">كلمة المرور *</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة السر الخاصة بالمدونة..."
                    className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-primary/20 mt-2"
                >
                  <Key className="w-4 h-4" />
                  تسجيل الدخول للوحة التحكم
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

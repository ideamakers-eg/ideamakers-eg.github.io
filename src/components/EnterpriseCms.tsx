import React, { useState, useEffect } from 'react';
import { 
  Shield, Search, Database, Settings, Layers, Globe, Laptop, Tablet, Smartphone, 
  Eye, RefreshCw, FileText, Check, Trash2, Plus, Minus, History, UserCheck, 
  Play, ArrowLeft, ArrowRight, Lock, Unlock, TrendingUp, BarChart2, AlertTriangle, 
  Sparkles, RotateCcw, Code, Share2, Sliders, Monitor, Info, Save, Activity, 
  Zap, Cpu, Bell, CheckSquare, Clock, Cloud, Download, Edit, EyeOff, Folder, 
  HelpCircle, Image, List, Move, Package, ShieldCheck, ShoppingCart, Star, 
  Upload, Users, Video, Wifi, Send, CheckCircle2, MessageCircle, Landmark, Palette, BookOpen
} from 'lucide-react';

import { CmsDashboard } from './CmsDashboard';
import { CmsMarketing } from './CmsMarketing';
import { CmsOperations } from './CmsOperations';
import { CmsDocsSupport } from './CmsDocsSupport';
import { CmsSystem } from './CmsSystem';
import { CmsAiAssistant } from './CmsAiAssistant';
import { CmsLivePreview } from './CmsLivePreview';
import { saveCmsContentBatchToSupabase } from '../lib/supabase';

import { 
  INITIAL_BLOG_POSTS, 
  INITIAL_CUSTOMERS, 
  INITIAL_CRM_LEADS, 
  INITIAL_SALES_INVOICES, 
  INITIAL_LICENSES,
  BlogCmsPost,
  CustomerModel,
  CrmLead,
  SalesInvoice,
  LicenseModel
} from '../data/cmsMockData';

interface EnterpriseCmsProps {
  onBackToLanding: () => void;
}

// Exactly 22 requested sections for the control center
type CmsTab = 
  | 'dashboard' | 'landing_page' | 'website' | 'pricing' | 'blog' 
  | 'customers' | 'crm' | 'sales' | 'whatsapp' | 'seo' 
  | 'media_library' | 'brand_assets' | 'analytics' | 'support' 
  | 'licenses' | 'downloads' | 'playbook' | 'company_documents' 
  | 'settings' | 'users' | 'logs' | 'ai_assistant';

export const EnterpriseCms: React.FC<EnterpriseCmsProps> = ({ onBackToLanding }) => {
  // Tab State containing the 22 requested sections
  const [activeTab, setActiveTab] = useState<CmsTab>('dashboard');
  const [sidebarSearch, setSidebarSearch] = useState('');

  // CMS content values loaded/persisted locally
  const [cmsData, setCmsData] = useState<Record<string, any>>({});
  const [lastSavedTime, setLastSavedTime] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Initialization and autosave states for Hostinger-like real-time sync
  const [isCmsLoaded, setIsCmsLoaded] = useState(false);
  const [isAutosaving, setIsAutosaving] = useState(false);

  // States for shared operations
  const [blogPosts, setBlogPosts] = useState<BlogCmsPost[]>([]);
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [invoices, setInvoices] = useState<SalesInvoice[]>([]);
  const [licenses, setLicenses] = useState<LicenseModel[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [eventStream, setEventStream] = useState<any[]>([]);

  // Simulation role for security
  const [activeRole, setActiveRole] = useState<'admin' | 'editor' | 'marketing' | 'sales' | 'support'>('admin');

  // Landing Page Edit section controls
  const [editingSection, setEditingSection] = useState<'hero' | 'about_us' | 'vision_values' | 'why_choose' | 'founder' | 'trial' | 'trust_cert' | 'branches'>('hero');

  // Packages list and country pricing states for detailed administration
  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [intPricingList, setIntPricingList] = useState<Record<string, { price: string; currency: string }>>({});
  const [selectedEditPackageId, setSelectedEditPackageId] = useState<'starter' | 'professional' | 'international'>('professional');
  const [newFeatureText, setNewFeatureText] = useState('');

  // Blog creation inputs
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('إدارة وتشغيل');
  const [newBlogContent, setNewBlogContent] = useState('');

  // Load state and localstorage configurations
  useEffect(() => {
    // 1. Core CMS
    const storedCms = localStorage.getItem('playstation_pos_cms_content');
    const defaultCms = {
      cmsTag: 'المعيار الذهبي لإدارة الصالات 2026',
      cmsTitlePrefix: 'نظام إدارة صالات البلايستيشن',
      cmsTitleHighlight: 'سيستم كاشير بلايسيتشن',
      cmsDescription: 'نظام متكامل لإدارة البلايستيشن، الكافيه، والمخازن. صُمم خصيصاً لرفع أرباحك وتقليل أخطاء الموظفين بنسبة 99%.',
      cmsVideo: 'https://www.youtube.com/watch?v=1CWmNEt6xVs',
      cmsPhone: '201121778205',
      cmsWhatsapp: 'مرحباً فريق صُنّاع الفكرة، أودّ الاستفسار عن نظام إدارة صالات البلايستيشن.',
      cmsAuthTag: 'شريكك الهندسي في النجاح',
      cmsAuthTitle: 'IDEA MAKERS: أكثر من مجرد برنامج',
      cmsAuthDescription: 'نحن لا نبيع لك أكوادًا برمجية، نحن نبني معك بنية تحتية رقمية تضمن لك السيادة الكاملة على مشروعك. نظامنا صُمم بأيدي مهندسين يفهمون طبيعة السوق المصري والخليجي.',
      cmsAuthStat1Title: 'ثقة متزايدة يومياً',
      cmsAuthStat1Desc: 'يستخدمه أصحاب صالات بلايستيشن في مصر والسعودية والإمارات والكويت وقطر',
      cmsAuthStat2Title: '100%',
      cmsAuthStat2Desc: 'تحت سيطرتك أوفلاين',
      cmsPricingTitle: 'استثمار سيادي.. لمرة واحدة',
      cmsPricingSubtitle: 'اختر الباقة التي تناسب طموحك. لا توجد رسوم خفية، لا توجد اشتراكات، لا توجد تبعية.',
      cmsBranchesTitle: 'هل تمتلك فروعاً متعددة؟',
      cmsBranchesText: 'على الرغم من أن الباقات الجاهزة لا تشمل إدارة الفروع، إلا أننا في IDEA Makers يمكننا تصميم وتطوير نظام مخصص لك بالكامل يشمل إدارة الفروع المتعددة والربط السحابي الموحد.',
      cmsBranchesBtnText: 'اطلب نظامك المخصص الآن',
      cmsTrialTitle: '"ابدأ الآن وقرر بنفسك"',
      cmsTrialText: 'خلال 3 أيام فقط، ستسترد قيمة نظام الكاشير بالكامل من الأرباح الإضافية التي ستحققها!\nنحن لا نمنحك مجرد "تجربة مجانية"، بل نضع بين يديك أداة تدقيق مالي وإداري متكاملة لضبط مبيعات الصالة وسد ثغرات الكاشير. شغل النظام لمدة 3 أيام، وقارن أرباحك الحالية بما كنت تحققه سابقاً.. وستصدمك الفروقات الحقيقية.',
      cmsTrialBtnText: 'ابدأ تجربة مجانية الآن',
      cmsWhyChooseTitle: 'لماذا تختار IDEA Makers؟',
      cmsWhy1Title: 'نظام أوفلاين بالكامل',
      cmsWhy1Desc: 'لا حاجة للإنترنت، عملك مستمر دائماً وبدون انقطاع.',
      cmsWhy2Title: 'ملكية مدى الحياة',
      cmsWhy2Desc: 'ادفع مرة واحدة وامتلك النظام للأبد بدون اشتراكات شهرية.',
      cmsWhy3Title: 'تجربة مجانية',
      cmsWhy3Desc: '3 أيام لاكتشاف القوة الحقيقية للنظام قبل اتخاذ قرار الشراء.',
      cmsWhy4Title: 'تخصيص كامل',
      cmsWhy4Desc: 'تحكّم في الهوية البصرية بما يناسب براند صالتك وشعارك.',
      cmsWhy5Title: 'تركيب احترافي',
      cmsWhy5Desc: 'فريقنا يتولى الإعداد والتشغيل والربط في مكانك.',
      cmsWhy6Title: 'تدريب ودعم فني',
      cmsWhy6Desc: 'نضمن لك ولطاقمك إتقان التعامل مع النظام مع دعم مستمر.',
      cmsWhy7Title: 'صُمم خصيصاً',
      cmsWhy7Desc: 'حلول هندسية موجهة بدقة تلبية احتياجات صالات البلايستيشن.',
      cmsWhyChooseFooterText: 'اختيار IDEA Makers هو القرار الأذكى لمستقبل صالتك',
      cmsWhyChooseFooterBtnText: 'تحدث مع خبيرنا التقني الآن',
      cmsFounderStorySubtitle: 'الرؤية خلف الابتكار',
      cmsFounderStoryTitle: 'تعرف على مؤسس صُنّاع الفكرة',
      primaryColor: '#a855f7',
      secondaryColor: '#3b82f6',
      primaryFont: 'Inter',
      timezoneDefault: 'Cairo',
      localeDefault: 'ar',
      trialDaysCount: 3,
      pixelCode: '',
      analyticsCode: '',
      
      // Brand authority & about us default fields
      aboutUsBadge: 'القوة الهندسية خلف مشروعك',
      aboutUsTitle: 'من نحن: IDEA Makers',
      aboutUsText1: 'نحن شركة تكنولوجيا رائدة متخصصة في تطوير الأنظمة البرمجية وحلول الإدارة الذكية التي تهدف إلى رفع كفاءة الأعمال وزيادة الأرباح.',
      aboutUsText2: 'في IDEA Makers، نحن لسنا مجرد بائعي برامج؛ نحن شركة هندسية متكاملة تركز على ابتكار حلول تقنية تعالج التحديات الحقيقية التي تواجه أصحاب المشاريع، مما يضمن لك السيادة الكاملة على بيئة عملك.',
      aboutUsTag1: 'تطوير أنظمة الأعمال',
      aboutUsTag2: 'حلول الإدارة الذكية',
      aboutUsTag3: 'أتمتة العمليات',
      aboutUsBannerType: 'Engineering Excellence',
      aboutUsBannerText: 'نصمم المستقبل.. لا نكتفي ببرمجته',
      
      // Vision & Mission & Core values default fields
      visionTitle: 'رؤيتنا',
      visionText: 'نسعى لأن نكون المزوّد الأول والملهم لأنظمة إدارة الأعمال الذكية في قطاع الألعاب والترفيه، من خلال الابتكار المستمر والأتمتة التي تساعد الشركات على النمو والتوسع عالمياً، وتحويل كل صالة إلى كيان مؤسسي ناجح.',
      missionTitle: 'رسالتنا',
      missionText: 'مهمتنا هي تمكين أصحاب صالات البلايستيشن من إدارة مشاريعهم باحترافية وسهولة، والقضاء على الفوضى التشغيلية، وتحويل التكنولوجيا إلى أداة بسيطة تضاعف الأرباح وتضمن الاستدامة والنمو المستمر.',
      coreValuesTitle: 'قيمنا الجوهرية',
      coreValuesSubtitle: 'المبادئ التي تحرك كل سطر برمججي نكتبه وكل قرار نتخذه',
      val1Title: 'الابتكار',
      val1Desc: 'نسابق الزمن لتقديم أحدث الحلول.',
      val2Title: 'الموثوقية',
      val2Desc: 'أنظمتنا هي العمود الفقري لمشروعك.',
      val3Title: 'الشفافية',
      val3Desc: 'وضوح كامل في كل تفصيلة تقنية ومالية.',
      val4Title: 'التطوير المستمر',
      val4Desc: 'لا نتوقف عن تحسين أدواتنا.',
      val5Title: 'نجاح العميل',
      val5Desc: 'نجاحك هو المقياس الحقيقي لنجاحنا.',
      trustCertShowMode: 'both',
      trustCertImgUrl: 'https://i.postimg.cc/pX35pXmS/CEO-Eslam-Arafa.jpg'
    };

    if (storedCms) {
      try { setCmsData({ ...defaultCms, ...JSON.parse(storedCms) }); } catch(e) { setCmsData(defaultCms); }
    } else {
      setCmsData(defaultCms);
    }

    // 2. Blog posts
    const storedBlog = localStorage.getItem('playstation_pos_blog_posts');
    if (storedBlog) {
      try { setBlogPosts(JSON.parse(storedBlog)); } catch(e) { setBlogPosts(INITIAL_BLOG_POSTS); }
    } else {
      setBlogPosts(INITIAL_BLOG_POSTS);
    }

    // 3. Customers
    setCustomers(INITIAL_CUSTOMERS);

    // 4. CRM Leads
    setLeads(INITIAL_CRM_LEADS);

    // 5. Sales Invoices
    setInvoices(INITIAL_SALES_INVOICES);

    // 6. Licenses
    setLicenses(INITIAL_LICENSES);

    // 7. Audit Logs
    const storedLogs = localStorage.getItem('playstation_pos_audit_logs');
    if (storedLogs) {
      try { setAuditLogs(JSON.parse(storedLogs)); } catch(e) {}
    } else {
      const initialLogs = [
        { id: 'log-1', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), user: 'eslam_arafa', action: 'تأمين بنية تحتية جديدة لـ IDEA Makers', role: 'admin', type: 'system', details: 'تحديث قواعد الحماية وتوزيع أكواد الترخيص.' },
        { id: 'log-2', timestamp: new Date().toISOString(), user: 'eslam_arafa', action: 'الدخول كمسؤول كامل الصلاحيات', role: 'admin', type: 'login', details: 'تم فتح لوحة التحكم بنجاح.' }
      ];
      setAuditLogs(initialLogs);
    }

    // 8. Media Library
    const defaultMedia = [
      { id: 'med-1', name: 'CEO-Eslam-Arafa.jpg', type: 'image/jpeg', size: '245 KB', url: 'https://i.postimg.cc/pX35pXmS/CEO-Eslam-Arafa.jpg', optimized: true, compressionRatio: '68%', resolution: '800x1000' },
      { id: 'med-2', name: 'aryd-swrt-afdl-202604051407.jpg', type: 'image/jpeg', size: '1.2 MB', url: 'https://i.postimg.cc/GmskHZKC/aryd-swrt-afdl-202604051407.jpg', optimized: false, compressionRatio: '0%', resolution: '1920x1080' }
    ];
    const storedMedia = localStorage.getItem('playstation_pos_media_files');
    if (storedMedia) {
      try { setMediaFiles(JSON.parse(storedMedia)); } catch(e) { setMediaFiles(defaultMedia); }
    } else {
      setMediaFiles(defaultMedia);
    }

    // 9. Packages List initialization
    const storedPkgs = localStorage.getItem('playstation_pos_packages_data');
    if (storedPkgs) {
      try { setPackagesList(JSON.parse(storedPkgs)); } catch(e) {}
    } else {
      setPackagesList([
        {
          id: 'starter',
          name: 'Starter Package',
          price: '4000',
          currency: 'EGP',
          color: 'primary',
          features: [
            '🏡 مناسبة للصالات المبتدئة (ترخيص مخصص لفرع واحد وللأبد)',
            '🖥️ دعم كامل لعدد لا نهائي من الأجهزة والشاشات بالفرع',
            '🔌 حصانة تامة ضد انقطاع الإنترنت (نظام أوفلاين محلي 100%)',
            '🧾 حساب الوقت والمبيعات بدقة متناهية ومنع التلاعب الأساسي',
            '☕ نظام الكافيه والمشروبات والمخازن الأساسي لزيادة الأرباح',
            '📊 تقارير حسابية يومية أساسية لملخص الوردية وإجمالي الكاشير',
            '📞 دعم فني استراتيجي خلال فترة الضمان لمساعدتك في التأسيس والبدء'
          ]
        },
        {
          id: 'professional',
          name: 'Professional Package',
          price: '6000',
          currency: 'EGP',
          color: 'accent',
          features: [
            '🔥 تشمل كافة مميزات باقة Starter بالكامل برخصة أصلية للأبد',
            '📊 نظام صلاحيات متقدم ومراقبة دقيقة لمنع الموظفين من التلاعب بالفواتير أو حذفها',
            '☕ نظام الكافيه والمشروبات المتكامل لرفع مبيعات البوفيه بمتوسط 40%',
            '📈 ذكاء الأعمال المتقدم: تقارير الأرباح والخسائر والصيانة والإهلاك للأدمن',
            '🎨 تخصيص كامل لهوية صالتك التجارية وشعارك الخاص على الفواتير والإيصالات',
            '👨‍💼 بروتوكول تدريب فريق العمل الميداني وتوجيه هندسي مباشر لتفادي أي ثغرة'
          ],
          popular: true
        },
        {
          id: 'international',
          name: 'International Package',
          price: '10000',
          currency: 'EGP',
          color: 'blue',
          features: [
            '🌍 تشمل كافة مميزات الباقة الاحترافية (Professional) بالكامل',
            '🇸🇦 مهيأة بالكامل لقوانين العمل والتراخيص واشتراطات البلدية في دول الخليج',
            '💱 دعم ذكي لتغيير وتثبيت عملة بلدك (ريال، درهم، دينار) والتحويل الفوري',
            '🕒 التحكم المرن في فروق التوقيت والمنطقة الزمنية والضريبة المضافة (VAT)',
            '🛰️ قناة دعم فني دولي ذات أولوية قصوى للحالات الطارئة والتحديثات السنوية',
            '🤝 ترخيص هجين جاهز للتوسع وربط فروع متعددة مستقبلاً (قيد التطوير النشط حالياً ⏳)'
          ]
        }
      ]);
    }

    // 10. Country International Pricing list initialization
    const storedIntPr = localStorage.getItem('playstation_pos_international_pricing');
    if (storedIntPr) {
      try { setIntPricingList(JSON.parse(storedIntPr)); } catch(e) {}
    } else {
      setIntPricingList({
        egypt: { price: "10000", currency: "EGP" },
        saudi: { price: "1200", currency: "SAR" },
        uae: { price: "1200", currency: "AED" },
        qatar: { price: "1200", currency: "QAR" },
        kuwait: { price: "100", currency: "KWD" }
      });
    }

    // Set Saved Time
    const now = new Date();
    setLastSavedTime(now.toLocaleTimeString('ar-EG'));

    // Real-time Activity feed simulation
    const interval = setInterval(() => {
      const feeds = [
        { event: 'نقرة واتساب', user: 'زائر من مصر 🇪🇬', detail: 'طلب استشارة كاشير', path: '/egypt' },
        { event: 'طلب تجربة', user: 'زائر من الرياض 🇸🇦', detail: 'تعبئة حاسبة الأرباح', path: '/saudi' },
        { event: 'تنزيل ديمو', user: 'زائر من حولي 🇰🇼', detail: 'تحميل ملف التثبيت المطور', path: '/kuwait' },
        { event: 'قراءة مقال', user: 'زائر من دبي 🇦🇪', detail: 'تصفح ثغرات الكوفيشوب', path: '/blog' }
      ];
      const feed = feeds[Math.floor(Math.random() * feeds.length)];
      const newEvt = {
        id: 'evt-' + Date.now(),
        timestamp: new Date().toLocaleTimeString('ar-EG'),
        ...feed
      };
      setEventStream(prev => [newEvt, ...prev.slice(0, 9)]);
    }, 4000);

    // Mark as loaded so real-time autosave starts monitoring safely
    setIsCmsLoaded(true);

    return () => clearInterval(interval);
  }, []);

  // 1. General CMS Data Real-time Autosave & Direct Live Broadcast
  useEffect(() => {
    if (!isCmsLoaded) return;
    if (!cmsData || Object.keys(cmsData).length === 0) return;

    setIsAutosaving(true);

    const timer = setTimeout(() => {
      // Sync duplicate key styles to ensure perfect compatibility with all pages & layouts
      const syncedCmsData = {
        ...cmsData,
        heroTag: cmsData.cmsTag || cmsData.heroTag,
        heroTitlePrefix: cmsData.cmsTitlePrefix || cmsData.heroTitlePrefix,
        heroTitleHighlight: cmsData.cmsTitleHighlight || cmsData.heroTitleHighlight,
        heroDescription: cmsData.cmsDescription || cmsData.heroDescription,
        demoVideoUrl: cmsData.cmsVideo || cmsData.demoVideoUrl,
        contactPhone: cmsData.cmsPhone || cmsData.contactPhone,
        whatsappMessage: cmsData.cmsWhatsapp || cmsData.whatsappMessage,
        authTag: cmsData.cmsAuthTag || cmsData.authTag,
        authTitle: cmsData.cmsAuthTitle || cmsData.authTitle,
        authDescription: cmsData.cmsAuthDescription || cmsData.authDescription,
        authStat1Title: cmsData.cmsAuthStat1Title || cmsData.authStat1Title,
        authStat1Desc: cmsData.cmsAuthStat1Desc || cmsData.authStat1Desc,
        authStat2Title: cmsData.cmsAuthStat2Title || cmsData.authStat2Title,
        authStat2Desc: cmsData.cmsAuthStat2Desc || cmsData.authStat2Desc,
        pricingTitle: cmsData.cmsPricingTitle || cmsData.pricingTitle,
        pricingSubtitle: cmsData.cmsPricingSubtitle || cmsData.pricingSubtitle,
        branchesTitle: cmsData.cmsBranchesTitle || cmsData.branchesTitle,
        branchesText: cmsData.cmsBranchesText || cmsData.branchesText,
        branchesBtnText: cmsData.cmsBranchesBtnText || cmsData.branchesBtnText,
        trialTitle: cmsData.cmsTrialTitle || cmsData.trialTitle,
        trialText: cmsData.cmsTrialText || cmsData.trialText,
        trialBtnText: cmsData.cmsTrialBtnText || cmsData.trialBtnText,
        whyChooseTitle: cmsData.cmsWhyChooseTitle || cmsData.whyChooseTitle,
        why1Title: cmsData.cmsWhy1Title || cmsData.why1Title,
        why1Desc: cmsData.cmsWhy1Desc || cmsData.why1Desc,
        why2Title: cmsData.cmsWhy2Title || cmsData.why2Title,
        why2Desc: cmsData.cmsWhy2Desc || cmsData.why2Desc,
        why3Title: cmsData.cmsWhy3Title || cmsData.why3Title,
        why3Desc: cmsData.cmsWhy3Desc || cmsData.why3Desc,
        why4Title: cmsData.cmsWhy4Title || cmsData.why4Title,
        why4Desc: cmsData.cmsWhy4Desc || cmsData.why4Desc,
        why5Title: cmsData.cmsWhy5Title || cmsData.why5Title,
        why5Desc: cmsData.cmsWhy5Desc || cmsData.why5Desc,
        why6Title: cmsData.cmsWhy6Title || cmsData.why6Title,
        why6Desc: cmsData.cmsWhy6Desc || cmsData.why6Desc,
        why7Title: cmsData.cmsWhy7Title || cmsData.why7Title,
        why7Desc: cmsData.cmsWhy7Desc || cmsData.why7Desc,
        founderStorySubtitle: cmsData.cmsFounderStorySubtitle || cmsData.founderStorySubtitle,
        founderStoryTitle: cmsData.cmsFounderStoryTitle || cmsData.founderStoryTitle,
        
        // sync reverse
        cmsTag: cmsData.cmsTag || cmsData.heroTag,
        cmsTitlePrefix: cmsData.cmsTitlePrefix || cmsData.heroTitlePrefix,
        cmsTitleHighlight: cmsData.cmsTitleHighlight || cmsData.heroTitleHighlight,
        cmsDescription: cmsData.cmsDescription || cmsData.heroDescription,
        cmsVideo: cmsData.cmsVideo || cmsData.demoVideoUrl,
        cmsPhone: cmsData.cmsPhone || cmsData.contactPhone,
        cmsWhatsapp: cmsData.cmsWhatsapp || cmsData.whatsappMessage,
        cmsAuthTag: cmsData.cmsAuthTag || cmsData.authTag,
        cmsAuthTitle: cmsData.cmsAuthTitle || cmsData.authTitle,
        cmsAuthDescription: cmsData.cmsAuthDescription || cmsData.authDescription,
        cmsAuthStat1Title: cmsData.cmsAuthStat1Title || cmsData.authStat1Title,
        cmsAuthStat1Desc: cmsData.cmsAuthStat1Desc || cmsData.authStat1Desc,
        cmsAuthStat2Title: cmsData.cmsAuthStat2Title || cmsData.authStat2Title,
        cmsAuthStat2Desc: cmsData.cmsAuthStat2Desc || cmsData.authStat2Desc,
        cmsPricingTitle: cmsData.cmsPricingTitle || cmsData.pricingTitle,
        cmsPricingSubtitle: cmsData.cmsPricingSubtitle || cmsData.pricingSubtitle,
        cmsBranchesTitle: cmsData.cmsBranchesTitle || cmsData.branchesTitle,
        cmsBranchesText: cmsData.cmsBranchesText || cmsData.branchesText,
        cmsBranchesBtnText: cmsData.cmsBranchesBtnText || cmsData.branchesBtnText,
        cmsTrialTitle: cmsData.cmsTrialTitle || cmsData.trialTitle,
        cmsTrialText: cmsData.cmsTrialText || cmsData.trialText,
        cmsTrialBtnText: cmsData.cmsTrialBtnText || cmsData.trialBtnText,
        cmsWhyChooseTitle: cmsData.cmsWhyChooseTitle || cmsData.whyChooseTitle,
        cmsWhy1Title: cmsData.cmsWhy1Title || cmsData.why1Title,
        cmsWhy1Desc: cmsData.cmsWhy1Desc || cmsData.why1Desc,
        cmsWhy2Title: cmsData.cmsWhy2Title || cmsData.why2Title,
        cmsWhy2Desc: cmsData.cmsWhy2Desc || cmsData.why2Desc,
        cmsWhy3Title: cmsData.cmsWhy3Title || cmsData.why3Title,
        cmsWhy3Desc: cmsData.cmsWhy3Desc || cmsData.why3Desc,
        cmsWhy4Title: cmsData.cmsWhy4Title || cmsData.why4Title,
        cmsWhy4Desc: cmsData.cmsWhy4Desc || cmsData.why4Desc,
        cmsWhy5Title: cmsData.cmsWhy5Title || cmsData.why5Title,
        cmsWhy5Desc: cmsData.cmsWhy5Desc || cmsData.why5Desc,
        cmsWhy6Title: cmsData.cmsWhy6Title || cmsData.why6Title,
        cmsWhy6Desc: cmsData.cmsWhy6Desc || cmsData.why6Desc,
        cmsWhy7Title: cmsData.cmsWhy7Title || cmsData.why7Title,
        cmsWhy7Desc: cmsData.cmsWhy7Desc || cmsData.why7Desc,
        cmsFounderStorySubtitle: cmsData.cmsFounderStorySubtitle || cmsData.founderStorySubtitle,
        cmsFounderStoryTitle: cmsData.cmsFounderStoryTitle || cmsData.founderStoryTitle,
      };

      localStorage.setItem('playstation_pos_cms_content', JSON.stringify(syncedCmsData));
      window.dispatchEvent(new Event('cms-content-changed'));
      
      const nowTime = new Date();
      setLastSavedTime(nowTime.toLocaleTimeString('ar-EG'));
      setIsAutosaving(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [cmsData, isCmsLoaded]);

  // 2. Pricing Packages Real-time Autosave & Direct Live Broadcast
  useEffect(() => {
    if (!isCmsLoaded) return;
    if (!packagesList || packagesList.length === 0) return;

    setIsAutosaving(true);
    const timer = setTimeout(() => {
      localStorage.setItem('playstation_pos_packages_data', JSON.stringify(packagesList));
      window.dispatchEvent(new Event('cms-content-changed'));
      setIsAutosaving(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [packagesList, isCmsLoaded]);

  // 3. International Pricing Real-time Autosave & Direct Live Broadcast
  useEffect(() => {
    if (!isCmsLoaded) return;
    if (!intPricingList || Object.keys(intPricingList).length === 0) return;

    setIsAutosaving(true);
    const timer = setTimeout(() => {
      localStorage.setItem('playstation_pos_international_pricing', JSON.stringify(intPricingList));
      window.dispatchEvent(new Event('cms-content-changed'));
      setIsAutosaving(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [intPricingList, isCmsLoaded]);

  // 4. Blog Posts Real-time Autosave & Direct Live Broadcast
  useEffect(() => {
    if (!isCmsLoaded) return;
    if (!blogPosts || blogPosts.length === 0) return;

    setIsAutosaving(true);
    const timer = setTimeout(() => {
      localStorage.setItem('playstation_pos_blog_posts', JSON.stringify(blogPosts));
      window.dispatchEvent(new Event('cms-content-changed'));
      setIsAutosaving(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [blogPosts, isCmsLoaded]);

  // 5. Media Files Real-time Autosave & Direct Live Broadcast
  useEffect(() => {
    if (!isCmsLoaded) return;
    if (!mediaFiles || mediaFiles.length === 0) return;

    setIsAutosaving(true);
    const timer = setTimeout(() => {
      localStorage.setItem('playstation_pos_media_files', JSON.stringify(mediaFiles));
      window.dispatchEvent(new Event('cms-content-changed'));
      setIsAutosaving(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [mediaFiles, isCmsLoaded]);

  // Save changes helper
  const handleSaveChanges = async () => {
    setIsSaving(true);
    setTimeout(async () => {
      // Sync duplicate key styles to ensure perfect compatibility with all pages & layouts
      const syncedCmsData = {
        ...cmsData,
        heroTag: cmsData.cmsTag || cmsData.heroTag,
        heroTitlePrefix: cmsData.cmsTitlePrefix || cmsData.heroTitlePrefix,
        heroTitleHighlight: cmsData.cmsTitleHighlight || cmsData.heroTitleHighlight,
        heroDescription: cmsData.cmsDescription || cmsData.heroDescription,
        demoVideoUrl: cmsData.cmsVideo || cmsData.demoVideoUrl,
        contactPhone: cmsData.cmsPhone || cmsData.contactPhone,
        whatsappMessage: cmsData.cmsWhatsapp || cmsData.whatsappMessage,
        authTag: cmsData.cmsAuthTag || cmsData.authTag,
        authTitle: cmsData.cmsAuthTitle || cmsData.authTitle,
        authDescription: cmsData.cmsAuthDescription || cmsData.authDescription,
        authStat1Title: cmsData.cmsAuthStat1Title || cmsData.authStat1Title,
        authStat1Desc: cmsData.cmsAuthStat1Desc || cmsData.authStat1Desc,
        authStat2Title: cmsData.cmsAuthStat2Title || cmsData.authStat2Title,
        authStat2Desc: cmsData.cmsAuthStat2Desc || cmsData.authStat2Desc,
        pricingTitle: cmsData.cmsPricingTitle || cmsData.pricingTitle,
        pricingSubtitle: cmsData.cmsPricingSubtitle || cmsData.pricingSubtitle,
        branchesTitle: cmsData.cmsBranchesTitle || cmsData.branchesTitle,
        branchesText: cmsData.cmsBranchesText || cmsData.branchesText,
        branchesBtnText: cmsData.cmsBranchesBtnText || cmsData.branchesBtnText,
        trialTitle: cmsData.cmsTrialTitle || cmsData.trialTitle,
        trialText: cmsData.cmsTrialText || cmsData.trialText,
        trialBtnText: cmsData.cmsTrialBtnText || cmsData.trialBtnText,
        whyChooseTitle: cmsData.cmsWhyChooseTitle || cmsData.whyChooseTitle,
        why1Title: cmsData.cmsWhy1Title || cmsData.why1Title,
        why1Desc: cmsData.cmsWhy1Desc || cmsData.why1Desc,
        why2Title: cmsData.cmsWhy2Title || cmsData.why2Title,
        why2Desc: cmsData.cmsWhy2Desc || cmsData.why2Desc,
        why3Title: cmsData.cmsWhy3Title || cmsData.why3Title,
        why3Desc: cmsData.cmsWhy3Desc || cmsData.why3Desc,
        why4Title: cmsData.cmsWhy4Title || cmsData.why4Title,
        why4Desc: cmsData.cmsWhy4Desc || cmsData.why4Desc,
        why5Title: cmsData.cmsWhy5Title || cmsData.why5Title,
        why5Desc: cmsData.cmsWhy5Desc || cmsData.why5Desc,
        why6Title: cmsData.cmsWhy6Title || cmsData.why6Title,
        why6Desc: cmsData.cmsWhy6Desc || cmsData.why6Desc,
        why7Title: cmsData.cmsWhy7Title || cmsData.why7Title,
        why7Desc: cmsData.cmsWhy7Desc || cmsData.why7Desc,
        founderStorySubtitle: cmsData.cmsFounderStorySubtitle || cmsData.founderStorySubtitle,
        founderStoryTitle: cmsData.cmsFounderStoryTitle || cmsData.founderStoryTitle,
        
        // sync reverse
        cmsTag: cmsData.cmsTag || cmsData.heroTag,
        cmsTitlePrefix: cmsData.cmsTitlePrefix || cmsData.heroTitlePrefix,
        cmsTitleHighlight: cmsData.cmsTitleHighlight || cmsData.heroTitleHighlight,
        cmsDescription: cmsData.cmsDescription || cmsData.heroDescription,
        cmsVideo: cmsData.cmsVideo || cmsData.demoVideoUrl,
        cmsPhone: cmsData.cmsPhone || cmsData.contactPhone,
        cmsWhatsapp: cmsData.cmsWhatsapp || cmsData.whatsappMessage,
        cmsAuthTag: cmsData.cmsAuthTag || cmsData.authTag,
        cmsAuthTitle: cmsData.cmsAuthTitle || cmsData.authTitle,
        cmsAuthDescription: cmsData.cmsAuthDescription || cmsData.authDescription,
        cmsAuthStat1Title: cmsData.cmsAuthStat1Title || cmsData.authStat1Title,
        cmsAuthStat1Desc: cmsData.cmsAuthStat1Desc || cmsData.authStat1Desc,
        cmsAuthStat2Title: cmsData.cmsAuthStat2Title || cmsData.authStat2Title,
        cmsAuthStat2Desc: cmsData.cmsAuthStat2Desc || cmsData.authStat2Desc,
        cmsPricingTitle: cmsData.cmsPricingTitle || cmsData.pricingTitle,
        cmsPricingSubtitle: cmsData.cmsPricingSubtitle || cmsData.pricingSubtitle,
        cmsBranchesTitle: cmsData.cmsBranchesTitle || cmsData.branchesTitle,
        cmsBranchesText: cmsData.cmsBranchesText || cmsData.branchesText,
        cmsBranchesBtnText: cmsData.cmsBranchesBtnText || cmsData.branchesBtnText,
        cmsTrialTitle: cmsData.cmsTrialTitle || cmsData.trialTitle,
        cmsTrialText: cmsData.cmsTrialText || cmsData.trialText,
        cmsTrialBtnText: cmsData.cmsTrialBtnText || cmsData.trialBtnText,
        cmsWhyChooseTitle: cmsData.cmsWhyChooseTitle || cmsData.whyChooseTitle,
        cmsWhy1Title: cmsData.cmsWhy1Title || cmsData.why1Title,
        cmsWhy1Desc: cmsData.cmsWhy1Desc || cmsData.why1Desc,
        cmsWhy2Title: cmsData.cmsWhy2Title || cmsData.why2Title,
        cmsWhy2Desc: cmsData.cmsWhy2Desc || cmsData.why2Desc,
        cmsWhy3Title: cmsData.cmsWhy3Title || cmsData.why3Title,
        cmsWhy3Desc: cmsData.cmsWhy3Desc || cmsData.why3Desc,
        cmsWhy4Title: cmsData.cmsWhy4Title || cmsData.why4Title,
        cmsWhy4Desc: cmsData.cmsWhy4Desc || cmsData.why4Desc,
        cmsWhy5Title: cmsData.cmsWhy5Title || cmsData.why5Title,
        cmsWhy5Desc: cmsData.cmsWhy5Desc || cmsData.why5Desc,
        cmsWhy6Title: cmsData.cmsWhy6Title || cmsData.why6Title,
        cmsWhy6Desc: cmsData.cmsWhy6Desc || cmsData.why6Desc,
        cmsWhy7Title: cmsData.cmsWhy7Title || cmsData.why7Title,
        cmsWhy7Desc: cmsData.cmsWhy7Desc || cmsData.why7Desc,
        cmsFounderStorySubtitle: cmsData.cmsFounderStorySubtitle || cmsData.founderStorySubtitle,
        cmsFounderStoryTitle: cmsData.cmsFounderStoryTitle || cmsData.founderStoryTitle,
      };

      // Direct sync to Supabase PostgreSQL & Realtime channel
      await saveCmsContentBatchToSupabase({
        playstation_pos_cms_content: JSON.stringify(syncedCmsData),
        playstation_pos_blog_posts: JSON.stringify(blogPosts),
        playstation_pos_packages_data: JSON.stringify(packagesList),
        playstation_pos_international_pricing: JSON.stringify(intPricingList)
      });

      // Dispatch custom event so App.tsx and other views instantly update
      window.dispatchEvent(new Event('cms-content-changed'));
      
      const now = new Date();
      setLastSavedTime(now.toLocaleTimeString('ar-EG'));
      setIsSaving(false);
      
      // Add audit log
      const newLog = {
        id: 'log-' + Date.now(),
        timestamp: now.toISOString(),
        user: 'eslam_arafa',
        action: 'تحديث بيانات ومحتوى الـ Enterprise CMS الشامل والأسعار والباقات المخصصة',
        role: activeRole,
        type: 'save',
        details: 'تم حفظ ومزامنة كافة التحديثات والأسعار وميزات الباقات محلياً بنجاح.'
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }, 800);
  };

  // Full default reset
  const handleRestoreDefaults = () => {
    if (confirm('⚠️ هل أنت متأكد من رغبتك في إعادة ضبط المصنع بالكامل للموقع ومسح التعديلات؟')) {
      localStorage.removeItem('playstation_pos_cms_content');
      localStorage.removeItem('playstation_pos_blog_posts');
      window.location.reload();
    }
  };

  // Update CMS field helper
  const updateCmsField = (key: string, value: any) => {
    setCmsData(prev => ({ ...prev, [key]: value }));
  };

  // Sidebar Group Sections structure for the exact 22 tabs
  const sidebarGroups = [
    {
      title: 'أبرز الإحصائيات العامة (Overview)',
      items: [
        { id: 'dashboard', label: 'لوحة التحكم والنمو', icon: BarChart2, color: 'text-indigo-400' }
      ]
    },
    {
      title: 'إدارة صفحات الموقع والـ CMS (CMS & Pages)',
      items: [
        { id: 'landing_page', label: 'تعديل نصوص الصفحة الهبوط', icon: Layers, color: 'text-purple-400' },
        { id: 'website', label: 'هيكلة القوائم والصفحات', icon: Globe, color: 'text-blue-400' },
        { id: 'pricing', label: 'باقات التسعير والبلدان', icon: Landmark, color: 'text-amber-400' },
        { id: 'blog', label: 'مدونة صُنّاع الفكرة', icon: FileText, color: 'text-pink-400' }
      ]
    },
    {
      title: 'إدارة العملاء والمبيعات (Operations & Sales)',
      items: [
        { id: 'customers', label: 'قاعدة العملاء والمنشآت', icon: Users, color: 'text-emerald-400' },
        { id: 'crm', label: 'خط المبيعات والمتابعة', icon: Share2, color: 'text-rose-400' },
        { id: 'sales', label: 'فواتير التحصيل الفعلي', icon: Landmark, color: 'text-cyan-400' },
        { id: 'whatsapp', label: 'ردود تواصل واتساب آلياً', icon: MessageCircle, color: 'text-teal-400' },
        { id: 'licenses', label: 'تراخيص الأكواد والـ POS', icon: Code, color: 'text-violet-400' },
        { id: 'downloads', label: 'إصدارات الملف المرفق', icon: Download, color: 'text-orange-400' }
      ]
    },
    {
      title: 'الأصول الرقمية والتسويق (Media & Marketing)',
      items: [
        { id: 'media_library', label: 'مكتبة الصور والميديا الموفرة', icon: Image, color: 'text-yellow-400' },
        { id: 'brand_assets', label: 'ألوان وهوية البراند الأساسية', icon: Palette, color: 'text-fuchsia-400' },
        { id: 'seo', label: 'ميتا غوغل والسيو الشامل', icon: Search, color: 'text-sky-400' },
        { id: 'analytics', label: 'بكسل ميتا وتتبع التحويل', icon: Activity, color: 'text-green-400' }
      ]
    },
    {
      title: 'المعرفة والوثائق (Playbook & Docs)',
      items: [
        { id: 'playbook', label: 'كتاب ومذكرات ملاك الصالات', icon: BookOpen, color: 'text-red-400' },
        { id: 'company_documents', label: 'العقود والوثائق الرسمية للشركة', icon: Folder, color: 'text-stone-400' },
        { id: 'support', label: 'تذاكر الدعم والأسئلة الشائعة', icon: HelpCircle, color: 'text-sky-300' }
      ]
    },
    {
      title: 'النظام والتحكم (System Control)',
      items: [
        { id: 'settings', label: 'إعدادات المنصة العامة', icon: Settings, color: 'text-gray-300' },
        { id: 'users', label: 'صلاحيات طاقم العمل', icon: UserCheck, color: 'text-orange-300' },
        { id: 'logs', label: 'سجلات الأمان والتدقيق الأمني', icon: Database, color: 'text-red-300' }
      ]
    },
    {
      title: 'الذكاء الاصطناعي (AI Co-Pilot)',
      items: [
        { id: 'ai_assistant', label: 'مساعد السيو والذكاء الاصطناعي', icon: Sparkles, color: 'text-yellow-300 font-bold' }
      ]
    }
  ];

  return (
    <div className="bg-black/60 min-h-screen text-right font-sans flex flex-col relative" dir="rtl">
      {/* CMS Toolbar Header */}
      <header className="bg-[#09090b] border-b border-white/5 py-4 px-6 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-primary/15 p-2 rounded-xl border border-primary/30">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>لوحة الـ Enterprise CMS والتحكم المطور لـ IDEA Makers</span>
              <span className="text-[10px] bg-primary/20 text-primary font-bold px-2 py-0.5 rounded-full">
                سيادة كاملة ⚡
              </span>
            </h1>
            <p className="text-[11px] text-gray-500 mt-0.5">مستوحى من معايير Notion و Shopify لمرونة المحتوى الكلية.</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {isAutosaving ? (
            <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
              <span>جاري حفظ ومزامنة التغييرات تلقائياً...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>تم الحفظ تلقائياً والرفع الفوري ✅</span>
            </div>
          )}

          <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">
            آخر مزامنة: {lastSavedTime || 'غير متوفر'}
          </span>

          <button
            type="button"
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary/20 disabled:opacity-50"
            title="حفظ يدوي إضافي مع تسجيل في سجلات التدقيق الأمني للأدمن"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>تسجيل وتوثيق التغييرات يدوياً ⚡</span>
          </button>

          <button
            type="button"
            onClick={onBackToLanding}
            className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer"
          >
            خروج من اللوحة الرئيسية
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Right Sidebar containing exactly the 22 requested sections */}
        <aside className="w-full lg:w-80 bg-[#09090b]/80 border-l border-white/5 p-4 flex flex-col gap-4 overflow-y-auto z-20">
          {/* Quick sidebar search */}
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن قسم للتحكم..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white pr-8 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-2.5 top-2" />
          </div>

          {/* Navigation group lists */}
          <nav className="space-y-4 flex-1">
            {sidebarGroups.map((group, gIdx) => {
              const filteredItems = group.items.filter(item => 
                item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
              );
              if (filteredItems.length === 0) return null;

              return (
                <div key={gIdx} className="space-y-1.5">
                  <h3 className="text-[10px] text-gray-500 font-bold px-2 uppercase tracking-wider">
                    {group.title}
                  </h3>
                  
                  <div className="space-y-0.5">
                    {filteredItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTab(item.id as CmsTab)}
                          className={`w-full text-right px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group cursor-pointer ${
                            isActive 
                              ? 'bg-primary text-white font-black shadow-lg shadow-primary/10' 
                              : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          <span className="text-[9px] text-gray-600 group-hover:text-gray-400 transition-all">
                            {item.id === 'ai_assistant' ? 'نظام ذكي 🤖' : 'دخول'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Central Content Area */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Header of Active Tab */}
          <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">مسار التحكم الفعال</span>
              <h2 className="text-md font-black text-white mt-1">
                {activeTab === 'dashboard' && '📈 لوحة التحكم والنمو الإحصائي الشامل'}
                {activeTab === 'landing_page' && '🏠 محرر نصوص وأقسام الصفحة الرئيسية'}
                {activeTab === 'website' && '🌐 إعدادات هيكل الموقع والقوائم المخصصة'}
                {activeTab === 'pricing' && '💳 إدارة باقات التسعير للبلدان والبلديات'}
                {activeTab === 'blog' && '✍️ نظام إنشاء وتحرير مقالات المدونة'}
                {activeTab === 'customers' && '👥 قاعدة العملاء والمنشآت النشطة'}
                {activeTab === 'crm' && '🤝 متابعة خط المبيعات والمهتمين بالسيستم'}
                {activeTab === 'sales' && '🧾 سجل الفواتير والمقبوضات الفعلي للشركة'}
                {activeTab === 'whatsapp' && '💬 تواصل الواتساب الآلي والرسائل الترحيبية'}
                {activeTab === 'seo' && '🔍 تهيئة السيو وميتا غوغل الشامل للبلدان'}
                {activeTab === 'media_library' && '🖼️ مكتبة الميديا والرفع الموفر الذكي'}
                {activeTab === 'brand_assets' && '🎨 تعديل هوية البراند والألوان'}
                {activeTab === 'analytics' && '📊 بكسل فيسبوك والتحليلات البرمجية'}
                {activeTab === 'support' && '🤝 تذاكر الدعم والأسئلة الشائعة لملاك الصالات'}
                {activeTab === 'licenses' && '🔑 مولد وتدقيق أكواد وتراخيص كاشير الـ POS'}
                {activeTab === 'downloads' && '💾 إدارة إصدارات ملف التثبيت والتحميلات للبرنامج'}
                {activeTab === 'playbook' && '📖 كتاب ومستندات ملاك صالات البلايستيشن'}
                {activeTab === 'company_documents' && '📂 الوثائق الرسمية والمواصفات الفنية المعتمدة'}
                {activeTab === 'settings' && '⚙️ الإعدادات العامة لسيستم الـ CMS'}
                {activeTab === 'users' && '👥 حسابات وصلاحيات طاقم عمل صُنّاع الفكرة'}
                {activeTab === 'logs' && '📂 سجل الأمان وتدقيق التعديلات والنسخ الاحتياطي'}
                {activeTab === 'ai_assistant' && '🤖 مساعد السيو والتسويق بالذكاء الاصطناعي'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-gray-400 font-bold">الدور النشط: {activeRole.toUpperCase()}</span>
            </div>
          </div>

          {/* Render corresponding modular views based on activeTab with Live Preview split panel */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Column 1: Editor Form Workspace */}
            <div className={`space-y-6 ${
              ['landing_page', 'pricing', 'brand_assets', 'seo', 'media_library'].includes(activeTab) 
                ? 'xl:col-span-7' 
                : 'xl:col-span-12'
            }`}>
              
              {/* 1. Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <CmsDashboard 
                  customers={customers} 
                  invoices={invoices} 
                  eventStream={eventStream} 
                />
              )}

              {/* 2. Landing Page CMS Tab */}
              {activeTab === 'landing_page' && (
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-6">
                  <div className="flex border-b border-white/5 pb-0 overflow-x-auto gap-1">
                    {[
                      { id: 'hero', label: 'القسم الرئيسي (Hero)' },
                      { id: 'about_us', label: 'من نحن' },
                      { id: 'vision_values', label: 'الرؤية والرسالة والقيم' },
                      { id: 'why_choose', label: 'لماذا تختارنا' },
                      { id: 'founder', label: 'قصة المؤسس' },
                      { id: 'trial', label: 'فترة التجربة والضمان' },
                      { id: 'trust_cert', label: 'الشهادة والتوثيق' },
                      { id: 'branches', label: 'الفروع المتعددة' }
                    ].map(sec => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setEditingSection(sec.id as any)}
                        className={`px-4 py-2.5 text-xs font-black transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                          editingSection === sec.id ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>

                  {editingSection === 'hero' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">شارة التاج التعريفي (Badge)</label>
                          <input
                            type="text"
                            value={cmsData.cmsTag || ''}
                            onChange={(e) => updateCmsField('cmsTag', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">بادئة العنوان الرئيسي (Title Prefix)</label>
                          <input
                            type="text"
                            value={cmsData.cmsTitlePrefix || ''}
                            onChange={(e) => updateCmsField('cmsTitlePrefix', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">العنوان العريض الملون (Title Highlight)</label>
                          <input
                            type="text"
                            value={cmsData.cmsTitleHighlight || ''}
                            onChange={(e) => updateCmsField('cmsTitleHighlight', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الوصف التعريفي للقسم (Description)</label>
                          <textarea
                            rows={3}
                            value={cmsData.cmsDescription || ''}
                            onChange={(e) => updateCmsField('cmsDescription', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {editingSection === 'about_us' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">شارة قسم من نحن (Badge)</label>
                          <input
                            type="text"
                            value={cmsData.aboutUsBadge || ''}
                            onChange={(e) => updateCmsField('aboutUsBadge', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان من نحن الرئيسي (Title)</label>
                          <input
                            type="text"
                            value={cmsData.aboutUsTitle || ''}
                            onChange={(e) => updateCmsField('aboutUsTitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الفقرة الأولى (Paragraph 1)</label>
                          <textarea
                            rows={3}
                            value={cmsData.aboutUsText1 || ''}
                            onChange={(e) => updateCmsField('aboutUsText1', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الفقرة الثانية (Paragraph 2)</label>
                          <textarea
                            rows={3}
                            value={cmsData.aboutUsText2 || ''}
                            onChange={(e) => updateCmsField('aboutUsText2', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الوسم الأول (Tag 1)</label>
                          <input
                            type="text"
                            value={cmsData.aboutUsTag1 || ''}
                            onChange={(e) => updateCmsField('aboutUsTag1', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الوسم الثاني (Tag 2)</label>
                          <input
                            type="text"
                            value={cmsData.aboutUsTag2 || ''}
                            onChange={(e) => updateCmsField('aboutUsTag2', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الوسم الثالث (Tag 3)</label>
                          <input
                            type="text"
                            value={cmsData.aboutUsTag3 || ''}
                            onChange={(e) => updateCmsField('aboutUsTag3', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">نوع شريط من نحن الملون</label>
                          <input
                            type="text"
                            value={cmsData.aboutUsBannerType || ''}
                            onChange={(e) => updateCmsField('aboutUsBannerType', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">نص شريط من نحن الملون</label>
                          <input
                            type="text"
                            value={cmsData.aboutUsBannerText || ''}
                            onChange={(e) => updateCmsField('aboutUsBannerText', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {editingSection === 'vision_values' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان الرؤية</label>
                          <input
                            type="text"
                            value={cmsData.visionTitle || ''}
                            onChange={(e) => updateCmsField('visionTitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان الرسالة</label>
                          <input
                            type="text"
                            value={cmsData.missionTitle || ''}
                            onChange={(e) => updateCmsField('missionTitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">نص الرؤية الكامل</label>
                          <textarea
                            rows={2}
                            value={cmsData.visionText || ''}
                            onChange={(e) => updateCmsField('visionText', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">نص الرسالة الكامل</label>
                          <textarea
                            rows={2}
                            value={cmsData.missionText || ''}
                            onChange={(e) => updateCmsField('missionText', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2 border-t border-white/5 pt-4">
                          <h4 className="text-xs font-bold text-white mb-2">القيم الجوهرية (Core Values)</h4>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان قسم القيم</label>
                          <input
                            type="text"
                            value={cmsData.coreValuesTitle || ''}
                            onChange={(e) => updateCmsField('coreValuesTitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">العنوان الفرعي للقيم</label>
                          <input
                            type="text"
                            value={cmsData.coreValuesSubtitle || ''}
                            onChange={(e) => updateCmsField('coreValuesSubtitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        
                        {/* Values details */}
                        {[1, 2, 3, 4, 5].map(vNum => (
                          <React.Fragment key={vNum}>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 font-bold">القيمة {vNum} (العنوان)</label>
                              <input
                                type="text"
                                value={cmsData[`val${vNum}Title`] || ''}
                                onChange={(e) => updateCmsField(`val${vNum}Title`, e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-xs mb-1 font-bold">القيمة {vNum} (الشرح)</label>
                              <input
                                type="text"
                                value={cmsData[`val${vNum}Desc`] || ''}
                                onChange={(e) => updateCmsField(`val${vNum}Desc`, e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                              />
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {editingSection === 'why_choose' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان قسم "لماذا تختارنا"</label>
                        <input
                          type="text"
                          value={cmsData.cmsWhyChooseTitle || ''}
                          onChange={(e) => updateCmsField('cmsWhyChooseTitle', e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-4 border-t border-white/5 pt-4">
                        <h4 className="text-xs font-bold text-white">الميزات السبعة المخصصة</h4>
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                          <div key={num} className="grid grid-cols-2 gap-4 bg-white/[0.01] p-3 rounded-xl border border-white/5">
                            <div>
                              <label className="block text-gray-400 text-[10px] mb-1 font-bold">الميزة {num} (العنوان)</label>
                              <input
                                type="text"
                                value={cmsData[`cmsWhy${num}Title`] || ''}
                                onChange={(e) => updateCmsField(`cmsWhy${num}Title`, e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-[10px] mb-1 font-bold">الميزة {num} (الوصف)</label>
                              <input
                                type="text"
                                value={cmsData[`cmsWhy${num}Desc`] || ''}
                                onChange={(e) => updateCmsField(`cmsWhy${num}Desc`, e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {editingSection === 'founder' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">شارة قصة المؤسس</label>
                          <input
                            type="text"
                            value={cmsData.cmsFounderStorySubtitle || ''}
                            onChange={(e) => updateCmsField('cmsFounderStorySubtitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان قصة المؤسس الرئيسي</label>
                          <input
                            type="text"
                            value={cmsData.cmsFounderStoryTitle || ''}
                            onChange={(e) => updateCmsField('cmsFounderStoryTitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">اقتباس المؤسس المتميز</label>
                          <textarea
                            rows={2}
                            value={cmsData.founderQuote || ''}
                            onChange={(e) => updateCmsField('founderQuote', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الفقرة الأولى من القصة</label>
                          <textarea
                            rows={3}
                            value={cmsData.founderPara1 || ''}
                            onChange={(e) => updateCmsField('founderPara1', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الفقرة الثانية من القصة</label>
                          <textarea
                            rows={3}
                            value={cmsData.founderPara2 || ''}
                            onChange={(e) => updateCmsField('founderPara2', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">الفقرة الثالثة من القصة</label>
                          <textarea
                            rows={3}
                            value={cmsData.founderPara3 || ''}
                            onChange={(e) => updateCmsField('founderPara3', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">اسم المؤسس</label>
                          <input
                            type="text"
                            value={cmsData.founderName || ''}
                            onChange={(e) => updateCmsField('founderName', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">المنصب / المسمى الوظيفي</label>
                          <input
                            type="text"
                            value={cmsData.founderRole || ''}
                            onChange={(e) => updateCmsField('founderRole', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان الخبرة والتميز</label>
                          <input
                            type="text"
                            value={cmsData.founderExpTitle || ''}
                            onChange={(e) => updateCmsField('founderExpTitle', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">مجال الخبرة والتميز</label>
                          <input
                            type="text"
                            value={cmsData.founderExpDesc || ''}
                            onChange={(e) => updateCmsField('founderExpDesc', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">رابط صورة المؤسس</label>
                          <input
                            type="text"
                            value={cmsData.founderImgUrl || ''}
                            onChange={(e) => updateCmsField('founderImgUrl', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {editingSection === 'trial' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان قسم التجربة والضمان</label>
                        <input
                          type="text"
                          value={cmsData.cmsTrialTitle || ''}
                          onChange={(e) => updateCmsField('cmsTrialTitle', e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">نص التجربة والضمان بالكامل</label>
                        <textarea
                          rows={4}
                          value={cmsData.cmsTrialText || ''}
                          onChange={(e) => updateCmsField('cmsTrialText', e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">نص زر التجربة المجانية</label>
                        <input
                          type="text"
                          value={cmsData.cmsTrialBtnText || ''}
                          onChange={(e) => updateCmsField('cmsTrialBtnText', e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  )}

                  {editingSection === 'trust_cert' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">طريقة عرض قسم الشهادة والتوثيق</label>
                          <select
                            value={cmsData.trustCertShowMode || 'both'}
                            onChange={(e) => updateCmsField('trustCertShowMode', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="both">عرض الشهادة ومحاكي الفيديو معاً</option>
                            <option value="cert">عرض الشهادة فقط</option>
                            <option value="video">عرض محاكي الفيديو فقط</option>
                            <option value="none">إخفاء هذا القسم بالكامل من الموقع</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1 font-bold">رابط صورة شهادة التوثيق والأمان</label>
                          <input
                            type="text"
                            value={cmsData.trustCertImgUrl || ''}
                            onChange={(e) => updateCmsField('trustCertImgUrl', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary font-mono"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-gray-400 text-xs mb-1 font-bold">رابط ديمو الفيديو اليوتيوب (Demo Video URL)</label>
                          <input
                            type="text"
                            value={cmsData.cmsVideo || ''}
                            onChange={(e) => updateCmsField('cmsVideo', e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {editingSection === 'branches' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان قسم الفروع المتعددة</label>
                        <input
                          type="text"
                          value={cmsData.cmsBranchesTitle || ''}
                          onChange={(e) => updateCmsField('cmsBranchesTitle', e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">شرح قسم الفروع والحل المخصص</label>
                        <textarea
                          rows={4}
                          value={cmsData.cmsBranchesText || ''}
                          onChange={(e) => updateCmsField('cmsBranchesText', e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">نص زر طلب النظام المخصص</label>
                        <input
                          type="text"
                          value={cmsData.cmsBranchesBtnText || ''}
                          onChange={(e) => updateCmsField('cmsBranchesBtnText', e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Website structural Settings */}
              {activeTab === 'website' && (
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4 max-w-xl">
                  <h3 className="text-sm font-black text-white">هيكلة الموقع والقوائم المخصصة</h3>
                  <p className="text-xs text-gray-400">تحكم بوجود الصفحات الرئيسية وإعدادات ظهور القوائم لزوار الموقع.</p>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                      <span>تفعيل صفحة المدونة (Blog Active)</span>
                      <input
                        type="checkbox"
                        checked={cmsData.isBlogEnabled !== false}
                        onChange={(e) => updateCmsField('isBlogEnabled', e.target.checked)}
                        className="w-4 h-4 text-primary"
                      />
                    </div>

                    <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                      <span>تفعيل حاسبة أرباح الصالات (Profit Calculator)</span>
                      <input
                        type="checkbox"
                        checked={cmsData.isCalcEnabled !== false}
                        onChange={(e) => updateCmsField('isCalcEnabled', e.target.checked)}
                        className="w-4 h-4 text-primary"
                      />
                    </div>

                    <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                      <span>إجبار الوضع الداكن الافتراضي (Default Dark Mode)</span>
                      <input
                        type="checkbox"
                        checked={cmsData.isDarkModeOnly !== false}
                        onChange={(e) => updateCmsField('isDarkModeOnly', e.target.checked)}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Pricing plans */}
              {activeTab === 'pricing' && (
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-white">إدارة باقات التسعير وعناوين قسم الأسعار</h3>
                    <p className="text-xs text-gray-400 mt-1">تحكم كامل في الأسعار، العملات، الميزات والتفاصيل لكل باقة ولجميع الدول.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5 pb-6">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 font-bold">العنوان الرئيسي لقسم التسعير</label>
                      <input
                        type="text"
                        value={cmsData.cmsPricingTitle || 'استثمار سيادي.. لمرة واحدة'}
                        onChange={(e) => updateCmsField('cmsPricingTitle', e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 font-bold">العنوان الفرعي لقسم التسعير</label>
                      <input
                        type="text"
                        value={cmsData.cmsPricingSubtitle || ''}
                        onChange={(e) => updateCmsField('cmsPricingSubtitle', e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Dynamic Packages Editor */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-primary uppercase tracking-wider">📦 محرر الباقات الفردية (العرض المحلي والدولي)</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {packagesList.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedEditPackageId(pkg.id)}
                          className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                            selectedEditPackageId === pkg.id
                              ? 'bg-primary/10 border-primary text-white'
                              : 'bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="text-xs font-black text-white">{pkg.name}</div>
                          <div className="text-[10px] text-gray-400 mt-1">سعر الباقة الأساسي: {pkg.price} {pkg.currency}</div>
                          <div className="text-[10px] text-gray-500 mt-1">عدد المميزات: {pkg.features.length}</div>
                        </button>
                      ))}
                    </div>

                    {/* Selected Package Fields */}
                    {(() => {
                      const activePkg = packagesList.find(p => p.id === selectedEditPackageId);
                      if (!activePkg) return null;

                      return (
                        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-4">
                          <h5 className="text-xs font-bold text-white flex justify-between items-center">
                            <span>تعديل تفاصيل باقة: <strong className="text-primary">{activePkg.name}</strong></span>
                            <span className="text-[9px] text-gray-500">ID: {activePkg.id}</span>
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-gray-400 text-[10px] mb-1 font-bold">اسم الباقة (العربي/الإنجليزي)</label>
                              <input
                                type="text"
                                value={activePkg.name}
                                onChange={(e) => {
                                  const updated = packagesList.map(p => p.id === activePkg.id ? { ...p, name: e.target.value } : p);
                                  setPackagesList(updated);
                                }}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-[10px] mb-1 font-bold">السعر الأساسي</label>
                              <input
                                type="text"
                                value={activePkg.price}
                                onChange={(e) => {
                                  const updated = packagesList.map(p => p.id === activePkg.id ? { ...p, price: e.target.value } : p);
                                  setPackagesList(updated);
                                }}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-[10px] mb-1 font-bold">العملة الافتراضية</label>
                              <input
                                type="text"
                                value={activePkg.currency}
                                onChange={(e) => {
                                  const updated = packagesList.map(p => p.id === activePkg.id ? { ...p, currency: e.target.value } : p);
                                  setPackagesList(updated);
                                }}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-[10px] mb-1 font-bold">تمييز الباقة كأكثر مبيعاً</label>
                              <select
                                value={activePkg.popular ? 'yes' : 'no'}
                                onChange={(e) => {
                                  const updated = packagesList.map(p => p.id === activePkg.id ? { ...p, popular: e.target.value === 'yes' } : p);
                                  setPackagesList(updated);
                                }}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option value="yes">نعم (الأكثر شعبية)</option>
                                <option value="no">لا</option>
                              </select>
                            </div>
                          </div>

                          {/* Features of active package */}
                          <div className="space-y-2">
                            <label className="block text-gray-400 text-[10px] font-bold">📋 مميزات هذه الباقة بالتفصيل:</label>
                            
                            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                              {activePkg.features.map((feat, fIdx) => (
                                <div key={fIdx} className="flex gap-2 items-center">
                                  <input
                                    type="text"
                                    value={feat}
                                    onChange={(e) => {
                                      const newFeats = [...activePkg.features];
                                      newFeats[fIdx] = e.target.value;
                                      const updated = packagesList.map(p => p.id === activePkg.id ? { ...p, features: newFeats } : p);
                                      setPackagesList(updated);
                                    }}
                                    className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFeats = activePkg.features.filter((_, idx) => idx !== fIdx);
                                      const updated = packagesList.map(p => p.id === activePkg.id ? { ...p, features: newFeats } : p);
                                      setPackagesList(updated);
                                    }}
                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-xl text-xs cursor-pointer transition-all"
                                    title="حذف الميزة"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2 pt-1">
                              <input
                                type="text"
                                placeholder="أضف ميزة جديدة باحترافية كاملة..."
                                value={newFeatureText}
                                onChange={(e) => setNewFeatureText(e.target.value)}
                                className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!newFeatureText.trim()) return;
                                  const newFeats = [...activePkg.features, newFeatureText.trim()];
                                  const updated = packagesList.map(p => p.id === activePkg.id ? { ...p, features: newFeats } : p);
                                  setPackagesList(updated);
                                  setNewFeatureText('');
                                }}
                                className="bg-primary hover:bg-primary/80 text-white px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all"
                              >
                                إضافة ميزة
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* International Pricing Settings */}
                  <div className="space-y-4 border-t border-white/5 pt-6">
                    <h4 className="text-xs font-black text-primary uppercase tracking-wider">🌍 محرر تسعير الباقة الاحترافية حسب البلدان (International Pricing Engine)</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {[
                        { key: 'egypt', name: 'جمهورية مصر العربية 🇪🇬' },
                        { key: 'saudi', name: 'المملكة العربية السعودية 🇸🇦' },
                        { key: 'uae:aec', name: 'دولة الإمارات العربية المتحدة 🇦🇪', actualKey: 'uae' },
                        { key: 'qatar', name: 'دولة قطر 🇶🇦' },
                        { key: 'kuwait', name: 'دولة الكويت 🇰🇼' }
                      ].map((country) => {
                        const storeKey = country.actualKey || country.key;
                        const data = intPricingList[storeKey] || { price: '1200', currency: 'SAR' };
                        return (
                          <div key={country.key} className="bg-white/[0.01] border border-white/5 p-3 rounded-xl space-y-2">
                            <span className="text-[10px] font-bold text-white block truncate">{country.name}</span>
                            
                            <div className="space-y-1.5">
                              <div>
                                <label className="block text-[8px] text-gray-500 font-bold">سعر الباقة (رقم)</label>
                                <input
                                  type="text"
                                  value={data.price}
                                  onChange={(e) => {
                                    const updated = {
                                      ...intPricingList,
                                      [storeKey]: { ...data, price: e.target.value }
                                    };
                                    setIntPricingList(updated);
                                  }}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] text-gray-500 font-bold">عملة البلد</label>
                                <input
                                  type="text"
                                  value={data.currency}
                                  onChange={(e) => {
                                    const updated = {
                                      ...intPricingList,
                                      [storeKey]: { ...data, currency: e.target.value }
                                    };
                                    setIntPricingList(updated);
                                  }}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Blog CMS system */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                    <h3 className="text-sm font-black text-white">كتابة مقال جديد ونشره في المدونة</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">عنوان المقال المثير</label>
                        <input
                          type="text"
                          placeholder="مثال: كيف تحمي صالتك من الثغرات الخفية؟"
                          value={newBlogTitle}
                          onChange={(e) => setNewBlogTitle(e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1 font-bold">تصنيف المقال</label>
                        <input
                          type="text"
                          value={newBlogCategory}
                          onChange={(e) => setNewBlogCategory(e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-gray-400 text-xs mb-1 font-bold">محتوى المقال كاملاً</label>
                        <textarea
                          rows={5}
                          placeholder="اكتب تفاصيل مقالك هنا ليكون سيو ممتاز..."
                          value={newBlogContent}
                          onChange={(e) => setNewBlogContent(e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => {
                          if (!newBlogTitle || !newBlogContent) return;
                          const newPost: BlogCmsPost = {
                            id: 'post-' + Date.now(),
                            title: newBlogTitle,
                            slug: 'slug-' + Date.now(),
                            category: newBlogCategory,
                            status: 'published',
                            publishDate: new Date().toISOString().split('T')[0],
                            views: 0,
                            content: newBlogContent,
                            author: 'م. إسلام عرفة'
                          };
                          setBlogPosts(prev => [newPost, ...prev]);
                          setNewBlogTitle('');
                          setNewBlogContent('');
                          alert('📝 تم نشر المقال بنجاح في قسم المدونة الرئيسي للزوار!');
                        }}
                        className="bg-primary text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-primary/90"
                      >
                        نشر المقال فوراً
                      </button>
                    </div>
                  </div>

                  {/* Existing blogs list */}
                  <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                    <h3 className="text-sm font-black text-white">المقالات المنشورة ({blogPosts.length})</h3>
                    <div className="space-y-2">
                      {blogPosts.map(post => (
                        <div key={post.id} className="bg-white/[0.01] border border-white/5 p-3 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white block">{post.title}</span>
                            <div className="flex gap-2 text-[10px] text-gray-500 mt-1">
                              <span>التصنيف: {post.category}</span>
                              <span>التاريخ: {post.publishDate}</span>
                              <span>المشاهدات: {post.views}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setBlogPosts(prev => prev.filter(p => p.id !== post.id));
                            }}
                            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-1.5 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Customers, 7. CRM, 8. Sales, 15. Licenses, 16. Downloads (Routed to CmsOperations) */}
              {(activeTab === 'customers' || activeTab === 'crm' || activeTab === 'sales' || activeTab === 'licenses' || activeTab === 'downloads') && (
                <CmsOperations
                  customers={customers}
                  setCustomers={setCustomers}
                  leads={leads}
                  setLeads={setLeads}
                  invoices={invoices}
                  setInvoices={setInvoices}
                  licenses={licenses}
                  setLicenses={setLicenses}
                  activeRole={activeRole}
                />
              )}

              {/* 9. WhatsApp, 10. SEO, 11. Media Library, 12. Brand Assets (Routed to CmsMarketing) */}
              {(activeTab === 'whatsapp' || activeTab === 'seo' || activeTab === 'media_library' || activeTab === 'brand_assets') && (
                <CmsMarketing
                  cmsData={cmsData}
                  updateCmsField={updateCmsField}
                  mediaFiles={mediaFiles}
                  setMediaFiles={setMediaFiles}
                  activeRole={activeRole}
                />
              )}

              {/* 13. Analytics code integration */}
              {activeTab === 'analytics' && (
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4 max-w-xl">
                  <h3 className="text-sm font-black text-white">أكواد التتبع والتحليلات البرمجية</h3>
                  <p className="text-xs text-gray-400">دمج كود فيسبوك بيكسل (Meta Pixel ID) أو إحصائيات جوجل (Google Analytics) للتتبع الإعلاني الدقيق.</p>
                  
                  <div className="space-y-4 pt-2 text-xs">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 font-bold">كود فيسبوك بيكسل (Meta Pixel ID)</label>
                      <input
                        type="text"
                        value={cmsData.pixelCode || ''}
                        onChange={(e) => updateCmsField('pixelCode', e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                        placeholder="مثال: 123456789012345"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1 font-bold">معرف تتبع إحصائيات جوجل (Google Analytics Measurement ID)</label>
                      <input
                        type="text"
                        value={cmsData.analyticsCode || ''}
                        onChange={(e) => updateCmsField('analyticsCode', e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                        placeholder="مثال: G-XXXXXX"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 14. Support, 17. Playbook, 18. Company Documents (Routed to CmsDocsSupport) */}
              {(activeTab === 'support' || activeTab === 'playbook' || activeTab === 'company_documents') && (
                <CmsDocsSupport 
                  activeRole={activeRole}
                />
              )}

              {/* 19. Settings, 20. Users, 21. Logs (Routed to CmsSystem) */}
              {(activeTab === 'settings' || activeTab === 'users' || activeTab === 'logs') && (
                <CmsSystem
                  cmsData={cmsData}
                  updateCmsField={updateCmsField}
                  auditLogs={auditLogs}
                  setAuditLogs={setAuditLogs}
                  activeRole={activeRole}
                  setActiveRole={setActiveRole}
                  handleRestoreDefaults={handleRestoreDefaults}
                />
              )}

              {/* 22. AI Assistant (Routed to CmsAiAssistant) */}
              {activeTab === 'ai_assistant' && (
                <CmsAiAssistant 
                  cmsData={cmsData}
                  updateCmsField={updateCmsField}
                />
              )}

            </div>

            {/* Column 2: Live Device Preview Panel */}
            {['landing_page', 'pricing', 'brand_assets', 'seo', 'media_library'].includes(activeTab) && (
              <div className="xl:col-span-5 xl:sticky xl:top-[85px] h-full">
                <CmsLivePreview cmsData={cmsData} />
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
};

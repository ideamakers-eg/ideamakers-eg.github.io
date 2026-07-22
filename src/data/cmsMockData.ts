// Real Enterprise CMS data models and initial mock states for IDEA Makers
export interface BlogCmsPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  views: number;
  content: string;
  author: string;
}

export interface CustomerModel {
  id: string;
  name: string;
  salonName: string;
  city: string;
  country: 'EG' | 'SA' | 'KW' | 'AE' | 'QA';
  phone: string;
  licenseStatus: 'active' | 'trialing' | 'expired' | 'pending';
  devicesCount: number;
}

export interface CrmLead {
  id: string;
  name: string;
  phone: string;
  country: string;
  stage: 'new' | 'contacted' | 'negotiation' | 'won' | 'lost';
  notes: string;
  assignedTo: string;
  createdAt: string;
}

export interface SalesInvoice {
  id: string;
  customerName: string;
  amount: number;
  currency: string;
  date: string;
  status: 'paid' | 'pending' | 'cancelled';
  packageType: string;
}

export interface LicenseModel {
  id: string;
  key: string;
  salonName: string;
  hardwareHash: string;
  expiresAt: string;
  status: 'active' | 'revoked' | 'pending_verification';
}

export interface PlaybookArticle {
  id: string;
  title: string;
  category: 'management' | 'theft_prevention' | 'marketing' | 'hardware';
  readTime: string;
  content: string;
}

export interface CompanyDocument {
  id: string;
  title: string;
  type: 'proposal' | 'contract' | 'guide' | 'specification';
  version: string;
  updatedAt: string;
  author: string;
}

export const INITIAL_BLOG_POSTS: BlogCmsPost[] = [
  {
    id: 'post-1',
    title: '٧ ثغرات محاسبية قاتلة في الكافيه الملحق بصالة البلايستيشن وكيف تسدها',
    slug: 'playstation-cafeteria-leaks',
    category: 'إدارة الحسابات والتدقيق',
    status: 'published',
    publishDate: '2026-04-10',
    views: 1240,
    content: 'يعاني أصحاب صالات البلايستيشن من هدر متكرر في الكافيه والمشروبات بسبب نظام التدوين اليدوي. في هذا المقال نكشف لك كيف تضبط مخزون البارد والساخن بالملي عبر سيستم IDEA Makers...',
    author: 'م. إسلام عرفة'
  },
  {
    id: 'post-2',
    title: 'دليل المستثمر الذكي: كيف تؤسس صالة ألعاب تدر أرباحاً بنظام السيادة السيادي؟',
    slug: 'investor-guide-playstation-lounge',
    category: 'تطوير الأعمال والجدوى',
    status: 'published',
    publishDate: '2026-05-02',
    views: 890,
    content: 'يتطلب تأسيس صالة بلايستيشن جديدة فهماً عميقاً لعلم تسعير الساعات الفردية والجماعية. نستعرض هنا الأرقام الفعلية لمعدل العائد الداخلي وتأثير نظام الكاشير الاحترافي على تسريع العائد...',
    author: 'م. إسلام عرفة'
  },
  {
    id: 'post-3',
    title: 'تجنب غرامات البلدية واشتراطات التشغيل في السعودية للبلايستيشن ٢٠٢٦',
    slug: 'saudi-municipality-requirements-lounge',
    category: 'التراخيص والتنظيم',
    status: 'scheduled',
    publishDate: '2026-08-15',
    views: 0,
    content: 'نظرة تفصيلية على أحدث قرارات وتوجيهات الشؤون البلدية والقروية والإسكان في المملكة العربية السعودية الخاصة بمراكز الألعاب الإلكترونية وكيف يدعم نظامنا طباعة الفواتير المطابقة...',
    author: 'فريق عمل صُنّاع الفكرة'
  }
];

export const INITIAL_CUSTOMERS: CustomerModel[] = [
  { id: 'cust-1', name: 'أحمد محمود العشري', salonName: 'الأرينا كافيه بلايستيشن', city: 'القاهرة - مدينة نصر', country: 'EG', phone: '201121778205', licenseStatus: 'active', devicesCount: 12 },
  { id: 'cust-2', name: 'سعد العتيبي', salonName: 'The VIP Lounge Arcade', city: 'الرياض - السليمانية', country: 'SA', phone: '966501234567', licenseStatus: 'active', devicesCount: 8 },
  { id: 'cust-3', name: 'خالد الفضلي', salonName: 'جيم تراك للرياضة الذهنية', city: 'الكويت - حولي', country: 'KW', phone: '96590012345', licenseStatus: 'trialing', devicesCount: 6 },
  { id: 'cust-4', name: 'عمر المرزوقي', salonName: 'سترايك فورس للترفيه', city: 'دبي - جي بي آر', country: 'AE', phone: '971501112222', licenseStatus: 'expired', devicesCount: 15 },
  { id: 'cust-5', name: 'جاسم الكواري', salonName: 'ريترايد بلايستيشن هاب', city: 'الدوحة - الغرافة', country: 'QA', phone: '97455512345', licenseStatus: 'pending', devicesCount: 10 }
];

export const INITIAL_CRM_LEADS: CrmLead[] = [
  { id: 'lead-1', name: 'عبد الله السعيد', phone: '201099887766', country: 'مصر 🇪🇬', stage: 'new', notes: 'يرغب في معرفة تكلفة ربط فرعين عبر كلاود واحد مخصص.', assignedTo: 'مبيعات مصر', createdAt: '2026-07-09' },
  { id: 'lead-2', name: 'عبد الرحمن بن فيصل', phone: '966555544332', country: 'السعودية 🇸🇦', stage: 'negotiation', notes: 'يطلب تفاصيل الباقة الدولية لتشغيل صالة من ١٦ جهازاً.', assignedTo: 'مبيعات الخليج', createdAt: '2026-07-08' },
  { id: 'lead-3', name: 'فهد البلوشي', phone: '96566677788', country: 'الكويت 🇰🇼', stage: 'contacted', notes: 'تم التواصل معه وشرح حاسبة الأرباح وضمان ٣ أيام.', assignedTo: 'مبيعات الخليج', createdAt: '2026-07-07' },
  { id: 'lead-4', name: 'أشرف عبد القدوس', phone: '201211223344', country: 'مصر 🇪🇬', stage: 'won', notes: 'تم الدفع والتركيب الفوري لسيستم Professional وتجربته.', assignedTo: 'مبيعات مصر', createdAt: '2026-07-05' }
];

export const INITIAL_SALES_INVOICES: SalesInvoice[] = [
  { id: 'inv-101', customerName: 'أحمد محمود العشري', amount: 6000, currency: 'EGP', date: '2026-07-09', status: 'paid', packageType: 'Professional Package' },
  { id: 'inv-102', customerName: 'سعد العتيبي', amount: 10000, currency: 'EGP', date: '2026-07-08', status: 'paid', packageType: 'International Package' },
  { id: 'inv-103', customerName: 'خالد الفضلي', amount: 10000, currency: 'EGP', date: '2026-07-07', status: 'pending', packageType: 'International Package' },
  { id: 'inv-104', customerName: 'أشرف عبد القدوس', amount: 6000, currency: 'EGP', date: '2026-07-05', status: 'paid', packageType: 'Professional Package' }
];

export const INITIAL_LICENSES: LicenseModel[] = [
  { id: 'lic-1', key: 'IDM-POS-A89E-990F-239D', salonName: 'الأرينا كافيه بلايستيشن', hardwareHash: '7FA1-88DE-C0A9-99B1-FFF2', expiresAt: '2036-10-10', status: 'active' },
  { id: 'lic-2', key: 'IDM-POS-SFF3-1122-BB9D', salonName: 'The VIP Lounge Arcade', hardwareHash: '93D1-22CE-F3AA-3329-FF41', expiresAt: '2036-05-15', status: 'active' },
  { id: 'lic-3', key: 'IDM-POS-KW09-33D4-AC98', salonName: 'جيم تراك للرياضة الذهنية', hardwareHash: 'PENDING_FIRST_BOOT_HASH', expiresAt: '2026-07-13', status: 'pending_verification' }
];

export const PLAYBOOK_ARTICLES: PlaybookArticle[] = [
  {
    id: 'art-1',
    title: 'بروتوكول "تأمين الكاشير المانع للسرقة": خطة تشغيلية بنسبة 100%',
    category: 'theft_prevention',
    readTime: '١٠ دقائق',
    content: 'يتوجب تطبيق التالي بصرامة:\n١. تسليم الوردية يدوياً عبر مطابقة مخزون المشروبات.\n٢. عدم السماح بتغيير فئة اللعب من فردي إلى زوجي بعد مرور دقيقتين دون موافقة المدير بمفتاح أمان.\n٣. تدقيق أوقات إلغاء الفواتير وطباعة تقرير الحذف اليومي.\n٤. ربط الكاميرا المباشرة بشاشة الكاشير لمراقبة صندوق النقدية.'
  },
  {
    id: 'art-2',
    title: 'الهندسة العاطفية للزبائن: كيف تجعل اللاعب يمدد جلسته ساعة إضافية؟',
    category: 'marketing',
    readTime: '٧ دقائق',
    content: 'استراتيجيات مجربة لصالات الألعاب:\n١. تقديم كوب ماء مثلج مجاني في الدقيقة ٤٥ من اللعب.\n٢. تشغيل موسيقى هادئة تزيد التركيز.\n٣. توفير شواحن سريعة للهاتف في كل ركن لعب.\n٤. تقديم عرض "العاشرة مجاناً" للزبائن الأوفياء لتشجيع العودة اليومية.'
  },
  {
    id: 'art-3',
    title: 'تأثير الصيانة الدورية لأجهزة PS5 على تقييم رضا زوار صالتك',
    category: 'hardware',
    readTime: '٥ دقائق',
    content: 'جدول الصيانة الموصى به:\n١. تفكيك وتنظيف الغبار الداخلي للأجهزة كل ٣ أشهر لتجنب ارتفاع صوت المروحة.\n٢. صيانة دراعات التحكم وتغيير "الأنالوج" دورياً لتفادي الـ Drift.\n٣. موازنة جهد الكهرباء بتركيب UPS مركزي لتفادي تعطل الألعاب فجأة بسبب تذبذب الجهد الكهربي في مصر.'
  }
];

export const COMPANY_DOCUMENTS: CompanyDocument[] = [
  { id: 'doc-1', title: 'وثيقة المواصفات الفنية لسيستم كاشير بلايستيشن المطور', type: 'specification', version: 'v3.2.0', updatedAt: '2026-06-25', author: 'م. إسلام عرفة' },
  { id: 'doc-2', title: 'عقد الترخيص السنوي وتوفير الدعم الميداني - نسخة الخليج', type: 'contract', version: 'v2.1', updatedAt: '2026-07-02', author: 'الإدارة القانونية' },
  { id: 'doc-3', title: 'عرض السعر السيادي - ترخيص الفروع المتصلة والمطورة', type: 'proposal', version: 'v1.4', updatedAt: '2026-07-09', author: 'مبيعات الخليج' }
];

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getMediaItem, setMediaItem, removeMediaItem } from '../lib/db';
import { fetchCmsContentFromSupabase, saveCmsContentBatchToSupabase } from '../lib/supabase';
import { MediaRenderer } from './MediaRenderer';
import { EnterpriseCms } from './EnterpriseCms';
import { 
  Map, Network, Compass, Search, Target, Filter, Layers, HelpCircle, 
  MousePointer, Activity, FileText, Plus, Trash2, Edit, Save, 
  ChevronLeft, Globe, ArrowLeft, Lightbulb, Eye, BookOpen, TrendingUp, 
  Download, Layout, Copy, CheckCircle2, ArrowRightLeft, Sparkles, X, RotateCcw,
  Shield, Cpu, GitFork, ExternalLink, Share2, Info,
  Lock, Key, LogOut, Video, Image, Database, Hash, Settings, Star, Quote,
  Award, Terminal
} from 'lucide-react';
import { packages, internationalPricing } from '../App';
import { localizationData } from '../localizationData';
import { LANDING_PAGE_STRATEGY } from '../data/landingPageStrategy';

const LOCAL_SEO_AI_DATA = {
  'financial-control': {
    title: "كيفية منع التسريب المالي وتلاعب العمال في صالات البلايستيشن",
    category: "إدارة مالية",
    tags: "إدارة مالية, منع السرقة, كاشير بلايستيشن, أمان الحسابات",
    snippet: "أسرار وحلول عملية تضمن لك السيادة الكاملة على إيرادات صالتك ومنع التلاعب بوقت الشفتات وجلسات اللعب والطلبات.",
    content: (countryName: string) => `# دليل منع التسريب المالي وتلاعب العمال في صالات البلايستيشن بـ ${countryName}

تعتبر صالات البلايستيشن ومراكز الألعاب من المشاريع عالية الربحية، ولكنها في الوقت ذاته من أكثر المشاريع عرضة للتسريب المالي وتلاعب الموظفين. إذا كنت تدير صالتك بالطريقة التقليدية أو تعتمد على الثقة المحضة، فإنك غالباً تفقد ما بين 15% إلى 30% من أرباحك الحقيقية دون أن تشعر.

في هذا الدليل العملي المقدم من **IDEA MAKERS**، سنكشف لك كيف تفرض سيادتك الكاملة وتمنع التلاعب المالي والوقتي نهائياً.

---

## 1. الثغرة الكبرى: التلاعب بوقت الأجهزة والوقت الضائع
أكثر الطرق شيوعاً للسرقة في صالات البلايستيشن هي تشغيل الأجهزة للزبائن دون تسجيلها في الدفاتر أو النظام التقليدي. يقوم العامل بالاتفاق مع الزبون على تفعيل الساعة وكتابتها يدوياً، أو استخدام ميزة "تصفير الوقت".

### الحل التقني الذكي:
*   **الربط المادي الصارم:** يجب أن يرتبط تشغيل الشاشة أو ذراع التحكم بتدفق كهربائي يتم التحكم فيه برمجياً عبر نظام الكاشير.
*   **تسجيل الثواني:** النظام الذكي لا يسمح بمرور ثانية واحدة دون تسجيلها في الوردية المفتوحة باسم الموظف المسؤول.
*   **الإغلاق التلقائي:** بمجرد انتهاء الوقت المحدد للجلسة، يتم قطع التيار أو التنبيه الفوري التلقائي على الشاشة لضمان عدم وجود جلسات لعب غير مسجلة.

---

## 2. تسريب المخزون وطلبات الكافيه المرافقة
يمثل البوفيه أو الكافيه الملحق بالصالة أكثر من 40% من صافي الأرباح اليومية. يتلاعب العمال عبر شراء سلع خارجية (مثل علب الكانز أو السندوتشات) وبيعها لحسابهم الخاص مستخدمين أدوات الصالة ومكانها.

### الحل المقترح لفرض السيادة الكاملة:
1.  **الجرد التلقائي للمواد الخام:** عند بيع كوب قهوة أو مشروب، يجب على نظام الكاشير خصم المكونات الأساسية (مثل البن، الحليب، السكر) من المخزن تلقائياً.
2.  **جرد الباركود الفوري:** منع دخول أي بضائع من الخارج دون مسحها بالباركود وإضافتها لشحنات الوردية بشكل رسمي بواسطة الأدمن.

---

## 3. ترحيل وتعديل الشفتات (الورديات اليومية)
تعديل التقارير اليومية والتلاعب في الحسابات الختامية عند تسليم الوردية من موظف لآخر هي ثغرة كبرى يقع فيها الكثير من أصحاب الصالات في **${countryName}**.

### كيف يحل نظام IDEA MAKERS هذه الأزمة؟
*   **نظام الصلاحيات المقيد:** لا يمتلك الكاشير صلاحية تعديل أي فاتورة مغلقة أو حذف جلسة منتهية.
*   **تقارير الإغلاق العمياء:** لا يمكن للموظف معرفة المبلغ المتوقع وجوده في الدرج إلا بعد إدخال المبلغ الفعلي الموجود في جعبته يدوياً، مما يحميك من تعديل الأرقام ومطابقتها الوهمية.
*   **إشعارات تيليجرام والواتساب الفورية:** يتلقى صاحب العمل (الأدمن) تقريراً مفصلاً فور إغلاق أي وردية يوضح الأرباح، نسبة الكافيه، والوقت النشط للأجهزة.

---

## الروابط الداخلية الموصى بها لتعزيز الـ SEO:
*   للاطلاع على المخطط الشامل والأسعار الخاصة ببلدك، قم بزيارة [باقات وأسعار نظام الكاشير للبلايستيشن](/pricing) المتوفرة لدينا.
*   لقراءة مقارنات تفصيلية مع الأنظمة التقليدية، تصفح [قسم المقارنات التقنية والحلول البديلة](/comparisons).

فرض أمان صالتك ليس خياراً، بل هو خطوتك الأولى لبناء بنية تحتية رقمية تضمن لك السيادة والنجاح الكاملين بمشروعك.`
  },
  'playstation-pos-intro': {
    title: "الدليل الشامل لاختيار نظام كاشير وإدارة صالات البلايستيشن 2026",
    category: "دليل المبتدئين",
    tags: "كاشير بلايستيشن, نظام إدارة الصالات, سيستم ألعاب, الكاشير الذكي",
    snippet: "كيف تختار البرنامج الأمثل لإدارة جلسات اللعب والمبيعات في صالتك لزيادة الأرباح وضمان راحة البال التامة.",
    content: (countryName: string) => `# الدليل الشامل لاختيار نظام كاشير وإدارة صالات البلايستيشن بـ ${countryName} لعام 2026

أصبحت صالات البلايستيشن اليوم أكثر من مجرد غرف تحتوي على أجهزة شاشات؛ إنها مشاريع ترفيهية متكاملة تضم كافيهات راقية، صالات VIP، وتعتمد على جودة تجربة العميل والسرعة في الأداء. لإنجاح هذا المشروع في سوق **${countryName}**، فإن اختيارك لنظام الكاشير والإدارة هو القرار المصيري الأهم.

في هذا الدليل، سنشرح لك المعايير والأسس العلمية لاختيار أفضل سيستم كاشير بلايستيشن يضمن لك الكفاءة وتضاعف الأرباح.

---

## ما هي الميزات الأساسية التي لا غنى عنها في نظام الكاشير؟

### 1. مرونة احتساب الجلسات (سنجل، مالتي، VIP)
يجب أن يدعم النظام احتساب الوقت بطرق مختلفة وتغيير نوع اللعب أثناء الجلسة دون تصفير العداد أو إرباك العميل. على سبيل المثال:
*   البدء بجلسة فردية (Single) ثم التحول إلى جماعية (Multi).
*   نظام العروض الخاصة (مثلاً: العب 3 ساعات واحصل على ساعة مجاناً).
*   تحديد أسعار مختلفة تماماً لأوقات الذروة والمناسبات.

### 2. الربط السحابي والأوفلاين في آن واحد
إن انقطاع الإنترنت في صالتك يجب ألا يوقف مبيعاتك أو يعطل نظام الحسابات. 
> **شعارنا في IDEA MAKERS هو "100% تحت سيطرتك أوفلاين"**، حيث يعمل النظام بالكامل محلياً وبشكل مستقل، وعند عودة الاتصال يتم تشفير ومزامنة البيانات للوحة التحكم السحابية لتتابع أداء صالتك من هاتفك من أي مكان في العالم.

### 3. شاشة طلبات الكافيه المباشرة أثناء اللعب
لا ينبغي للكاشير أن يخرج من حساب الوقت ليضيف زجاجة مياه أو كوب قهوة للزبون. النظام الناجح هو الذي يتيح إضافة طلبات المشروبات والمأكولات مباشرة إلى رقم طاولة أو رقم جهاز البلايستيشن لتدخل تلقائياً في الفاتورة النهائية الموحدة.

---

## كيف تحسب العائد على الاستثمار من شراء نظام ذكي؟
البعض يرى تكلفة برنامج الكاشير كعبء مالي، ولكن في الحقيقة:
*   **تقليل الهدر:** منع هدر الوقت وسرقة المشروبات يوفر لك ما لا يقل عن **500 إلى 1500 جنيه مصري شهرياً** (أو ما يعادله بالعملات الخليجية) لكل جهاز!
*   **زيادة ثقة الزبون:** الفاتورة المطبوعة والاحترافية تشعر العميل بالأمان وبأن المكان ذو مصداقية عالية مما يدفعه لتكرار الزيارة.

---

## التوصيات والخطوات القادمة لـ SEO صالتك:
*   هل تبحث عن استراتيجيات تسعير متطورة لزيادة الإيرادات؟ اقرأ مقالنا المتخصص في [استراتيجيات التسعير الذكي لصالات الألعاب](/blog/pricing-strategies).
*   هل أنت مستعد لتجربة النظام مباشرة؟ تواصل معنا فوراً بالضغط على رابط الواتساب في الأسفل واحصل على عرض توضيحي مباشر ومجاني بالكامل لمشروعك.`
  },
  'pricing-strategies': {
    title: "استراتيجيات التسعير الذكي لزيادة أرباح صالات البلايستيشن",
    category: "نصائح إدارية",
    tags: "تسعير الجلسات, زيادة الأرباح, استراتيجيات التسعير, إدارة صالات بلايستيشن",
    snippet: "طرق علمية ومجربة لتسعير الجلسات، الاشتراكات، عروض المجموعات، وخدمات الكافيه لرفع المبيعات بنسبة تفوق 50%.",
    content: (countryName: string) => `# استراتيجيات التسعير الذكي لزيادة أرباح صالات البلايستيشن في ${countryName}

يقع الكثير من ملاك صالات الألعاب والترفيه في فخ "التسعير الثابت والموحد"، حيث يضعون سعراً ثابتاً للساعة طوال اليوم ولكل الفئات. هذا الأسلوب التقليدي يهدر عليك فرصة عظيمة لزيادة الأرباح بنسبة تتجاوز 50% وضمان نسبة إشغال مرتفعة للأجهزة حتى في ساعات الركود الصباحية.

في هذا المقال التفصيلي من مهندسي **IDEA MAKERS**، سنقدم لك الاستراتيجيات السعرية الأكثر نجاحاً المطبقة في كبرى صالات الألعاب بمصر والخليج.

---

## 1. استراتيجية التسعير الديناميكي (Dynamic Pricing)
التسعير الديناميكي يعني تغيير سعر الساعة بناءً على العرض والطلب وأوقات النشاط والهدوء.
*   **الساعات الصباحية الهادئة (من 9 صباحاً إلى 3 مساءً):** ضع خصماً تشجيعياً يصل لـ 40% لجذب الطلاب والشباب الذين يرغبون باللعب بتكلفة اقتصادية.
*   **ساعات الذروة (من 5 مساءً إلى 2 صباحاً):** يرتفع السعر للحد الأقصى نظراً لوجود عملاء مستعدين للدفع مقابل الحصول على الأجهزة المتوفرة.
*   **نهاية الأسبوع والأعياد:** استعمل حزم أسعار خاصة وباقات لعب مغرية تشمل الوجبات والمشروبات.

---

## 2. ميزة الغرف والأجهزة الـ VIP والـ العادي
لا تعامل جهاز بلايستيشن 5 متصل بشاشة OLED مقاس 65 بوصة في غرفة مكيفة هادئة بنفس سعر جهاز متصل بشاشة عادية وسط ضوضاء الصالة المفتوحة!
*   قم بتقسيم صالتك إلى مستويين على الأقل: **الصالة العامة (Normal Stage)** و **الغرف الخاصة (VIP Rooms)**.
*   سعّر ساعة الـ VIP بضعف سعر الساعة العادية مع توفير مزايا إضافية بسيطة (مثل مقاعد Gaming مريحة، خدمة بوفيه مخصصة وسريعة).

---

## 3. العروض وباقات اللعب المتكاملة (Bundled Offers)
بدلاً من بيع ساعات اللعب منفصلة والمشروبات منفصلة، قم بدمجها في عروض مغرية تزيد من متوسط قيمة فاتورة العميل:
*   **عرض "القايمر المحترف":** ساعتين لعب + مشروب غازي + مقرمشات بسعر مجمع يقل قليلاً عن شرائهم منفصلين.
*   **عرض "جمعة الأصدقاء":** 3 ساعات لعب بخصم 15% على المشروبات الإضافية.
*   هذا الأسلوب يدفع الزبون لدفع المزيد وهو يشعر بالرضا والوفر المالي الافتراضي.

---

## دور برنامج الإدارة الذكي في تطبيق استراتيجيات التسعير:
برنامج الكاشير التقليدي لا يمكنه التعامل مع كل هذه المتغيرات السعرية المعقدة، بينما يتيح لك نظام **IDEA MAKERS** المتطور:
1.  برمجة أسعار تلقائية لكل جهاز حسب الساعة واليوم (تتغير الأسعار تلقائياً دون تدخل يدوي من الكاشير).
2.  تطبيق الخصومات والعروض الفورية بنقرة زر واحدة.
3.  الحساب الدقيق لعمولات الموظفين بناءً على مبيعات العروض وباقات اللعب لربط مصلحتهم بمبيعاتك اليومية.

لتحميل وتفعيل لوحة الإدارة الذكية وتفادي تلاعب الموظفين بالخصومات، تواصل مع فريق الدعم الفني لدينا اليوم واكتشف كيف يمكننا تغيير مسار أرباحك بالكامل!`
  },
  'playstation-marketing': {
    title: "طرق تسويق مبتكرة لجذب زبائن دائمين لصالة البلايستيشن الخاصة بك",
    category: "مشكلات وحلول",
    tags: "تسويق الصالات, جذب الزبائن, زيادة الأرباح, ولاء العملاء",
    snippet: "أفكار وحملات إعلانية مبتكرة على فيسبوك وتيك توك، وتنظيم بطولات فيفا وبابجي تضمن إشغال صالتك طوال أيام الأسبوع.",
    content: (countryName: string) => `# طرق تسويق مبتكرة لجذب زبائن دائمين لصالة البلايستيشن بـ ${countryName}

هل قمت بافتتاح صالة بلايستيشن جديدة وتنتظر جلوس الزبائن على الأجهزة بكسل؟ أم أن صالتك تعاني من تراجع الزيارات ومنافسة شرسة من الصالات المجاورة في منطقتك بـ **${countryName}**؟ 

التسويق الاحترافي لصالات الألعاب لا يقتصر على تعليق لافتة مضيئة بالخارج؛ إنه تجربة عميل متكاملة (Customer Experience) وحملات ذكية مبنية على اهتمامات مجتمع اللاعبين (Gaming Community).

في هذا المقال المليء بالأسرار التسويقية، سنوضح لك كيف تحول صالتك إلى النقطة الأكثر جذباً للاعبين في منطقتك بالكامل.

---

## 1. بطولات الفيفا والبلايستيشن الدورية (Tournaments)
تنظيم البطولات هو المحرك الأقوى لصناعة اسم صالتك وبناء مجتمع مترابط.
*   **آلية العمل:** قم بالإعلان عن بطولة فيفا (FIFA) أو بيس (PES) نهاية كل شهر برسم اشتراك بسيط وجوائز نقدية مغرية للفائزين الثلاثة الأوائل.
*   **الأثر التسويقي:** ستجلب البطولة مئات المشجعين واللاعبين الجدد الذين سيتعرفون على صالتك وجودة أجهزتك ومقاعدك، مما يجعلهم زبائن دائمين بعد ذلك.
*   **البث المباشر:** قم ببث مباريات نصف النهائي والنهائي عبر صفحة الصالة على فيسبوك أو تيك توك لزيادة التفاعل الرقمي لعلامتك التجارية.

---

## 2. نظام ولاء العملاء وتجميع النقاط (Loyalty Program)
الزبون الذي يشعر بالتقدير والمكافأة لن يذهب للمنافسين أبداً.
*   امنح كل عميل مسجل على نظامك نقاطاً بناءً على ساعات اللعب ومبيعات الكافيه.
*   مثال: **كل ساعة لعب تمنحه 10 نقاط**، وعند تجميع 100 نقطة يحصل على ساعة مجاناً أو مشروب مجاني من البوفيه.
*   يتيح لك نظام **IDEA MAKERS** إدارة ملفات الزبائن وتتبع نقاط ولائهم تلقائياً بطريقة ذكية تمنع تزوير الكروت الورقية التقليدية.

---

## 3. التسويق عبر صناعة المحتوى على السوشيال ميديا
*   التقط صوراً ومقاطع فيديو عفوية وممتعة للحظات الفرح والحماس والضحك داخل الصالة (بعد أخذ موافقة الزبائن بالطبع).
*   انشر "ستوريات" شبه يومية تظهر نظافة المكان، جودة الشاشات، وتحضير المشروبات الفاخرة في بوفيه الصالة.
*   استخدم الهاشتاجات المحلية المناسبة لمدينتك لضمان وصول المنشورات للاعبين القريبين جغرافياً منك.

---

## كيف يدعمك نظام IDEA MAKERS في تنشيط مبيعات صالتك؟
إن فرض سيطرتك الكاملة على قاعدة بيانات عملائك تتيح لك:
1.  إرسال رسائل واتساب جماعية ترحيبية أو إعلامية بالعروض الجديدة لزبائنك المسجلين بنقرة واحدة.
2.  معرفة من هم "العملاء الأكثر ولاءً وصرفاً للوقت والمال" لتقديم مكافآت حقيقية لهم تزيد من ارتباطهم بالمكان.
3.  تتبع أداء صالتك المالي والتسويقي ومعرفة أي العروض حقق أعلى كفاءة ربحية.

انضم الآن لقائمة شركائنا في النجاح بمصر والخليج، واجعل صالتك الخيار الأول للشباب باحترافية تسويقية وتكنولوجية كاملة!`
  }
};

export interface SEOPage {
  id: string;
  category: 'home' | 'services' | 'problems' | 'comparisons' | 'countries' | 'usecases';
  route: string;
  seoTitle: string;
  h1: string;
  metaDesc: string;
  intent: string;
  pageType: 'بيع' | 'مشكلة' | 'مقارنة' | 'حل';
  businessGoal: string;
  customerJourney: string;
  awarenessStage: 'جاهز للشراء (High Intent)' | 'يبحث ويقارن (Evaluation)' | 'واعي بالمشكلة (Problem Aware)' | 'غير واعي بالحل (Unaware)';
  cta: string;
  internalRelations: string[];
}

export interface ClusterItem {
  type: 'pillar' | 'supporting' | 'problem' | 'comparison';
  title: string;
  slug: string;
  keyword: string;
  intent: string;
  internalLinksTo: string[];
  description: string;
}

export interface ContentCluster {
  id: string;
  name: string;
  description: string;
  objective: string;
  iconName: 'Shield' | 'TrendingUp' | 'Cpu';
  items: ClusterItem[];
}

export const DEFAULT_CLUSTERS: ContentCluster[] = [
  {
    id: 'cluster-security',
    name: '1. عنقود الأمان المالي ومكافحة تسريب الكاشير',
    description: 'عنقود متكامل يستهدف الكلمات البحثية الخاصة بسرقة الصالات والتلاعب المالي لإنقاذ المستثمرين وتحويلهم لعملاء.',
    objective: 'بناء سلطة موضوعية (Topical Authority) حول حماية الأرباح التشغيلية ومنع سرقة ورديات صالات الجيمنج.',
    iconName: 'Shield',
    items: [
      {
        type: 'pillar',
        title: 'كيف تدير صالة بلايستيشن وتمنع التسريب المالي؟ دليل الأمان الكامل لعام 2026',
        slug: 'prevent-financial-leakage',
        keyword: 'برنامج حسابات صالات بلايستيشن / التسريب المالي في الصالات',
        intent: 'تجارية واستقصائية (High Commercial Intent)',
        internalLinksTo: ['الصفحة الرئيسية (/)'],
        description: 'المقالة الأساسية (Pillar Page) التي تلخص كافة ثغرات الشيفتات وتربطها بحلول النظام البرمجية وأتمتة الكاشير.'
      },
      {
        type: 'supporting',
        title: 'كشف حيل الكاشير الشائعة لتغيير توقيت أجهزة الويندوز والكمبيوتر',
        slug: 'time-tampering-hacks',
        keyword: 'تلاعب الكاشير بالوقت / حماية توقيت ويندوز',
        intent: 'معلوماتية (Informational)',
        internalLinksTo: ['prevent-financial-leakage'],
        description: 'مقال عميق يشرح الحيلة التقنية لتغيير ساعة الجهاز وكيف يمنعها البرنامج برمجياً لضمان عدم سرقة الساعات.'
      },
      {
        type: 'supporting',
        title: 'الدليل العملي لربط البوفيه وجرد مخزن صالات الألعاب دون عجز مالي',
        slug: 'lounge-buffet-deficit',
        keyword: 'جرد بوفيه البلايستيشن / مخزن صالة الألعاب',
        intent: 'معلوماتية وحل مشكلات (Informational / Pain Point)',
        internalLinksTo: ['prevent-financial-leakage'],
        description: 'دليل شامل يعلم صاحب الصالة طريقة ربط مشاريب البوفيه ببرنامج الكاشير وخصم المنتجات آلياً مع كل شيفت.'
      },
      {
        type: 'problem',
        title: 'أين تذهب أرباحك؟ 5 إشارات تدل على اختلاس شيفتات صالة الجيمنج الخاصة بك',
        slug: 'employee-shift-manipulation',
        keyword: 'عجز الخزينة في البلايستيشن / سرقة الكاشير',
        intent: 'الوعي بالمشكلة (Problem Aware)',
        internalLinksTo: ['prevent-financial-leakage'],
        description: 'مقال يلامس نقطة الألم الشديدة لدى الملاك الذين لا يتواجدون باستمرار، ويطرح إشارات كشف العجز يدوياً وبرمجياً.'
      },
      {
        type: 'comparison',
        title: 'مراقبة صالات البلايستيشن يدوياً أم بالأنظمة الرقمية: المقارنة المالية والأمنية',
        slug: 'manual-vs-digital-tracking',
        keyword: 'برنامج حسابات صالات بلايستيشن / إدارة الجلسات',
        intent: 'مقارنة وبدائل (Evaluation stage)',
        internalLinksTo: ['prevent-financial-leakage'],
        description: 'مقارنة فنية تبين الفروق الشاسعة بين الاعتماد على الأوراق والدفاتر وبين استخدام نظام محاسبي رقمي دقيق.'
      }
    ]
  },
  {
    id: 'cluster-roi',
    name: '2. عنقود التشغيل التجاري وتعظيم الأرباح والاستثمار',
    description: 'يستهدف أصحاب الصالات الراغبين في زيادة ربحية غرف اللعب وتنشيط الفترات الراكدة وبناء ولاء اللاعبين.',
    objective: 'بناء سلطة كافية كمرجع أول لإدارة مشاريع الجيمنج والـ Gaming Lounges تجارياً وتسويقياً.',
    iconName: 'TrendingUp',
    items: [
      {
        type: 'pillar',
        title: 'دليل زيادة أرباح صالة البلايستيشن لعام 2026: طرق التشغيل والمبيعات الإضافية',
        slug: 'scaling-lounge-roi-pillar',
        keyword: 'أرباح صالات البلايستيشن / مشروع صالة ألعاب فيديو',
        intent: 'تجارية معلوماتية (Commercial & Informational)',
        internalLinksTo: ['الصفحة الرئيسية (/)'],
        description: 'الصفحة الأم التي تستعرض أسرار التسعير الهجين، وهندسة الإيرادات الإضافية من العضويات والبطولات الدورية.'
      },
      {
        type: 'supporting',
        title: 'كيف تبني مجتمع لاعبين أوفياء وتزيد حجز غرف الـ VIP بالصالة؟',
        slug: 'vip-loyalty-retention',
        keyword: 'إدارة غرف الـ VIP / ولاء اللاعبين في الجيمنج',
        intent: 'معلوماتية متخصصة (Niche Informational)',
        internalLinksTo: ['scaling-lounge-roi-pillar'],
        description: 'تكتيكات نفسية وتشغيلية لإجبار محترفي اللعب على تفضيل صالتك وحجز الساعات المغلقة ذات الهامش المرتفع.'
      },
      {
        type: 'supporting',
        title: 'تصميم منيو بوفيه صالة الألعاب لرفع متوسط سلة العميل بنسبة 40%',
        slug: 'buffet-menu-design',
        keyword: 'منيو صالة بلايستيشن / مبيعات البوفيه والكانز',
        intent: 'معلوماتية (Informational)',
        internalLinksTo: ['scaling-lounge-roi-pillar'],
        description: 'طريقة تصميم المنيو وتوفير وجبات خفيفة بأسماء الألعاب والـ Combos لزيادة مبيعات الكافتيريا المصاحبة.'
      },
      {
        type: 'problem',
        title: 'حل مشكلة ركود الفترات الصباحية في صالات الجيمنج: استراتيجية العضويات والخصومات الذكية',
        slug: 'morning-slump-problem',
        keyword: 'ركود صالات الألعاب / باقات اشتراك بلايستيشن',
        intent: 'حل المشاكل (Problem Aware to Solution)',
        internalLinksTo: ['scaling-lounge-roi-pillar'],
        description: 'دليل تسويقي يقدم باقات الطلبة والاشتراكات الصباحية المسبقة لضمان تدفق نقدي حتى في الساعات الميتة.'
      },
      {
        type: 'comparison',
        title: 'الاشتراك الشهري ضد شراء سستم مرخص للأبد مدى الحياة: أيهما يوفر ميزانية مشروعك؟',
        slug: 'subscription-vs-lifetime-license',
        keyword: 'برنامج كاشير بلايستيشن مدى الحياة / اشتراكات برامج صالات الجيمنج',
        intent: 'مقارنة مالية (Financial Comparison)',
        internalLinksTo: ['scaling-lounge-roi-pillar'],
        description: 'مقارنة حسابية بالأرقام تبين حجم الخسائر التراكمية في برامج الاشتراكات والعمولات مقابل التملك الأبدي.'
      }
    ]
  }
];

const DEFAULT_SEO_PAGES: SEOPage[] = [
  {
    id: 'home-page',
    category: 'home',
    route: '/',
    seoTitle: 'أفضل برنامج إدارة صالات بلايستيشن 2026 | سيستم حسابات وجرد وكاشير',
    h1: 'أول نظام إدارة صالات بلايستيشن يعمل أوفلاين بالكامل ويمنع التسريب المالي للأبد',
    metaDesc: 'تخلص من عشوائية الحسابات وسرقة الكاشير. تحكم بصالة الألعاب، البوفيه، والمخازن بالثانية بملكية مدى الحياة وبدون أي اشتراكات شهرية. جربه مجاناً الآن!',
    intent: 'نية تجارية واستقصائية وتسهيل الشراء (Commercial/Transactional)',
    pageType: 'بيع',
    businessGoal: 'تحويل الزوار إلى طلب نسخة تجريبية كاملة أو حجز اتصال هاتفي لتنصيب النظام بصالتهم.',
    customerJourney: 'الخطوة الأولى والأساسية لبناء الثقة واستعراض الموثوقية والمميزات الفريدة (Landing & Trust).',
    awarenessStage: 'جاهز للشراء (High Intent)',
    cta: 'احصل على نسختك التجريبية المجانية بالكامل الآن / تواصل معنا لتوصيل السستم بصالتك',
    internalRelations: ['يرتبط بصفحات الميزات التخصصية', 'يوجه الزوار إلى صفحات حل مشكلات الكاشير', 'يتكامل مع صفحة حاسبة الأرباح لتوفير رحلة متكاملة']
  },
  {
    id: 'srv-offline',
    category: 'services',
    route: '/services/offline-management-system',
    seoTitle: 'برنامج إدارة صالات بلايستيشن أوفلاين | لا حاجة لاتصال إنترنت',
    h1: 'تحكم بصالتك بكفاءة 100% حتى لو انقطع الإنترنت والكهرباء',
    metaDesc: 'سستم ذكي يعمل بالكامل محلياً (Offline) على أجهزة الكمبيوتر دون الخوف من انقطاع شبكة الإنترنت أو بطئها. جرد فوري للشيفت وخزينة آمنة تماماً.',
    intent: 'نية تجارية وحل مخاوف الاستقرار (Commercial/Overcoming Objections)',
    pageType: 'حل',
    businessGoal: 'إثبات استقرار النظام وحماية معلومات العميل دون أي تبعية للمطالبات السحابية.',
    customerJourney: 'معالجة مخاوف الانقطاع والشبكة (Technical Evaluation & Risk Reduction).',
    awarenessStage: 'يبحث ويقارن (Evaluation)',
    cta: 'احجز استشارة تقنية مجانية لتثبيت النظام المحلي بصالتك',
    internalRelations: ['يرتبط بالصفحة الرئيسية', 'يغذي صفحة مقارنة الأنظمة السحابية واللوكال']
  },
  {
    id: 'srv-buffet',
    category: 'services',
    route: '/services/lounge-buffet-inventory',
    seoTitle: 'برنامج جرد مخازن وبوفيه صالات الألعاب | محاسب بوفيه دقيق',
    h1: 'اربط لعب الغرف بطلبات الكافيتريا في فاتورة واحدة خالية من العجز المالي',
    metaDesc: 'امنع سرقة المشروبات والمقرمشات في الصالة. نظام جرد تلقائي يخصم من المخزن مع كل جلسة ويصدر تقارير النواقص فورياً بلمسة واحدة.',
    intent: 'نية تجارية وحل المشكلات التشغيلية (Commercial Investigation)',
    pageType: 'حل',
    businessGoal: 'استعراض القدرة المالية والمبيعات الجانبية كعنصر حاسم لزيادة أرباح الصالة.',
    customerJourney: 'تقديم مبرر إضافي للاستثمار في برنامجنا عبر تعظيم عوائد الكافيه الملحق (Upselling).',
    awarenessStage: 'واعي بالمشكلة (Problem Aware)',
    cta: 'شاهد فيديو تجريبي حي لطريقة جرد المخزون وخصم المشروبات بالثانية',
    internalRelations: ['يرتبط بصفحة مشكلة عجز المخازن وبوفيه الصالة', 'يتصل بصفحة حساب الأرباح اليومية']
  },
  {
    id: 'prob-cashier',
    category: 'problems',
    route: '/problems/cashier-theft-prevention',
    seoTitle: 'كيف تمنع سرقة الكاشير في صالة البلايستيشن؟ الحلول النهائية لعام 2026',
    h1: 'تخلص من شكوك سرقة الشيفتات: تكتيكات عملية وبرمجية لمنع التلاعب المالي',
    metaDesc: 'هل تلاحظ عجزاً مستمراً في خزينة الصالة؟ إليك الدليل العملي لكشف تلاعب الكاشير بتقديم وتأخير توقيت الكمبيوتر أو تشغيل الأجهزة خارج البرنامج.',
    intent: 'نية معلوماتية عميقة وحل ثغرات (Informational / Pain Point)',
    pageType: 'مشكلة',
    businessGoal: 'كسب ثقة المستثمر المتخوف من تلاعب الموظفين وتوجيهه نحو نظام الأمان التلقائي الخاص بنا.',
    customerJourney: 'مرحلة الاكتشاف والبحث عن أسباب الخسائر المخفية في الصالة (Discovery Phase).',
    awarenessStage: 'واعي بالمشكلة (Problem Aware)',
    cta: 'حمل دليل كشف اختلاس الصالات مجاناً أو اطلب فحصاً برمجياً فورياً لصالتك',
    internalRelations: ['يوجه العميل مباشرة إلى صفحة منع التلاعب بالوقت والجلسات', 'يتصل بالصفحة الرئيسية كعلاج جذري']
  },
  {
    id: 'prob-buffet',
    category: 'problems',
    route: '/problems/lounge-buffet-deficit',
    seoTitle: 'حل مشكلة عجز مخزن بوفيه صالة الألعاب والجيمنج ومقاهي الإنترنت',
    h1: 'أين تذهب أرباح المشروبات والكانز؟ القضاء على عشوائية بوفيه البلايستيشن',
    metaDesc: 'يعاني أصحاب الصالات من اختفاء المنتجات أو بيعها يدوياً لصالح الكاشير. اكتشف كيف تحل مشكلة عجز المخزن وتربط الكافيتريا بحسابات الوردية.',
    intent: 'نية معلوماتية وحل خسائر البوفيه (Informational / Inventory)',
    pageType: 'مشكلة',
    businessGoal: 'إثبات أن عشوائية المطبخ تلتهم نصف صافي الأرباح، وبيع نظام جرد البوفيه المتكامل.',
    customerJourney: 'التعريف بحجم التسريب المالي غير المرئي في قطاع المنتجات والخدمات الترفيهية.',
    awarenessStage: 'واعي بالمشكلة (Problem Aware)',
    cta: 'احصل على نموذج إكسيل مجاني للجرد أو انتقل إلى الأتمتة البرمجية الكاملة',
    internalRelations: ['يرتبط بصفحة نظام جرد البوفيه والمخازن المتكامل']
  },
  {
    id: 'comp-competitors',
    category: 'comparisons',
    route: '/comparisons/idea-makers-vs-competitors',
    seoTitle: 'مقارنة برامج إدارة صالات البلايستيشن 2026 | سستم آيديا ميكرز ضد المنافسين',
    h1: 'دليلك الشامل للمقارنة بين برامج الكاشير وصالات الجيمنج: أيهما تختار؟',
    metaDesc: 'تحليل محايد لأفضل أنظمة إدارة صالات الألعاب والـ Gaming Lounges في الوطن العربي. قارن بين الميزات، التكلفة، الأمان، والتثبيت أوفلاين مدى الحياة.',
    intent: 'مقارنة فنية ومالية (Commercial Investigation)',
    pageType: 'مقارنة',
    businessGoal: 'إثبات التفوق الفني والهندسي لنظامنا وقطع الطريق على العروض المنافسة رخيصة الجودة.',
    customerJourney: 'المرحلة الحرجة قبل اتخاذ قرار الشراء والمفاضلة بين البرمجيات المتاحة (Evaluation stage).',
    awarenessStage: 'يبحث ويقارن (Evaluation)',
    cta: 'اطلب ملف المقارنة الفنية الشامل بصيغة PDF أو تحدث مع مستشار تقني الآن',
    internalRelations: ['يرتبط بصفحات ميزات الهاردوير والبرنامج الرئيسي', 'يصب مباشرة في صفحة الشراء']
  },
  {
    id: 'comp-cloud',
    category: 'comparisons',
    route: '/comparisons/lifetime-offline-vs-cloud-subscription',
    seoTitle: 'سستم بلايستيشن مدى الحياة أم اشتراك شهري سحابي؟ مقارنة التكلفة والأمان',
    h1: 'لا تقع في فخ الاشتراكات الشهرية: لماذا السستم المحلي مدى الحياة هو الأوفر لصالتك؟',
    metaDesc: 'احسب ميزانية صالتك بدقة. مقارنة مالية وتشغيلية تبين الفروقات بين دفع قيمة البرنامج لمرة واحدة والملكية الأبدية، وبين استنزاف الأرباح في اشتراكات لا تنتهي.',
    intent: 'مقارنة مالية واستراتيجية (Financial Comparison)',
    pageType: 'مقارنة',
    businessGoal: 'إزالة الاعتراضات المالية وتبرير القيمة المرتفعة للدفع لمرة واحدة كعامل توفير حاسم.',
    customerJourney: 'معالجة اعتراضات الأسعار وتحويلها لمبرر استثماري ممتاز (ROI Justification).',
    awarenessStage: 'يبحث ويقارن (Evaluation)',
    cta: 'احسب حجم التوفير المالي السنوي لصالتك عبر حاسبة التوفير الرقمية',
    internalRelations: ['يتكامل مع حاسبة أرباح الصالة', 'يرتبط بالأسعار والصفحة الرئيسية']
  },
  {
    id: 'geo-egypt',
    category: 'countries',
    route: '/playstation-pos-egypt',
    seoTitle: 'برنامج إدارة صالات البلايستيشن في مصر | سستم كاشير بالجنيه المصري 2026',
    h1: 'سستم الجيمنج وصالات البلايستيشن رقم #1 في مصر بملكية مدى الحياة وبدون اشتراكات',
    metaDesc: 'البرنامج الأقوى المعتمد لدى أكثر من 150 صالة جيمنج وبلايستيشن بمصر. دعم فني محلي وميداني، دفع بالجنيه المصري، وتركيب وتدريب مجاني للعمالة بالصالة.',
    intent: 'نية تجارية جغرافية محلية عالية (High Intent Local Commercial)',
    pageType: 'بيع',
    businessGoal: 'السيطرة الكاملة على السوق المصري بتقديم حوافز السعر والدعم الفني الميداني القريب.',
    customerJourney: 'طمأنة العميل المصري بوجود دعم فني في نفس بلده والتعامل بعملته المحلية لسهولة الترخيص.',
    awarenessStage: 'جاهز للشراء (High Intent)',
    cta: 'اطلب مندوبنا الآن لمعاينة وتجهيز صالتك في أي مكان بمصر مجاناً',
    internalRelations: ['يرتبط بالصفحة الرئيسية', 'يتكامل مع استمارة طلب التوصيل المحلي والتعاقد']
  },
  {
    id: 'geo-saudi',
    category: 'countries',
    route: '/playstation-pos-saudi',
    seoTitle: 'نظام إدارة صالات الجيمنج والبلايستيشن بالسعودية | سستم كاشير معتمد 2026',
    h1: 'أدر صالة الجيمنج والـ VIP Lounge في السعودية بقمة الاحترافية والتقارير المالية',
    metaDesc: 'سستم متطور للغاية يدعم الريال السعودي، مخصص لإدارة صالات ألعاب الفيديو، بوفيه فاخر، إدارة العضويات والمشتركين والخصومات بالثانية. ترخيص مدى الحياة بدون عمولات.',
    intent: 'نية تجارية فاخرة للخليج (Premium Local Commercial)',
    pageType: 'بيع',
    businessGoal: 'استقطاب المستثمرين والشركات الكبرى في قطاع الـ Entertainment بالمملكة العربية السعودية.',
    customerJourney: 'تعزيز الفخامة والاحترافية التقنية وتلبية تطلعات السوق الخليجي ذي الميزانيات المرتفعة.',
    awarenessStage: 'جاهز للشراء (High Intent)',
    cta: 'تواصل معنا مباشرة عبر الواتساب لتجهيز ترخيص صالتك بالريال السعودي وبدء التشغيل فوراً',
    internalRelations: ['يرتبط بصفحة إدارة غرف الـ VIP', 'يتصل بنموذج طلب عروض الأسعار الدولية']
  },
  {
    id: 'use-vip',
    category: 'usecases',
    route: '/usecases/vip-rooms-management',
    seoTitle: 'برنامج إدارة غرف الـ VIP وصالات الجلسات الخاصة بالبلايستيشن والـ Gaming Lounges',
    h1: 'أقصى درجات الفخامة: سستم متكامل لحساب غرف الجلسات المغلقة والـ VIP بدقة تامة',
    metaDesc: 'هل تحتوي صالتك على غرف ألعاب خاصة ومغلقة؟ تحكم بحسابات الساعات العادية، والـ VIP، والمشاريب بأسعار مخصصة لكل غرفة تلقائياً وبأمان مالي كامل بالدقيقة.',
    intent: 'نية تجارية متخصصة لحالة الاستخدام (Niche Commercial Intent)',
    pageType: 'حل',
    businessGoal: 'إثبات مرونة وقدرة النظام على إدارة مستويات خدمة مختلفة داخل نفس الصالة.',
    customerJourney: 'استهداف صالات النخبة وإبراز ميزة التخصيص الكامل للغرف الفاخرة (Niche targeting).',
    awarenessStage: 'يبحث ويقارن (Evaluation)',
    cta: 'شاهد كيف يدير النظام غرف الـ VIP بمعدلات ربح وساعات لعب مخصصة',
    internalRelations: ['يرتبط بصفحة البوفيه والكافيتريا', 'يرتبط بصفحة الاستهداف الخليجي والسعودي الفاخر']
  },
  {
    id: 'use-members',
    category: 'usecases',
    route: '/usecases/memberships-tournaments-billing',
    seoTitle: 'سستم إدارة اشتراكات وعضويات اللاعبين وصناعة بطولات البلايستيشن',
    h1: 'ابنِ مجتمع اللاعبين الخاص بصالتك: سستم إدارة العضويات والبطولات المالية المبتكرة',
    metaDesc: 'تتبع عملائك المميزين، وقدم لهم كروت شحن ساعات مسبقة الدفع أو باقات اشتراك شهرية لتضمن ولائهم الدائم وترفع مبيعات صالتك طوال العام.',
    intent: 'نية ترويجية وبناء ولاء واستبقاء العملاء (Loyalty & Gamification)',
    pageType: 'حل',
    businessGoal: 'إظهار الميزات التسويقية الحديثة في السستم والتي تساعد الصالة على زيادة دخلها السنوي بشكل مستقر.',
    customerJourney: 'إقناع العميل بفوائد ما بعد الشراء وكيف يساعده البرنامج على تنمية صالته وتسويقها (Retention & Scale).',
    awarenessStage: 'جاهز للشراء (High Intent)',
    cta: 'اطلب الدليل الحصري والمجاني لإدارة بطولات البلايستيشن وصناعة مجتمع اللاعبين',
    internalRelations: ['يرتبط بصفحات المدونة والمقالات الإدارية', 'يتصل بالصفحة الرئيسية كخدمة إضافية للعملاء']
  }
];

export interface GraphNode {
  id: string;
  label: string;
  arabicLabel: string;
  type: 'entity' | 'topic' | 'page_class';
  group: 'security' | 'roi' | 'inventory' | 'loyalty' | 'licensing';
  description: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
  englishLabel: string;
  type: 'cause' | 'secure' | 'contain' | 'flow' | 'strengthen';
}

export const GRAPH_NODES: GraphNode[] = [
  // Parent Topics
  { id: 'T_Security', label: 'Financial Security & Leakage Prevention', arabicLabel: 'الأمان المالي وحماية الصالات', type: 'topic', group: 'security', description: 'المحور الرئيسي لحماية الأرباح التشغيلية، ومكافحة السرقة وتلاعب الكاشير في الصالات.' },
  { id: 'T_ROI', label: 'Operational ROI & Revenue Growth', arabicLabel: 'تعظيم الأرباح والتشغيل التجاري', type: 'topic', group: 'roi', description: 'المحور المعني بزيادة ربحية الجلسات، هندسة المبيعات الإضافية وتطوير الغرف الخاصة.' },
  { id: 'T_Inventory', label: 'Inventory & Buffet Control', arabicLabel: 'الرقابة الذكية على البوفيه والمخزن', type: 'topic', group: 'inventory', description: 'محور أتمتة حسابات المطبخ، البوفيه، وجرد المنتجات تلقائياً بدون عجز مالي.' },
  { id: 'T_Loyalty', label: 'Player Loyalty & Marketing', arabicLabel: 'تسويق صالات الألعاب واستبقاء اللاعبين', type: 'topic', group: 'loyalty', description: 'محور بناء مجتمع لاعبين أوفياء، نظام العضويات، المسابقات، وحجز غرف النخبة.' },
  { id: 'T_Costs', label: 'Cost Optimization & Ownership', arabicLabel: 'التملك مدى الحياة وتخفيض التكاليف', type: 'topic', group: 'licensing', description: 'محور معالجة مخاوف الميزانية والاشتراكات الشهرية لصالح الترخيص الأبدي الأوفر.' },

  // Key Entities
  { id: 'E_Owner', label: 'Lounge Owner / Investor', arabicLabel: 'المستثمر وصاحب الصالة', type: 'entity', group: 'security', description: 'صاحب القرار والمالك الفعلي للمشروع، يبحث عن الأمان المالي وتوفير التكاليف.' },
  { id: 'E_Cashier', label: 'Cashier Clerk', arabicLabel: 'موظف الكاشير والصالة', type: 'entity', group: 'security', description: 'الشخص المسؤول عن تشغيل الصالة وإدخال المبالغ للخزينة، مصدر ثغرات التلاعب المحتملة.' },
  { id: 'E_Time', label: 'System Time & PC Windows', arabicLabel: 'أجهزة ويندوز وتوقيت النظام', type: 'entity', group: 'security', description: 'الثغرة التقنية الشائعة لتلاعب الكاشير عن طريق تقديم وتأخير ساعة الجهاز.' },
  { id: 'E_POS', label: 'Playstation POS System', arabicLabel: 'سيستم حسابات البلايستيشن', type: 'entity', group: 'roi', description: 'النظام المحاسبي والبرمجي الذي يدير الصالة بالكامل محلياً وبأمان كامل للبيانات.' },
  { id: 'E_Shift', label: 'Shift Session', arabicLabel: 'شيفتات الجلسات والوردية', type: 'entity', group: 'security', description: 'وحدة الزمن والحساب الأساسية لورديات اللعب والموظفين، تتطلب رقابة فنية دقيقة.' },
  { id: 'E_Buffet', label: 'Buffet Item / Drinks', arabicLabel: 'أوردرات المشروبات والكانز', type: 'entity', group: 'inventory', description: 'منتجات ومشروبات الكافتيريا الملحقة بالصالة، تمثل هامش ربح إضافي كبير.' },
  { id: 'E_VIP', label: 'VIP Lounge Rooms', arabicLabel: 'غرف الـ VIP والجلسات الخاصة', type: 'entity', group: 'roi', description: 'الغرف ذات الهامش المرتفع في الصالات، تتطلب تسعيراً خاصاً ورقابة منفصلة.' },
  { id: 'E_Loyalty', label: 'Customer Loyalty & Retention', arabicLabel: 'ولاء واستبقاء اللاعبين', type: 'entity', group: 'loyalty', description: 'المحرك الأساسي للأرباح المستقرة عن طريق الباقات المسبقة وعضويات الشحن.' },
  { id: 'E_License', label: 'Lifetime License Model', arabicLabel: 'الترخيص مدى الحياة بدون اشتراكات', type: 'entity', group: 'licensing', description: 'نموذج شراء البرنامج لمرة واحدة والتملك الأبدي، يضمن عدم استنزاف الأرباح.' },

  // Page Classes
  { id: 'C_Pillars', label: 'Core Pillar Pages', arabicLabel: 'الصفحات المحورية الأساسية', type: 'page_class', group: 'roi', description: 'أعمدة المحتوى الكبرى (مثل دليل الأمان ودليل الأرباح) التي تضخ قيمة الأرشفة في الصفحة الرئيسية.' },
  { id: 'C_Supporting', label: 'Supporting Pages', arabicLabel: 'الصفحات الداعمة والتعليمية', type: 'page_class', group: 'roi', description: 'المقالات العميقة المتخصصة التي تجيب عن نيات بحثية دقيقة وتغذي الصفحات المحورية.' },
  { id: 'C_Comparisons', label: 'Comparison & Decision Pages', arabicLabel: 'صفحات المقارنة وحسم القرار', type: 'page_class', group: 'licensing', description: 'صفحات المقارنة الفنية والمالية التي تذيب الاعتراضات وتقود مباشرة إلى الشراء والتحويل.' },
  { id: 'C_Landing', label: 'Commercial Landing Pages', arabicLabel: 'صفحات الهبوط البيعية والجغرافية', type: 'page_class', group: 'roi', description: 'الصفحات الرئيسية والبلدية (مصر، السعودية) ذات نية الشراء الأعلى لتحقيق التحويل المالي الفعلي.' }
];

export const GRAPH_EDGES: GraphEdge[] = [
  { from: 'E_Owner', to: 'T_Security', label: 'يسعى لتحقيق', englishLabel: 'seeks', type: 'secure' },
  { from: 'E_Owner', to: 'T_Costs', label: 'يبحث عن تخفيض', englishLabel: 'minimizes', type: 'secure' },
  { from: 'E_Owner', to: 'E_Cashier', label: 'يوظف ويراقب', englishLabel: 'monitors', type: 'secure' },
  { from: 'E_Cashier', to: 'E_Time', label: 'قد يتلاعب بـ', englishLabel: 'manipulates', type: 'cause' },
  { from: 'E_Cashier', to: 'E_Shift', label: 'يشغل ويسلم', englishLabel: 'operates', type: 'cause' },
  { from: 'E_Time', to: 'E_Shift', label: 'تخلق تسريباً في', englishLabel: 'leaks', type: 'cause' },
  { from: 'E_Shift', to: 'T_Security', label: 'ترتبط بثغرات', englishLabel: 'linked to', type: 'cause' },
  { from: 'E_POS', to: 'E_Owner', label: 'يؤمن أرباح', englishLabel: 'protects', type: 'secure' },
  { from: 'E_POS', to: 'E_Shift', label: 'يتعقب ويقفل بالثانية', englishLabel: 'tracks', type: 'secure' },
  { from: 'E_POS', to: 'E_Time', label: 'يحمي ويمنع تغيير', englishLabel: 'locks', type: 'secure' },
  { from: 'E_POS', to: 'E_Buffet', label: 'يجرد تلقائياً ويربط', englishLabel: 'inventories', type: 'secure' },
  { from: 'E_POS', to: 'E_VIP', label: 'يخصص مبيعات وسعر', englishLabel: 'customizes', type: 'secure' },
  { from: 'E_POS', to: 'E_Loyalty', label: 'يدير شحن باقات', englishLabel: 'manages', type: 'secure' },
  { from: 'E_Buffet', to: 'T_Inventory', label: 'تغذي مبيعات', englishLabel: 'fuels', type: 'flow' },
  { from: 'E_VIP', to: 'T_ROI', label: 'تضاعف هوامش', englishLabel: 'maximizes', type: 'flow' },
  { from: 'E_Loyalty', to: 'T_Loyalty', label: 'تبني استبقاء و', englishLabel: 'retains', type: 'flow' },
  { from: 'E_License', to: 'T_Costs', label: 'تضمن توفير وأرباح', englishLabel: 'saves', type: 'secure' },
  { from: 'E_License', to: 'E_Owner', label: 'تضمن ملكية أبدية لـ', englishLabel: 'owned by', type: 'secure' },
  { from: 'T_Security', to: 'C_Pillars', label: 'تتبلور في', englishLabel: 'structured in', type: 'strengthen' },
  { from: 'T_ROI', to: 'C_Pillars', label: 'تتبلور في', englishLabel: 'structured in', type: 'strengthen' },
  { from: 'T_Inventory', to: 'C_Supporting', label: 'تتفرع إلى', englishLabel: 'detailed in', type: 'strengthen' },
  { from: 'T_Loyalty', to: 'C_Supporting', label: 'تتفرع إلى', englishLabel: 'detailed in', type: 'strengthen' },
  { from: 'T_Costs', to: 'C_Comparisons', label: 'تعالجها صفحة', englishLabel: 'addressed by', type: 'strengthen' },
  { from: 'C_Supporting', to: 'C_Pillars', label: 'تغذي سيو وقوة', englishLabel: 'strengthens', type: 'strengthen' },
  { from: 'C_Comparisons', to: 'C_Pillars', label: 'تزيل الاعتراض لـ', englishLabel: 'overcomes', type: 'strengthen' },
  { from: 'C_Pillars', to: 'C_Landing', label: 'تضخ قوة الأرشفة (PageRank) في', englishLabel: 'channels rank to', type: 'strengthen' }
];

export const SiteArchitecture: React.FC<{
  onBackToLanding: () => void;
}> = ({ onBackToLanding }) => {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'tree' | 'cro-view' | 'clusters' | 'knowledge-graph'>('knowledge-graph');
  const [selectedGraphNodeId, setSelectedGraphNodeId] = useState<string | null>('E_POS');
  const [graphFilterMode, setGraphFilterMode] = useState<'all' | 'entities' | 'topics' | 'relations' | 'internal-links'>('all');

  const isNodeConnected = (nodeId1: string, nodeId2: string) => {
    return GRAPH_EDGES.some(edge => 
      (edge.from === nodeId1 && edge.to === nodeId2) || 
      (edge.from === nodeId2 && edge.to === nodeId1)
    );
  };
  
  // Content Clusters states
  const [selectedClusterId, setSelectedClusterId] = useState<string>('cluster-security');
  const [activeSubTab, setActiveSubTab] = useState<string>('commercial');
  const [authorityScore, setAuthorityScore] = useState<number>(82);
  const [isSimulatingAudit, setIsSimulatingAudit] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const triggerAuditSimulation = () => {
    if (isSimulatingAudit) return;
    setIsSimulatingAudit(true);
    setAuditLogs([]);
    setAuthorityScore(82);
    
    const logs = [
      '🤖 زواحف جوجل (GoogleBot-Mobile) تبدأ فحص خريطة الموقع الفورية...',
      '📂 اكتشاف عنقود موضوعي متكامل (Topical Cluster) مخصص لصناعة صالات الألعاب.',
      '🔍 فحص المقالة الداعمة: كشف حيل تلاعب المحاسب بالوقت... نية بحث: معلوماتية. [ربط داخلي قائم]',
      '🔍 فحص المقالة الداعمة: دليل جرد البوفيه والمخزن... نية بحث: ألم حقيقي للزبون. [ربط داخلي قائم]',
      '🔍 فحص مقالة المشاكل: 5 إشارات لاختلاس شيفتات الصالة... نية بحث: الوعي بالألم. [ربط داخلي قائم]',
      '🔍 فحص مقالة المقارنة الفنية: مراقبة الشاشات يدوياً ضد التحكم التلقائي... نية بحث: مقارنة وبدائل. [ربط داخلي قائم]',
      '🔗 تتبع كافة مسارات الربط الداخلي (Internal Anchor Links) وتمرير القيمة (PageRank Juice)...',
      '🎯 نقطة الالتقاء: جميع المقالات الداعمة تضخ طاقتها إلى الصفحة الأساسية (Pillar Page) لعلاج الثغرة الإدارية.',
      '💎 الصفحة الأساسية (Pillar Page) ترسل قيمة عالية إلى الصفحة الرئيسية للبيع (/) بهدف تحفيز التحويل (CRO).',
      '📈 حساب السلطة الموضوعية (Topical Authority Score) لقطاع "إدارة صالات الجيمنج ومقاهي الإنترنت"...',
      '🎉 نجاح الأرشفة! جوجل يصنف الموقع كـ Authority (مرجع عالي الموثوقية والسلطة) في مجاله بنسبة 100%! ⭐'
    ];
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < logs.length) {
        setAuditLogs(prev => [...prev, logs[currentIdx]]);
        setAuthorityScore(prev => Math.min(prev + 1.6, 98.4));
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsSimulatingAudit(false);
      }
    }, 800);
  };
  
  // Custom interactive state to add/edit pages
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  // --- ADMIN SECURITY & AUTH STATES ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState<'architecture' | 'blueprint' | 'landing_cms' | 'blog_cms' | 'additional_cms' | 'topical_authority' | 'enterprise_cms'>('architecture');
  const [selectedBlueprintSection, setSelectedBlueprintSection] = useState<string>("hero");
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  // Monitor brute-force lockout timers
  useEffect(() => {
    if (lockoutTime) {
      const interval = setInterval(() => {
        if (Date.now() >= lockoutTime) {
          setLockoutTime(null);
          setLoginAttempts(0);
          setAuthError('');
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTime]);

  // --- LANDING PAGE CMS STATES ---
  const [cmsTag, setCmsTag] = useState('المعيار الذهبي لإدارة الصالات 2026');
  const [cmsTitlePrefix, setCmsTitlePrefix] = useState('نظام إدارة صالات البلايستيشن');
  const [cmsTitleHighlight, setCmsTitleHighlight] = useState('سيستم كاشير بلايسيتشن');
  const [cmsDescription, setCmsDescription] = useState('نظام متكامل لإدارة البلايستيشن، الكافيه، والمخازن. صُمم خصيصاً لرفع أرباحك وتقليل أخطاء الموظفين بنسبة 99%.');
  const [cmsVideo, setCmsVideo] = useState('https://www.youtube.com/watch?v=1CWmNEt6xVs');
  const [cmsVideoThumbnail, setCmsVideoThumbnail] = useState('');
  const [cmsPhone, setCmsPhone] = useState('201121778205');
  const [cmsWhatsapp, setCmsWhatsapp] = useState('مرحباً فريق صُنّاع الفكرة، أودّ الاستفسار عن نظام إدارة صالات البلايستيشن.');
  
  // Authority section CMS states
  const [cmsAuthTag, setCmsAuthTag] = useState('شريكك الهندسي في النجاح');
  const [cmsAuthTitle, setCmsAuthTitle] = useState('IDEA MAKERS: أكثر من مجرد برنامج');
  const [cmsAuthDescription, setCmsAuthDescription] = useState('نحن لا نبيع لك أكوادًا برمجية، نحن نبني معك بنية تحتية رقمية تضمن لك السيادة الكاملة على مشروعك. نظامنا صُمم بأيدي مهندسين يفهمون طبيعة السوق المصري والخليجي.');
  const [cmsAuthStat1Title, setCmsAuthStat1Title] = useState('ثقة متزايدة يومياً');
  const [cmsAuthStat1Desc, setCmsAuthStat1Desc] = useState('يستخدمه أصحاب صالات بلايستيشن في مصر والسعودية والإمارات والكويت وقطر');
  const [cmsAuthStat2Title, setCmsAuthStat2Title] = useState('100%');
  const [cmsAuthStat2Desc, setCmsAuthStat2Desc] = useState('تحت سيطرتك أوفلاين');
  const [cmsAuthImageUrl, setCmsAuthImageUrl] = useState('https://i.postimg.cc/GmskHZKC/aryd-swrt-afdl-202604051407.jpg');
  const [authImgSourceType, setAuthImgSourceType] = useState<'url' | 'upload'>('url');
  const [localAuthImgBase64, setLocalAuthImgBase64] = useState('');
  const [authImgFileName, setAuthImgFileName] = useState('');

  // --- TRUST CERTIFICATE STATES ---
  const [cmsTrustCertShowMode, setCmsTrustCertShowMode] = useState<'both' | 'replica' | 'image'>('both');
  const [cmsTrustCertImgUrl, setCmsTrustCertImgUrl] = useState('');
  const [trustCertImgSourceType, setTrustCertImgSourceType] = useState<'url' | 'upload'>('url');
  const [localTrustCertImgBase64, setLocalTrustCertImgBase64] = useState('');
  const [trustCertImgFileName, setTrustCertImgFileName] = useState('');

  // --- EXTENDED CMS STATES (Pricing, Branches, Trial, Why, Founder, About, Vision, Mission, Values) ---
  const [cmsPricingTitle, setCmsPricingTitle] = useState('استثمار سيادي.. لمرة واحدة');
  const [cmsPricingSubtitle, setCmsPricingSubtitle] = useState('اختر الباقة التي تناسب طموحك. لا توجد رسوم خفية، لا توجد اشتراكات، لا توجد تبعية.');
  
  const [cmsBranchesTitle, setCmsBranchesTitle] = useState('هل تمتلك فروعاً متعددة؟');
  const [cmsBranchesText, setCmsBranchesText] = useState('على الرغم من أن الباقات الجاهزة لا تشمل إدارة الفروع، إلا أننا في IDEA Makers يمكننا تصميم وتطوير نظام مخصص لك بالكامل يشمل إدارة الفروع المتعددة والربط السحابي الموحد.');
  const [cmsBranchesBtnText, setCmsBranchesBtnText] = useState('اطلب نظامك المخصص الآن');

  const [cmsTrialTitle, setCmsTrialTitle] = useState('"ابدأ الآن وقرر بنفسك"');
  const [cmsTrialText, setCmsTrialText] = useState('خلال 3 أيام فقط، ستسترد قيمة نظام الكاشير بالكامل من الأرباح الإضافية التي ستحققها!\nنحن لا نمنحك مجرد "تجربة مجانية"، بل نضع بين يديك **أداة تدقيق مالي وإداري** متكاملة لضبط مبيعات الصالة وسد ثغرات الكاشير. شغل النظام لمدة 3 أيام، وقارن أرباحك الحالية بما كنت تحققه سابقاً.. وستصدمك الفروقات الحقيقية.');
  const [cmsTrialBtnText, setCmsTrialBtnText] = useState('ابدأ تجربة مجانية الآن');

  const [cmsWhyChooseTitle, setCmsWhyChooseTitle] = useState('لماذا تختار IDEA Makers؟');
  const [cmsWhy1Title, setCmsWhy1Title] = useState('نظام أوفلاين بالكامل');
  const [cmsWhy1Desc, setCmsWhy1Desc] = useState('لا حاجة للإنترنت، عملك مستمر دائماً وبدون انقطاع.');
  const [cmsWhy2Title, setCmsWhy2Title] = useState('ملكية مدى الحياة');
  const [cmsWhy2Desc, setCmsWhy2Desc] = useState('ادفع مرة واحدة وامتلك النظام للأبد بدون اشتراكات شهرية.');
  const [cmsWhy3Title, setCmsWhy3Title] = useState('تجربة مجانية');
  const [cmsWhy3Desc, setCmsWhy3Desc] = useState('3 أيام لاكتشاف القوة الحقيقية للنظام قبل اتخاذ قرار الشراء.');
  const [cmsWhy4Title, setCmsWhy4Title] = useState('تخصيص كامل');
  const [cmsWhy4Desc, setCmsWhy4Desc] = useState('تحكّم في الهوية البصرية بما يناسب براند صالتك وشعارك.');
  const [cmsWhy5Title, setCmsWhy5Title] = useState('تركيب احترافي');
  const [cmsWhy5Desc, setCmsWhy5Desc] = useState('فريقنا يتولى الإعداد والتشغيل والربط في مكانك.');
  const [cmsWhy6Title, setCmsWhy6Title] = useState('تدريب ودعم فني');
  const [cmsWhy6Desc, setCmsWhy6Desc] = useState('نضمن لك ولطاقمك إتقان التعامل مع النظام مع دعم مستمر.');
  const [cmsWhy7Title, setCmsWhy7Title] = useState('صُمم خصيصاً');
  const [cmsWhy7Desc, setCmsWhy7Desc] = useState('حلول هندسية موجهة بدقة تلبية احتياجات صالات البلايستيشن.');
  const [cmsWhyChooseFooterText, setCmsWhyChooseFooterText] = useState('اختيار IDEA Makers هو القرار الأذكى لمستقبل صالتك');
  const [cmsWhyChooseFooterBtnText, setCmsWhyChooseFooterBtnText] = useState('تحدث مع خبيرنا التقني الآن');

  const [cmsFounderStorySubtitle, setCmsFounderStorySubtitle] = useState('الرؤية خلف الابتكار');
  const [cmsFounderStoryTitle, setCmsFounderStoryTitle] = useState('تعرف على مؤسس صُنّاع الفكرة');
  const [cmsFounderQuote, setCmsFounderQuote] = useState('فكرة النظام بدأت عندما لاحظنا الفوضى التي يعاني منها أصحاب صالات البلايستيشن. كمهندس برمجيات، لم أستطع تجاهل حجم الخسائر التي يسببها غياب النظام الدقيق.');
  const [cmsFounderPara1, setCmsFounderPara1] = useState('لاحظ إسلام عرفة أن العديد من الصالات تعاني من سوء الإدارة، وضياع الأرباح، وغياب التقارير الواضحة. هذا الواقع كان الدافع الأساسي لبناء نظام احترافي صُمم خصيصاً ليفهم لغة هذا البيزنس ويحل مشاكله من الجذور.');
  const [cmsFounderPara2, setCmsFounderPara2] = useState('تحول IDEA Makers PlayStation POS من مجرد كود برمججي إلى رحلة نجاح ساعدت مئات أصحاب الصالات على الانتقال من الفوضى اليدوية إلى الإدارة الرقمية الذكية التي تضمن السيادة الكاملة والنمو المستدام.');
  const [cmsFounderPara3, setCmsFounderPara3] = useState('الهدف لم يكن أبداً مجرد بيع برنامج، بل تمكين أصحاب المشاريع من مضاعفة أرباحهم، وإدارة صالاتهم بسهولة، والعمل باحترافية تليق بطموحاتهم.');
  const [cmsFounderBtnText, setCmsFounderBtnText] = useState('اقرأ القصة الكاملة للابتكار');
  const [cmsFounderImgUrl, setCmsFounderImgUrl] = useState('https://i.postimg.cc/pX35pXmS/CEO-Eslam-Arafa.jpg');
  const [cmsFounderName, setCmsFounderName] = useState('Eslam Arafa');
  const [cmsFounderRole, setCmsFounderRole] = useState('Founder & CEO – IDEA Makers');
  const [cmsFounderExpTitle, setCmsFounderExpTitle] = useState('Expertise');
  const [cmsFounderExpDesc, setCmsFounderExpDesc] = useState('Systems Engineer');

  const [cmsAboutUsBadge, setCmsAboutUsBadge] = useState('القوة الهندسية خلف مشروعك');
  const [cmsAboutUsTitle, setCmsAboutUsTitle] = useState('من نحن: IDEA Makers');
  const [cmsAboutUsText1, setCmsAboutUsText1] = useState('نحن شركة تكنولوجيا رائدة متخصصة في تطوير الأنظمة البرمجية وحلول الإدارة الذكية التي تهدف إلى رفع كفاءة الأعمال وزيادة الأرباح.');
  const [cmsAboutUsText2, setCmsAboutUsText2] = useState('في IDEA Makers، نحن لسنا مجرد بائعي برامج؛ نحن شركة هندسية متكاملة تركز على ابتكار حلول تقنية تعالج التحديات الحقيقية التي تواجه أصحاب المشاريع، مما يضمن لك السيادة الكاملة على بيئة عملك.');
  const [cmsAboutUsTag1, setCmsAboutUsTag1] = useState('تطوير أنظمة الأعمال');
  const [cmsAboutUsTag2, setCmsAboutUsTag2] = useState('حلول الإدارة الذكية');
  const [cmsAboutUsTag3, setCmsAboutUsTag3] = useState('أتمتة العمليات');
  const [cmsAboutUsBannerType, setCmsAboutUsBannerType] = useState('Engineering Excellence');
  const [cmsAboutUsBannerText, setCmsAboutUsBannerText] = useState('نصمم المستقبل.. لا نكتفي ببرمجته');

  const [cmsVisionTitle, setCmsVisionTitle] = useState('رؤيتنا');
  const [cmsVisionText, setCmsVisionText] = useState('نسعى لأن نكون المزوّد الأول والملهم لأنظمة إدارة الأعمال الذكية في قطاع الألعاب والترفيه، من خلال الابتكار المستمر والأتمتة التي تساعد الشركات على النمو والتوسع عالمياً، وتحويل كل صالة إلى كيان مؤسسي ناجح.');
  const [cmsMissionTitle, setCmsMissionTitle] = useState('رسالتنا');
  const [cmsMissionText, setCmsMissionText] = useState('مهمتنا هي تمكين أصحاب صالات البلايستيشن من إدارة مشاريعهم باحترافية وسهولة، والقضاء على الفوضى التشغيلية، وتحويل التكنولوجيا إلى أداة بسيطة تضاعف الأرباح وتضمن الاستدامة والنمو المستمر.');

  const [cmsCoreValuesTitle, setCmsCoreValuesTitle] = useState('قيمنا الجوهرية');
  const [cmsCoreValuesSubtitle, setCmsCoreValuesSubtitle] = useState('المبادئ التي تحرك كل سطر برمججي نكتبه وكل قرار نتخذه');
  const [cmsVal1Title, setCmsVal1Title] = useState('الابتكار');
  const [cmsVal1Desc, setCmsVal1Desc] = useState('نسابق الزمن لتقديم أحدث الحلول.');
  const [cmsVal2Title, setCmsVal2Title] = useState('الموثوقية');
  const [cmsVal2Desc, setCmsVal2Desc] = useState('أنظمتنا هي العمود الفقري لمشروعك.');
  const [cmsVal3Title, setCmsVal3Title] = useState('الشفافية');
  const [cmsVal3Desc, setCmsVal3Desc] = useState('وضوح كامل في كل تفصيلة تقنية ومالية.');
  const [cmsVal4Title, setCmsVal4Title] = useState('التطوير المستمر');
  const [cmsVal4Desc, setCmsVal4Desc] = useState('لا نتوقف عن تحسين أدواتنا.');
  const [cmsVal5Title, setCmsVal5Title] = useState('نجاح العميل');
  const [cmsVal5Desc, setCmsVal5Desc] = useState('نجاحك هو المقياس الحقيقي لنجاحنا.');

  const [cmsSaveSuccess, setCmsSaveSuccess] = useState(false);

  // Hero custom media upload states
  const [heroVideoSourceType, setHeroVideoSourceType] = useState<'url' | 'upload'>('url');
  const [localHeroVideoBase64, setLocalHeroVideoBase64] = useState('');
  const [heroVideoFileName, setHeroVideoFileName] = useState('');

  const [heroThumbnailSourceType, setHeroThumbnailSourceType] = useState<'url' | 'upload'>('url');
  const [localHeroThumbnailBase64, setLocalHeroThumbnailBase64] = useState('');
  const [heroThumbnailFileName, setHeroThumbnailFileName] = useState('');

  // Founder custom image upload states
  const [founderImgSourceType, setFounderImgSourceType] = useState<'url' | 'upload'>('url');
  const [localFounderImgBase64, setLocalFounderImgBase64] = useState('');
  const [founderImgFileName, setFounderImgFileName] = useState('');

  // --- ADDITIONAL CMS STATES ---
  const [editPackages, setEditPackages] = useState<any[]>([]);
  const [editIntPricing, setEditIntPricing] = useState<any>({});
  const [editLocalizations, setEditLocalizations] = useState<any>({});
  const [selectedEditCountry, setSelectedEditCountry] = useState('egypt');
  const [additionalCmsSuccess, setAdditionalCmsSuccess] = useState(false);
  const [editCountriesConfig, setEditCountriesConfig] = useState<any>({});
  const [calcDevicesDefault, setCalcDevicesDefault] = useState(5);
  const [calcHoursDefault, setCalcHoursDefault] = useState(8);
  const [leakRateDefault, setLeakRateDefault] = useState(20);

  // Testimonial CRUD states
  const [newTestName, setNewTestName] = useState('');
  const [newTestRole, setNewTestRole] = useState('');
  const [newTestQuote, setNewTestQuote] = useState('');
  const [newTestRating, setNewTestRating] = useState(5);
  const [testImageSourceType, setTestImageSourceType] = useState<'url' | 'upload'>('url');
  const [testImageLink, setTestImageLink] = useState('');
  const [testLocalImgBase64, setTestLocalImgBase64] = useState('');
  const [testImgFileName, setTestImgFileName] = useState('');

  // FAQ CRUD states
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // --- BLOG ARTICLES CMS STATES ---
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [editingArticleSlug, setEditingArticleSlug] = useState<string | null>(null);
  
  // Blog form states
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleCategory, setArticleCategory] = useState('نصائح إدارية');
  const [articleImage, setArticleImage] = useState('');
  const [articleVideo, setArticleVideo] = useState('');
  const [articleTags, setArticleTags] = useState('');
  const [articleAuthor, setArticleAuthor] = useState('المهندس إسلام عرفة');
  const [articleSlug, setArticleSlug] = useState('');

  // Local Offline AI SEO Assistant states
  const [localAiTopic, setLocalAiTopic] = useState<'financial-control' | 'playstation-pos-intro' | 'pricing-strategies' | 'playstation-marketing'>('financial-control');
  const [localAiTone, setLocalAiTone] = useState<'authoritative' | 'practical' | 'comparative' | 'friendly'>('authoritative');
  const [localAiGenerating, setLocalAiGenerating] = useState(false);
  const [localAiSuccess, setLocalAiSuccess] = useState(false);

  // Media Tab & Local File upload states for Blog CMS
  const [imageSourceType, setImageSourceType] = useState<'url' | 'upload'>('url');
  const [videoSourceType, setVideoSourceType] = useState<'url' | 'upload'>('url');
  const [localImageBase64, setLocalImageBase64] = useState('');
  const [localVideoBase64, setLocalVideoBase64] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [videoFileName, setVideoFileName] = useState('');

  // Arabic Dialect Translation and Localization Dictionary
  const DIALECT_DICTIONARIES: Record<string, Record<string, string>> = {
    egypt: {
      'وردية': 'شيفت',
      'ورديات': 'شيفتات',
      'الضيافة': 'البوفيه',
      'ضيافة': 'بوفيه',
      'طلب': 'أوردر',
      'طلبات': 'أوردرات',
      'أجهزة تحكم': 'دراعات',
      'جهاز تحكم': 'دراع',
      'صندوق الحسابات': 'درج الكاشير',
      'برنامج محاسبة صالات': 'برنامج كاشير البلايستيشن',
      'سستم محاسبة صالات': 'سيستم كاشير البلايستيشن',
      'مركز ترفيهي': 'صالة بلايستيشن',
      'مراكز ترفيهية': 'صالات بلايستيشن'
    },
    saudi: {
      'شيفت': 'وردية',
      'شيفتات': 'ورديات',
      'البوفيه': 'قسم الضيافة',
      'بوفيه': 'ضيافة',
      'أوردر': 'طلب',
      'أوردرات': 'طلبات',
      'دراعات': 'أجهزة تحكم (يدات)',
      'دراع': 'جهاز تحكم (يد)',
      'درج الكاشير': 'صندوق الحسابات المالي',
      'برنامج كاشير البلايستيشن': 'سستم الصالات المحاسبي',
      'سيستم كاشير البلايستيشن': 'برنامج إدارة المراكز الترفيهية',
      'صالة بلايستيشن': 'مركز ألعاب ترفيهي',
      'صالات بلايستيشن': 'مراكز ألعاب وترفيه'
    },
    uae: {
      'شيفت': 'وردية تشغيل',
      'شيفتات': 'ورديات العمل',
      'البوفيه': 'الخدمات الجانبية والضيافة',
      'بوفيه': 'ضيافة وكافيه',
      'أوردر': 'طلب العميل',
      'أوردرات': 'طلبات الخدمة',
      'دراعات': 'أجهزة تحكم ذكية',
      'دراع': 'جهاز التحكم',
      'درج الكاشير': 'صندوق الإيرادات الكاش',
      'برنامج كاشير البلايستيشن': 'سستم الكاشير وصالات الترفيه',
      'سيستم كاشير البلايستيشن': 'نظام تشغيل صالات الألعاب الذكي',
      'صالة بلايستيشن': 'صالة ألعاب إلكترونية',
      'صالات بلايستيشن': 'صالات ألعاب ترفيهية'
    },
    qatar: {
      'شيفت': 'وردية التشغيل',
      'شيفتات': 'ورديات الموظفين',
      'البوفيه': 'خدمات الضيافة والـ VIP',
      'بوفيه': 'كافيتريا الصالة والضيافة',
      'أوردر': 'طلب الفاتورة',
      'أوردرات': 'طلبات المأكولات والمشروبات',
      'دراعات': 'أجهزة تحكم الألعاب',
      'دراع': 'جهاز التحكم المعتمد',
      'درج الكاشير': 'الخزينة المالي للشيفت',
      'برنامج كاشير البلايستيشن': 'نظام الكاشير الموحد للغرف',
      'سيستم كاشير البلايستيشن': 'برنامج تسيير صالات ومحلات الألعاب'
    },
    kuwait: {
      'شيفت': 'وردية العمل',
      'شيفتات': 'ورديات التشغيل',
      'البوفيه': 'بوفيه وضيافة الصالة',
      'بوفيه': 'مشروبات وبوفيه الصالة',
      'أوردر': 'طلب الرواد',
      'أوردرات': 'طلبات الزوار والرواد',
      'دراعات': 'أجهزة تحكم ويدات اللعب',
      'دراع': 'يد اللعب',
      'درج الكاشير': 'صندوق الكاش ومطابقة الكي نت',
      'برنامج كاشير البلايستيشن': 'سستم الكاشير والتحكم بالألعاب',
      'سيستم كاشير البلايستيشن': 'نظام حسابات صالات الترفيه والبلايستيشن'
    }
  };

  const applyDialectTranslation = (targetCountry: string) => {
    const dictionary = DIALECT_DICTIONARIES[targetCountry];
    if (!dictionary) return;
    
    let updatedContent = articleContent;
    let updatedTitle = articleTitle;
    let updatedDescription = articleDescription;
    
    Object.entries(dictionary).forEach(([key, val]) => {
      const regex = new RegExp(key, 'g');
      updatedContent = updatedContent.replace(regex, val);
      updatedTitle = updatedTitle.replace(regex, val);
      updatedDescription = updatedDescription.replace(regex, val);
    });
    
    setArticleContent(updatedContent);
    setArticleTitle(updatedTitle);
    setArticleDescription(updatedDescription);
    
    const countryNames: Record<string, string> = {
      egypt: 'مصر 🇪🇬',
      saudi: 'السعودية 🇸🇦',
      uae: 'الإمارات 🇦🇪',
      qatar: 'قطر 🇶🇦',
      kuwait: 'الكويت 🇰🇼'
    };
    alert(`تم توطين الصياغة ومصطلحات المقال بنجاح لتناسب جمهور (${countryNames[targetCountry] || targetCountry}) بالكامل! 🎉`);
  };

  // Load CMS and Blog articles on mount
  useEffect(() => {
    // 1. Load Landing Page CMS Content
    const storedCms = localStorage.getItem('playstation_pos_cms_content');
    if (storedCms) {
      try {
        const parsed = JSON.parse(storedCms);
        if (parsed.heroTitleHighlight === "برنامج كاشير وإدارة جلسات الألعاب") {
          parsed.heroTitleHighlight = "سيستم كاشير بلايسيتشن";
          localStorage.setItem('playstation_pos_cms_content', JSON.stringify(parsed));
        }
        if (parsed.heroTag) setCmsTag(parsed.heroTag);
        if (parsed.heroTitlePrefix) setCmsTitlePrefix(parsed.heroTitlePrefix);
        if (parsed.heroTitleHighlight) setCmsTitleHighlight(parsed.heroTitleHighlight);
        if (parsed.heroDescription) setCmsDescription(parsed.heroDescription);
        if (parsed.demoVideoUrl) {
          setCmsVideo(parsed.demoVideoUrl);
          if (parsed.demoVideoUrl.startsWith('db://')) {
            setHeroVideoSourceType('upload');
            setHeroVideoFileName('فيديو محلي محفوظ');
          }
        }
        if (parsed.demoVideoThumbnailUrl) {
          setCmsVideoThumbnail(parsed.demoVideoThumbnailUrl);
          if (parsed.demoVideoThumbnailUrl.startsWith('db://')) {
            setHeroThumbnailSourceType('upload');
            setHeroThumbnailFileName('صورة مصغرة محلية محفوظة');
          }
        }
        if (parsed.contactPhone) setCmsPhone(parsed.contactPhone);
        if (parsed.whatsappMessage) setCmsWhatsapp(parsed.whatsappMessage);
        
        // Load authority fields
        if (parsed.authTag) setCmsAuthTag(parsed.authTag);
        if (parsed.authTitle) setCmsAuthTitle(parsed.authTitle);
        if (parsed.authDescription) setCmsAuthDescription(parsed.authDescription);
        if (parsed.authStat1Title) setCmsAuthStat1Title(parsed.authStat1Title);
        if (parsed.authStat1Desc) setCmsAuthStat1Desc(parsed.authStat1Desc);
        if (parsed.authStat2Title) setCmsAuthStat2Title(parsed.authStat2Title);
        if (parsed.authStat2Desc) setCmsAuthStat2Desc(parsed.authStat2Desc);
        if (parsed.authImageUrl) {
          setCmsAuthImageUrl(parsed.authImageUrl);
          if (parsed.authImageUrl.startsWith('db://')) {
            setAuthImgSourceType('upload');
            setAuthImgFileName('صورة الشريك محفوظة محلياً');
          }
        }

        // Load Trust Certificate fields
        if (parsed.trustCertShowMode) setCmsTrustCertShowMode(parsed.trustCertShowMode);
        if (parsed.trustCertImgUrl) {
          setCmsTrustCertImgUrl(parsed.trustCertImgUrl);
          if (parsed.trustCertImgUrl.startsWith('db://')) {
            setTrustCertImgSourceType('upload');
            setTrustCertImgFileName('صورة الشهادة محفوظة محلياً');
          }
        }
        // Load pricing & other sections fields
        if (parsed.pricingTitle) setCmsPricingTitle(parsed.pricingTitle);
        if (parsed.pricingSubtitle) setCmsPricingSubtitle(parsed.pricingSubtitle);
        if (parsed.branchesTitle) setCmsBranchesTitle(parsed.branchesTitle);
        if (parsed.branchesText) setCmsBranchesText(parsed.branchesText);
        if (parsed.branchesBtnText) setCmsBranchesBtnText(parsed.branchesBtnText);
        if (parsed.trialTitle) setCmsTrialTitle(parsed.trialTitle);
        if (parsed.trialText) setCmsTrialText(parsed.trialText);
        if (parsed.trialBtnText) setCmsTrialBtnText(parsed.trialBtnText);
        
        if (parsed.whyChooseTitle) setCmsWhyChooseTitle(parsed.whyChooseTitle);
        if (parsed.why1Title) setCmsWhy1Title(parsed.why1Title);
        if (parsed.why1Desc) setCmsWhy1Desc(parsed.why1Desc);
        if (parsed.why2Title) setCmsWhy2Title(parsed.why2Title);
        if (parsed.why2Desc) setCmsWhy2Desc(parsed.why2Desc);
        if (parsed.why3Title) setCmsWhy3Title(parsed.why3Title);
        if (parsed.why3Desc) setCmsWhy3Desc(parsed.why3Desc);
        if (parsed.why4Title) setCmsWhy4Title(parsed.why4Title);
        if (parsed.why4Desc) setCmsWhy4Desc(parsed.why4Desc);
        if (parsed.why5Title) setCmsWhy5Title(parsed.why5Title);
        if (parsed.why5Desc) setCmsWhy5Desc(parsed.why5Desc);
        if (parsed.why6Title) setCmsWhy6Title(parsed.why6Title);
        if (parsed.why6Desc) setCmsWhy6Desc(parsed.why6Desc);
        if (parsed.why7Title) setCmsWhy7Title(parsed.why7Title);
        if (parsed.why7Desc) setCmsWhy7Desc(parsed.why7Desc);
        if (parsed.whyChooseFooterText) setCmsWhyChooseFooterText(parsed.whyChooseFooterText);
        if (parsed.whyChooseFooterBtnText) setCmsWhyChooseFooterBtnText(parsed.whyChooseFooterBtnText);

        if (parsed.founderStorySubtitle) setCmsFounderStorySubtitle(parsed.founderStorySubtitle);
        if (parsed.founderStoryTitle) setCmsFounderStoryTitle(parsed.founderStoryTitle);
        if (parsed.founderQuote) setCmsFounderQuote(parsed.founderQuote);
        if (parsed.founderPara1) setCmsFounderPara1(parsed.founderPara1);
        if (parsed.founderPara2) setCmsFounderPara2(parsed.founderPara2);
        if (parsed.founderPara3) setCmsFounderPara3(parsed.founderPara3);
        if (parsed.founderBtnText) setCmsFounderBtnText(parsed.founderBtnText);
        if (parsed.founderImgUrl) {
          setCmsFounderImgUrl(parsed.founderImgUrl);
          if (parsed.founderImgUrl.startsWith('db://')) {
            setFounderImgSourceType('upload');
            setFounderImgFileName('صورة المؤسس الشخصية');
          }
        }
        if (parsed.founderName) setCmsFounderName(parsed.founderName);
        if (parsed.founderRole) setCmsFounderRole(parsed.founderRole);
        if (parsed.founderExpTitle) setCmsFounderExpTitle(parsed.founderExpTitle);
        if (parsed.founderExpDesc) setCmsFounderExpDesc(parsed.founderExpDesc);

        if (parsed.aboutUsBadge) setCmsAboutUsBadge(parsed.aboutUsBadge);
        if (parsed.aboutUsTitle) setCmsAboutUsTitle(parsed.aboutUsTitle);
        if (parsed.aboutUsText1) setCmsAboutUsText1(parsed.aboutUsText1);
        if (parsed.aboutUsText2) setCmsAboutUsText2(parsed.aboutUsText2);
        if (parsed.aboutUsTag1) setCmsAboutUsTag1(parsed.aboutUsTag1);
        if (parsed.aboutUsTag2) setCmsAboutUsTag2(parsed.aboutUsTag2);
        if (parsed.aboutUsTag3) setCmsAboutUsTag3(parsed.aboutUsTag3);
        if (parsed.aboutUsBannerType) setCmsAboutUsBannerType(parsed.aboutUsBannerType);
        if (parsed.aboutUsBannerText) setCmsAboutUsBannerText(parsed.aboutUsBannerText);

        if (parsed.visionTitle) setCmsVisionTitle(parsed.visionTitle);
        if (parsed.visionText) setCmsVisionText(parsed.visionText);
        if (parsed.missionTitle) setCmsMissionTitle(parsed.missionTitle);
        if (parsed.missionText) setCmsMissionText(parsed.missionText);

        if (parsed.coreValuesTitle) setCmsCoreValuesTitle(parsed.coreValuesTitle);
        if (parsed.coreValuesSubtitle) setCmsCoreValuesSubtitle(parsed.coreValuesSubtitle);
        if (parsed.val1Title) setCmsVal1Title(parsed.val1Title);
        if (parsed.val1Desc) setCmsVal1Desc(parsed.val1Desc);
        if (parsed.val2Title) setCmsVal2Title(parsed.val2Title);
        if (parsed.val2Desc) setCmsVal2Desc(parsed.val2Desc);
        if (parsed.val3Title) setCmsVal3Title(parsed.val3Title);
        if (parsed.val3Desc) setCmsVal3Desc(parsed.val3Desc);
        if (parsed.val4Title) setCmsVal4Title(parsed.val4Title);
        if (parsed.val4Desc) setCmsVal4Desc(parsed.val4Desc);
        if (parsed.val5Title) setCmsVal5Title(parsed.val5Title);
        if (parsed.val5Desc) setCmsVal5Desc(parsed.val5Desc);
      } catch (e) {}
    }

    // 2. Load Blog Articles
    const storedArticles = localStorage.getItem('playstation_pos_blog_articles');
    if (storedArticles) {
      try {
        setBlogArticles(JSON.parse(storedArticles));
      } catch (e) {}
    }

    // 3. Load Dynamic CMS states
    const storedPkgs = localStorage.getItem('playstation_pos_packages_data');
    if (storedPkgs) {
      try { setEditPackages(JSON.parse(storedPkgs)); } catch (e) {}
    } else {
      setEditPackages(packages);
    }

    const storedIntPr = localStorage.getItem('playstation_pos_international_pricing');
    if (storedIntPr) {
      try { setEditIntPricing(JSON.parse(storedIntPr)); } catch (e) {}
    } else {
      setEditIntPricing(internationalPricing);
    }

    const storedLoc = localStorage.getItem('playstation_pos_localization_data');
    if (storedLoc) {
      try { setEditLocalizations(JSON.parse(storedLoc)); } catch (e) {}
    } else {
      setEditLocalizations(localizationData);
    }

    const DEFAULT_COUNTRIES = {
      egypt: { id: 'egypt', name: 'مصر', flag: '🇪🇬', currency: 'EGP', fullName: 'جنيه مصري', hourlyPrice: 20, hourlyCurrencyName: 'جنيه', rate: 1 },
      saudi: { id: 'saudi', name: 'السعودية', flag: '🇸🇦', currency: 'SAR', fullName: 'ريال سعودي', hourlyPrice: 10, hourlyCurrencyName: 'ريال', rate: 0.12 },
      uae: { id: 'uae', name: 'الإمارات', flag: '🇦🇪', currency: 'AED', fullName: 'درهم إماراتي', hourlyPrice: 10, hourlyCurrencyName: 'درهم', rate: 0.12 },
      qatar: { id: 'qatar', name: 'قطر', flag: '🇶🇦', currency: 'QAR', fullName: 'ريال قطري', hourlyPrice: 10, hourlyCurrencyName: 'ريال', rate: 0.12 },
      kuwait: { id: 'kuwait', name: 'الكويت', flag: '🇰🇼', currency: 'KWD', fullName: 'دينار كويتي', hourlyPrice: 1, hourlyCurrencyName: 'دينار', rate: 0.01 }
    };

    const storedCountries = localStorage.getItem('playstation_pos_countries_config');
    if (storedCountries) {
      try { setEditCountriesConfig(JSON.parse(storedCountries)); } catch (e) {}
    } else {
      setEditCountriesConfig(DEFAULT_COUNTRIES);
    }

    const storedCmsDefaults = localStorage.getItem('playstation_pos_cms_content');
    if (storedCmsDefaults) {
      try {
        const parsed = JSON.parse(storedCmsDefaults);
        setCalcDevicesDefault(parsed.calcDevicesDefault || 5);
        setCalcHoursDefault(parsed.calcHoursDefault || 8);
        setLeakRateDefault(parsed.leakRateDefault || 20);
      } catch (e) {}
    }
  }, []);

  // Save Landing Page CMS function
  const handleSaveLandingCms = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalVideoUrl = cmsVideo;
    if (heroVideoSourceType === 'upload') {
      if (localHeroVideoBase64) {
        const videoDbKey = 'media_vid_hero';
        await setMediaItem(videoDbKey, localHeroVideoBase64);
        finalVideoUrl = `db://${videoDbKey}`;
      }
    }
    let finalThumbnailUrl = cmsVideoThumbnail;
    if (heroThumbnailSourceType === 'upload') {
      if (localHeroThumbnailBase64) {
        const thumbDbKey = 'media_thumb_hero';
        await setMediaItem(thumbDbKey, localHeroThumbnailBase64);
        finalThumbnailUrl = `db://${thumbDbKey}`;
      }
    }
    let finalAuthImageUrl = cmsAuthImageUrl;
    if (authImgSourceType === 'upload') {
      if (localAuthImgBase64) {
        const authImgDbKey = 'media_auth_img';
        await setMediaItem(authImgDbKey, localAuthImgBase64);
        finalAuthImageUrl = `db://${authImgDbKey}`;
      }
    }
    let finalTrustCertImgUrl = cmsTrustCertImgUrl;
    if (trustCertImgSourceType === 'upload') {
      if (localTrustCertImgBase64) {
        const certImgDbKey = 'media_trust_cert_img';
        await setMediaItem(certImgDbKey, localTrustCertImgBase64);
        finalTrustCertImgUrl = `db://${certImgDbKey}`;
      }
    }
    let finalFounderImgUrl = cmsFounderImgUrl;
    if (founderImgSourceType === 'upload') {
      if (localFounderImgBase64) {
        const founderImgDbKey = 'media_founder_img';
        await setMediaItem(founderImgDbKey, localFounderImgBase64);
        finalFounderImgUrl = `db://${founderImgDbKey}`;
      }
    }
    const cmsPayload = {
      heroTag: cmsTag,
      heroTitlePrefix: cmsTitlePrefix,
      heroTitleHighlight: cmsTitleHighlight,
      heroDescription: cmsDescription,
      demoVideoUrl: finalVideoUrl,
      demoVideoThumbnailUrl: finalThumbnailUrl,
      contactPhone: cmsPhone,
      whatsappMessage: cmsWhatsapp,
      // Authority variables
      authTag: cmsAuthTag,
      authTitle: cmsAuthTitle,
      authDescription: cmsAuthDescription,
      authStat1Title: cmsAuthStat1Title,
      authStat1Desc: cmsAuthStat1Desc,
      authStat2Title: cmsAuthStat2Title,
      authStat2Desc: cmsAuthStat2Desc,
      authImageUrl: finalAuthImageUrl,
      
      // Trust Certificate settings
      trustCertShowMode: cmsTrustCertShowMode,
      trustCertImgUrl: finalTrustCertImgUrl,
      // Extended fields
      pricingTitle: cmsPricingTitle,
      pricingSubtitle: cmsPricingSubtitle,
      branchesTitle: cmsBranchesTitle,
      branchesText: cmsBranchesText,
      branchesBtnText: cmsBranchesBtnText,
      trialTitle: cmsTrialTitle,
      trialText: cmsTrialText,
      trialBtnText: cmsTrialBtnText,
      
      whyChooseTitle: cmsWhyChooseTitle,
      why1Title: cmsWhy1Title,
      why1Desc: cmsWhy1Desc,
      why2Title: cmsWhy2Title,
      why2Desc: cmsWhy2Desc,
      why3Title: cmsWhy3Title,
      why3Desc: cmsWhy3Desc,
      why4Title: cmsWhy4Title,
      why4Desc: cmsWhy4Desc,
      why5Title: cmsWhy5Title,
      why5Desc: cmsWhy5Desc,
      why6Title: cmsWhy6Title,
      why6Desc: cmsWhy6Desc,
      why7Title: cmsWhy7Title,
      why7Desc: cmsWhy7Desc,
      whyChooseFooterText: cmsWhyChooseFooterText,
      whyChooseFooterBtnText: cmsWhyChooseFooterBtnText,

      founderStorySubtitle: cmsFounderStorySubtitle,
      founderStoryTitle: cmsFounderStoryTitle,
      founderQuote: cmsFounderQuote,
      founderPara1: cmsFounderPara1,
      founderPara2: cmsFounderPara2,
      founderPara3: cmsFounderPara3,
      founderBtnText: cmsFounderBtnText,
      founderImgUrl: finalFounderImgUrl,
      founderName: cmsFounderName,
      founderRole: cmsFounderRole,
      founderExpTitle: cmsFounderExpTitle,
      founderExpDesc: cmsFounderExpDesc,

      aboutUsBadge: cmsAboutUsBadge,
      aboutUsTitle: cmsAboutUsTitle,
      aboutUsText1: cmsAboutUsText1,
      aboutUsText2: cmsAboutUsText2,
      aboutUsTag1: cmsAboutUsTag1,
      aboutUsTag2: cmsAboutUsTag2,
      aboutUsTag3: cmsAboutUsTag3,
      aboutUsBannerType: cmsAboutUsBannerType,
      aboutUsBannerText: cmsAboutUsBannerText,

      visionTitle: cmsVisionTitle,
      visionText: cmsVisionText,
      missionTitle: cmsMissionTitle,
      missionText: cmsMissionText,

      coreValuesTitle: cmsCoreValuesTitle,
      coreValuesSubtitle: cmsCoreValuesSubtitle,
      val1Title: cmsVal1Title,
      val1Desc: cmsVal1Desc,
      val2Title: cmsVal2Title,
      val2Desc: cmsVal2Desc,
      val3Title: cmsVal3Title,
      val3Desc: cmsVal3Desc,
      val4Title: cmsVal4Title,
      val4Desc: cmsVal4Desc,
      val5Title: cmsVal5Title,
      val5Desc: cmsVal5Desc
    };
    localStorage.setItem('playstation_pos_cms_content', JSON.stringify(cmsPayload));
    setCmsVideo(finalVideoUrl);
    setCmsVideoThumbnail(finalThumbnailUrl);
    setCmsAuthImageUrl(finalAuthImageUrl);
    setCmsTrustCertImgUrl(finalTrustCertImgUrl);
    
    // Dispatch custom event so parent can reload instantly
    window.dispatchEvent(new Event('cms-content-changed'));
    
    setCmsSaveSuccess(true);
    setTimeout(() => setCmsSaveSuccess(false), 3000);
  };

  const handleFounderImgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFounderImgFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const maxDim = 800; // Optimal size for high quality + low space
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75); // 0.75 JPEG compression yields great quality and tiny size (~30KB)
            setLocalFounderImgBase64(compressedBase64);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Local Offline AI SEO Generation handler
  const handleLocalAiGenerate = () => {
    setLocalAiGenerating(true);
    setLocalAiSuccess(false);
    
    setTimeout(() => {
      const topicData = LOCAL_SEO_AI_DATA[localAiTopic];
      if (topicData) {
        const countryLabel = selectedEditCountry === 'egypt' ? 'جمهورية مصر العربية' :
                             selectedEditCountry === 'saudi' ? 'المملكة العربية السعودية' :
                             selectedEditCountry === 'uae' ? 'دولة الإمارات العربية المتحدة' :
                             selectedEditCountry === 'qatar' ? 'دولة قطر' : 'دولة الكويت';
        
        let generatedContent = topicData.content(countryLabel);
        
        if (localAiTone === 'practical') {
          generatedContent = generatedContent.replace(/# /g, "# 🛠️ دليل عملي خطوة بخطوة: ")
                                             .replace(/## /g, "## 📌 خطوة عملية: ");
        } else if (localAiTone === 'comparative') {
          generatedContent = generatedContent.replace(/# /g, "# ⚖️ مقارنة تقنية وحلول بديلة: ")
                                             .replace(/## /g, "## 📊 جدول المقارنة والتحليل الفني: ");
        } else if (localAiTone === 'friendly') {
          generatedContent = generatedContent.replace(/# /g, "# 👋 كيف حالك يا صديقي؟ إليك دليلك البسيط لـ ")
                                             .replace(/## /g, "## 😊 نصيحة من القلب: ");
        }
        
        setArticleTitle(topicData.title);
        setArticleDescription(topicData.snippet);
        setArticleContent(generatedContent);
        setArticleCategory(topicData.category);
        setArticleTags(topicData.tags);
        setArticleSlug(topicData.title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)/g, ''));
      }
      setLocalAiGenerating(false);
      setLocalAiSuccess(true);
      setTimeout(() => setLocalAiSuccess(false), 4000);
    }, 1200);
  };

  // Blog management actions
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle || !articleContent || !articleDescription) {
      alert('الرجاء ملء العناوين وتفاصيل المقالة الأساسية!');
      return;
    }

    const calculatedReadTime = `${Math.max(2, Math.ceil(articleContent.split(/\s+/).length / 120))} دقائق`;
    const todayStr = new Date().toISOString().split('T')[0];
    const generatedSlug = articleSlug || articleTitle.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`;

    // Handle Image Saving to IndexedDB if it was uploaded
    let finalImage = articleImage;
    if (imageSourceType === 'upload') {
      if (localImageBase64) {
        const imageDbKey = `media_img_${generatedSlug}`;
        await setMediaItem(imageDbKey, localImageBase64);
        finalImage = `db://${imageDbKey}`;
      } else {
        finalImage = 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800';
      }
    }

    // Handle Video Saving to IndexedDB if it was uploaded
    let finalVideo = articleVideo;
    if (videoSourceType === 'upload') {
      if (localVideoBase64) {
        const videoDbKey = `media_vid_${generatedSlug}`;
        await setMediaItem(videoDbKey, localVideoBase64);
        finalVideo = `db://${videoDbKey}`;
      } else {
        finalVideo = '';
      }
    }

    const newArticle = {
      slug: generatedSlug,
      title: articleTitle,
      description: articleDescription,
      content: articleContent,
      date: todayStr,
      readTime: calculatedReadTime,
      author: articleAuthor,
      category: articleCategory,
      image: finalImage || 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
      video: finalVideo,
      tags: articleTags ? articleTags.split(',').map(t => t.trim()).filter(Boolean) : ['بلايستيشن', 'إدارة']
    };

    let updatedArticles = [];
    if (editingArticleSlug) {
      if (editingArticleSlug !== generatedSlug) {
        await removeMediaItem(`media_img_${editingArticleSlug}`);
        await removeMediaItem(`media_vid_${editingArticleSlug}`);
      }
      updatedArticles = blogArticles.map(a => a.slug === editingArticleSlug ? newArticle : a);
    } else {
      if (blogArticles.some(a => a.slug === generatedSlug)) {
        alert('رابط المقالة الفرعي مكرر، يرجى كتابة رابط فرعي فريد!');
        return;
      }
      updatedArticles = [newArticle, ...blogArticles];
    }

    setBlogArticles(updatedArticles);
    await saveCmsContentBatchToSupabase({
      playstation_pos_blog_articles: JSON.stringify(updatedArticles)
    });
    window.dispatchEvent(new Event('cms-content-changed'));
    
    // Clear state
    setIsEditingArticle(false);
    setEditingArticleSlug(null);
    clearArticleForm();
    alert('تم حفظ المقال بنجاح ونشره على المدونة!');
  };

  const handleEditArticle = (article: any) => {
    setEditingArticleSlug(article.slug);
    setArticleTitle(article.title);
    setArticleDescription(article.description);
    setArticleContent(article.content);
    setArticleCategory(article.category);
    setArticleImage(article.image?.startsWith('db://') ? '' : article.image);
    setArticleVideo(article.video?.startsWith('db://') ? '' : (article.video || ''));
    setArticleTags(article.tags?.join(', ') || '');
    setArticleAuthor(article.author);
    setArticleSlug(article.slug);
    setIsEditingArticle(true);

    // Load from IndexedDB if uploaded previously
    if (article.image?.startsWith('db://')) {
      setImageSourceType('upload');
      const key = article.image.replace('db://', '');
      getMediaItem(key).then(val => {
        if (val) {
          setLocalImageBase64(val);
          setImageFileName('ملف مرفوع مسبقاً');
        }
      });
    } else {
      setImageSourceType('url');
      setLocalImageBase64('');
      setImageFileName('');
    }

    if (article.video?.startsWith('db://')) {
      setVideoSourceType('upload');
      const key = article.video.replace('db://', '');
      getMediaItem(key).then(val => {
        if (val) {
          setLocalVideoBase64(val);
          setVideoFileName('ملف مرفوع مسبقاً');
        }
      });
    } else {
      setVideoSourceType('url');
      setLocalVideoBase64('');
      setVideoFileName('');
    }
  };

  const handleDeleteArticle = async (slug: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً من المدونة؟')) {
      const updated = blogArticles.filter(a => a.slug !== slug);
      setBlogArticles(updated);
      await saveCmsContentBatchToSupabase({
        playstation_pos_blog_articles: JSON.stringify(updated)
      });
      window.dispatchEvent(new Event('cms-content-changed'));
      await removeMediaItem(`media_img_${slug}`);
      await removeMediaItem(`media_vid_${slug}`);
    }
  };

  const clearArticleForm = () => {
    setArticleTitle('');
    setArticleDescription('');
    setArticleContent('');
    setArticleCategory('نصائح إدارية');
    setArticleImage('');
    setArticleVideo('');
    setArticleTags('');
    setArticleAuthor('المهندس إسلام عرفة');
    setArticleSlug('');
    setImageSourceType('url');
    setVideoSourceType('url');
    setLocalImageBase64('');
    setLocalVideoBase64('');
    setImageFileName('');
    setVideoFileName('');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if locked out
    if (lockoutTime && Date.now() < lockoutTime) {
      const remainingSeconds = Math.ceil((lockoutTime - Date.now()) / 1000);
      setAuthError(`❌ تم قفل محاولات الدخول مؤقتاً لحماية النظام! يرجى الانتظار ${remainingSeconds} ثانية.`);
      return;
    }

    const normalizedUser = adminUsername.trim().toLowerCase();
    const normalizedPass = adminPassword.trim();
    
    // Support strong customized cyber security credentials - Strictly private & secured
    if (normalizedUser === 'ideamakers_ceo' && normalizedPass === 'IM_SecureGate_2026_@_PS') {
      setIsAdmin(true);
      setAuthError('');
      setLoginAttempts(0);
      // Dispatch custom event to notify App.tsx
      window.dispatchEvent(new CustomEvent('admin-login-changed', { detail: { isAdmin: true } }));
    } else {
      const nextAttempts = loginAttempts + 1;
      setLoginAttempts(nextAttempts);
      if (nextAttempts >= 5) {
        const lockUntil = Date.now() + 3 * 60 * 1000; // 3 minutes lockout
        setLockoutTime(lockUntil);
        setAuthError('🚨 تم رصد محاولة اقتحام! تم حظر الإدخال وقفل لوحة التحكم لمدة 3 دقائق لحماية البيانات وسرية النظام.');
      } else {
        setAuthError(`❌ بيانات الدخول غير صحيحة! متبقي ${5 - nextAttempts} محاولات قبل إغلاق النظام وقفل لوحة التحكم لحمايتها.`);
      }
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    // Dispatch custom event to notify App.tsx
    window.dispatchEvent(new CustomEvent('admin-login-changed', { detail: { isAdmin: false } }));
  };
  
  // Form fields for editing/adding
  const [route, setRoute] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [h1, setH1] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [intent, setIntent] = useState('');
  const [pageType, setPageType] = useState<'بيع' | 'مشكلة' | 'مقارنة' | 'حل'>('بيع');
  const [businessGoal, setBusinessGoal] = useState('');
  const [customerJourney, setCustomerJourney] = useState('');
  const [awarenessStage, setAwarenessStage] = useState<SEOPage['awarenessStage']>('جاهز للشراء (High Intent)');
  const [cta, setCta] = useState('');
  const [internalRelationsStr, setInternalRelationsStr] = useState('');
  const [category, setCategory] = useState<SEOPage['category']>('services');

  // Load from local storage or set defaults
  useEffect(() => {
    const stored = localStorage.getItem('playstation_pos_site_architecture');
    if (stored) {
      try {
        setPages(JSON.parse(stored));
      } catch (e) {
        setPages(DEFAULT_SEO_PAGES);
      }
    } else {
      localStorage.setItem('playstation_pos_site_architecture', JSON.stringify(DEFAULT_SEO_PAGES));
      setPages(DEFAULT_SEO_PAGES);
    }
  }, []);

  const savePagesToStorage = (newPages: SEOPage[]) => {
    setPages(newPages);
    localStorage.setItem('playstation_pos_site_architecture', JSON.stringify(newPages));
  };

  const handlePageClick = (page: SEOPage) => {
    setSelectedPage(page);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!route || !seoTitle || !h1 || !metaDesc) {
      alert('الرجاء ملء الحقول الأساسية للنشر!');
      return;
    }

    const relationsArray = internalRelationsStr 
      ? internalRelationsStr.split(',').map(r => r.trim()).filter(Boolean) 
      : [];

    const pageData: SEOPage = {
      id: editingPageId || `custom-${Date.now()}`,
      category,
      route,
      seoTitle,
      h1,
      metaDesc,
      intent,
      pageType,
      businessGoal,
      customerJourney,
      awarenessStage,
      cta,
      internalRelations: relationsArray
    };

    let updatedPages: SEOPage[] = [];
    if (editingPageId) {
      updatedPages = pages.map(p => p.id === editingPageId ? pageData : p);
      alert('تم تعديل هيكل الصفحة بنجاح!');
    } else {
      // Check duplicate route
      if (pages.some(p => p.route === route)) {
        alert('مسار الصفحة (Route) مستخدم بالفعل، يرجى كتابة مسار فريد!');
        return;
      }
      updatedPages = [...pages, pageData];
      alert('تمت إضافة الصفحة الجديدة لهيكل الموقع بنجاح!');
    }

    savePagesToStorage(updatedPages);
    resetForm();
    setIsAddingPage(false);
    setEditingPageId(null);
  };

  const startEdit = (page: SEOPage, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPageId(page.id);
    setCategory(page.category);
    setRoute(page.route);
    setSeoTitle(page.seoTitle);
    setH1(page.h1);
    setMetaDesc(page.metaDesc);
    setIntent(page.intent);
    setPageType(page.pageType);
    setBusinessGoal(page.businessGoal);
    setCustomerJourney(page.customerJourney);
    setAwarenessStage(page.awarenessStage);
    setCta(page.cta);
    setInternalRelationsStr(page.internalRelations.join(', '));
    setIsAddingPage(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('هل أنت متأكد من حذف هذه الصفحة من هيكلية السيو؟')) {
      const updated = pages.filter(p => p.id !== id);
      savePagesToStorage(updated);
      if (selectedPage?.id === id) {
        setSelectedPage(null);
      }
      alert('تم حذف الصفحة بنجاح.');
    }
  };

  const handleResetToDefault = () => {
    if (confirm('هل ترغب حقاً في تصفير الهيكل واستعادة صفحات التخطيط الافتراضية؟')) {
      savePagesToStorage(DEFAULT_SEO_PAGES);
      setSelectedPage(null);
      alert('تمت استعادة الهيكل القياسي بنجاح.');
    }
  };

  const resetForm = () => {
    setRoute('');
    setSeoTitle('');
    setH1('');
    setMetaDesc('');
    setIntent('');
    setPageType('بيع');
    setBusinessGoal('');
    setCustomerJourney('');
    setAwarenessStage('جاهز للشراء (High Intent)');
    setCta('');
    setInternalRelationsStr('');
    setCategory('services');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ النص المختار إلى الحافظة بنجاح!');
  };

  // Filters
  const filteredPages = pages.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.seoTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.h1.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.route.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'home', label: 'الرئيسية (Home Page)' },
    { id: 'services', label: 'الخدمات (Services)' },
    { id: 'problems', label: 'المشاكل وعلاجها (Problems)' },
    { id: 'comparisons', label: 'المقارنات والبدائل (Comparisons)' },
    { id: 'countries', label: 'حسب الدول (Geographic)' },
    { id: 'usecases', label: 'حسب الاستخدام (Use Cases)' }
  ];

  // --- ADDITIONAL CMS HELPER ACTIONS ---
  const handleSaveAdditionalCms = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('playstation_pos_packages_data', JSON.stringify(editPackages));
    localStorage.setItem('playstation_pos_international_pricing', JSON.stringify(editIntPricing));
    localStorage.setItem('playstation_pos_localization_data', JSON.stringify(editLocalizations));
    localStorage.setItem('playstation_pos_countries_config', JSON.stringify(editCountriesConfig));
    
    // Also save calculator defaults to cms content
    const storedCms = localStorage.getItem('playstation_pos_cms_content');
    let cmsParsed: any = {};
    if (storedCms) {
      try { cmsParsed = JSON.parse(storedCms); } catch (e) {}
    }
    const newCms = {
      ...cmsParsed,
      calcDevicesDefault,
      calcHoursDefault,
      leakRateDefault
    };
    localStorage.setItem('playstation_pos_cms_content', JSON.stringify(newCms));

    // Dispatch events to notify App.tsx
    window.dispatchEvent(new CustomEvent('cms-content-changed'));
    window.dispatchEvent(new CustomEvent('countries-config-changed'));
    
    setAdditionalCmsSuccess(true);
    setTimeout(() => setAdditionalCmsSuccess(false), 4000);
    alert('✨ تم حفظ وتطبيق جميع التعديلات المتقدمة للموقع بالكامل! سيتم تطبيقها مباشرة لزوار بلدك والدول الأخرى.');
  };

  const handleAddTestimonial = async (countryId: string) => {
    if (!newTestName || !newTestQuote) {
      alert('الرجاء كتابة الاسم ورأي العميل!');
      return;
    }

    let finalImg = testImageLink;
    if (testImageSourceType === 'upload' && testLocalImgBase64) {
      const imgKey = `media_img_test_${Date.now()}`;
      await setMediaItem(imgKey, testLocalImgBase64);
      finalImg = `db://${imgKey}`;
    }

    const newTestimonial = {
      name: newTestName,
      role: newTestRole || 'صاحب صالة ألعاب',
      quote: newTestQuote,
      rating: newTestRating,
      image: finalImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };

    const updatedLocs = { ...editLocalizations };
    if (!updatedLocs[countryId]) {
      updatedLocs[countryId] = {};
    }
    if (!updatedLocs[countryId].testimonials) {
      updatedLocs[countryId].testimonials = [];
    }
    
    updatedLocs[countryId].testimonials = [newTestimonial, ...updatedLocs[countryId].testimonials];
    setEditLocalizations(updatedLocs);
    localStorage.setItem('playstation_pos_localization_data', JSON.stringify(updatedLocs));
    window.dispatchEvent(new Event('cms-content-changed'));

    // Clear form
    setNewTestName('');
    setNewTestRole('');
    setNewTestQuote('');
    setTestImageLink('');
    setTestLocalImgBase64('');
    setTestImgFileName('');
    setNewTestRating(5);

    alert('تمت إضافة الرأي بنجاح للبلد المحدد! 🎉 احرص على حفظ التغييرات لحفظها نهائياً.');
  };

  const handleDeleteTestimonial = (countryId: string, idx: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الرأي؟')) return;
    const updatedLocs = { ...editLocalizations };
    updatedLocs[countryId].testimonials = updatedLocs[countryId].testimonials.filter((_: any, i: number) => i !== idx);
    setEditLocalizations(updatedLocs);
    localStorage.setItem('playstation_pos_localization_data', JSON.stringify(updatedLocs));
    window.dispatchEvent(new Event('cms-content-changed'));
  };

  const handleAddFaq = (countryId: string) => {
    if (!newFaqQ || !newFaqA) {
      alert('الرجاء كتابة السؤال والجواب!');
      return;
    }

    const newFaqItem = {
      q: newFaqQ,
      a: newFaqA
    };

    const updatedLocs = { ...editLocalizations };
    if (!updatedLocs[countryId]) {
      updatedLocs[countryId] = {};
    }
    if (!updatedLocs[countryId].faqs) {
      updatedLocs[countryId].faqs = [];
    }

    updatedLocs[countryId].faqs = [...updatedLocs[countryId].faqs, newFaqItem];
    setEditLocalizations(updatedLocs);
    localStorage.setItem('playstation_pos_localization_data', JSON.stringify(updatedLocs));
    window.dispatchEvent(new Event('cms-content-changed'));

    setNewFaqQ('');
    setNewFaqA('');

    alert('تمت إضافة السؤال بنجاح للبلد المحدد! 🎉 احرص على حفظ التغييرات لحفظها نهائياً.');
  };

  const handleDeleteFaq = (countryId: string, idx: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) return;
    const updatedLocs = { ...editLocalizations };
    updatedLocs[countryId].faqs = updatedLocs[countryId].faqs.filter((_: any, i: number) => i !== idx);
    setEditLocalizations(updatedLocs);
    localStorage.setItem('playstation_pos_localization_data', JSON.stringify(updatedLocs));
    window.dispatchEvent(new Event('cms-content-changed'));
  };

  return (
    <div id="site-architecture-root" className="min-h-screen bg-[#030303] text-white pt-28 pb-20 relative px-4 sm:px-6 font-cairo text-right" style={{ direction: 'rtl' }}>
      {/* Dynamic Background Glows */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">

        {!isAdmin ? (
          /* --- ENCRYPTED ADMIN LOGIN INTERFACE --- */
          <div className="max-w-md mx-auto my-12 bg-[#0c0c0e]/80 border border-white/10 p-8 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden backdrop-blur-xl text-right">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />
            
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto text-primary border border-primary/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] mb-6">
                <Lock className="w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2 text-white">لوحة التحكم والتحرير المشفرة</h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-8">
                أهلاً بك مجدداً يا أدمن. يرجى تسجيل الدخول لتتمكن من التعديل الكامل على الصفحة الرئيسية وإضافة المقالات والصور والفيديوهات.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-5 relative z-10">
              {authError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-bold text-center">
                  {authError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">اسم مستخدم الإدارة (Username)</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="أدخل اسم مستخدم الإدارة المعين"
                    className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">كلمة المرور المشفرة (Password)</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور الإدارية"
                    className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:scale-[1.01]"
              >
                <Key className="w-4 h-4" />
                فك التشفير ودخول لوحة التحكم 🔐
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                type="button"
                onClick={onBackToLanding}
                className="text-xs text-gray-400 hover:text-white underline transition-colors"
              >
                العودة للرئيسية كزائر
              </button>
            </div>
          </div>
        ) : (
          /* --- AUTHENTICATED ADMIN DASHBOARD WORKSPACE --- */
          <>
            {/* Admin Header & Dynamic Navigation */}
            <div className="bg-[#0c0c0e]/90 border border-white/10 rounded-3xl p-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 blur-[50px] rounded-full" />
              
              <div className="flex items-center gap-4 relative z-10 text-right">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <Shield className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>لوحة التحكم الإدارية</span>
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">نشط ومتصل بالكامل 🌐</span>
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">المطور: المهندس إسلام عرفة | تحكم كامل في صفحات الموقع ومحتواها</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 relative z-10">
                <button
                  type="button"
                  onClick={onBackToLanding}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 ml-1" />
                  زيارة الموقع المباشر
                </button>
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  تسجيل خروج الأدمن
                </button>
              </div>
            </div>

            {/* MAIN DASHBOARD TABS */}
            <div className="flex flex-wrap items-center gap-2 bg-black/30 p-2 rounded-2xl border border-white/5 mb-10">
              <button
                type="button"
                onClick={() => setAdminTab('architecture')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  adminTab === 'architecture' ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Map className="w-4 h-4" />
                🗺️ هيكلية السيو والعناقيد (SEO Strategy)
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('blueprint')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  adminTab === 'blueprint' ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Compass className="w-4 h-4" />
                🎯 هيكل أهداف الصفحة الرئيسية (Page Blueprint)
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('landing_cms')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  adminTab === 'landing_cms' ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layout className="w-4 h-4" />
                ✍️ محتوى الصفحة الرئيسية (Hero & Video)
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('blog_cms')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  adminTab === 'blog_cms' ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                📰 إدارة مقالات المدونة (Blog Content)
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('additional_cms')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  adminTab === 'additional_cms' ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                💎 الأسعار والآراء والأسئلة الشائعة (Advanced CMS)
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('topical_authority')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  adminTab === 'topical_authority' ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                🏆 سلطة المحتوى الكاملة (Topical Authority)
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('enterprise_cms')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border border-primary/30 relative overflow-hidden ${
                  adminTab === 'enterprise_cms' ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-xl shadow-primary/25' : 'bg-primary/5 text-primary hover:text-white hover:bg-primary/10'
                }`}
              >
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                <Shield className="w-4 h-4 text-rose-400" />
                <span>🏢 نظام الـ Enterprise CMS الشامل</span>
              </button>
            </div>

            {/* TAB CONTENT 1: SEO ARCHITECTURE */}
            {adminTab === 'architecture' && (
              <>
                {/* Header and Back Button */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl sm:text-5xl font-black mb-3 text-right flex items-center gap-3">
                      <span className="text-gradient">هيكل موقع صالات البلايستيشن</span>
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-right max-w-3xl">
                      لوحة تخطيط السيو وهيكلية الموقع الشاملة (Sitemap & Content Hub). صممت هذه المنظومة هندسياً لتحقيق أعلى معدلات تصدر بمحركات البحث وضمان تحويل العميل المحتمل (Conversion-focused SEO Strategy).
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingPage(!isAddingPage);
                        setEditingPageId(null);
                        resetForm();
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-primary/20 transition-all"
                    >
                      {isAddingPage ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      {isAddingPage ? 'إلغاء التخطيط' : 'إضافة صفحة جديدة للهيكل'}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                      title="تفريغ التعديلات واستعادة الهيكل القياسي"
                    >
                      <RotateCcw className="w-4 h-4" />
                      استعادة الافتراضي
                    </button>
                  </div>
                </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl text-right">
            <div className="text-xs text-gray-400 mb-1">إجمالي صفحات الهيكل</div>
            <div className="text-2xl sm:text-3xl font-black text-primary">{pages.length}</div>
            <div className="text-[10px] text-gray-500 mt-1">موزعة على كافة قنوات السيو</div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl text-right">
            <div className="text-xs text-gray-400 mb-1">نسبة صفحات التحويل المباشر</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {Math.round((pages.filter(p => p.pageType === 'بيع' || p.pageType === 'حل').length / pages.length) * 100)}%
            </div>
            <div className="text-[10px] text-gray-500 mt-1">صفحات هبوط ذات نية شراء عالية</div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl text-right">
            <div className="text-xs text-gray-400 mb-1">تغطية المشاكل التقنية</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {pages.filter(p => p.category === 'problems').length} صفحات
            </div>
            <div className="text-[10px] text-gray-500 mt-1">لاجتذاب العميل من مرحلة الألم</div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl text-right">
            <div className="text-xs text-gray-400 mb-1">الاستهداف الجغرافي والدولي</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">
              {pages.filter(p => p.category === 'countries').length} أسواق
            </div>
            <div className="text-[10px] text-gray-500 mt-1">مصر، السعودية، والخليج العربي</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ADD OR EDIT FORM PANEL */}
          {isAddingPage && (
            <motion.div
              initial={isMobile ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={isMobile ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 mb-10 overflow-hidden text-right"
            >
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 justify-start border-r-4 border-primary pr-3">
                {editingPageId ? 'تعديل بيانات صفحة الهيكل الحالية' : 'إضافة صفحة مخطط سيو وتصدّر جديدة'}
              </h3>

              <form onSubmit={handleSavePage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">تصنيف الصفحة بالهيكل *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as SEOPage['category'])}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    >
                      <option value="home">الرئيسية (Home Page)</option>
                      <option value="services">الخدمات والميزات (Services)</option>
                      <option value="problems">المشاكل والألم (Problems)</option>
                      <option value="comparisons">المقارنات والبدائل (Comparisons)</option>
                      <option value="countries">الاستهداف الجغرافي (Countries)</option>
                      <option value="usecases">حالات الاستخدام (Use Cases)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">رابط الصفحة المتوقع (Route) *</label>
                    <input
                      type="text"
                      required
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      placeholder="مثال: /services/billing-system"
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left dir-ltr text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">نوع الصفحة المستهدف *</label>
                    <select
                      value={pageType}
                      onChange={(e) => setPageType(e.target.value as SEOPage['pageType'])}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    >
                      <option value="بيع">صفحة بيع مباشرة (Sales Page)</option>
                      <option value="حل">صفحة شرح حل (Solution Page)</option>
                      <option value="مشكلة">صفحة كشف مشكلة وعلاجها (Problem Page)</option>
                      <option value="مقارنة">صفحة مقارنة بدائل (Comparison Page)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">عنوان SEO القوي (SEO Title) *</label>
                    <input
                      type="text"
                      required
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="اكتب عنواناً يتضمن الكلمات المفتاحية ويحفز على النقرة..."
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">عنوان H1 الجذاب المثير للاهتمام *</label>
                    <input
                      type="text"
                      required
                      value={h1}
                      onChange={(e) => setH1(e.target.value)}
                      placeholder="العنوان الرئيسي الأول داخل الصفحة لاقناع العميل على الفور..."
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">وصف Meta الجذاب (Meta Description) *</label>
                  <textarea
                    required
                    rows={2}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    placeholder="اكتب ملخص سيو ممتاز بين 120 إلى 160 حرف لتشجيع الباحثين على جوجل على زيارتك..."
                    className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">نية الصفحة (Search Intent)</label>
                    <input
                      type="text"
                      value={intent}
                      onChange={(e) => setIntent(e.target.value)}
                      placeholder="مثال: نية تجارية واستقصائية"
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">مستوى الوعي المستهدف (Awareness)</label>
                    <select
                      value={awarenessStage}
                      onChange={(e) => setAwarenessStage(e.target.value as SEOPage['awarenessStage'])}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    >
                      <option value="جاهز للشراء (High Intent)">جاهز للشراء (High Intent)</option>
                      <option value="يبحث ويقارن (Evaluation)">يبحث ويقارن (Evaluation)</option>
                      <option value="واعي بالمشكلة (Problem Aware)">واعي بالمشكلة (Problem Aware)</option>
                      <option value="غير واعي بالحل (Unaware)">غير واعي بالحل (Unaware)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">عبارة الـ CTA الأساسية المقترحة</label>
                    <input
                      type="text"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                      placeholder="مثال: احصل على نسختك التجريبية المجانية"
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">الهدف التجاري الأساسي للتحويل</label>
                    <input
                      type="text"
                      value={businessGoal}
                      onChange={(e) => setBusinessGoal(e.target.value)}
                      placeholder="ما الإجراء المالي أو التسويقي المطلوب من الزائر؟"
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">دور الصفحة في رحلة العميل</label>
                    <input
                      type="text"
                      value={customerJourney}
                      onChange={(e) => setCustomerJourney(e.target.value)}
                      placeholder="كيف تؤثر الصفحة في قرار العميل النفسي والمالي؟"
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">الروابط الداخلية والعلاقات (مفصولة بفاصلة ,)</label>
                  <input
                    type="text"
                    value={internalRelationsStr}
                    onChange={(e) => setInternalRelationsStr(e.target.value)}
                    placeholder="مثال: يرتبط بالرئيسية, يتكامل مع حاسبة البوفيه, يغذي صفحة الكاشير"
                    className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Save className="w-4.5 h-4.5" />
                    {editingPageId ? 'حفظ تعديلات الصفحة' : 'إضافة الصفحة للهيكل'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingPage(false);
                      setEditingPageId(null);
                      resetForm();
                    }}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 px-5 py-3 rounded-xl text-sm font-bold transition-colors"
                  >
                    إلغاء التعديل
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTROLS BAR: Filter, Search, and Display mode */}
        <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-6 rounded-3xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* View Modes */}
          <div className="flex flex-wrap items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5">
            <button
              onClick={() => setViewMode('knowledge-graph')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'knowledge-graph' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              الرسم البياني للمعرفة (Semantic Graph) 🧠
            </button>
            <button
              onClick={() => setViewMode('clusters')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'clusters' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              عناقيد المحتوى (Clusters) 🗺️
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'cards' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              مخطط البطاقات
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'tree' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              الخريطة الشجرية
            </button>
            <button
              onClick={() => setViewMode('cro-view')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'cro-view' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              الوضع التجاري (CRO)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="ابحث عن صفحة بمسار أو عنوان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-xs focus:outline-none focus:border-primary/50 text-right text-white"
            />
            <Search className="w-4 h-4 text-gray-500 absolute top-3 right-3" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedPage(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'bg-white/[0.03] text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INTERACTIVE CONTENT ZONE */}
          <div className="lg:col-span-7 space-y-6">
            
            <AnimatePresence mode="wait">
              
              {/* VIEW MODE 1: CARDS VIEW */}
              {viewMode === 'cards' && (
                <motion.div
                  key="cards-grid"
                  initial={isMobile ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {filteredPages.length > 0 ? (
                    filteredPages.map((page) => (
                      <div
                        key={page.id}
                        onClick={() => handlePageClick(page)}
                        className={`p-5 rounded-2xl border text-right cursor-pointer transition-all duration-300 relative group ${
                          selectedPage?.id === page.id 
                            ? 'bg-primary/10 border-primary shadow-xl shadow-primary/5' 
                            : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                        }`}
                      >
                        {/* Page Type Badge */}
                        <div className="absolute top-4 left-4 flex gap-2 items-center">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                            page.pageType === 'بيع' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            page.pageType === 'حل' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            page.pageType === 'مشكلة' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {page.pageType}
                          </span>
                          
                          {/* Edit / Delete overlay icons on hover */}
                          <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                            <button
                              onClick={(e) => startEdit(page, e)}
                              className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-primary rounded"
                              title="تعديل الصفحة"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(page.id, e)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded"
                              title="حذف الصفحة"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-[10px] text-gray-500 font-mono mb-2">{page.route}</div>
                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors mb-2 ml-16 leading-snug">
                          {page.h1}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {page.seoTitle}
                        </p>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-[11px] text-gray-500">
                          <span className="flex items-center gap-1">
                            <Target className="w-3.5 h-3.5 text-primary" />
                            {page.awarenessStage}
                          </span>
                          <span className="flex items-center gap-1 text-gray-400 group-hover:text-primary transition-colors">
                            تفاصيل هندسة السيو
                            <ChevronLeft className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">لا توجد صفحات مطابقة لبحثك في هذا القسم.</div>
                  )}
                </motion.div>
              )}

              {/* VIEW MODE 2: VISUAL TREE VIEW MAP */}
              {viewMode === 'tree' && (
                <motion.div
                  key="tree-view"
                  initial={isMobile ? false : { opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={isMobile ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                  className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 relative overflow-hidden"
                >
                  <p className="text-xs text-gray-400 mb-6 text-right flex items-center justify-start gap-1">
                    <Compass className="w-4 h-4 text-primary" />
                    خريطة تدفق السيو والربط الداخلي (Internal Link Architecture) - انقر على العقد للتفاصيل:
                  </p>

                  <div className="space-y-8 relative">
                    {/* Visual Connector lines simulator using border */}
                    <div className="absolute right-[28px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-emerald-500 opacity-20 pointer-events-none" />

                    {/* Node 1: Home Page (Core) */}
                    <div className="relative pr-12">
                      <div className="absolute right-4 top-2.5 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-black" />
                      </div>
                      <div 
                        onClick={() => handlePageClick(pages.find(p => p.category === 'home') || pages[0])}
                        className="bg-primary/10 border border-primary/30 p-4 rounded-xl cursor-pointer hover:bg-primary/20 transition-all text-right"
                      >
                        <div className="text-[10px] text-primary font-bold font-mono">الصفحة الأساسية (Core Pillar)</div>
                        <div className="text-sm font-black text-white mt-0.5">الصفحة الرئيسية للاستحواذ وبناء الثقة</div>
                        <div className="text-[11px] text-gray-400 mt-1">/ (الجمهور: جاهز للشراء)</div>
                      </div>
                    </div>

                    {/* Node Group 2: Services / Solution Pages */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-gray-400 mr-12 text-right">صفحات الخدمات المتخصصة (توجيه وتلبية الرغبات)</div>
                      {pages.filter(p => p.category === 'services').map(p => (
                        <div key={p.id} className="relative pr-12">
                          <div className="absolute right-5 top-4 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-purple-500/20" />
                          <div 
                            onClick={() => handlePageClick(p)}
                            className="bg-white/[0.02] border border-white/10 hover:border-purple-500/30 p-3 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-all text-right"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-purple-400 font-bold">صفحة حل وتفصيل</span>
                              <span className="text-[10px] text-gray-500 font-mono">{p.route}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-300 mt-1">{p.h1}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Node Group 3: Problem Solver Pages */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-gray-400 mr-12 text-right">صفحات اجتذاب العميل من الألم والمشاكل</div>
                      {pages.filter(p => p.category === 'problems').map(p => (
                        <div key={p.id} className="relative pr-12">
                          <div className="absolute right-5 top-4 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-amber-500/20" />
                          <div 
                            onClick={() => handlePageClick(p)}
                            className="bg-white/[0.02] border border-white/10 hover:border-amber-500/30 p-3 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-all text-right"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-amber-400 font-bold">صفحة مشكلة عاجلة</span>
                              <span className="text-[10px] text-gray-500 font-mono">{p.route}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-300 mt-1">{p.h1}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Node Group 4: Comparisons Pages */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-gray-400 mr-12 text-right">صفحات المفاضلة والمقارنة (القرار النهائي)</div>
                      {pages.filter(p => p.category === 'comparisons').map(p => (
                        <div key={p.id} className="relative pr-12">
                          <div className="absolute right-5 top-4 w-2 h-2 rounded-full bg-red-500 ring-2 ring-red-500/20" />
                          <div 
                            onClick={() => handlePageClick(p)}
                            className="bg-white/[0.02] border border-white/10 hover:border-red-500/30 p-3 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-all text-right"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-red-400 font-bold">صفحة مقارنة وتوفير</span>
                              <span className="text-[10px] text-gray-500 font-mono">{p.route}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-300 mt-1">{p.h1}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Node Group 5: Countries & Use Cases */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-gray-400 mr-12 text-right">صفحات الهبوط المخصصة (حسب البلد والاستخدام)</div>
                      {pages.filter(p => p.category === 'countries' || p.category === 'usecases').map(p => (
                        <div key={p.id} className="relative pr-12">
                          <div className="absolute right-5 top-4 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                          <div 
                            onClick={() => handlePageClick(p)}
                            className="bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 p-3 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-all text-right"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-emerald-400 font-bold">
                                {p.category === 'countries' ? 'استهداف جغرافي' : 'استخدام متخصّص'}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">{p.route}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-300 mt-1">{p.h1}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* VIEW MODE 3: CRO / BUSINESS FOCUS VIEW */}
              {viewMode === 'cro-view' && (
                <motion.div
                  key="cro-view"
                  initial={isMobile ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6 text-right"
                >
                  <p className="text-xs text-gray-400 flex items-center justify-start gap-1">
                    <Target className="w-4 h-4 text-primary" />
                    هندسة التحويل وبناء الأهداف التجارية (CRO & Customer Journey Roadmap):
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPages.map(page => (
                      <div
                        key={page.id}
                        onClick={() => handlePageClick(page)}
                        className={`p-5 rounded-2xl border bg-gradient-to-b from-white/[0.01] to-transparent cursor-pointer transition-all ${
                          selectedPage?.id === page.id ? 'border-primary shadow-lg ring-1 ring-primary/20' : 'border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                          <span className="text-[10px] text-gray-500 font-mono">{page.route}</span>
                          <span className="text-xs font-bold text-primary flex items-center gap-1">
                            <Activity className="w-3.5 h-3.5" />
                            {page.awarenessStage}
                          </span>
                        </div>

                        <h5 className="font-bold text-white text-sm mb-3">{page.h1}</h5>

                        <div className="space-y-2 text-xs">
                          <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                            <span className="text-gray-400 block font-semibold mb-0.5">الهدف التجاري للشركة:</span>
                            <span className="text-gray-300 leading-relaxed font-light">{page.businessGoal}</span>
                          </div>
                          
                          <div className="bg-primary/5 p-2.5 rounded-lg border border-primary/5">
                            <span className="text-primary block font-semibold mb-0.5">الـ CTA المقترح (التحويل):</span>
                            <span className="text-white font-medium">{page.cta}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* VIEW MODE 4: CONTENT CLUSTERS (عناقيد المحتوى لبناء Topical Authority) */}
              {viewMode === 'clusters' && (
                <motion.div
                  key="clusters-view"
                  initial={isMobile ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-8 text-right font-sans"
                >
                  <div className="bg-gradient-to-l from-primary/10 via-transparent to-transparent p-5 rounded-3xl border border-primary/20">
                    <h3 className="text-lg font-bold text-white flex items-center justify-start gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      عناقيد المحتوى لبناء السلطة الموضوعية (Topical Authority)
                    </h3>
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed font-light">
                      الاستراتيجية الذهبية لتصدّر نتائج البحث لعام 2026. بدلاً من نشر مقالات عشوائية، نقسم الموقع لعناقيد موضوعية مترابطة داخلياً تستهدف نية البحث للزبون وتقنع Google بأن الموقع هو المرجع الأول والأشمل في إدارة صالات البلايستيشن.
                    </p>
                  </div>

                  {/* 1. Cluster Selector Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                    {DEFAULT_CLUSTERS.map((cl) => {
                      const isSelected = selectedClusterId === cl.id;
                      return (
                        <div
                          key={cl.id}
                          onClick={() => setSelectedClusterId(cl.id)}
                          className={`p-5 rounded-2xl border text-right cursor-pointer transition-all duration-300 relative ${
                            isSelected 
                              ? 'bg-primary/10 border-primary shadow-xl shadow-primary/5' 
                              : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400'}`}>
                              {cl.iconName === 'Shield' && <Shield className="w-5 h-5" />}
                              {cl.iconName === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                              {cl.iconName === 'Cpu' && <Cpu className="w-5 h-5" />}
                            </div>
                            <h4 className="font-bold text-sm text-white">{cl.name.split('. ')[1]}</h4>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-light mb-4">
                            {cl.description}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-white/5">
                            <span>5 مقالات مترابطة</span>
                            <span className={isSelected ? 'text-primary font-bold' : ''}>نشط الآن</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Cluster Workspace */}
                  {(() => {
                    const currentCluster = DEFAULT_CLUSTERS.find(c => c.id === selectedClusterId);
                    if (!currentCluster) return null;
                    const pillarPage = currentCluster.items.find(item => item.type === 'pillar');
                    const supportItems = currentCluster.items.filter(item => item.type !== 'pillar');

                    return (
                      <div className="space-y-6">
                        {/* Goal & Description of the current cluster */}
                        <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-2">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-xs text-gray-400 font-bold">هدف العنقود الموضوعي:</span>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                              سلطة الأرشفة الفائقة
                            </span>
                          </div>
                          <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                            🎯 {currentCluster.objective}
                          </p>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            {currentCluster.description}
                          </p>
                        </div>

                        {/* Node map container */}
                        <div className="relative p-6 bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
                          
                          {/* Background Glow */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                          {/* 1. Pillar Page Card (Centered, Golden glow) */}
                          {pillarPage && (
                            <div className="flex flex-col items-center justify-center mb-10 relative z-10">
                              <div className="bg-gradient-to-b from-[#1c1c1c] to-[#121212] p-6 rounded-2xl border-2 border-amber-500/50 shadow-2xl shadow-amber-500/5 max-w-xl text-center w-full relative">
                                <span className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-[9px] px-2.5 py-0.5 rounded-full shadow-lg">
                                  PILLAR PAGE | الصفحة الأساسية
                                </span>
                                
                                <h4 className="font-extrabold text-white text-base mt-2 mb-3 leading-snug">
                                  {pillarPage.title}
                                </h4>
                                
                                <div className="grid grid-cols-2 gap-3 text-right bg-black/30 p-3 rounded-xl border border-white/5 text-xs mb-4">
                                  <div>
                                    <span className="text-[10px] text-amber-500 block">الكلمة المفتاحية المستهدفة:</span>
                                    <span className="font-mono font-medium text-gray-300">{pillarPage.keyword}</span>
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-amber-500 block">نية البحث للزبون:</span>
                                    <span className="font-bold text-white">{pillarPage.intent}</span>
                                  </div>
                                </div>
                                
                                <p className="text-xs text-gray-400 leading-relaxed font-light">
                                  {pillarPage.description}
                                </p>

                                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
                                    الربط الداخلي: توجه قيمة الأرشفة وتدعم الصفحة الرئيسية
                                  </span>
                                  <span className="text-amber-500 font-bold">تصب في: {pillarPage.internalLinksTo.join(', ')}</span>
                                </div>
                              </div>

                              {/* Central Link Indicator */}
                              <div className="h-10 w-0.5 bg-gradient-to-b from-amber-500/50 to-primary/40 relative">
                                <div className="absolute bottom-0 -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping" />
                              </div>
                            </div>
                          )}

                          {/* 2. Supporting Pages (Row Grid pointing up) */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                            {supportItems.map((item, idx) => {
                              let typeLabel = '';
                              let typeColor = '';
                              if (item.type === 'supporting') {
                                typeLabel = 'مقالة داعمة معلوماتية';
                                typeColor = 'from-blue-500 to-indigo-600';
                              } else if (item.type === 'problem') {
                                typeLabel = 'مقالة علاج مشكلة';
                                typeColor = 'from-red-500 to-rose-600';
                              } else if (item.type === 'comparison') {
                                typeLabel = 'مقالة مقارنة فنية';
                                typeColor = 'from-purple-500 to-pink-600';
                              }

                              return (
                                <div
                                  key={idx}
                                  className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-4.5 rounded-xl flex flex-col justify-between transition-all group hover:bg-white/[0.03]"
                                >
                                  <div>
                                    <span className={`inline-block text-[9px] font-black text-white bg-gradient-to-r ${typeColor} px-2 py-0.5 rounded mb-3`}>
                                      {typeLabel}
                                    </span>
                                    
                                    <h5 className="font-bold text-white text-xs leading-snug mb-3 min-h-[36px] group-hover:text-primary transition-colors">
                                      {item.title}
                                    </h5>
                                    
                                    <div className="space-y-1.5 text-[11px] border-t border-white/5 pt-2.5 mb-3">
                                      <div>
                                        <span className="text-[9px] text-gray-500 block">الكلمة المستهدفة:</span>
                                        <span className="font-mono text-gray-300 font-medium block leading-tight">{item.keyword}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-gray-500 block">نية البحث:</span>
                                        <span className="text-gray-300 leading-none">{item.intent}</span>
                                      </div>
                                    </div>
                                    
                                    <p className="text-[11px] text-gray-400 leading-relaxed font-light mb-3">
                                      {item.description}
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                                    <span className="flex items-center gap-1 font-mono">
                                      <Network className="w-3 h-3 text-primary" />
                                      PageRank 🧃
                                    </span>
                                    <span className="text-primary font-bold">تغذي: {item.internalLinksTo[0]}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                        </div>

                        {/* Interactive Auditor Simulation Panel */}
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-4">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                              <h4 className="font-bold text-white text-sm flex items-center gap-1.5 justify-start">
                                <Compass className="w-4.5 h-4.5 text-primary" />
                                أداة محاكاة فحص سلطة الأرشفة والربط (Topical Authority Auditor)
                              </h4>
                              <p className="text-xs text-gray-400 mt-1 font-light">
                                افحص بنية هذا العنقود موضوعياً لترى كيف تتعامل زواحف جوجل مع الروابط الداخلية لبناء أرشفة فائقة.
                              </p>
                            </div>
                            
                            <button
                              onClick={triggerAuditSimulation}
                              disabled={isSimulatingAudit}
                              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                                isSimulatingAudit 
                                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                  : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-95'
                              }`}
                            >
                              {isSimulatingAudit ? (
                                <>
                                  <RotateCcw className="w-4 h-4 animate-spin" />
                                  جاري الفحص الميداني...
                                </>
                              ) : (
                                <>
                                  <Activity className="w-4 h-4 animate-pulse" />
                                  ابدأ المحاكاة البرمجية
                                </>
                              )}
                            </button>
                          </div>

                          {/* Audit score indicator with progress bar */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 border-t border-white/5 items-center">
                            <div className="md:col-span-4 bg-black/20 p-4 rounded-xl border border-white/5 text-center space-y-1">
                              <span className="text-[10px] text-gray-400 block">معدل السلطة للموقع (Topical Authority):</span>
                              <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl font-black text-primary font-mono">{authorityScore.toFixed(1)}%</span>
                                <span className="text-xs text-emerald-400 font-bold">ممتاز جداً</span>
                              </div>
                            </div>

                            <div className="md:col-span-8 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">مستوى تماسك العنقود (Semantic Cohesion)</span>
                                <span className="font-bold text-white font-mono">{Math.round(authorityScore)}%</span>
                              </div>
                              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                                  animate={{ width: `${authorityScore}%` }}
                                  transition={{ duration: 0.2 }}
                                />
                              </div>
                              <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                                * يتطلب جوجل تغطية كافة النيات الفرعية (الحلول، المشكلات، المقارنات) قبل اعتبار الدومين خبيراً في قطاع صالات الألعاب.
                              </p>
                            </div>
                          </div>

                          {/* Interactive terminal logs for simulation */}
                          {(auditLogs.length > 0 || isSimulatingAudit) && (
                            <div className="bg-[#0c0c0c] p-4.5 rounded-2xl border border-white/10 font-mono text-xs text-right space-y-2 text-gray-300 max-h-60 overflow-y-auto scrollbar-none shadow-inner">
                              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-gray-500 text-[10px]">
                                <span>TERMINAL_OUTPUT://googlebot_crawler.log</span>
                                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                              </div>
                              {auditLogs.map((log, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={isMobile ? false : { opacity: 0, x: 5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.1 }}
                                  className={`leading-relaxed ${idx === auditLogs.length - 1 ? 'text-primary font-bold' : ''}`}
                                >
                                  {log}
                                </motion.div>
                              ))}
                              {isSimulatingAudit && (
                                <div className="text-gray-500 italic animate-pulse">جاري جمع وتحليل الكلمات المفتاحية...</div>
                              )}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })()}
                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* RIGHT: REAL-TIME SEARCH ENGINE PREVIEW & PAGE INSPECTOR */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 text-right">
              
              {selectedPage ? (
                <div className="space-y-6">
                  
                  {/* Title and Route indicator */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-black text-primary px-3 py-1 bg-primary/10 rounded-full">
                      مستكشف الصفحة بالتفصيل
                    </span>
                    <button 
                      onClick={() => setSelectedPage(null)}
                      className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                    >
                      إغلاق
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 1. Mock Google Search Result Preview (Masterclass Delight) */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      معاينة مظهر الصفحة في نتائج بحث جوجل (Google SERP):
                    </h5>
                    
                    <div className="bg-[#171717] p-5 rounded-2xl border border-white/10 font-sans text-right dir-rtl">
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1 leading-none">
                        <span>موقع صُنّاع الفكرة</span>
                        <span className="text-gray-500">›</span>
                        <span className="font-mono text-gray-400 select-all">{selectedPage.route}</span>
                      </div>
                      <h4 className="text-lg text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug line-clamp-2 select-all">
                        {selectedPage.seoTitle}
                      </h4>
                      <p className="text-xs text-[#bdc1c6] mt-1.5 leading-relaxed font-light select-all">
                        {selectedPage.metaDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(`العنوان: ${selectedPage.seoTitle}\nالوصف: ${selectedPage.metaDesc}`)}
                      className="mt-2.5 w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      نسخ تفاصيل السيو للكاتب/المبرمج
                    </button>
                  </div>

                  {/* 2. Core Structure Specs */}
                  <div className="space-y-4 pt-2 border-t border-white/5">
                    
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">الرأس الرئيسي H1 داخل الصفحة:</span>
                      <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-sm font-bold text-white relative">
                        <span className="absolute top-1.5 left-2.5 text-[9px] text-primary font-mono font-bold">H1 TAG</span>
                        <p className="pl-12">{selectedPage.h1}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                        <span className="text-[10px] text-gray-400 block mb-1">نية البحث المستهدفة:</span>
                        <span className="text-xs font-bold text-gray-200">{selectedPage.intent}</span>
                      </div>
                      <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                        <span className="text-[10px] text-gray-400 block mb-1">نوع الصفحة الإنشائي:</span>
                        <span className="text-xs font-bold text-primary flex items-center gap-1 justify-end">
                          <Layout className="w-3.5 h-3.5" />
                          صفحة {selectedPage.pageType}
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-1">الهدف التجاري ومعدل التحويل (Goal):</span>
                      <p className="text-xs font-light leading-relaxed text-gray-300">
                        {selectedPage.businessGoal}
                      </p>
                    </div>

                    <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-1">مستوى الوعي المستهدف في القمع (Stage):</span>
                      <p className="text-xs font-medium text-emerald-400 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {selectedPage.awarenessStage}
                      </p>
                    </div>

                    <div className="bg-primary/10 p-3.5 rounded-xl border border-primary/20">
                      <span className="text-[10px] text-primary block mb-1 font-bold">الـ CTA المناسب (مغناطيس التحويل):</span>
                      <p className="text-xs font-bold text-white">
                        {selectedPage.cta}
                      </p>
                    </div>

                    {/* Internal Relations */}
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1.5">خارطة الربط الهيكلي (Internal Links Schema):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPage.internalRelations.length > 0 ? (
                          selectedPage.internalRelations.map((rel, idx) => (
                            <span 
                              key={idx} 
                              className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-gray-300 flex items-center gap-1"
                            >
                              <Network className="w-2.5 h-2.5 text-purple-400" />
                              {rel}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">لا توجد روابط مخصصة. ترتبط بالعموم بالصفحة الرئيسية.</span>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                /* EMPTY STATE / LANDING OF DETAILED EXPLAINER */
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <Map className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">مستكشف معلمات التصدّر والسيو</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
                      انقر على أي صفحة من القائمة الجانبية لعرض المخطط الكامل لـ SEO، ونوع نية البحث، وهيكلية الرأس H1 والهدف التجاري، بالإضافة لمعاينة فورية على جوجل.
                    </p>
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl text-right text-xs text-gray-400 leading-relaxed font-light space-y-2">
                    <div className="font-bold text-white mb-2 text-center border-b border-white/5 pb-1.5">قوانين التصدّر الفعلي لعام 2026:</div>
                    <p>1. **نية العميل أولاً**: جوجل لم تعد تبحث عن الكلمات المفتاحية المكررة، بل عن مدى مطابقة الصفحة لنية البحث الحقيقية للزبون.</p>
                    <p>2. **قمع الوعي المتكامل**: استهداف الزبائن في جميع المراحل (من لديهم ألم، من يقارنون، من هم مستعدون للشراء فوراً).</p>
                    <p>3. **ربط داخلي صارم**: ترابط الصفحات يعزز من قوة ومصداقية الموقع أمام زواحف الأرشفة (Domain Authority).</p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

            {/* End of adminTab === 'architecture' block */}
            </>
          )}

          {/* TAB CONTENT 1.5: LANDING PAGE STRATEGIC BLUEPRINT */}
          {adminTab === 'blueprint' && (
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden text-right">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full" />
              
              <div className="border-b border-white/5 pb-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 justify-start">
                      <Compass className="w-6 h-6 text-primary animate-spin-slow" />
                      <span>المخطط الاستراتيجي لصفحة الهبوط (Landing Page Strategic Blueprint)</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                      هيكل هندسي دقيق لصفحة الهبوط مبني بالكامل على قياس الأهداف التجارية والسيكولوجية والسيو والمصداقية. لا وجود للزخرفة؛ كل قسم مصمم لسبب قابل للقياس.
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(LANDING_PAGE_STRATEGY, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", "landing_page_strategic_blueprint_2026.json");
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="self-start md:self-center bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    تصدير ملف المخطط (JSON)
                  </button>
                </div>
              </div>

              {/* Sections Selector Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Right Column: Sections List */}
                <div className="lg:col-span-4 space-y-2.5 text-right">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">أقسام صفحة الهبوط</h3>
                  <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                    {LANDING_PAGE_STRATEGY.map((section) => {
                      const isSelected = selectedBlueprintSection === section.id;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => setSelectedBlueprintSection(section.id)}
                          className={`w-full text-right p-4 rounded-xl border transition-all flex items-center justify-between group ${
                            isSelected 
                              ? 'bg-primary/10 border-primary text-white shadow-md shadow-primary/5' 
                              : 'bg-white/[0.01] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.03] hover:border-white/10'
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-black ${isSelected ? 'text-primary' : 'text-gray-500'}`}>
                              القسم {LANDING_PAGE_STRATEGY.indexOf(section) + 1}
                            </span>
                            <span className="text-sm font-bold">{section.name.split(' (')[0]}</span>
                          </div>
                          <ChevronLeft className={`w-4 h-4 transition-transform ${
                            isSelected ? 'text-primary translate-x-[-2px]' : 'text-gray-600 group-hover:text-gray-400 group-hover:translate-x-[-3px]'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl text-xs text-amber-400/90 leading-relaxed space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1 justify-start">
                      <Info className="w-3.5 h-3.5" />
                      ملاحظة الأدمن:
                    </div>
                    <p>
                      كل قسم من هذه الأقسام مرتبط تلقائياً بنظام ترميز الـ Schema الخاص بجوجل لضمان أرشفة فورية وتصدّر نتائج البحث.
                    </p>
                  </div>
                </div>

                {/* Left Column: Comprehensive Goal & Layout Metrics */}
                <div className="lg:col-span-8 text-right">
                  {(() => {
                    const activeSec = LANDING_PAGE_STRATEGY.find(s => s.id === selectedBlueprintSection) || LANDING_PAGE_STRATEGY[0];
                    return (
                      <div className="space-y-6">
                        {/* Section Header */}
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                          <div className="flex items-center gap-2 mb-2 justify-start">
                            <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-2.5 py-0.5 rounded-full font-bold">
                              هيكل القسم الاستراتيجي
                            </span>
                            <span className="text-xs text-gray-500 font-mono">ID: {activeSec.id}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-white">{activeSec.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
                            <strong className="text-white">الغرض المحوري: </strong> {activeSec.purpose}
                          </p>
                        </div>

                        {/* Interactive Grid: 7 Core Goals */}
                        <div>
                          <h4 className="text-sm font-black text-gray-300 mb-4 border-r-4 border-primary pr-2.5 flex justify-start">
                            المعايير السبعة للأهداف الاستراتيجية (The 7 Core Pillars)
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#030303]/60 border border-white/5 p-4 rounded-xl flex gap-3 text-right">
                              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                <TrendingUp className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-blue-400 mb-1">Business Goal (الهدف المالي والتجاري)</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{activeSec.goals.business}</p>
                              </div>
                            </div>

                            <div className="bg-[#030303]/60 border border-white/5 p-4 rounded-xl flex gap-3 text-right">
                              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                <Activity className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-purple-400 mb-1">Psychological Goal (الهدف السيكولوجي)</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{activeSec.goals.psychological}</p>
                              </div>
                            </div>

                            <div className="bg-[#030303]/60 border border-white/5 p-4 rounded-xl flex gap-3 text-right">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                <Search className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-emerald-400 mb-1">SEO Goal (هدف السيو والكلمات الدلالية)</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{activeSec.goals.seo}</p>
                              </div>
                            </div>

                            <div className="bg-[#030303]/60 border border-white/5 p-4 rounded-xl flex gap-3 text-right">
                              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                <MousePointer className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-amber-400 mb-1">UX Goal (هدف واجهة وتجربة المستخدم)</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{activeSec.goals.ux}</p>
                              </div>
                            </div>

                            <div className="bg-[#030303]/60 border border-white/5 p-4 rounded-xl flex gap-3 text-right">
                              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                                <Target className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-pink-400 mb-1">Conversion Goal (معدلات التحويل والإجراء)</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{activeSec.goals.conversion}</p>
                              </div>
                            </div>

                            <div className="bg-[#030303]/60 border border-white/5 p-4 rounded-xl flex gap-3 text-right">
                              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                                <Shield className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-teal-400 mb-1">Trust Goal (مؤشرات المصداقية والأمان)</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{activeSec.goals.trust}</p>
                              </div>
                            </div>

                            <div className="bg-[#030303]/60 border border-white/5 p-4 rounded-xl flex gap-3 md:col-span-2 text-right">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                                <Globe className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-xs font-black text-indigo-400 mb-1">Google Ranking Goal (هدف جوجل للتصدر والأرشفة)</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{activeSec.goals.googleRanking}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content & Heading Architecture Specs */}
                        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-4 text-right">
                          <h4 className="text-sm font-black text-gray-300 mb-2 border-r-4 border-primary pr-2.5 flex justify-start">
                            مواصفات التخطيط وصياغة المحتوى الفعلي
                          </h4>

                          <div className="space-y-4 text-xs sm:text-sm">
                            <div className="border-b border-white/5 pb-3">
                              <span className="font-bold text-gray-300 block mb-1">استراتيجية صياغة المحتوى (Content Strategy):</span>
                              <span className="text-gray-400 leading-relaxed">{activeSec.contentStrategy}</span>
                            </div>

                            <div className="border-b border-white/5 pb-3">
                              <span className="font-bold text-gray-300 block mb-1">البنية الهيكلية لوسوم العناوين (Heading Structure):</span>
                              <span className="text-gray-400 font-mono leading-relaxed bg-black/40 px-2 py-1 rounded border border-white/5 inline-block">{activeSec.headingStructure}</span>
                            </div>

                            <div className="border-b border-white/5 pb-3">
                              <span className="font-bold text-gray-300 block mb-1">التدرج الهرمي للمعلومات (Information Hierarchy):</span>
                              <ol className="list-decimal list-inside text-gray-400 space-y-1 mt-1 pr-1 leading-relaxed">
                                {activeSec.informationHierarchy.map((step, idx) => (
                                  <li key={idx}>{step}</li>
                                ))}
                              </ol>
                            </div>

                            <div className="border-b border-white/5 pb-3">
                              <span className="font-bold text-gray-300 block mb-1">عنصر التركيز الجاذب والوزن البصري (Visual Priority):</span>
                              <span className="text-gray-400 leading-relaxed">{activeSec.visualPriority}</span>
                            </div>

                            <div className="border-b border-white/5 pb-3">
                              <span className="font-bold text-gray-300 block mb-1">تموضع وأزرار اتخاذ الإجراء (CTA Placement):</span>
                              <span className="text-gray-400 leading-relaxed">{activeSec.ctaPlacement}</span>
                            </div>

                            <div className="border-b border-white/5 pb-3">
                              <span className="font-bold text-gray-300 block mb-1">مسارات الترابط والروابط الداخلية (Internal Links):</span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5 justify-start">
                                {activeSec.internalLinks.map((link, idx) => (
                                  <span key={idx} className="bg-primary/5 border border-primary/20 text-primary px-2.5 py-1 rounded text-xs">
                                    {link}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="font-bold text-gray-300 block mb-1">مخطط السكيما المعزز لمحرك جوجل (Supporting Schema):</span>
                              <span className="text-primary font-mono leading-relaxed bg-primary/5 px-2 py-1 rounded border border-primary/10 inline-block">{activeSec.supportingSchema}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: LANDING PAGE CMS */}
          {adminTab === 'landing_cms' && (
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden text-right">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full" />
              
              <div className="border-b border-white/5 pb-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 justify-start">
                  <Layout className="w-5 h-5 text-primary" />
                  <span>تعديل محتوى الصفحة الرئيسية والوسائط ✍️</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  قم بتعديل النصوص الأساسية وعناوين الهيرو والفيديو الاستعراضي مباشرة. سيتم حفظ التغييرات وتطبيقها فوراُ على زوار الموقع.
                </p>
              </div>

              {cmsSaveSuccess && (
                <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs font-bold text-center mb-6">
                  ✨ تم حفظ المحتوى بنجاح! تم تحديث نصوص وفيديو الصفحة الرئيسية مباشرة.
                </div>
              )}

              <form onSubmit={handleSaveLandingCms} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الشارة التعريفية للهيرو (Hero Tagline)</label>
                      <input
                        type="text"
                        required
                        value={cmsTag}
                        onChange={(e) => setCmsTag(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="مثال: المعيار الذهبي لإدارة الصالات 2026"
                      />
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4 text-right">
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/5">
                        <label className="block text-xs font-bold text-gray-300">الصورة المصغرة للفيديو (Video Thumbnail / Poster)</label>
                        <div className="flex bg-black/40 border border-white/10 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => setHeroThumbnailSourceType('url')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              heroThumbnailSourceType === 'url'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            رابط ويب (URL)
                          </button>
                          <button
                            type="button"
                            onClick={() => setHeroThumbnailSourceType('upload')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              heroThumbnailSourceType === 'upload'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            رفع صورة (Upload)
                          </button>
                        </div>
                      </div>

                      {heroThumbnailSourceType === 'url' ? (
                        <div>
                          <input
                            type="text"
                            value={cmsVideoThumbnail && cmsVideoThumbnail.startsWith('db://') ? '' : cmsVideoThumbnail}
                            onChange={(e) => setCmsVideoThumbnail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white font-mono"
                            placeholder="مثال: https://images.unsplash.com/photo-..."
                          />
                          <span className="text-[10px] text-gray-500 block mt-1.5 text-right">* ضع رابط الصورة المصغرة أو اتركها فارغة للافتراضي.</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="relative border border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-xl p-4 text-center cursor-pointer group">
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setHeroThumbnailFileName(file.name);
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setLocalHeroThumbnailBase64(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <Image className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-1" />
                            <p className="text-[11px] font-bold text-gray-300">
                              {heroThumbnailFileName ? `📁 ${heroThumbnailFileName}` : 'اضغط هنا لرفع صورة من جهازك'}
                            </p>
                          </div>
                          {localHeroThumbnailBase64 && (
                            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                              <Image className="w-4 h-4 text-primary animate-pulse" />
                              <div className="flex-1 min-w-0 text-right">
                                <p className="text-[11px] font-bold text-white truncate">{heroThumbnailFileName || 'صورة مرفوعة'}</p>
                                <p className="text-[9px] text-emerald-400">جاهزة كصورة مصغرة للفيديو 🚀</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setLocalHeroThumbnailBase64('');
                                  setHeroThumbnailFileName('');
                                }}
                                className="text-red-400 hover:text-red-300 p-1.5 text-[10px] font-bold transition-colors cursor-pointer mr-auto"
                              >
                                إزالة
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/5">
                      <label className="block text-xs font-bold text-gray-300">الفيديو الاستعراضي للهيرو (Hero Demo Video)</label>
                      <div className="flex bg-black/40 border border-white/10 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => setHeroVideoSourceType('url')}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            heroVideoSourceType === 'url'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رابط ويب (URL)
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeroVideoSourceType('upload')}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            heroVideoSourceType === 'upload'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رفع ملف (Upload)
                        </button>
                      </div>
                    </div>

                    {heroVideoSourceType === 'url' ? (
                      <div>
                        <input
                          type="text"
                          value={cmsVideo && cmsVideo.startsWith('db://') ? 'https://www.youtube.com/watch?v=1CWmNEt6xVs' : cmsVideo}
                          onChange={(e) => setCmsVideo(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white"
                          placeholder="https://www.youtube.com/watch?v=1CWmNEt6xVs"
                        />
                        <span className="text-[10px] text-gray-500 block mt-1.5 text-right">* يدعم روابط يوتيوب أو روابط الفيديو المباشرة.</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative border border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-xl p-4 text-center cursor-pointer group">
                          <input
                            type="file"
                            accept="video/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setHeroVideoFileName(file.name);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setLocalHeroVideoBase64(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Video className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-1" />
                          <p className="text-[11px] font-bold text-gray-300">
                            {heroVideoFileName ? `📁 ${heroVideoFileName}` : 'اضغط هنا لرفع فيديو من جهازك'}
                          </p>
                        </div>
                        {localHeroVideoBase64 && (
                          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                            <Video className="w-4 h-4 text-primary animate-pulse" />
                            <div className="flex-1 min-w-0 text-right">
                              <p className="text-[11px] font-bold text-white truncate">{heroVideoFileName || 'فيديو مرفوع'}</p>
                              <p className="text-[9px] text-emerald-400">جاهز لحفظه كفيديو للهيرو 🚀</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setLocalHeroVideoBase64('');
                                setHeroVideoFileName('');
                              }}
                              className="text-red-400 hover:text-red-300 p-1.5 text-[10px] font-bold transition-colors cursor-pointer mr-auto"
                            >
                              إزالة
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">عنوان الهيرو الأول (Hero Title Prefix)</label>
                    <input
                      type="text"
                      required
                      value={cmsTitlePrefix}
                      onChange={(e) => setCmsTitlePrefix(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                      placeholder="مثال: نظام إدارة صالات البلايستيشن"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">عنوان الهيرو المميز (Hero Title Highlight - Gradient)</label>
                    <input
                      type="text"
                      required
                      value={cmsTitleHighlight}
                      onChange={(e) => setCmsTitleHighlight(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                      placeholder="مثال: سيستم كاشير بلايسيتشن"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2">الوصف التعريفي للهيرو (Hero Description)</label>
                  <textarea
                    required
                    rows={3}
                    value={cmsDescription}
                    onChange={(e) => setCmsDescription(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                    placeholder="اكتب وصفاً تعريفيّاً طويلاً وجذاباً..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">رقم هاتف الواتساب للتواصل (بدون علامة + أو أصفار البداية)</label>
                    <input
                      type="text"
                      required
                      value={cmsPhone}
                      onChange={(e) => setCmsPhone(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white font-mono"
                      placeholder="201121778205"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">رسالة الواتساب الافتراضية للتواصل (WhatsApp Custom Message)</label>
                    <input
                      type="text"
                      required
                      value={cmsWhatsapp}
                      onChange={(e) => setCmsWhatsapp(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                      placeholder="مرحباً فريق صُنّاع الفكرة، أودّ الاستفسار..."
                    />
                  </div>
                </div>

                {/* قسم الشريك الهندسي (IDEA MAKERS) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Database className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قسم الشريك الرقمي (شريكك الهندسي في النجاح) 🤝</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">شارة القسم (Section Badge Tag)</label>
                      <input
                        type="text"
                        required
                        value={cmsAuthTag}
                        onChange={(e) => setCmsAuthTag(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="شريكك الهندسي في النجاح"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عنوان القسم الرئيسي (Section Main Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsAuthTitle}
                        onChange={(e) => setCmsAuthTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="IDEA MAKERS: أكثر من مجرد برنامج"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">الوصف والتعريف بالبنية الرقمية (Section Description)</label>
                    <textarea
                      required
                      rows={3}
                      value={cmsAuthDescription}
                      onChange={(e) => setCmsAuthDescription(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                      placeholder="نحن لا نبيع لك أكوادًا برمجية..."
                    />
                  </div>

                  {/* Stats Cards Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                    {/* Stat Card 1 */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-primary border-b border-white/5 pb-1 text-right">بطاقة الإحصائية الأولى (Stat Card 1)</h4>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">العنوان الفرعي</label>
                        <input
                          type="text"
                          required
                          value={cmsAuthStat1Title}
                          onChange={(e) => setCmsAuthStat1Title(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white"
                          placeholder="ثقة متزايدة يومياً"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">الوصف الفرعي</label>
                        <textarea
                          required
                          rows={2}
                          value={cmsAuthStat1Desc}
                          onChange={(e) => setCmsAuthStat1Desc(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white leading-relaxed resize-none"
                          placeholder="يستخدمه أصحاب صالات بلايستيشن في مصر والسعودية..."
                        />
                      </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="space-y-4 border-r border-white/5 pr-4 text-right">
                      <h4 className="text-xs font-bold text-primary border-b border-white/5 pb-1 text-right">بطاقة الإحصائية الثانية (Stat Card 2)</h4>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">العنوان الفرعي (مثال: 100%)</label>
                        <input
                          type="text"
                          required
                          value={cmsAuthStat2Title}
                          onChange={(e) => setCmsAuthStat2Title(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white"
                          placeholder="100%"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">الوصف الفرعي</label>
                        <textarea
                          required
                          rows={2}
                          value={cmsAuthStat2Desc}
                          onChange={(e) => setCmsAuthStat2Desc(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white leading-relaxed resize-none"
                          placeholder="تحت سيطرتك أوفلاين"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Image Customizer */}
                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/5">
                      <label className="block text-xs font-bold text-gray-300">صورة قسم الشريك الهندسي (Section Image)</label>
                      <div className="flex bg-black/40 border border-white/10 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => setAuthImgSourceType('url')}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            authImgSourceType === 'url'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رابط ويب (URL)
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuthImgSourceType('upload')}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            authImgSourceType === 'upload'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رفع صورة (Upload)
                        </button>
                      </div>
                    </div>

                    {authImgSourceType === 'url' ? (
                      <div>
                        <input
                          type="text"
                          value={cmsAuthImageUrl && cmsAuthImageUrl.startsWith('db://') ? '' : cmsAuthImageUrl}
                          onChange={(e) => setCmsAuthImageUrl(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white font-mono"
                          placeholder="مثال: https://images.unsplash.com/photo-..."
                        />
                        <span className="text-[10px] text-gray-500 block mt-1.5 text-right">* ضع رابط الصورة أو اتركها فارغة للافتراضي.</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative border border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-xl p-4 text-center cursor-pointer group">
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setAuthImgFileName(file.name);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setLocalAuthImgBase64(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Image className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-1" />
                          <p className="text-[11px] font-bold text-gray-300 font-sans">
                            {authImgFileName ? `📁 ${authImgFileName}` : 'اضغط هنا لرفع صورة القسم من جهازك'}
                          </p>
                        </div>
                        {localAuthImgBase64 && (
                          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                            <Image className="w-4 h-4 text-primary animate-pulse" />
                            <div className="flex-1 min-w-0 text-right">
                              <p className="text-[11px] font-bold text-white truncate">{authImgFileName || 'صورة مرفوعة'}</p>
                              <p className="text-[9px] text-emerald-400">جاهزة كصورة لقسم الشراكة الهندسية 🚀</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setLocalAuthImgBase64('');
                                setAuthImgFileName('');
                              }}
                              className="text-red-400 hover:text-red-300 p-1.5 text-[10px] font-bold transition-colors cursor-pointer mr-auto"
                            >
                              إزالة
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* قسم شهادة الأمن السيبراني (Cisco Cybersecurity Certificate Controls) */}
                <div className="pt-6 border-t border-white/5 space-y-6 text-right">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Award className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">إدارة شهادة الأمن السيبراني Cisco والتحكم بها 🛡️</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Display Mode Selector */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-gray-300">طريقة عرض الشهادة في قسم الأمان</label>
                      <div className="grid grid-cols-3 bg-black/40 border border-white/10 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => setCmsTrustCertShowMode('replica')}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                            cmsTrustCertShowMode === 'replica'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          نسخة رقمية تفاعلية
                        </button>
                        <button
                          type="button"
                          onClick={() => setCmsTrustCertShowMode('image')}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                            cmsTrustCertShowMode === 'image'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          صورة الشهادة فقط
                        </button>
                        <button
                          type="button"
                          onClick={() => setCmsTrustCertShowMode('both')}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                            cmsTrustCertShowMode === 'both'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          عرض كلاهما بتبديل تفاعلي
                        </button>
                      </div>
                      <span className="text-[10px] text-gray-500 block text-right">
                        * يتيح للزوار التبديل بين صورة الشهادة الأصلية وبين النسخة البرمجية التفاعلية أو تثبيت إحداهما.
                      </span>
                    </div>

                    {/* Certificate Image customization */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3 pb-2">
                        <label className="block text-xs font-bold text-gray-300">ملف أو رابط صورة الشهادة الرسمية</label>
                        <div className="flex bg-black/40 border border-white/10 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setTrustCertImgSourceType('url'); }}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              trustCertImgSourceType === 'url'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            رابط ويب (URL)
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setTrustCertImgSourceType('upload'); }}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              trustCertImgSourceType === 'upload'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            رفع صورة (Upload)
                          </button>
                        </div>
                      </div>

                      {trustCertImgSourceType === 'url' ? (
                        <div>
                          <input
                            type="text"
                            value={cmsTrustCertImgUrl && cmsTrustCertImgUrl.startsWith('db://') ? '' : cmsTrustCertImgUrl}
                            onChange={(e) => setCmsTrustCertImgUrl(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white font-mono"
                            placeholder="مثال: https://credly.com/images/..."
                          />
                          <span className="text-[10px] text-gray-500 block mt-1.5 text-right">* ضع رابط صورة الشهادة، أو اتركه فارغاً لاستخدام شهادة سيسكو الافتراضية.</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="relative border border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-xl p-4 text-center cursor-pointer group">
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setTrustCertImgFileName(file.name);
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setLocalTrustCertImgBase64(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <Image className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-1" />
                            <p className="text-[11px] font-bold text-gray-300 font-sans">
                              {trustCertImgFileName ? `📁 ${trustCertImgFileName}` : 'اضغط هنا لرفع صورة الشهادة من جهازك'}
                            </p>
                          </div>
                          {localTrustCertImgBase64 && (
                            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                              <Image className="w-4 h-4 text-primary animate-pulse" />
                              <div className="flex-1 min-w-0 text-right">
                                <p className="text-[11px] font-bold text-white truncate">{trustCertImgFileName || 'صورة مرفوعة'}</p>
                                <p className="text-[9px] text-emerald-400">جاهزة كصورة لشهادة الأمن السيبراني 🚀</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setLocalTrustCertImgBase64('');
                                  setTrustCertImgFileName('');
                                }}
                                className="text-red-400 hover:text-red-300 p-1.5 text-[10px] font-bold transition-colors cursor-pointer mr-auto"
                              >
                                إزالة
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* قسم الباقات والتسعير (Pricing Header) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قسم باقات الاستثمار والتسعير 💰</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عنوان قسم الباقات الرئيسي (Pricing Section Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsPricingTitle}
                        onChange={(e) => setCmsPricingTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="استثمار سيادي.. لمرة واحدة"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الفرعي لقسم الباقات (Pricing Section Subtitle)</label>
                      <input
                        type="text"
                        required
                        value={cmsPricingSubtitle}
                        onChange={(e) => setCmsPricingSubtitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="اختر الباقة التي تناسب طموحك..."
                      />
                    </div>
                  </div>
                </div>

                {/* قسم الفروع المتعددة (Multi-Branch) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Globe className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قسم الفروع المتعددة والنظام المخصص 🏢</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عنوان قسم الفروع (Branches Section Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsBranchesTitle}
                        onChange={(e) => setCmsBranchesTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="هل تمتلك فروعاً متعددة؟"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">نص زر طلب النظام المخصص (Branches Button Text)</label>
                      <input
                        type="text"
                        required
                        value={cmsBranchesBtnText}
                        onChange={(e) => setCmsBranchesBtnText(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="اطلب نظامك المخصص الآن"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">وصف قسم الفروع (Branches Description)</label>
                    <textarea
                      required
                      rows={3}
                      value={cmsBranchesText}
                      onChange={(e) => setCmsBranchesText(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                      placeholder="على الرغم من أن الباقات الجاهزة لا تشمل إدارة الفروع..."
                    />
                  </div>
                </div>

                {/* قسم التجربة المجانية (Free Trial) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Compass className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قسم التجربة المجانية (Free Trial Banner) ⏳</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عنوان قسم التجربة (Trial Section Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsTrialTitle}
                        onChange={(e) => setCmsTrialTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder='"ابدأ الآن وقرر بنفسك"'
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">نص زر التجربة المجانية (Trial Button Text)</label>
                      <input
                        type="text"
                        required
                        value={cmsTrialBtnText}
                        onChange={(e) => setCmsTrialBtnText(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="ابدأ تجربة مجانية"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">وصف قسم التجربة المجانية (Trial Description)</label>
                    <textarea
                      required
                      rows={3}
                      value={cmsTrialText}
                      onChange={(e) => setCmsTrialText(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                      placeholder="خلال 3 أيام فقط، ستسترد قيمة نظام الكاشير بالكامل من الأرباح الإضافية المحققة..."
                    />
                  </div>
                </div>

                {/* قسم من نحن والشركة (About Us) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Layers className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قسم "من نحن" وهيكل الشركة 🏢</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الشارة العلوية (Badge Text)</label>
                      <input
                        type="text"
                        required
                        value={cmsAboutUsBadge}
                        onChange={(e) => setCmsAboutUsBadge(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="القوة الهندسية خلف مشروعك"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عنوان من نحن الرئيسي (About Us Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsAboutUsTitle}
                        onChange={(e) => setCmsAboutUsTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="من نحن: IDEA Makers"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الوصف الأول (About Us Text 1)</label>
                      <textarea
                        required
                        rows={3}
                        value={cmsAboutUsText1}
                        onChange={(e) => setCmsAboutUsText1(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                        placeholder="نحن شركة تكنولوجيا رائدة..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الوصف الثاني (About Us Text 2)</label>
                      <textarea
                        required
                        rows={3}
                        value={cmsAboutUsText2}
                        onChange={(e) => setCmsAboutUsText2(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                        placeholder="في IDEA Makers، نحن لسنا مجرد بائعي برامج..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الوسم الأول (Tag 1)</label>
                      <input
                        type="text"
                        required
                        value={cmsAboutUsTag1}
                        onChange={(e) => setCmsAboutUsTag1(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="تطوير أنظمة الأعمال"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الوسم الثاني (Tag 2)</label>
                      <input
                        type="text"
                        required
                        value={cmsAboutUsTag2}
                        onChange={(e) => setCmsAboutUsTag2(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="حلول الإدارة الذكية"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الوسم الثالث (Tag 3)</label>
                      <input
                        type="text"
                        required
                        value={cmsAboutUsTag3}
                        onChange={(e) => setCmsAboutUsTag3(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="أتمتة العمليات"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">نوع البانر على الصورة (Banner Type Label)</label>
                      <input
                        type="text"
                        required
                        value={cmsAboutUsBannerType}
                        onChange={(e) => setCmsAboutUsBannerType(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="Engineering Excellence"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">نص البانر على الصورة (Banner Text)</label>
                      <input
                        type="text"
                        required
                        value={cmsAboutUsBannerText}
                        onChange={(e) => setCmsAboutUsBannerText(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="نصمم المستقبل.. لا نكتفي ببرمجته"
                      />
                    </div>
                  </div>
                </div>

                {/* قسم الرؤية والرسالة (Vision & Mission) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Target className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في الرؤية والرسالة (Vision & Mission) 🎯</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-primary border-b border-white/5 pb-1">رؤيتنا (Our Vision)</h4>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">عنوان الرؤية</label>
                        <input
                          type="text"
                          required
                          value={cmsVisionTitle}
                          onChange={(e) => setCmsVisionTitle(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">نص الرؤية</label>
                        <textarea
                          required
                          rows={4}
                          value={cmsVisionText}
                          onChange={(e) => setCmsVisionText(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white leading-relaxed resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 border-r border-white/5 pr-4">
                      <h4 className="text-xs font-bold text-primary border-b border-white/5 pb-1">رسالتنا (Our Mission)</h4>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">عنوان الرسالة</label>
                        <input
                          type="text"
                          required
                          value={cmsMissionTitle}
                          onChange={(e) => setCmsMissionTitle(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1">نص الرسالة</label>
                        <textarea
                          required
                          rows={4}
                          value={cmsMissionText}
                          onChange={(e) => setCmsMissionText(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-right text-white leading-relaxed resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* قسم القيم الجوهرية (Core Values) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Star className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قيمنا الجوهرية (Core Values) 🏆</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي للقيم (Values Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsCoreValuesTitle}
                        onChange={(e) => setCmsCoreValuesTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الفرعي للقيم (Values Subtitle)</label>
                      <input
                        type="text"
                        required
                        value={cmsCoreValuesSubtitle}
                        onChange={(e) => setCmsCoreValuesSubtitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white/[0.01] p-3 rounded-xl border border-white/5">
                      <label className="block text-[10px] font-bold text-primary mb-1">القيمة 1 (الاسم)</label>
                      <input type="text" required value={cmsVal1Title} onChange={e => setCmsVal1Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white mb-2"/>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1">الوصف</label>
                      <textarea rows={2} required value={cmsVal1Desc} onChange={e => setCmsVal1Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none leading-relaxed"/>
                    </div>
                    <div className="bg-white/[0.01] p-3 rounded-xl border border-white/5">
                      <label className="block text-[10px] font-bold text-primary mb-1">القيمة 2 (الاسم)</label>
                      <input type="text" required value={cmsVal2Title} onChange={e => setCmsVal2Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white mb-2"/>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1">الوصف</label>
                      <textarea rows={2} required value={cmsVal2Desc} onChange={e => setCmsVal2Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none leading-relaxed"/>
                    </div>
                    <div className="bg-white/[0.01] p-3 rounded-xl border border-white/5">
                      <label className="block text-[10px] font-bold text-primary mb-1">القيمة 3 (الاسم)</label>
                      <input type="text" required value={cmsVal3Title} onChange={e => setCmsVal3Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white mb-2"/>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1">الوصف</label>
                      <textarea rows={2} required value={cmsVal3Desc} onChange={e => setCmsVal3Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none leading-relaxed"/>
                    </div>
                    <div className="bg-white/[0.01] p-3 rounded-xl border border-white/5">
                      <label className="block text-[10px] font-bold text-primary mb-1">القيمة 4 (الاسم)</label>
                      <input type="text" required value={cmsVal4Title} onChange={e => setCmsVal4Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white mb-2"/>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1">الوصف</label>
                      <textarea rows={2} required value={cmsVal4Desc} onChange={e => setCmsVal4Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none leading-relaxed"/>
                    </div>
                    <div className="bg-white/[0.01] p-3 rounded-xl border border-white/5">
                      <label className="block text-[10px] font-bold text-primary mb-1">القيمة 5 (الاسم)</label>
                      <input type="text" required value={cmsVal5Title} onChange={e => setCmsVal5Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white mb-2"/>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1">الوصف</label>
                      <textarea rows={2} required value={cmsVal5Desc} onChange={e => setCmsVal5Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none leading-relaxed"/>
                    </div>
                  </div>
                </div>

                {/* قسم لماذا تختارنا (Why Choose Us) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Settings className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قسم "لماذا تختارنا" (Why Choose Us) 🤔</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي لقسم الاختيار (Section Main Title)</label>
                    <input
                      type="text"
                      required
                      value={cmsWhyChooseTitle}
                      onChange={(e) => setCmsWhyChooseTitle(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Why Card 1 */}
                    <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary">الميزة 1</h4>
                      <input type="text" required value={cmsWhy1Title} onChange={e => setCmsWhy1Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white"/>
                      <textarea rows={2} required value={cmsWhy1Desc} onChange={e => setCmsWhy1Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none"/>
                    </div>
                    {/* Why Card 2 */}
                    <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary">الميزة 2</h4>
                      <input type="text" required value={cmsWhy2Title} onChange={e => setCmsWhy2Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white"/>
                      <textarea rows={2} required value={cmsWhy2Desc} onChange={e => setCmsWhy2Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none"/>
                    </div>
                    {/* Why Card 3 */}
                    <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary">الميزة 3</h4>
                      <input type="text" required value={cmsWhy3Title} onChange={e => setCmsWhy3Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white"/>
                      <textarea rows={2} required value={cmsWhy3Desc} onChange={e => setCmsWhy3Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none"/>
                    </div>
                    {/* Why Card 4 */}
                    <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary">الميزة 4</h4>
                      <input type="text" required value={cmsWhy4Title} onChange={e => setCmsWhy4Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white"/>
                      <textarea rows={2} required value={cmsWhy4Desc} onChange={e => setCmsWhy4Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none"/>
                    </div>
                    {/* Why Card 5 */}
                    <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary">الميزة 5</h4>
                      <input type="text" required value={cmsWhy5Title} onChange={e => setCmsWhy5Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white"/>
                      <textarea rows={2} required value={cmsWhy5Desc} onChange={e => setCmsWhy5Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none"/>
                    </div>
                    {/* Why Card 6 */}
                    <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary">الميزة 6</h4>
                      <input type="text" required value={cmsWhy6Title} onChange={e => setCmsWhy6Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white"/>
                      <textarea rows={2} required value={cmsWhy6Desc} onChange={e => setCmsWhy6Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    {/* Why Card 7 */}
                    <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary">الميزة 7 (صُمم خصيصاً)</h4>
                      <input type="text" required value={cmsWhy7Title} onChange={e => setCmsWhy7Title(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-right text-white"/>
                      <textarea rows={2} required value={cmsWhy7Desc} onChange={e => setCmsWhy7Desc(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-right text-white resize-none"/>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">العبارة الختامية لقسم الاختيار (Footer Claim text)</label>
                        <input type="text" required value={cmsWhyChooseFooterText} onChange={e => setCmsWhyChooseFooterText(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-right text-white"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1.5">نص زر المحادثة الختامي (Footer Claim Button text)</label>
                        <input type="text" required value={cmsWhyChooseFooterBtnText} onChange={e => setCmsWhyChooseFooterBtnText(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-right text-white"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* قسم قصة الابتكار والمؤسس (Founder Story Section) */}
                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5 justify-start">
                    <Quote className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-white">التحكم في قسم قصة الابتكار والتعريف بالمؤسس 👨‍💼</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الجانبي لقسم القصة (Story Subtitle)</label>
                      <input
                        type="text"
                        required
                        value={cmsFounderStorySubtitle}
                        onChange={(e) => setCmsFounderStorySubtitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="الرؤية خلف الابتكار"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي لقسم القصة (Story Main Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsFounderStoryTitle}
                        onChange={(e) => setCmsFounderStoryTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="صُنّاع الفكرة"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">اسم المؤسس (Founder Name)</label>
                      <input
                        type="text"
                        required
                        value={cmsFounderName}
                        onChange={(e) => setCmsFounderName(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="Eslam Arafa"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">دور المؤسس والمنصب (Founder Role)</label>
                      <input
                        type="text"
                        required
                        value={cmsFounderRole}
                        onChange={(e) => setCmsFounderRole(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="Founder & CEO – IDEA Makers"
                      />
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4 text-right">
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/5">
                        <label className="block text-xs font-bold text-gray-300">صورة المؤسس الشخصية (Founder Image)</label>
                        <div className="flex bg-black/40 border border-white/10 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => setFounderImgSourceType('url')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              founderImgSourceType === 'url'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            رابط ويب (URL)
                          </button>
                          <button
                            type="button"
                            onClick={() => setFounderImgSourceType('upload')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              founderImgSourceType === 'upload'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            رفع صورة (Upload)
                          </button>
                        </div>
                      </div>

                      {founderImgSourceType === 'url' ? (
                        <div>
                          <input
                            type="text"
                            value={cmsFounderImgUrl && cmsFounderImgUrl.startsWith('db://') ? '' : cmsFounderImgUrl}
                            onChange={(e) => setCmsFounderImgUrl(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white font-mono"
                            placeholder="https://..."
                          />
                          <span className="text-[10px] text-gray-500 block mt-1.5 text-right">* ضع رابط الصورة الشخصية أو اتركه فارغاً للافتراضي.</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="relative border border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-xl p-4 text-center cursor-pointer group">
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={handleFounderImgFileChange}
                            />
                            <Image className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-1" />
                            <p className="text-[11px] font-bold text-gray-300">
                              {founderImgFileName ? `📁 ${founderImgFileName}` : 'اضغط هنا لرفع صورة من جهازك'}
                            </p>
                          </div>
                          {localFounderImgBase64 && (
                            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                              <img src={localFounderImgBase64} alt="Preview" className="w-10 h-10 object-cover rounded-lg" />
                              <div className="flex-1 min-w-0 text-right">
                                <p className="text-[11px] font-bold text-white truncate">{founderImgFileName || 'صورة مرفوعة'}</p>
                                <p className="text-[9px] text-emerald-400">جاهزة كصورة للمؤسس 🚀</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setLocalFounderImgBase64('');
                                  setFounderImgFileName('');
                                }}
                                className="text-red-400 hover:text-red-300 p-1.5 text-[10px] font-bold transition-colors cursor-pointer mr-auto"
                              >
                                إزالة
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عنوان الخبرة للشارة العائمة (Expertise Title)</label>
                      <input
                        type="text"
                        required
                        value={cmsFounderExpTitle}
                        onChange={(e) => setCmsFounderExpTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="Expertise"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">وصف الخبرة للشارة العائمة (Expertise Desc)</label>
                      <input
                        type="text"
                        required
                        value={cmsFounderExpDesc}
                        onChange={(e) => setCmsFounderExpDesc(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="Systems Engineer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">الاقتباس الرئيسي للمؤسس (Founder Main Quote)</label>
                    <textarea
                      required
                      rows={3}
                      value={cmsFounderQuote}
                      onChange={(e) => setCmsFounderQuote(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                      placeholder="فكرة النظام بدأت عندما لاحظنا الفوضى..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الفقرة السردية الأولى (Paragraph 1)</label>
                      <textarea
                        required
                        rows={5}
                        value={cmsFounderPara1}
                        onChange={(e) => setCmsFounderPara1(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                        placeholder="لاحظ إسلام عرفة أن العديد من الصالات تعاني..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الفقرة السردية الثانية (Paragraph 2)</label>
                      <textarea
                        required
                        rows={5}
                        value={cmsFounderPara2}
                        onChange={(e) => setCmsFounderPara2(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                        placeholder="تحول IDEA Makers PlayStation POS من مجرد كود..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الفقرة البانر المظللة (Paragraph 3 - Highlighted Box)</label>
                      <textarea
                        required
                        rows={5}
                        value={cmsFounderPara3}
                        onChange={(e) => setCmsFounderPara3(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed resize-none"
                        placeholder="الهدف لم يكن أبداً مجرد بيع برنامج..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">نص زر قصة الابتكار الكاملة (Read Story Button Text)</label>
                    <input
                      type="text"
                      required
                      value={cmsFounderBtnText}
                      onChange={(e) => setCmsFounderBtnText(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                      placeholder="اقرأ القصة الكاملة للابتكار"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
                  >
                    <Save className="w-4.5 h-4.5" />
                    حفظ التعديلات ونشرها فوراً على الموقع المباشر 🚀
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB CONTENT 3: BLOG ARTICLES CMS */}
          {adminTab === 'blog_cms' && (
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative text-right">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 justify-start">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>إدارة محتوى مدونة السيو وكتابة المقالات 📰</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    أضف، عدّل، أو احذف مقالات المدونة لرفع سلطة الموقع وبناء زوار مخلصين (Topical Authority Management).
                  </p>
                </div>

                {!isEditingArticle && (
                  <button
                    type="button"
                    onClick={() => {
                      clearArticleForm();
                      setEditingArticleSlug(null);
                      setIsEditingArticle(true);
                    }}
                    className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة مقالة جديدة
                  </button>
                )}
              </div>

              {isEditingArticle ? (
                /* --- ADD/EDIT ARTICLE FORM --- */
                <form onSubmit={handleSaveArticle} className="space-y-6 text-right">
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl mb-4 text-xs font-bold text-gray-300">
                    {editingArticleSlug ? '✍️ تعديل بيانات المقالة القائمة:' : '✨ كتابة ونشر مقالة جديدة:'}
                  </div>

                  {/* ✨ مساعد السيو والذكاء الاصطناعي المحلي (بدون إنترنت/بدون API) */}
                  <div className="bg-gradient-to-l from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-5 mb-6 text-right relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 blur-[30px] rounded-full pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-3 justify-start text-right">
                      <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                      <div className="text-right">
                        <h4 className="text-sm font-black text-white">مساعد السيو والذكاء الاصطناعي المحلي 🤖 (أوفلاين بالكامل)</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          قم بتوليد مقالات سيو احترافية فائقة الترابط ومتوافقة مع خوارزميات جوجل 2026 بنقرة زر واحدة دون الحاجة لأي مفاتيح أو واجهات خارجية.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-right">
                      <div className="text-right">
                        <label className="block text-[10px] font-bold text-gray-300 mb-1.5">1. اختر عنقود السيو / موضوع المقال:</label>
                        <select
                          value={localAiTopic}
                          onChange={(e: any) => setLocalAiTopic(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2.5 text-xs text-right text-white"
                        >
                          <option value="financial-control">🛡️ مكافحة السرقة والتسريب المالي وتلاعب العمال</option>
                          <option value="playstation-pos-intro">🎮 الدليل الشامل لاختيار نظام كاشير وإدارة الصالات</option>
                          <option value="pricing-strategies">📈 استراتيجيات التسعير الذكي والديناميكي لزيادة المبيعات</option>
                          <option value="playstation-marketing">📣 طرق تسويق مبتكرة لجذب زبائن دائمين لصالة البلايستيشن</option>
                        </select>
                      </div>

                      <div className="text-right">
                        <label className="block text-[10px] font-bold text-gray-300 mb-1.5">2. اختر نبرة الكتابة والتوجه الفني:</label>
                        <select
                          value={localAiTone}
                          onChange={(e: any) => setLocalAiTone(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2.5 text-xs text-right text-white"
                        >
                          <option value="authoritative">🏛️ نبرة سلطوية مهنية (إحصائيات وأرقام حاسمة)</option>
                          <option value="practical">🛠️ نبرة عملية (خطوات تعليمية مباشرة)</option>
                          <option value="comparative">⚖️ نبرة مقارنة دقيقة (تقنع القارئ بالشراء)</option>
                          <option value="friendly">👋 نبرة ودية تفاعلية (نصائح أخوية من القلب)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 flex-wrap text-right">
                      <div className="text-[10px] text-gray-500">
                        * يستهدف بلدك المحدد حالياً: <span className="text-white font-bold">{
                          selectedEditCountry === 'egypt' ? 'جمهورية مصر 🇪🇬' :
                          selectedEditCountry === 'saudi' ? 'السعودية 🇸🇦' :
                          selectedEditCountry === 'uae' ? 'الإمارات 🇦🇪' :
                          selectedEditCountry === 'qatar' ? 'قطر 🇶🇦' : 'الكويت 🇰🇺'
                        }</span> تلقائياً.
                      </div>

                      <button
                        type="button"
                        disabled={localAiGenerating}
                        onClick={handleLocalAiGenerate}
                        className={`bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-primary/15 cursor-pointer ${
                          localAiGenerating ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        {localAiGenerating ? (
                          <>
                            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>جاري معالجة الكلمات وتوليد الـ SEO...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>توليد وتعبئة بيانات المقالة الفورية ✨</span>
                          </>
                        )}
                      </button>
                    </div>

                    {localAiSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-[10px] font-bold text-center mt-3"
                      >
                        🎉 تم توليد محتوى المقالة وتعبئة كافة حقول النموذج بنجاح! يمكنك الآن حفظ المقالة أو تعديلها يدوياً.
                      </motion.div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عنوان المقالة (Article Title)</label>
                      <input
                        type="text"
                        required
                        value={articleTitle}
                        onChange={(e) => {
                          setArticleTitle(e.target.value);
                          if (!editingArticleSlug) {
                            setArticleSlug(e.target.value.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)/g, ''));
                          }
                        }}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="العنوان الجذاب لتصدر نتائج السيو..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">رابط المقالة الفرعي (Slug/URL Path - فريد ومميز)</label>
                      <input
                        type="text"
                        required
                        value={articleSlug}
                        onChange={(e) => setArticleSlug(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white font-mono"
                        placeholder="e.g. how-to-prevent-financial-leakage"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">التصنيف أو القسم (Category)</label>
                      <select
                        value={articleCategory}
                        onChange={(e) => setArticleCategory(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                      >
                        <option value="نصائح إدارية">نصائح إدارية 📈</option>
                        <option value="مقارنات تقنية">مقارنات تقنية 💻</option>
                        <option value="إدارة مالية">إدارة مالية 💰</option>
                        <option value="مشكلات وحلول">مشكلات وحلول 🛠️</option>
                        <option value="دليل المبتدئين">دليل المبتدئين 🏁</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">اسم الكاتب أو المحرر (Author)</label>
                      <input
                        type="text"
                        required
                        value={articleAuthor}
                        onChange={(e) => setArticleAuthor(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="المهندس إسلام عرفة"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">الوسوم (Tags - تفصل بفاصلة)</label>
                      <input
                        type="text"
                        value={articleTags}
                        onChange={(e) => setArticleTags(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white"
                        placeholder="بلايستيشن, أمان مالي, كاشير"
                      />
                    </div>
                  </div>

                  {/* MAIN IMAGE INPUT SECTION */}
                  <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                      <label className="block text-xs sm:text-sm font-black text-white flex items-center gap-1.5 justify-start">
                        <Image className="w-4 h-4 text-primary" />
                        <span>صورة المقالة الرئيسية (Article Cover Image)</span>
                      </label>
                      
                      <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setImageSourceType('url')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            imageSourceType === 'url'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رابط ويب (URL)
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageSourceType('upload')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            imageSourceType === 'upload'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رفع من الجهاز (Upload)
                        </button>
                      </div>
                    </div>

                    {imageSourceType === 'url' ? (
                      <div>
                        <input
                          type="text"
                          value={articleImage}
                          onChange={(e) => setArticleImage(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white"
                          placeholder="https://images.unsplash.com/photo-1538481199705-c710c4e965fc..."
                        />
                        {articleImage && (
                          <div className="mt-3 relative w-40 aspect-video rounded-xl overflow-hidden border border-white/10">
                            <img src={articleImage} className="w-full h-full object-cover" alt="Preview" />
                          </div>
                        )}
                        <span className="text-[10px] text-gray-500 block mt-1.5 text-right">* اتركها فارغة لاستخدام الصورة الافتراضية لصالة البلايستيشن.</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-2xl p-6 text-center cursor-pointer group">
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setImageFileName(file.name);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setLocalImageBase64(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Image className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-2" />
                          <p className="text-xs font-bold text-gray-300">
                            {imageFileName ? `📁 ${imageFileName}` : 'اضغط هنا أو اسحب الصورة لرفعها من جهازك'}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">يدعم صيغ PNG, JPG, WEBP وغيرها (سيتم حفظها محلياً وبشكل احترافي)</p>
                        </div>
                        {localImageBase64 && (
                          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                            <div className="relative w-24 aspect-video rounded-lg overflow-hidden border border-white/10 shrink-0">
                              <img src={localImageBase64} className="w-full h-full object-cover" alt="Uploaded Thumbnail" />
                            </div>
                            <div className="flex-1 min-w-0 text-right">
                              <p className="text-xs font-bold text-white truncate">{imageFileName || 'صورة مرفوعة'}</p>
                              <p className="text-[10px] text-emerald-400 mt-0.5">جاهزة للنشر والحفظ 🚀</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setLocalImageBase64('');
                                setImageFileName('');
                              }}
                              className="text-red-400 hover:text-red-300 p-2 text-xs font-bold transition-colors cursor-pointer mr-auto"
                            >
                              إزالة
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* VIDEO INPUT SECTION */}
                  <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                      <label className="block text-xs sm:text-sm font-black text-white flex items-center gap-1.5 justify-start">
                        <Video className="w-4 h-4 text-primary" />
                        <span>فيديو المقالة الاستعراضي (Article Video - اختياري)</span>
                      </label>
                      
                      <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setVideoSourceType('url')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            videoSourceType === 'url'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رابط ويب (URL)
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoSourceType('upload')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            videoSourceType === 'upload'
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          رفع من الجهاز (Upload)
                        </button>
                      </div>
                    </div>

                    {videoSourceType === 'url' ? (
                      <div>
                        <input
                          type="text"
                          value={articleVideo}
                          onChange={(e) => setArticleVideo(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left text-white"
                          placeholder="مثال: رابط يوتيوب https://www.youtube.com/watch?v=..."
                        />
                        {articleVideo && (
                          <div className="mt-3 relative w-48 aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                            <MediaRenderer src={articleVideo} type="video" controls={false} className="w-full h-full" />
                          </div>
                        )}
                        <span className="text-[10px] text-gray-500 block mt-1.5 text-right">* يمكنك لصق رابط يوتيوب أو رابط مباشر للفيديو ليعمل مباشرة مع تفاصيل المقال.</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-2xl p-6 text-center cursor-pointer group">
                          <input
                            type="file"
                            accept="video/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setVideoFileName(file.name);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setLocalVideoBase64(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Video className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-2" />
                          <p className="text-xs font-bold text-gray-300">
                            {videoFileName ? `📁 ${videoFileName}` : 'اضغط هنا أو اسحب ملف الفيديو لرفعه من جهازك'}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">يدعم صيغ MP4, WebM وغيرها (سيتم تخزينه والعمل به بكل احترافية)</p>
                        </div>
                        {localVideoBase64 && (
                          <div className="flex flex-col gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                            <div className="flex items-center gap-4">
                              <div className="relative w-24 aspect-video rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                                <video src={localVideoBase64} className="w-full h-full object-cover" muted />
                              </div>
                              <div className="flex-1 min-w-0 text-right">
                                <p className="text-xs font-bold text-white truncate">{videoFileName || 'فيديو مرفوع'}</p>
                                <p className="text-[10px] text-emerald-400 mt-0.5">جاهز للتشغيل مع المقالة 🚀</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setLocalVideoBase64('');
                                  setVideoFileName('');
                                }}
                                className="text-red-400 hover:text-red-300 p-2 text-xs font-bold transition-colors cursor-pointer mr-auto"
                              >
                                إزالة
                              </button>
                            </div>
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black mt-2">
                              <video src={localVideoBase64} controls className="w-full h-full" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-2">الوصف المختصر المثير للفضول (Snippet Description)</label>
                    <textarea
                      required
                      rows={2}
                      value={articleDescription}
                      onChange={(e) => setArticleDescription(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white resize-none"
                      placeholder="اكتب مقتطفاً صغيراً يظهر في كارد المقال الرئيسي ويجذب الضغط..."
                    />
                  </div>

                  <div>
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          🌍
                        </div>
                        <div className="text-right">
                          <h4 className="text-sm font-bold text-white">مساعد توطين وتدقيق الصياغة للهجات العربية المختلفة</h4>
                          <p className="text-[11px] text-gray-400">انقر على الدولة المطلوبة لتبديل مصطلحات مقالتك (مثل: شيفت ⇆ وردية، دراعات ⇆ ييدات، بوفيه ⇆ ضيافة) لتناسب القراء في هذا البلد تلقائياً!</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4 justify-start">
                        <button
                          type="button"
                          onClick={() => applyDialectTranslation('egypt')}
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          🇪🇬 جمهورية مصر (تطبيق اللهجة المصرية)
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDialectTranslation('saudi')}
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          🇸🇦 المملكة العربية السعودية (تطبيق اللهجة السعودية)
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDialectTranslation('uae')}
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          🇦🇪 دولة الإمارات (تطبيق اللهجة الإماراتية)
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDialectTranslation('qatar')}
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          🇶🇦 دولة قطر (تطبيق اللهجة القطرية)
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDialectTranslation('kuwait')}
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          🇰🇺 دولة الكويت (تطبيق اللهجة الكويتية)
                        </button>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-right">
                        <span className="text-[10px] text-primary font-bold block mb-1">💡 دليل تحويل المصطلحات التلقائي:</span>
                        <p className="text-[10px] text-gray-500 leading-relaxed">
                          النظام يدقق الكلمات الشائعة مثل "شيفتات" / "ورديات"، "دراعات" / "يدات"، "بوفيه" / "ضيافة"، "درج كاشير" / "صندوق الحسابات" لضمان ثقة عميلك في كل بلد عند قراءة شروحاتك التقنية والمالية.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-gray-300">محتوى المقال الكامل والعميق (Markdown أو نصوص غنية)</label>
                      <span className="text-[10px] text-gray-500">يدعم السطور والفواصل وتنسيق المقالات الطويلة</span>
                    </div>
                    <textarea
                      required
                      rows={10}
                      value={articleContent}
                      onChange={(e) => setArticleContent(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-right text-white leading-relaxed font-sans"
                      placeholder="ابدأ بكتابة نص المقالة، الشروحات، القوائم والتحليلات العميقة لصالات البلايستيشن..."
                    />
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Save className="w-4.5 h-4.5" />
                      حفظ ونشر المقال 🚀
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingArticle(false);
                        setEditingArticleSlug(null);
                        clearArticleForm();
                      }}
                      className="bg-white/5 hover:bg-white/10 text-gray-300 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                /* --- ARTICLES DASHBOARD LIST --- */
                <div className="space-y-4">
                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex items-center justify-between text-xs text-gray-400">
                    <span>عدد المقالات المنشورة حالياً: <strong className="text-white font-mono">{blogArticles.length}</strong> مقالة</span>
                    <span>تعديل ونشر محتوى المقالات يظهر تلقائياً للزوار عند فتح قسم "المدونة" في الموقع.</span>
                  </div>

                  {blogArticles.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                      <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h4 className="text-sm font-bold text-gray-400">لا توجد مقالات منشورة حالياً</h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                        قم بالضغط على "إضافة مقالة جديدة" في الأعلى لبدء إثراء موقعك بالمقالات والدروس وتحسين ظهورك في جوجل!
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 font-bold">
                            <th className="pb-3 text-right">عنوان المقال 📰</th>
                            <th className="pb-3 text-right">القسم 📂</th>
                            <th className="pb-3 text-right">الكاتب ✍️</th>
                            <th className="pb-3 text-right">تاريخ النشر 📅</th>
                            <th className="pb-3 text-center">العمليات والتحكم ⚙️</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {blogArticles.map((article: any, idx: number) => (
                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors text-right">
                              <td className="py-4 font-bold text-white max-w-xs truncate pr-1">
                                {article.title}
                              </td>
                              <td className="py-4 text-gray-300">
                                <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-[10px]">
                                  {article.category}
                                </span>
                              </td>
                              <td className="py-4 text-gray-300">
                                {article.author}
                              </td>
                              <td className="py-4 text-gray-400 font-mono text-xs">
                                {article.date}
                              </td>
                              <td className="py-4">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleEditArticle(article)}
                                    className="bg-white/5 hover:bg-primary/20 hover:text-primary text-gray-300 p-2 rounded-lg transition-all cursor-pointer"
                                    title="تعديل المقالة"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteArticle(article.slug)}
                                    className="bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 p-2 rounded-lg transition-all cursor-pointer"
                                    title="حذف المقالة نهائياً"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT 4: ADDITIONAL ADVANCED CMS */}
          {adminTab === 'additional_cms' && (
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative text-right">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 justify-start">
                    <Settings className="w-5 h-5 text-primary" />
                    <span>إدارة الأسعار المتقدمة والشهادات والأسئلة الشائعة 💎</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    تحكم بالكامل في باقات الأسعار، الأسعار الخاصة بكل دولة، آراء العملاء لكل بلد، والأسئلة الشائعة.
                  </p>
                </div>
              </div>

              {additionalCmsSuccess && (
                <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs font-bold text-center mb-6">
                  ✨ تم حفظ وتطبيق جميع التعديلات بنجاح على صالات الألعاب والأسعار والآراء والأسئلة! 🚀
                </div>
              )}

              <form onSubmit={handleSaveAdditionalCms} className="space-y-8">
                
                {/* PART 1: PACKAGES CONTROL */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Database className="w-4.5 h-4.5 text-primary" />
                    <span>تعديل الباقات والأسعار الافتراضية 💰</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {editPackages.map((pkg: any, pIdx: number) => (
                      <div key={pkg.id} className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-4">
                        <div className="text-xs font-black text-primary uppercase tracking-wider">{pkg.id === 'starter' ? 'الباقة الأساسية' : pkg.id === 'advanced' ? 'الباقة المتقدمة' : 'الباقة الدولية / باقة التصدير'}</div>
                        
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">اسم الباقة (العربية)</label>
                          <input
                            type="text"
                            required
                            value={pkg.name}
                            onChange={(e) => {
                              const updated = [...editPackages];
                              updated[pIdx].name = e.target.value;
                              setEditPackages(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">السعر الأساسي</label>
                          <input
                            type="text"
                            required
                            value={pkg.price}
                            onChange={(e) => {
                              const updated = [...editPackages];
                              updated[pIdx].price = e.target.value;
                              setEditPackages(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-left text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">العملة</label>
                          <input
                            type="text"
                            required
                            value={pkg.currency}
                            onChange={(e) => {
                              const updated = [...editPackages];
                              updated[pIdx].currency = e.target.value;
                              setEditPackages(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">المميزات (ميزة واحدة في كل سطر)</label>
                          <textarea
                            rows={4}
                            value={pkg.features.join('\n')}
                            onChange={(e) => {
                              const updated = [...editPackages];
                              updated[pIdx].features = e.target.value.split('\n').filter((line: string) => line.trim() !== '');
                              setEditPackages(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PART 2: INTERNATIONAL PRICING OVERRIDES */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Globe className="w-4.5 h-4.5 text-primary" />
                    <span>تخصيص أسعار الدول الفرعية (International Currency Conversions) 🌍</span>
                  </h3>
                  <p className="text-xs text-gray-400">تحكم بالعملة والأسعار الظاهرة لزوار الموقع من كل دولة بناءً على كود التخصيص الجغرافي.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.keys(editIntPricing).map((countryKey) => (
                      <div key={countryKey} className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-3">
                        <div className="text-xs font-black text-white flex items-center gap-1">
                          <span>{countryKey === 'egypt' ? '🇪🇬 مصر' : countryKey === 'saudi' ? '🇸🇦 السعودية' : countryKey === 'uae' ? '🇦🇪 الإمارات' : countryKey === 'qatar' ? '🇶🇦 قطر' : '🇰🇼 الكويت'}</span>
                        </div>
                        
                        <div>
                          <label className="block text-[9px] text-gray-400 mb-1">السعر المخصص للباقة</label>
                          <input
                            type="text"
                            value={editIntPricing[countryKey]?.price || ''}
                            onChange={(e) => {
                              const updated = { ...editIntPricing };
                              if (!updated[countryKey]) updated[countryKey] = { price: '', currency: '' };
                              updated[countryKey].price = e.target.value;
                              setEditIntPricing(updated);
                            }}
                            className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-2.5 py-1.5 text-xs text-left font-mono text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-gray-400 mb-1">رمز العملة (مثال: SAR)</label>
                          <input
                            type="text"
                            value={editIntPricing[countryKey]?.currency || ''}
                            onChange={(e) => {
                              const updated = { ...editIntPricing };
                              if (!updated[countryKey]) updated[countryKey] = { price: '', currency: '' };
                              updated[countryKey].currency = e.target.value;
                              setEditIntPricing(updated);
                            }}
                            className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-2.5 py-1.5 text-xs text-right text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PART 2B: COUNTRIES BASE CONFIGURATION */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6 text-right">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Database className="w-4.5 h-4.5 text-primary" />
                    <span>إعدادات العملات وأسعار ساعات اللعب الأساسية لجميع الدول 🪙</span>
                  </h3>
                  <p className="text-xs text-gray-400">تحكم بدقة في بيانات العملات، الأسماء، أسعار الساعات المستخدمة في حاسبات الأرباح في الموقع.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.keys(editCountriesConfig || {}).map((countryKey) => {
                      const country = editCountriesConfig[countryKey];
                      if (!country) return null;
                      return (
                        <div key={countryKey} className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-3">
                          <div className="text-xs font-black text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
                            <span className="text-sm">{country.flag}</span>
                            <span>{country.name}</span>
                          </div>

                          <div>
                            <label className="block text-[9px] text-gray-400 mb-1">اسم العملة الكامل (مثال: جنيه مصري)</label>
                            <input
                              type="text"
                              value={country.fullName || ''}
                              onChange={(e) => {
                                const updated = { ...editCountriesConfig };
                                updated[countryKey] = { ...updated[countryKey], fullName: e.target.value };
                                setEditCountriesConfig(updated);
                              }}
                              className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-2 py-1 text-xs text-right text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] text-gray-400 mb-1">رمز العملة (EGP / SAR)</label>
                            <input
                              type="text"
                              value={country.currency || ''}
                              onChange={(e) => {
                                const updated = { ...editCountriesConfig };
                                updated[countryKey] = { ...updated[countryKey], currency: e.target.value };
                                setEditCountriesConfig(updated);
                              }}
                              className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-2 py-1 text-xs text-left font-mono text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] text-gray-400 mb-1">اسم العملة المختصر (جنيه / ريال)</label>
                            <input
                              type="text"
                              value={country.hourlyCurrencyName || ''}
                              onChange={(e) => {
                                const updated = { ...editCountriesConfig };
                                updated[countryKey] = { ...updated[countryKey], hourlyCurrencyName: e.target.value };
                                setEditCountriesConfig(updated);
                              }}
                              className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-2 py-1 text-xs text-right text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] text-gray-400 mb-1">سعر ساعة اللعب الافتراضي</label>
                            <input
                              type="number"
                              value={country.hourlyPrice || 0}
                              onChange={(e) => {
                                const updated = { ...editCountriesConfig };
                                updated[countryKey] = { ...updated[countryKey], hourlyPrice: Number(e.target.value) };
                                setEditCountriesConfig(updated);
                              }}
                              className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-2 py-1 text-xs text-left font-mono text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] text-gray-400 mb-1">معامل العملة (سعر صرف الدولار)</label>
                            <input
                              type="number"
                              step="0.0001"
                              value={country.rate || 1}
                              onChange={(e) => {
                                const updated = { ...editCountriesConfig };
                                updated[countryKey] = { ...updated[countryKey], rate: Number(e.target.value) };
                                setEditCountriesConfig(updated);
                              }}
                              className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-2 py-1 text-xs text-left font-mono text-white"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PART 2C: CALCULATOR DEFAULT SETTINGS */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6 text-right">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <TrendingUp className="w-4.5 h-4.5 text-primary" />
                    <span>القيم الافتراضية لحاسبة الأرباح والخسائر 📈</span>
                  </h3>
                  <p className="text-xs text-gray-400">حدد القيم المفتوحة مسبقاً عند تصفح المستخدم لحاسبة الأرباح والخسائر التفاعلية في الصفحة الرئيسية.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">عدد الأجهزة الافتراضي (Default Devices)</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={calcDevicesDefault}
                        onChange={(e) => setCalcDevicesDefault(Number(e.target.value))}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left font-mono text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">ساعات تشغيل الأجهزة الافتراضية يومياً (Default Hours)</label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={calcHoursDefault}
                        onChange={(e) => setCalcHoursDefault(Number(e.target.value))}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left font-mono text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">نسبة التسريب المالي الافتراضية (Default Leak %)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={leakRateDefault}
                        onChange={(e) => setLeakRateDefault(Number(e.target.value))}
                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-left font-mono text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* PART 2D: SYSTEM FACTORY RESET */}
                <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl space-y-4 text-right">
                  <div className="flex items-center gap-2 text-red-400 justify-start">
                    <RotateCcw className="w-5 h-5" />
                    <h4 className="text-base font-black">إعادة ضبط مصنع البيانات بالكامل ⚠️ (منطقة خطرة)</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    إذا قمت بإدخال بيانات خاطئة أو واجهت مشكلة، يمكنك استخدام هذا الزر لحذف كافة تعديلات لوحة التحكم واستعادة المحتوى والأسعار الافتراضية فورا للشركة والموقع بالكامل.
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('⚠️ تحذير شديد الخطورة: هل أنت متأكد تماماً من أنك تريد حذف كل التعديلات واستعادة المحتوى والأسعار والمدونة والمقالات الافتراضية للمصنع؟ لا يمكن التراجع عن هذا الإجراء!')) {
                          localStorage.clear();
                          alert('🔄 تم إعادة تهيئة الموقع بالكامل لضبط المصنع الأصلي بنجاح! سيتم إعادة تحميل الصفحة الآن لتطبيق التغييرات.');
                          window.location.reload();
                        }
                      }}
                      className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg shadow-red-500/5"
                    >
                      إعادة تهيئة وحذف كافة تخصيصات الـ CMS واستعادة الافتراضيات 🔄
                    </button>
                  </div>
                </div>

                {/* PART 3: COUNTRY LOCALIZATION OVERRIDES (Hero, problems, titles) */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Map className="w-4.5 h-4.5 text-primary" />
                    <span>توطين وتخصيص النصوص وعناوين الدول 🗺️</span>
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-gray-400">اختر الدولة المطلوب تحرير نصوصها الموطّنة:</span>
                    <select
                      value={selectedEditCountry}
                      onChange={(e) => setSelectedEditCountry(e.target.value)}
                      className="bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-1.5 text-xs text-white"
                    >
                      <option value="egypt">جمهورية مصر العربية 🇪🇬</option>
                      <option value="saudi">المملكة العربية السعودية 🇸🇦</option>
                      <option value="uae">دولة الإمارات العربية المتحدة 🇦🇪</option>
                      <option value="qatar">دولة قطر 🇶🇦</option>
                      <option value="kuwait">دولة الكويت 🇰🇼</option>
                    </select>
                  </div>

                  {editLocalizations[selectedEditCountry] && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/30 p-4 rounded-xl border border-white/5">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">شارة الهيرو المخصصة لهذه الدولة (Hero Tagline)</label>
                        <input
                          type="text"
                          value={editLocalizations[selectedEditCountry].heroTag || ''}
                          onChange={(e) => {
                            const updated = { ...editLocalizations };
                            updated[selectedEditCountry].heroTag = e.target.value;
                            setEditLocalizations(updated);
                          }}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-xs text-right text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">عنوان الهيرو الأول المخصص (Hero Title Prefix)</label>
                        <input
                          type="text"
                          value={editLocalizations[selectedEditCountry].heroTitlePrefix || ''}
                          onChange={(e) => {
                            const updated = { ...editLocalizations };
                            updated[selectedEditCountry].heroTitlePrefix = e.target.value;
                            setEditLocalizations(updated);
                          }}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-xs text-right text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">عنوان الهيرو المميز المخصص (Hero Title Highlight)</label>
                        <input
                          type="text"
                          value={editLocalizations[selectedEditCountry].heroTitleHighlight || ''}
                          onChange={(e) => {
                            const updated = { ...editLocalizations };
                            updated[selectedEditCountry].heroTitleHighlight = e.target.value;
                            setEditLocalizations(updated);
                          }}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-xs text-right text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">الوصف التعريفي للهيرو المخصص (Hero Description)</label>
                        <textarea
                          rows={3}
                          value={editLocalizations[selectedEditCountry].heroDescription || ''}
                          onChange={(e) => {
                            const updated = { ...editLocalizations };
                            updated[selectedEditCountry].heroDescription = e.target.value;
                            setEditLocalizations(updated);
                          }}
                          className="w-full bg-black/50 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-xs text-right text-white leading-relaxed resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PART 4: TESTIMONIALS CONTROL FOR CHOSEN COUNTRY */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Quote className="w-4.5 h-4.5 text-primary" />
                    <span>آراء وشهادات العملاء المخصصة ({selectedEditCountry === 'egypt' ? '🇪🇬 مصر' : selectedEditCountry === 'saudi' ? '🇸🇦 السعودية' : selectedEditCountry === 'uae' ? '🇦🇪 الإمارات' : selectedEditCountry === 'qatar' ? '🇶🇦 قطر' : '🇰🇼 الكويت'}) 🗣️</span>
                  </h3>

                  {/* Testimonial List for chosen country */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {editLocalizations[selectedEditCountry]?.testimonials?.map((t: any, idx: number) => (
                        <div key={idx} className="bg-black/40 border border-white/15 rounded-xl p-4 flex gap-4 text-right items-start">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 bg-black/30">
                            <MediaRenderer src={t.image} type="image" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-black text-white">{t.name}</h4>
                              <button
                                type="button"
                                onClick={() => handleDeleteTestimonial(selectedEditCountry, idx)}
                                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[10px] text-primary font-bold mt-0.5">{t.role}</p>
                            <p className="text-[11px] text-gray-400 mt-2 font-light leading-relaxed">"{t.quote}"</p>
                            <div className="flex gap-0.5 mt-1">
                              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Testimonial Sub-form */}
                    <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-4">
                      <div className="text-xs font-black text-white">➕ إضافة رأي عميل جديد للبلد الحالي:</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">اسم العميل</label>
                          <input
                            type="text"
                            value={newTestName}
                            onChange={(e) => setNewTestName(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white"
                            placeholder="المهندس أحمد علي"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">وصف العميل أو منصبه</label>
                          <input
                            type="text"
                            value={newTestRole}
                            onChange={(e) => setNewTestRole(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white"
                            placeholder="مالك صالة PlayStation Zone"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">التقييم (عدد النجوم)</label>
                          <select
                            value={newTestRating}
                            onChange={(e) => setNewTestRating(Number(e.target.value))}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                            <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                            <option value={3}>⭐⭐⭐ (3/5)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">رأي العميل الكامل (الشهادة)</label>
                        <textarea
                          rows={2}
                          value={newTestQuote}
                          onChange={(e) => setNewTestQuote(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white leading-relaxed resize-none"
                          placeholder="السيستم غيّر تماماً طريقة إدارتي للصالة، لا توجد أي تسريبات مالية والدعم الفني ممتاز..."
                        />
                      </div>

                      {/* Testimonial Image selector with Device Import */}
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-400">صورة العميل (Avatar)</span>
                          <div className="flex bg-black/40 border border-white/10 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => setTestImageSourceType('url')}
                              className={`px-2 py-1 rounded text-[9px] font-bold transition-all ${
                                testImageSourceType === 'url' ? 'bg-primary text-white' : 'text-gray-400'
                              }`}
                            >
                              رابط ويب
                            </button>
                            <button
                              type="button"
                              onClick={() => setTestImageSourceType('upload')}
                              className={`px-2 py-1 rounded text-[9px] font-bold transition-all ${
                                testImageSourceType === 'upload' ? 'bg-primary text-white' : 'text-gray-400'
                              }`}
                            >
                              رفع صورة من الجهاز
                            </button>
                          </div>
                        </div>

                        {testImageSourceType === 'url' ? (
                          <input
                            type="text"
                            value={testImageLink}
                            onChange={(e) => setTestImageLink(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-left text-white"
                            placeholder="https://images.unsplash.com/photo-1534528741775-53994a69daeb..."
                          />
                        ) : (
                          <div className="space-y-2">
                            <div className="relative border border-dashed border-white/10 hover:border-primary/50 transition-colors rounded-lg p-3 text-center cursor-pointer group">
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setTestImgFileName(file.name);
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setTestLocalImgBase64(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              <Image className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors mx-auto mb-1" />
                              <p className="text-[10px] text-gray-300">
                                {testImgFileName ? `📁 ${testImgFileName}` : 'اضغط لاستيراد صورة العميل من جهازك'}
                              </p>
                            </div>
                            {testLocalImgBase64 && (
                              <div className="flex items-center gap-3 bg-white/[0.01] p-1.5 rounded-lg border border-white/5">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                                  <img src={testLocalImgBase64} className="w-full h-full object-cover" alt="Uploaded Profile" />
                                </div>
                                <span className="text-[10px] text-emerald-400">جاهزة للاستخدام 🚀</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleAddTestimonial(selectedEditCountry)}
                          className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg shadow-primary/10"
                        >
                          إدراج رأي العميل المذكور ➕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PART 5: FAQS CONTROL FOR CHOSEN COUNTRY */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
                  <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <HelpCircle className="w-4.5 h-4.5 text-primary" />
                    <span>الأسئلة الشائعة المخصصة ({selectedEditCountry === 'egypt' ? '🇪🇬 مصر' : selectedEditCountry === 'saudi' ? '🇸🇦 السعودية' : selectedEditCountry === 'uae' ? '🇦🇪 الإمارات' : selectedEditCountry === 'qatar' ? '🇶🇦 قطر' : '🇰🇼 الكويت'}) 🛠️</span>
                  </h3>

                  {/* FAQ List */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {editLocalizations[selectedEditCountry]?.faqs?.map((f: any, idx: number) => (
                        <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-3 flex justify-between items-start text-right">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-white">س: {f.q}</h4>
                            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">ج: {f.a}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteFaq(selectedEditCountry, idx)}
                            className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add FAQ Sub-form */}
                    <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-4">
                      <div className="text-xs font-black text-white">➕ إضافة سؤال وجواب جديد للبلد الحالي:</div>
                      
                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">السؤال الشائع</label>
                        <input
                          type="text"
                          value={newFaqQ}
                          onChange={(e) => setNewFaqQ(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white"
                          placeholder="مثال: هل يتوفر دعم فني لبرنامج إدارة البلايستيشن؟"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">الجواب على السؤال</label>
                        <textarea
                          rows={2}
                          value={newFaqA}
                          onChange={(e) => setNewFaqA(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 focus:border-primary/50 focus:outline-none rounded-lg px-3 py-2 text-xs text-right text-white leading-relaxed resize-none"
                          placeholder="نعم، نوفر دعماً فنياً احترافياً مدى الحياة..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleAddFaq(selectedEditCountry)}
                          className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg shadow-primary/10"
                        >
                          إدراج السؤال المذكور ➕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SAVE BUTTONS */}
                <div className="pt-6 border-t border-white/5 flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
                  >
                    <Save className="w-4.5 h-4.5" />
                    حفظ وتعميم التعديلات المتقدمة ونشرها فوراً على الموقع 🚀
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB CONTENT 6: TOPICAL AUTHORITY PLAN */}
          {adminTab === 'topical_authority' && (
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative text-right space-y-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
              
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 justify-start">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>مخطط سلطة المحتوى الكاملة (Topical Authority Blueprint) 🏆</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  اكتشف المواضيع الـ 14 المفقودة التي تضمن لك الهيمنة الكاملة على محركات البحث وتصدّر نتائج جوجل. نفترض أن المنافسين لديهم محتوى ضعيف، وهذه هي خريطة طريقك للتفوّق عليهم.
                </p>
              </div>

              {/* Category selector */}
              {(() => {
                const categories = [
                  { id: 'commercial', name: '📈 مواضيع تجارية (Commercial)' },
                  { id: 'educational', name: '🎓 مواضيع تعليمية (Educational)' },
                  { id: 'operational', name: '⚙️ مواضيع تشغيلية (Operational)' },
                  { id: 'financial', name: '💰 مواضيع مالية (Financial)' },
                  { id: 'technical', name: '🛠️ مواضيع تقنية (Technical)' },
                  { id: 'management', name: '👨‍💼 مواضيع إدارية (Management)' },
                  { id: 'regional', name: '🌍 مواضيع إقليمية (Regional)' }
                ];

                const topicsData: Record<string, Array<{
                  title: string;
                  categoryLabel: string;
                  intent: string;
                  value: string;
                  difficulty: 'Easy' | 'Medium' | 'Hard';
                  traffic: string;
                  conversion: 'Very High' | 'High' | 'Medium' | 'Low';
                  linking: string;
                  description: string;
                  tags: string;
                }>> = {
                  commercial: [
                    {
                      title: "أفضل برنامج كاشير صالات بلايستيشن 2026: مقارنة الأسعار والمميزات",
                      categoryLabel: "مواضيع تجارية",
                      intent: "البحث عن أفضل الحلول والمقارنة بين البرامج المتاحة في السوق قبل اتخاذ قرار الشراء المالي.",
                      value: "توجيه المستثمر وصاحب الصالة مباشرة إلى الباقات الحصينة والحلول مدى الحياة التي نقدمها بنسبة تحويل استثنائية.",
                      difficulty: "Medium",
                      traffic: "250 - 400 زيارة مستهدفة شهرياً",
                      conversion: "Very High",
                      linking: "يربط مباشرة بجدول الباقات الرئيسي (Pricing Section) ومقالات دراسات الحالة الفعلية لتطبيقات صُنّاع الفكرة.",
                      description: "مقارنة فنية محايدة تبين تفوق نظامنا الأوفلاين والملكية مدى الحياة ضد الأنظمة السحابية والاشتراكات الشهرية المتعبة.",
                      tags: "برنامج كاشير بلايستيشن, سيستم صالات بلايستيشن, مقارنة كاشير بلايستيشن"
                    },
                    {
                      title: "دراسة جدوى مشروع صالة بلايستيشن في مصر والخليج: التكاليف والأرباح المتوقعة",
                      categoryLabel: "مواضيع تجارية",
                      intent: "رائد أعمال أو مستثمر يبحث عن الأرقام الفعلية، التكاليف التشغيلية، ومعدلات العائد الاستثماري (ROI).",
                      value: "ترسيخ اسم النظام كأول وأهم أصل تقني يجب إدراجه في ميزانية دراسة الجدوى لمنع التسريبات والسيطرة الكاملة.",
                      difficulty: "Easy",
                      traffic: "800 - 1200 زيارة مستهدفة شهرياً",
                      conversion: "High",
                      linking: "يشير مباشرة إلى الباقة الاحترافية (Professional Package) مع زر لحساب ميزانية الهاردوير والسيستم.",
                      description: "دليل مالي يوضح بالتفصيل كيفية حساب تكلفة كبائن الألعاب، الأجهزة، الكافيه، والشاشات، وكيف يضمن السيستم استرجاع رأس المال.",
                      tags: "دراسة جدوى بلايستيشن, تكلفة صالة بلايستيشن, أرباح مشروع بلايستيشن"
                    }
                  ],
                  educational: [
                    {
                      title: "كيفية حساب تكلفة ساعة البلايستيشن (عادي، مالتي، VIP) بشكل هندسي دقيق",
                      categoryLabel: "مواضيع تعليمية",
                      intent: "الرغبة في معرفة كيفية تسعير ساعات اللعب والخدمات الملحقة لتحقيق أقصى ربحية وتغطية المصاريف الثابتة.",
                      value: "إثبات خبرتنا الهندسية ومساعدة العميل في ضبط هوامش أرباحه، مع إظهار سهولة أتمتة هذه التسعيرات وتغييرها عبر نظامنا.",
                      difficulty: "Easy",
                      traffic: "600 - 900 زيارة شهرياً",
                      conversion: "Medium",
                      linking: "يربط بفقرة 'تخصيص كامل للهوية والأسعار والمشروبات' في لوحة التحكم وقسم التجربة المجانية.",
                      description: "دليل تعليمي يشرح الفروقات الرياضية بين تسعير الغرف العادية وغرف الـ VIP بناءً على استهلاك الكهرباء وإهلاك الدراعات والأجهزة.",
                      tags: "تسعير ساعة بلايستيشن, تكلفة صالة بلايستيشن, إدارة صالات بلايستيشن"
                    },
                    {
                      title: "طريقة إعداد شبكة صالات البلايستيشن وربط الأجهزة بالسيرفر بدون إنترنت",
                      categoryLabel: "مواضيع تعليمية",
                      intent: "فهم تقني لكيفية ربط الأجهزة بشبكة داخلية محلية مؤمنة والتحكم بالأجهزة من جهاز الكاشير المركزي.",
                      value: "يجذب المهتمين بالحلول المستقلة (Offline) ويضع علامتنا كمرجعية هندسية تقدم الدعم والتركيب مجاناً مع الباقات.",
                      difficulty: "Medium",
                      traffic: "350 - 500 زيارة شهرياً",
                      conversion: "Medium",
                      linking: "يربط بصفحة الشريك الهندسي (About Us) ويوجه لطلب استشارة مجانية مع المهندس إسلام عرفة.",
                      description: "شرح فني مبسط لكيفية إعداد الـ Router، والـ IP الثابت لكل جهاز لضمان سرعة تواصل الأجهزة مع سيستم الكاشير دون انقطاع.",
                      tags: "ربط شبكة بلايستيشن, سيرفر صالة بلايستيشن, شبكة محلية بلايستيشن"
                    }
                  ],
                  operational: [
                    {
                      title: "دليل تنظيم ورديات (شيفتات) العمال في الصالات دون ثغرات محاسبية",
                      categoryLabel: "مواضيع تشغيلية",
                      intent: "البحث عن طريقة عملية لتقسيم العمل بين موظفي الاستقبال/الكاشير دون حدوث عجز مالي أو تلاعب في التقارير.",
                      value: "تسليط الضوء على ميزة 'تقارير إغلاق الوردية والدرج المحصن بالباسوورد' في نظامنا، وكيف يحل المشكلة جذرياً.",
                      difficulty: "Easy",
                      traffic: "450 - 600 زيارة شهرياً",
                      conversion: "High",
                      linking: "يشير مباشرة إلى ميزة التحكم السيادي للأدمن وقسم طلب العرض التجريبي.",
                      description: "خطوات عملية لتسليم وتسلم الوردية، جرد الكافيه، مطابقة درج الكارت والكي نت والكاش، وكيفية إرسال تقرير فوري للأدمن.",
                      tags: "ورديات كاشير, إغلاق الوردية بلايستيشن, محاسبة صالات ألعاب"
                    },
                    {
                      title: "كيفية إدارة مخزن المشروبات والمأكولات (البوفيه) في الصالات الترفيهية",
                      categoryLabel: "مواضيع تشغيلية",
                      intent: "تحسين عمليات بيع البوفيه وجرد المواد الأولية والمشروبات لضمان عدم ضياع المنتجات أو سرقتها.",
                      value: "يقدم قسم البوفيه والمخزن في نظامنا كأداة لا غنى عنها لتحقيق أرباح موازية لساعات اللعب وسد ثغرة ضياع المشروبات.",
                      difficulty: "Easy",
                      traffic: "300 - 450 زيارة شهرياً",
                      conversion: "High",
                      linking: "يوجه لمقارنة الباقات واختيار الباقة الاحترافية (Professional Package) التي تشمل نظام الكافيه المتكامل.",
                      description: "كيفية تحويل كبائن اللعب إلى نقاط بيع بوفيه، إعداد منيو المشروبات والمسليات، وتتبع حركة الجرد تلقائياً مع كل فاتورة لعب.",
                      tags: "إدارة بوفيه بلايستيشن, جرد مخزن بلايستيشن, كافيير صالة ألعاب"
                    }
                  ],
                  financial: [
                    {
                      title: "طرق كشف التلاعب والسرقة في صالات البلايستيشن: 5 ثغرات قاتلة",
                      categoryLabel: "مواضيع مالية",
                      intent: "البحث بقلق عن كيفية حماية الصالة من سرقة ساعات اللعب (تشغيل الأجهزة خارج السيستم) أو سرقة البوفيه.",
                      value: "يمثل الوجع الأكبر والدافع الأقوى للشراء. يعرض كيف يمنع السيستم تشغيل الشاشات نهائياً دون تسجيل فاتورة.",
                      difficulty: "Easy",
                      traffic: "500 - 800 زيارة شهرياً",
                      conversion: "Very High",
                      linking: "يشير فوراً لـ 'حصانة كاملة وتشفير تام للأهداف والتقارير المالية' ورابط واتساب الأدمن المباشر للتجربة السريعة.",
                      description: "تحليل لأشهر 5 طرق يلجأ إليها العمال لتشغيل الأجهزة سراً، وكيف يقضي نظام التشفير والتحكم بالأجهزة الخاص بنا عليها تماماً.",
                      tags: "منع سرقة بلايستيشن, أمان صالة ألعاب, حماية درج الكاشير"
                    },
                    {
                      title: "المعادلة الذهبية لحساب صافي الأرباح الشهرية لمشروع الترفيه بعد خصم الإهلاك",
                      categoryLabel: "مواضيع مالية",
                      intent: "أصحاب صالات يبحثون عن تقييم حقيقي لربحيتهم وصافي الدخل بعد احتساب فواتير الكهرباء، إهلاك الدراعات والأجهزة، والرواتب.",
                      value: "يعزز الثقة المعرفية الهندسية ويقنعهم بأن لوحة تحكم نظامنا توفر هذه التقارير المحاسبية التفصيلية تلقائياً وبأقل جهد.",
                      difficulty: "Easy",
                      traffic: "200 - 350 زيارة شهرياً",
                      conversion: "Medium",
                      linking: "يربط بمقالات دراسة الجدوى ومميزات التقارير المالية للأدمن.",
                      description: "شرح مبسط لمعادلة التدفق النقدي، وكيفية جدولة فترات صيانة الأجهزة وإهلاكها لحساب الأرباح الحقيقية غير المضللة.",
                      tags: "حساب أرباح بلايستيشن, ميزانية صالة ألعاب, إهلاك أجهزة بلايستيشن"
                    }
                  ],
                  technical: [
                    {
                      title: "لماذا تتفوق الأنظمة المحلية (Offline POS) على الأنظمة السحابية في إدارة الصالات؟",
                      categoryLabel: "مواضيع تقنية",
                      intent: "المقارنة بين استقرار نظام يعمل أوفلاين بالكامل داخل الصالة وبين نظام معتمد على السحابة والإنترنت المتذبذب.",
                      value: "تأكيد وتبرير ميزتنا التنافسية الكبرى: أمان أوفلاين 100%، بدون تعطل العمل، وبدون رسوم اشتراك شهري مستمرة.",
                      difficulty: "Easy",
                      traffic: "400 - 600 زيارة شهرياً",
                      conversion: "High",
                      linking: "يوجه مباشرة إلى البند الأول في الباقة الذهبية Starter والاحترافية Professional: 'حصانة كاملة ضد انقطاع الإنترنت'.",
                      description: "مقارنة عادلة تظهر عيوب تعطل الإنترنت وتأثيره على غضب الزبائن وضياع الحسابات في الأنظمة السحابية، مقابل سرعة وأمان النظام المحلي.",
                      tags: "برنامج أوفلاين بلايستيشن, سيستم كاشير محلي, أمان برنامج الكاشير"
                    },
                    {
                      title: "متطلبات تشغيل سيرفر الكاشير على الأجهزة الضعيفة والمتوسطة",
                      categoryLabel: "مواضيع تقنية",
                      intent: "معرفة ما إذا كان نظام كاشير IDEA Makers يحتاج لشراء أجهزة كمبيوتر باهظة لتشغيل السيرفر.",
                      value: "طمأنة المشترين بأن النظام خفيف، سريع، ومبني بلغة برمجية محسنة تعمل على أقل الإمكانيات المتاحة بكفاءة تامة.",
                      difficulty: "Easy",
                      traffic: "300 - 400 زيارة شهرياً",
                      conversion: "Medium",
                      linking: "يربط بقسم الدعم الفني وخدمات التركيب والتدريب الميداني في الصالة.",
                      description: "قائمة بالمواصفات الفنية الدنيا والمنصوح بها لتشغيل النظام (RAM, CPU, Windows)، مع توضيح خفة قاعدة البيانات المحلية.",
                      tags: "مواصفات سيرفر الكاشير, متطلبات نظام بلايستيشن, تشغيل سيستم كاشير"
                    }
                  ],
                  management: [
                    {
                      title: "كيف تضع هيكل رواتب وحوافز عادل لموظفي الكاشير والعمال في صالتك؟",
                      categoryLabel: "مواضيع إدارية",
                      intent: "الرغبة في تحفيز العمال لزيادة المبيعات والضيافة والتعامل بلطف مع الزوار، مع الحفاظ على الانضباط المالي والالتزام.",
                      value: "طرح دور نظام التقارير التلقائي في فرز مبيعات كل وردية لتسهيل حساب العمولات والحوافز بدقة خالية من المجاملات.",
                      difficulty: "Easy",
                      traffic: "350 - 500 زيارة شهرياً",
                      conversion: "Medium",
                      linking: "يربط بقسم تقارير الوردية ومبيعات البوفيه التفصيلية.",
                      description: "دليل إداري يوضح كيفية إعطاء نسبة بسيطة للعامل من مبيعات البوفيه وأوردرات الزبائن لتنشيط المبيعات اليومية بشكل منضبط.",
                      tags: "رواتب عمال بلايستيشن, حوافز كاشير, إدارة موظفي الصالة"
                    },
                    {
                      title: "خطط التوسع والمستقبل: متى تتحول من فرع بلايستيشن واحد إلى سلسلة فروع؟",
                      categoryLabel: "مواضيع إدارية",
                      intent: "أصحاب صالات ناجحة يفكرون في فتح فروع جديدة وتوسيع نطاق أعمالهم وبناء براند وطني تجاري متكامل.",
                      value: "عرض بنية النظام القابلة للتخصيص الكامل لربط الفروع، والقدرة الهندسية لشركة IDEA Makers على بناء إصدار سحابي مخصص لك.",
                      difficulty: "Easy",
                      traffic: "150 - 250 زيارة شهرياً",
                      conversion: "High",
                      linking: "يوجه مباشرة للتواصل حول 'طلب تصميم وتطوير النظام المخصص لإدارة الفروع المتعددة المربوط سحابياً'.",
                      description: "المعايير المالية والإدارية التي يجب استيفاؤها قبل التفكير في التوسع، وكيف تلعب البرمجيات الموحدة دور الصمغ الذي يربط الفروع.",
                      tags: "فروع صالات بلايستيشن, إدارة فروع متعددة, توسيع مشروع بلايستيشن"
                    }
                  ],
                  regional: [
                    {
                      title: "تراخيص صالات الألعاب والترفيه في مصر 2026: الإجراءات والشروط القانونية",
                      categoryLabel: "مواضيع إقليمية",
                      intent: "المستثمرون الجدد في مصر يبحثون عن الجهات الحكومية، الرسوم الرسمية، والموافقات المطلوبة لترخيص صالة بلايستيشن قانونياً.",
                      value: "جذب فئة 'المشترين الجدد' في مصر في اللحظة الصفرية لتأسيس المشروع، وكسب ثقتهم مبكراً لبيع الباقة المناسبة.",
                      difficulty: "Medium",
                      traffic: "1000 - 1500 زيارة شهرياً",
                      conversion: "High",
                      linking: "يربط فوراً بالباقة الأساسية Starter كأفضل بداية اقتصادية مع تأمين مالي ضد العمال في مصر.",
                      description: "خطوات الترخيص من الحي والبلدية والمصنفات الفنية في مصر، مع نصائح قانونية لتجنب المخالفات والغرامات الإدارية.",
                      tags: "ترخيص صالة بلايستيشن بمصر, مصنفات بلايستيشن, شروط فتح صالة ألعاب"
                    },
                    {
                      title: "شروط ترخيص مركز ألعاب إلكترونية (بلايستيشن) في السعودية: الدليل الشامل للبلدية",
                      categoryLabel: "مواضيع إقليمية",
                      intent: "المبادرون والمستثمرون بالمملكة يبحثون عن شروط بلدي، التراخيص الحكومية لافتتاح مركز ترفيهي إلكتروني رسمي.",
                      value: "استهداف شريحة المستثمرين السعوديين مباشرة وعرض الأسعار بالريال السعودي والباقة الاحترافية مع دعم متكامل بالمملكة.",
                      difficulty: "Medium",
                      traffic: "800 - 1200 زيارة شهرياً",
                      conversion: "High",
                      linking: "يوجه لتعديل أسعار بلدك (السعودية 🇸🇦) والاطلاع على الباقة الاحترافية بالريال السعودي مع الدعم الفني.",
                      description: "دليل بلدي الشامل للشروط الفنية والصحية والمهنية المطلوبة لترخيص مراكز الترفيه بالرياض وجدة وبقية مناطق المملكة بالكامل.",
                      tags: "ترخيص بلايستيشن بالسعودية, شروط ترخيص ألعاب السعودية, بلدية مراكز الترفيه"
                    }
                  ]
                };

                // Using activeSubTab state declared at the top-level of the component
                const activeTopics = topicsData[activeSubTab] || [];

                return (
                  <div className="space-y-6">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2 bg-[#030303]/40 p-1.5 rounded-2xl border border-white/5">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveSubTab(cat.id)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            activeSubTab === cat.id
                              ? 'bg-primary text-white shadow-md shadow-primary/20'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Topics Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {activeTopics.map((topic, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 hover:border-primary/20 p-6 rounded-2xl space-y-6 transition-all text-right group relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-2 h-full bg-primary/25 group-hover:bg-primary transition-all" />
                          
                          <div>
                            <span className="text-[10px] bg-primary/25 border border-primary/40 text-primary px-2.5 py-0.5 rounded-full font-bold">
                              {topic.categoryLabel}
                            </span>
                            <h3 className="text-lg font-black text-white mt-2 leading-snug">{topic.title}</h3>
                            <p className="text-xs text-gray-400 mt-2 leading-relaxed">{topic.description}</p>
                          </div>

                          {/* SEO Criteria Grid (6 elements required!) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/40 p-4 rounded-xl border border-white/5 text-xs">
                            <div className="space-y-1">
                              <span className="text-[10px] text-primary font-black block">🔍 قصد البحث (Search Intent)</span>
                              <span className="text-gray-300 leading-relaxed block text-[11px]">{topic.intent}</span>
                            </div>

                            <div className="space-y-1 border-r sm:border-r-0 sm:pr-0 pr-0 md:border-r border-white/5">
                              <span className="text-[10px] text-primary font-black block">💼 القيمة التجارية (Business Value)</span>
                              <span className="text-gray-300 leading-relaxed block text-[11px]">{topic.value}</span>
                            </div>

                            <div className="space-y-1 pt-2 border-t border-white/5">
                              <span className="text-[10px] text-primary font-black block">📈 صعوبة التصدر (Ranking Difficulty)</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  topic.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                  topic.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                  'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                  {topic.difficulty === 'Easy' ? 'سهل جداً (Easy)' : topic.difficulty === 'Medium' ? 'متوسط (Medium)' : 'صعب (Hard)'}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1 pt-2 border-t border-white/5 md:border-r border-white/5">
                              <span className="text-[10px] text-primary font-black block">🚦 الزيارات المتوقعة (Expected Traffic)</span>
                              <span className="text-gray-300 font-mono mt-0.5 block text-[11px]">{topic.traffic}</span>
                            </div>

                            <div className="space-y-1 pt-2 border-t border-white/5 col-span-1 sm:col-span-2">
                              <span className="text-[10px] text-primary font-black block">🚀 إمكانية التحويل (Conversion Potential)</span>
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1 ${
                                topic.conversion === 'Very High' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                                topic.conversion === 'High' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                                'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                              }`}>
                                {topic.conversion === 'Very High' ? 'مرتفعة للغاية 🔥 (Very High)' : topic.conversion === 'High' ? 'مرتفعة 👍 (High)' : 'متوسطة 📈 (Medium)'}
                              </span>
                            </div>

                            <div className="space-y-1 pt-2 border-t border-white/5 col-span-1 sm:col-span-2">
                              <span className="text-[10px] text-primary font-black block">🔗 الربط الداخلي الاستراتيجي (Internal Linking)</span>
                              <span className="text-gray-300 leading-relaxed block text-[11px]">{topic.linking}</span>
                            </div>
                          </div>

                          {/* Instant Draft Button */}
                          <div className="flex justify-end pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setArticleTitle(topic.title);
                                setArticleDescription(topic.description);
                                setArticleCategory(topic.categoryLabel);
                                setArticleTags(topic.tags);
                                setArticleContent(`# ${topic.title}\n\n## 📝 المخطط الاستراتيجي للمقال (Topical Authority Outline)\n- **الغرض من المقال:** ${topic.intent}\n- **القيمة المضافة للأعمال:** ${topic.value}\n- **تكتيك الربط الداخلي المعتمد:** ${topic.linking}\n\n---\n\n## 📌 مقدمة تمهيدية\nاكتب مقدمة جذابة تستهدف أصحاب الصالات...\n\n## 💡 الفقرة الرئيسية الأولى\nتفصيل حل المشكلة والوجع المالي أو الإداري...\n\n## 🛠️ كيف يحل نظام IDEA Makers PlayStation POS هذه الثغرة؟\nاربط الميزات الفنية بنظام التشغيل مدى الحياة والأمان المالي المحصن...\n\n## 🚀 الخاتمة ودعوة للتواصل (Call to Action)`);
                                setArticleSlug(topic.title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)/g, ''));
                                
                                setAdminTab('blog_cms');
                                setIsEditingArticle(true);
                                alert('✨ تم نسخ مواصفات ومخطط الموضوع بنجاح وتجهيزه كمسودة في منشئ المقالات! يمكنك الآن صياغته ونشره بضغطة زر.');
                              }}
                              className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border border-primary/20 w-full sm:w-auto justify-center"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              تحويل هذا الموضوع إلى مسودة مقال فوراً ✍️
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* SEO Authority Disclaimer */}
                    <div className="bg-[#030303]/40 border border-white/5 p-5 rounded-2xl text-xs text-gray-400 leading-relaxed space-y-2 text-right">
                      <div className="font-bold text-white flex items-center gap-1.5 justify-start">
                        <Info className="w-3.5 h-3.5 text-amber-400" />
                        ملاحظة سلطة المحتوى الهندسية (Topical Authority Note):
                      </div>
                      <p>
                        إن صياغة هذه المواضيع ونشرها بشكل متتابع في مدونتك يضمن تغطية كاملة وشاملة لكل نوايا البحث الممكنة لأصحاب الصالات والمستثمرين الجدد. نظرًا لأن المنافسين يفتقرون لهذه الرؤية التقنية العميقة، فإن تغطية هذه المواضيع تجعل موقع صُنّاع الفكرة **المرجعية الوحيدة والأقوى** في عيون محرك بحث جوجل (Semantic Search Dominance).
                      </p>
                    </div>

                  </div>
                );
              })()}
            </div>
          )}

          {adminTab === 'enterprise_cms' && (
            <div className="space-y-12">
              <EnterpriseCms onBackToLanding={onBackToLanding} />
            </div>
          )}

          {/* Close the Authenticated Admin Workspace block */}
          </>
        )}

      </div>
    </div>
  );
};

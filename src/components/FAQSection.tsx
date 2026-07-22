import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Calculator, 
  Zap, 
  Compass, 
  HelpCircle, 
  MessageCircle,
  Sparkles,
  DollarSign,
  LifeBuoy
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category?: string;
  isCountrySpecific?: boolean;
}

interface FAQSectionProps {
  countryFaqs?: FAQItem[];
  defaultFaqs?: FAQItem[];
  countryName: string;
  countryFlag: string;
  onContactFounder: (message?: string) => void;
}

export default function FAQSection({ 
  countryFaqs = [], 
  countryName, 
  countryFlag,
  onContactFounder 
}: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Core Predefined High-Converting FAQ List
  const masterFaqs = useMemo(() => {
    return [
      // 🟣 التجربة
      {
        q: "هل يمكنني تجربة النظام قبل الشراء؟",
        a: "نعم، بكل تأكيد. نوفر لك نسخة تجريبية مجانية بالكامل لتقوم بتحميلها وتشغيلها بنفسك في الصالة. يمكنك اختبار كل الميزات والخصائص والتأكد من مطابقة النظام لجميع احتياجاتك اليومية قبل دفع أي مبالغ مالية.",
        category: "trial"
      },
      {
        q: "كم مدة النسخة التجريبية؟",
        a: "مدة النسخة التجريبية هي 3 أيام (72 ساعة تشغيلية)، وهي كافية جداً لتجربة كافة وظائف النظام، تسجيل الجلسات، جرد المنتجات، ومتابعة تقارير الكاشير والوردية مع موظفيك لضمان رضاك التام عن البرنامج.",
        category: "trial"
      },
      {
        q: "هل هناك أي التزام بعد انتهاء التجربة؟",
        a: "لا يوجد أي التزام مالي أو تعاقدي على الإطلاق. بعد انتهاء فترة الـ 3 أيام (72 ساعة تشغيلية)، يمكنك اختيار شراء الترخيص مدى الحياة لتفعيل البرنامج بشكل دائم، أو التوقف ببساطة دون دفع أي رسوم مخفية.",
        category: "trial"
      },
      
      // 🟣 التشغيل
      {
        q: "هل يعمل بدون إنترنت؟",
        a: "نعم، يعمل النظام بنسبة 100% دون الحاجة لأي اتصال بالإنترنت (أوفلاين بالكامل). تُحفظ جميع البيانات وجلسات اللعب والمبيعات محلياً على جهازك لضمان السرعة القصوى والاستقرار التام حتى عند انقطاع الشبكة.",
        category: "operation"
      },
      {
        q: "هل يمكن تشغيل أكثر من جهاز؟",
        a: "نعم، يدعم النظام الربط الشبكي الداخلي في صالتك (Local LAN). يمكنك تشغيل النظام على جهاز الكاشير الرئيسي والربط مع أجهزة فرعية متعددة لإدارة الطلبات والتحكم بالصالات في نفس الوقت وبسرعة فائقة.",
        category: "operation"
      },
      {
        q: "هل يدعم PS4 وPS5؟",
        a: "نعم، يدعم جميع أجيال بلايستيشن (PlayStation 4, PlayStation 5) بالإضافة إلى أجهزة الإكس بوكس (Xbox)، نظارات الواقع الافتراضي (VR)، محاكيات القيادة، وحتى طاولات البلياردو والـ Ping Pong والغرف الخاصة VIP.",
        category: "operation"
      },
      {
        q: "هل يدعم الكافيه والمشروبات؟",
        a: "نعم، يحتوي النظام على نظام كاشير وجرد متكامل ومبسط للمأكولات، المشروبات، ومنتجات الكافيه. يمكنك إضافة المنتجات إلى الحساب بلمسة واحدة، وسيتم خصمها تلقائياً من المخزن ودمجها في فاتورة العميل الإجمالية.",
        category: "operation"
      },

      // 🟣 الأمان
      {
        q: "أين يتم حفظ البيانات؟",
        a: "يتم حفظ جميع بيانات صالتك محلياً ومشفرة بالكامل داخل قاعدة بيانات آمنة على القرص الصلب لجهاز الكمبيوتر الخاص بك. لا يستطيع أي طرف خارجي الوصول إليها، مما يمنحك سرية تامة وخصوصية مطلقة لتقارير أرباحك وعملائك.",
        category: "security"
      },
      {
        q: "ماذا يحدث إذا انقطع الكهرباء؟",
        a: "النظام مصمم بتقنيات مقاومة للأخطاء (Fault-Tolerant). عند انقطاع الكهرباء فجأة، يستعيد البرنامج آخر حالة تشغيلية تلقائياً فور عودة الطاقة دون أي فقدان للبيانات أو الجلسات الجارية، ويحافظ على دقة التوقيتات المسجلة.",
        category: "security"
      },
      {
        q: "ماذا يحدث إذا تعطل الكمبيوتر؟",
        a: "لأن بياناتك محفوظة بشكل منظم، يمكنك ببساطة نقل ملف قاعدة البيانات والبرنامج إلى أي لابتوب أو جهاز كمبيوتر آخر يعمل بنظام ويندوز، وستعود صالتك للعمل بكفاءة خلال أقل من 5 دقائق وكأن شيئاً لم يكن.",
        category: "security"
      },
      {
        q: "هل يمكن أخذ نسخة احتياطية؟",
        a: "نعم، يدعم النظام خاصية النسخ الاحتياطي التلقائي والدوري (Backup). يمكنك ضبط النظام ليقوم بنسخ بياناتك تلقائياً يومياً أو عند إغلاق الوردية وحفظها على فلاشة USB أو على حسابك السحابي الخاص (مثل Google Drive) لضمان الأمان المطلق.",
        category: "security"
      },

      // 🟣 الشراء
      {
        q: "ما الفرق بين الباقات؟",
        a: "تختلف الباقات فقط في عدد الأجهزة/الشاشات التي ترغب في إدارتها وصلاحيات التحكم الفنية. صممنا باقة للمشاريع الناشئة والـ VIP لتناسب ميزانيتك الحالية مع إمكانية الترقية السلسة مستقبلاً مع نمو وتوسع أعمالك.",
        category: "purchase"
      },
      {
        q: "هل يوجد نظام تقسيط؟",
        a: "نعم، نؤمن بدعم رواد الأعمال وأصحاب الصالات الصاعدة. نوفر خطط تقسيط مرنة وميسرة تتناسب مع حجم أرباح صالتك دون أي فوائد، لتتمكن من تشغيل السستم فوراً والبدء في زيادة أرباحك وضبط حساباتك من اليوم الأول.",
        category: "purchase"
      },
      {
        q: "هل الترخيص مدى الحياة؟",
        a: "نعم، جميع تراخيصنا تمنحك ملكية أبدية (Lifetime License). تقوم بالدفع لمرة واحدة فقط عند الشراء، لتستمتع بالبرنامج بكامل ميزاته وبشكل مستمر دون الخوف من تجديدات سنوية أو أي مصاريف غير متوقعة.",
        category: "purchase"
      },
      {
        q: "هل توجد رسوم شهرية؟",
        a: "لا توجد أي رسوم شهرية، ولا اشتراكات دورية، ولا تكاليف خفية على الإطلاق. ما تدفعه مرة واحدة هو ثمن برنامجك الحقيقي مدى الحياة، لتظل أرباح صالتك بالكامل في جيبك أنت فقط.",
        category: "purchase"
      },

      // 🟣 الدعم
      {
        q: "هل سأحصل على تدريب؟",
        a: "نعم، التدريب مجاني بالكامل ومضمون. يقوم مهندسو الدعم الفني لدينا بمرافقتك خطوة بخطوة لتثبيت السستم، وتهيئة الأسعار، وتدريبك وتدريب الموظفين لديك حتى يتقن الجميع استخدامه بسلاسة كاملة وخلال ساعة واحدة فقط.",
        category: "support"
      },
      {
        q: "كيف أتواصل مع الدعم؟",
        a: "نحن معك على مدار الساعة. نوفر لك ولصالتك فريق دعم فني متخصص عبر الواتساب والاتصال الهاتفي، بالإضافة لبرامج التحكم عن بُعد (مثل AnyDesk) لحل أي استفسار أو مشكلة فنية فوراً لضمان عدم توقف صالتك لثانية واحدة.",
        category: "support"
      },
      {
        q: "هل توجد تحديثات مستقبلية؟",
        a: "نعم، نوفر تحديثات دورية مجانية ومسستمرة تشمل ميزات جديدة، تحسينات في واجهة المستخدم، وتوافقات تقنية مستمرة لضمان بقاء نظامك متطوراً وبأعلى أداء تشغيلي يواكب متطلبات السوق دائماً.",
        category: "support"
      }
    ];
  }, []);

  // 2. Classify localized country FAQs dynamically
  const categorizedCountryFaqs = useMemo(() => {
    return countryFaqs.map(faq => {
      let category = 'operation'; // default
      const q = faq.q;

      if (q.includes('فواتير') || q.includes('ضريبة') || q.includes('عملة') || q.includes('عملات') || q.includes('سعر') || q.includes('الدينار') || q.includes('الريال')) {
        category = 'purchase';
      } else if (q.includes('واتساب') || q.includes('نت') || q.includes('إنترنت')) {
        category = 'operation';
      } else if (q.includes('حماية') || q.includes('نسخ') || q.includes('أمان')) {
        category = 'security';
      }

      return {
        ...faq,
        category,
        isCountrySpecific: true
      };
    });
  }, [countryFaqs]);

  // 3. Assemble all standard FAQs
  const allStandardFaqs = useMemo(() => {
    // Merge standard questions and dynamic country ones
    return [...categorizedCountryFaqs, ...masterFaqs];
  }, [categorizedCountryFaqs, masterFaqs]);

  // 4. Combine standard FAQs with the special WhatsApp Call-to-Action card at the absolute end
  const finalFaqsList = useMemo(() => {
    return [
      ...allStandardFaqs,
      {
        q: "لم تجد إجابة لسؤالك؟",
        a: "نحن هنا لمساعدتك فوراً وبكل سرور! يمكنك الضغط على الزر أدناه لبدء محادثة مباشرة مع مؤسس شركة IDEA Makers عبر واتساب للحصول على استشارة فنية مجانية، أو طلب تفاصيل مخصصة تلائم صالتك.",
        category: "whatsapp_direct",
        isCountrySpecific: false
      }
    ];
  }, [allStandardFaqs]);

  // 5. Category filter headers
  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'الكل', icon: HelpCircle },
      { id: 'trial', label: 'التجربة المجانية', icon: Sparkles },
      { id: 'operation', label: 'التشغيل والتوافق', icon: Compass },
      { id: 'security', label: 'أمان البيانات', icon: ShieldCheck },
      { id: 'purchase', label: 'الباقات والشراء', icon: DollarSign },
      { id: 'support', label: 'التدريب والدعم', icon: LifeBuoy },
    ];
  }, []);

  // 6. Filter FAQs on search query and active tab
  const filteredFaqs = useMemo(() => {
    return finalFaqsList.filter(faq => {
      // Category filter (The WhatsApp card is sticky and ALWAYS shows at the end of every category view for supreme CRO!)
      if (faq.category === 'whatsapp_direct') {
        return true;
      }

      if (activeCategory !== 'all' && faq.category !== activeCategory) {
        return false;
      }
      
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          faq.q.toLowerCase().includes(query) || 
          faq.a.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [finalFaqsList, activeCategory, searchQuery]);

  // Reset active tab and close accordion
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(null);
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-hidden bg-radial from-slate-950/40 via-transparent to-transparent">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-[0.015]" />

      <div className="container max-w-4xl px-4 sm:px-6 relative z-10">
        
        {/* Apple & Stripe Style Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-300 tracking-wider">هل لديك استفسار؟ غالبًا ستجد الإجابة هنا.</span>
          </motion.div>

          <motion.h2 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 mb-5 leading-tight"
          >
            كل ما تحتاج إلى معرفته قبل بدء التجربة المجانية
          </motion.h2>
          
          <motion.p 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            إجابات صريحة ومباشرة تزيل كافة المخاوف والاعتراضات لتأمين نجاح واستقرار صالتك من اليوم الأول.
          </motion.p>
        </div>

        {/* Premium Interactive Search Bar */}
        <motion.div 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-xl mx-auto mb-10 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-70 group-focus-within:opacity-100 transition duration-500" />
          <div className="relative flex items-center">
            <Search className="absolute right-4 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="ابحث عن سؤالك أو تخوفك هنا (أوفلاين، حماية، مبيعات، تقسيط...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-3.5 bg-slate-900/60 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-xs sm:text-sm md:text-base outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/5 transition-all backdrop-blur-md text-right"
              dir="rtl"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1.5 p-1.5 bg-slate-950/65 backdrop-blur border border-white/5 rounded-2xl mb-10 overflow-x-auto no-scrollbar scroll-smooth"
          dir="rtl"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-300 relative shrink-0 cursor-pointer ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 rounded-xl shadow-lg shadow-purple-500/15 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Dynamic Accordion list with clickable cards */}
        <div className="space-y-3.5" dir="rtl">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const isWhatsAppCard = faq.category === 'whatsapp_direct';
                
                return (
                  <motion.div
                    key={faq.q}
                    layout={isMobile ? undefined : "position"}
                    initial={isMobile ? false : { opacity: 0, y: 10 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    exit={isMobile ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer select-none ${
                      isWhatsAppCard
                        ? 'bg-gradient-to-r from-purple-950/20 via-slate-900/60 to-indigo-950/20 border-purple-500/20 hover:border-purple-500/30 shadow-lg shadow-purple-500/5'
                        : isOpen 
                          ? 'bg-slate-900/80 border-purple-500/30 shadow-lg shadow-purple-500/5' 
                          : 'bg-slate-900/35 hover:bg-slate-900/50 border-white/5 hover:border-white/10 shadow-sm'
                    }`}
                    onClick={() => toggleFaq(index)}
                  >
                    {/* Header: Question Block */}
                    <div className="p-4 sm:p-5 flex items-start gap-3.5 justify-between">
                      <div className="flex gap-3 items-start flex-1 text-right">
                        <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 transition-colors ${
                          isWhatsAppCard
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isOpen 
                              ? 'bg-purple-500/20 text-purple-300' 
                              : 'bg-white/5 text-slate-400 group-hover:text-slate-300'
                        }`}>
                          {isWhatsAppCard ? (
                            <MessageCircle className="w-4 h-4" />
                          ) : faq.isCountrySpecific ? (
                            <Sparkles className="w-4 h-4 text-purple-400" />
                          ) : (
                            <HelpCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className={`font-bold text-sm sm:text-base md:text-lg transition-colors leading-snug ${
                            isWhatsAppCard
                              ? 'text-purple-300 hover:text-purple-200'
                              : isOpen ? 'text-white' : 'text-slate-200 hover:text-white'
                          }`}>
                            {faq.q}
                          </h3>
                          {faq.isCountrySpecific && (
                            <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full w-fit">
                              لصالة البلايستيشن بتاعتك في {countryName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={`mr-4 p-1 rounded-full border border-white/5 bg-white/5 transition-all duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-purple-500/10 border-purple-500/20 text-purple-400' : 'text-slate-400'
                      }`}>
                        <ChevronDown className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    {/* Smooth height progressive disclosure body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={isMobile ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={isMobile ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="px-5 pb-5 pt-1 text-slate-300 border-t border-white/5 bg-slate-950/20 leading-relaxed text-xs sm:text-sm md:text-base font-light font-sans">
                            <p className="whitespace-pre-line select-text mb-4">
                              {faq.a}
                            </p>

                            {/* Custom CTA button render for WhatsApp special card */}
                            {isWhatsAppCard && (
                              <div className="pt-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // prevent collapsing
                                    onContactFounder("مرحباً فريق صناع الفكرة، أريد الاستفسار عن تفاصيل نظام إدارة البلايستيشن ولم أجد إجابة لسؤالي في قسم الأسئلة الشائعة.");
                                  }}
                                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
                                >
                                  <span>💬 تحدث معنا عبر واتساب</span>
                                </button>
                                <p className="text-[10.5px] text-slate-400 mt-2.5 font-light">
                                  سنجيب على جميع استفساراتك ونساعدك في اختيار الباقة المناسبة خلال دقائق.
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-slate-900/25 border border-white/5 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <ShieldAlert className="w-6 h-6 text-slate-500" />
                </div>
                <h4 className="text-white font-bold mb-1">لم نجد نتائج مطابقة</h4>
                <p className="text-slate-500 text-sm">جرب استخدام كلمات بحث أخرى أو تصفح الأقسام أعلاه.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* High-Converting CTA Box Footer */}
        <motion.div 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/10 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
              <MessageCircle className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-2">هل تبحث عن استشارة مخصصة لصالتك؟</h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed font-sans font-light">
              مؤسس IDEA Makers والمهندسون التقنيون مستعدون للإجابة على أي سيناريو تشغيلي خاص ومساعدتك في اختيار الباقة والعتاد الأمثل لنمو مشروعك.
            </p>
            <button
              onClick={() => onContactFounder("مرحباً، أود استشارة مؤسس نظام صناع الفكرة حول تهيئة الباقات وتفاصيل تشغيل صالتنا.")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-md shadow-purple-500/15 hover:shadow-purple-500/25 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <span>استشِر مؤسس النظام مباشرة الآن</span>
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface PricingPackage {
  id: 'starter' | 'professional' | 'international';
  name: string;
  nameArabic?: string;
  price: number; // In EGP
  currency: 'EGP';
  color: 'primary' | 'accent' | 'blue';
  popular?: boolean;
  badge?: string;
  supportingLabel?: string;
  features: string[];
  ctaText: string;
  ctaAction: 'smart-form';
}

export const OFFICIAL_PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    nameArabic: 'باقة البداية',
    price: 6000,
    currency: 'EGP',
    color: 'primary',
    features: [
      '🏡 مناسبة للصالات المبتدئة (ترخيص مخصص لفرع واحد وللأبد)',
      '🖥️ دعم كامل لعدد لا نهائي من الأجهزة والشاشات بالفرع',
      '🔌 حصانة تامة ضد انقطاع الإنترنت (نظام أوفلاين محلي 100%)',
      '🧾 حساب الوقت والمبيعات بدقة متناهية ومنع التلاعب الأساسي',
      '📊 تقارير حسابية يومية أساسية لملخص الوردية وإجمالي الكاشير',
      '📞 دعم فني استراتيجي خلال فترة الضمان لمساعدتك في التأسيس والبدء'
    ],
    ctaText: 'ابدأ الآن وقرر بنفسك',
    ctaAction: 'smart-form'
  },
  {
    id: 'professional',
    name: 'Professional Package',
    nameArabic: 'الباقة الاحترافية',
    price: 8000,
    currency: 'EGP',
    color: 'accent',
    popular: true,
    badge: 'الأكثر اختيارًا',
    features: [
      '🔥 تشمل كافة مميزات باقة Starter بالكامل برخصة أصلية للأبد',
      '👑 إدارة جلسات اللعب ومتابعة الأجهزة من خلال سيستم IDEA MAKERS',
      '☕ نظام الكافيه والمشروبات المتكامل لرفع مبيعات البوفيه بمتوسط 40%',
      '📈 ذكاء الأعمال المتقدم: تقارير الأرباح والخسائر والصيانة والإهلاك للأدمن',
      '🎨 تخصيص كامل لهوية صالتك التجارية وشعارك الخاص على الفواتير والإيصالات',
      '👨‍💼 بروتوكول تدريب فريق العمل الميداني وتوجيه هندسي مباشر لتفادي أي ثغرة'
    ],
    ctaText: 'ابدأ الآن وقرر بنفسك',
    ctaAction: 'smart-form'
  },
  {
    id: 'international',
    name: 'International Package',
    nameArabic: 'الباقة المتكاملة (الدولية)',
    price: 10000,
    currency: 'EGP',
    color: 'blue',
    supportingLabel: 'للصالات الاحترافية والتوسع الخارجي',
    features: [
      '🌍 تشمل كافة مميزات الباقة الاحترافية (Professional) بالكامل',
      '🇸🇦 دعم كامل للعملات الإقليمية (ريال، درهم، دينار) والتوقيتات المحلية وتخصيص الفواتير',
      '💱 دعم ذكي لتغيير وتثبيت عملة بلدك (ريال، درهم، دينار) والتحويل الفوري',
      '🕒 التحكم المرن في فروق التوقيت والمنطقة الزمنية والضريبة المضافة (VAT)',
      '🛰️ قناة دعم فني دولي ذات أولوية قصوى للحالات الطارئة والتحديثات السنوية',
      '🤝 ترخيص هجين جاهز للتوسع وربط فروع متعددة مستقبلاً (قيد التطوير النشط حالياً ⏳)'
    ],
    ctaText: 'ابدأ الآن وقرر بنفسك',
    ctaAction: 'smart-form'
  }
];

export const formatPriceEGP = (amount: number, locale = 'ar-EG'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      useGrouping: true,
    }).format(amount);
  } catch {
    return amount.toLocaleString('en-US');
  }
};

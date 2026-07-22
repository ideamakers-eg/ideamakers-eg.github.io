import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  Loader2, 
  Globe, 
  User, 
  MapPin, 
  Info,
  ArrowLeft
} from 'lucide-react';
import { SourceSelection, SourceType } from './SourceSelection';
import './SmartForm.css';
import './package-colors.css';

const packages = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: '4000',
    currency: 'EGP',
    color: 'primary',
    features: [
      'مناسب لصالات البلايستيشن الصغيرة',
      'عدد أجهزة لا نهائي',
      'ملكية أصل للأبد',
      'حصانة كاملة ضد انقطاع الإنترنت',
      'دعم فني استراتيجي'
    ]
  },
  {
    id: 'professional',
    name: 'Professional Package',
    price: '6000',
    currency: 'EGP',
    color: 'accent',
    features: [
      'أفضل قيمة للصالات المتنامية',
      'كل مميزات باقة Starter',
      'إدارة وقت الجلسات بدقة بالغة',
      'نظام ذكاء الأعمال والتقارير',
      'تخصيص كامل لهوية البراند',
      'بروتوكول تدريب الفريق الاحترافي'
    ],
    badge: 'الأكثر اختيارًا'
  },
  {
    id: 'international',
    name: 'International Package',
    price: '10000',
    currency: 'EGP',
    color: 'blue',
    features: [
      'دعم تغيير العملات (Currency switching)',
      'التحكم في المنطقة الزمنية للنظام',
      'يدعم بيئة العمل في السعودية والإمارات',
      'كل مميزات باقة Professional',
      'دعم فني دولي عابر للحدود'
    ],
    badge: 'للصالات الاحترافية والتوسع الخارجي'
  }
];

const countries = [
  { 
    id: 'egypt', 
    name: 'مصر', 
    flag: '🇪🇬', 
    currency: 'EGP', 
    rate: 1,
    fullName: 'جنيه مصري'
  },
  { 
    id: 'saudi', 
    name: 'السعودية', 
    flag: '🇸🇦', 
    currency: 'SAR', 
    rate: 0.12,
    fullName: 'ريال سعودي'
  },
  { 
    id: 'uae', 
    name: 'الإمارات', 
    flag: '🇦🇪', 
    currency: 'AED', 
    rate: 0.12,
    fullName: 'درهم إماراتي'
  },
  { 
    id: 'qatar', 
    name: 'قطر', 
    flag: '🇶🇦', 
    currency: 'QAR', 
    rate: 0.12,
    fullName: 'ريال قطري'
  },
  { 
    id: 'kuwait', 
    name: 'الكويت', 
    flag: '🇰🇼', 
    currency: 'KWD', 
    rate: 0.01,
    fullName: 'دينار كويتي'
  }
];

const internationalPricing: Record<string, { price: string; currency: string }> = {
  egypt: { price: "10000", currency: "EGP" },
  saudi: { price: "1200", currency: "SAR" },
  uae: { price: "1200", currency: "AED" },
  qatar: { price: "1200", currency: "QAR" },
  kuwait: { price: "100", currency: "KWD" }
};

const whatsappNumber = "201121778205";

interface SmartFormProps {
  initialPackage?: any;
  initialCountry?: any;
}

const SmartForm = ({ initialPackage, initialCountry }: SmartFormProps) => {
  const [selectedPackage, setSelectedPackage] = useState(initialPackage || packages[1]);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry || countries[0]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update state when props change
  useEffect(() => {
    if (initialPackage) setSelectedPackage(initialPackage);
  }, [initialPackage]);

  useEffect(() => {
    if (initialCountry) setSelectedCountry(initialCountry);
  }, [initialCountry]);

  // Enforce International Package for international countries
  useEffect(() => {
    if (selectedCountry.id !== 'egypt' && selectedPackage.id !== 'international') {
      const intPkg = packages.find(p => p.id === 'international');
      if (intPkg) setSelectedPackage(intPkg);
    }
  }, [selectedCountry.id]);

  const [formData, setFormData] = useState({
    salonName: '',
    clientName: '',
    phone: '',
    address: '',
    marketingCode: '',
    message: ''
  });

  const [selectedSource, setSelectedSource] = useState<SourceType>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.salonName.trim()) newErrors.salonName = 'اسم الصالة مطلوب';
    if (!formData.clientName.trim()) newErrors.clientName = 'اسم العميل مطلوب';
    if (!formData.address.trim()) newErrors.address = 'عنوان الصالة مطلوب';
    
    if (!selectedSource) {
      newErrors.source = 'يرجى اختيار كيف تعرفت علينا';
    } else if (selectedSource === 'affiliate' && !formData.marketingCode.trim()) {
      newErrors.marketingCode = 'يرجى إدخال كود المسوق';
    }
    
    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, '');
    
    const phoneRegex = /^01[0125][0-9]{8}$/;
    const saudiRegex = /^(05|5)[0-9]{8}$/;
    const uaeRegex = /^(05|5)[0-9]{8}$/;
    const internationalRegex = /^\+?[0-9]{10,15}$/;

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else {
      const isValid = phoneRegex.test(cleanPhone) || 
                      saudiRegex.test(cleanPhone) || 
                      uaeRegex.test(cleanPhone) || 
                      internationalRegex.test(cleanPhone);
      
      if (!isValid) {
        newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 01121778205)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setFormData(prev => ({ ...prev, marketingCode: code }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const formatCurrency = (val: number | string) => {
    return Number(val).toLocaleString('en-US');
  };

  const getPriceForCountry = (pkgId: string, countryId: string) => {
    const country = countries.find(c => c.id === countryId) || countries[0];
    if (pkgId === 'international') {
      return internationalPricing[countryId] || internationalPricing['egypt'];
    }
    const basePkg = packages.find(p => p.id === pkgId);
    const basePrice = Number(basePkg?.price || 0);
    return {
      price: Math.round(basePrice * country.rate).toString(),
      currency: country.currency
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowRedirect(true);
    
    const packageBilingualNames: Record<string, string> = {
      starter: 'Starter Package — باقة البداية',
      professional: 'Professional Package — الباقة الاحترافية',
      international: 'International Package — الباقة المتكاملة (الدولية)'
    };

    const pkgName = packageBilingualNames[selectedPackage.id] || selectedPackage.name;
    const currentPriceData = getPriceForCountry(selectedPackage.id, selectedCountry.id);
    
    const sourceLabels: Record<string, string> = {
      affiliate: 'من خلال مسوق',
      facebook: 'فيسبوك',
      youtube: 'يوتيوب',
      tiktok: 'تيك توك',
      other: 'أخرى'
    };

    const featuresText = selectedPackage.features.map(f => `- ${f}`).join('\n');
    const isAutoSelected = selectedCountry.id !== 'egypt';

    const messageText = `**ملخص الطلب:**

**الباقة المختارة:** ${pkgName}
**السعر:** ${formatCurrency(currentPriceData.price)} ${currentPriceData.currency}
**الدولة:** ${selectedCountry.name}
**العملة:** ${currentPriceData.currency}

**مميزات ${pkgName}:**
${featuresText}

**البيانات الأساسية:**
- **اسم الصالة/البراند:** ${formData.salonName}
- **اسم العميل:** ${formData.clientName}
- **رقم الهاتف:** ${formData.phone}
- **عنوان الصالة:** ${formData.address}
- **الرسالة (اختياري):** ${formData.message || 'لا توجد ملاحظات'}

**كيف تعرفت علينا؟**
- ${sourceLabels[selectedSource] || 'غير محدد'}
${formData.marketingCode ? `- **كود المسوق:** ${formData.marketingCode}` : ''}

${isAutoSelected ? '_تم اختيار هذه الباقة بناءً على الدولة المحددة تلقائيًا_' : ''}

_تم إرسال الطلب من الموقع الرسمي لـ IDEA Makers_`;
    
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      setShowRedirect(false);
    }, 2000);
  };

  return (
    <section id="smart-form" className="smart-form-section">
      <div className="container">
        <motion.div 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="smart-form-container"
        >
          <div className="smart-form-header">
            <h2 className="smart-form-title">استثمار سيادي.. لمرة واحدة</h2>
            <p className="smart-form-subtitle">اختر الباقة التي تناسب طموحك. لا توجد رسوم خفية، لا توجد اشتراكات، لا توجد تبعية.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Package Selection */}
            <div className="step-title">
              <span className="step-number">1</span>
              <span>اختر الباقة المناسبة</span>
            </div>
            <div className="package-grid">
              {packages.map((pkg) => {
                const isInternational = selectedCountry.id !== 'egypt';
                const isDisabled = isInternational && pkg.id !== 'international';
                
                return (
                  <motion.div
                    key={pkg.id}
                    whileHover={(!isDisabled && !isMobile) ? { y: -2 } : {}}
                    whileTap={!isDisabled ? { scale: 0.99 } : {}}
                    transition={{ duration: 0.15 }}
                    className={`package-card package-${pkg.id === 'professional' ? 'pro' : pkg.id} ${selectedPackage.id === pkg.id ? 'selected' : ''} ${isDisabled ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                    onClick={() => !isDisabled && setSelectedPackage(pkg)}
                  >
                    {pkg.badge && (
                      <div className="package-badge">{pkg.badge}</div>
                    )}
                    {isDisabled && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 rounded-[24px]">
                        <span className="bg-black/80 text-white text-[10px] px-2 py-1 rounded-full border border-white/10">
                          متاحة لمصر فقط
                        </span>
                      </div>
                    )}
                    {selectedPackage.id === pkg.id && (
                      <motion.div 
                        initial={isMobile ? false : { opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                        className="selection-badge"
                      >
                        تم الاختيار
                      </motion.div>
                    )}
                    <div className="package-name">{pkg.name}</div>
                    <div className="package-price">
                      {formatCurrency(getPriceForCountry(pkg.id, selectedCountry.id).price)}
                      <span className="package-currency">
                        {getPriceForCountry(pkg.id, selectedCountry.id).currency}
                      </span>
                    </div>
                    <ul className="package-features">
                      {pkg.features?.map((feature, idx) => (
                        <li key={idx}>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Step 2: Country Selection */}
            <div className="step-title">
              <span className="step-number">2</span>
              <span>اختر الدولة</span>
            </div>
            <div className="country-flex">
              {countries.map((country) => (
                <motion.button
                  key={country.id}
                  type="button"
                  whileHover={isMobile ? undefined : { scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.12 }}
                  className={`country-btn ${selectedCountry.id === country.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCountry(country)}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Step 3: User Input */}
            <div className="step-title">
              <span className="step-number">3</span>
              <span>البيانات الأساسية</span>
            </div>
            <div className="input-grid form-grid">
              <div className="smart-input-group">
                <input
                  type="text"
                  name="salonName"
                  placeholder=" "
                  className="smart-input"
                  value={formData.salonName}
                  onChange={handleChange}
                />
                <label className="smart-label">اسم الصالة أو البراند</label>
                {errors.salonName && <span className="error-hint">{errors.salonName}</span>}
              </div>

              <div className="smart-input-group">
                <input
                  type="text"
                  name="clientName"
                  placeholder=" "
                  className="smart-input"
                  value={formData.clientName}
                  onChange={handleChange}
                />
                <label className="smart-label">اسم العميل</label>
                {errors.clientName && <span className="error-hint">{errors.clientName}</span>}
              </div>

              <div className="smart-input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder=" "
                  className="smart-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label className="smart-label">رقم الهاتف</label>
                {errors.phone && <span className="error-hint">{errors.phone}</span>}
              </div>

              <div className="smart-input-group">
                <input
                  type="text"
                  name="address"
                  placeholder=" "
                  className="smart-input"
                  value={formData.address}
                  onChange={handleChange}
                />
                <label className="smart-label">عنوان الصالة</label>
                {errors.address && <span className="error-hint">{errors.address}</span>}
              </div>

              <div className="smart-input-group full">
                <textarea
                  name="message"
                  placeholder=" "
                  className="smart-input smart-textarea"
                  value={formData.message}
                  onChange={handleChange}
                />
                <label className="smart-label">الرسالة (اختياري)</label>
              </div>
            </div>

            {/* Source Selection System */}
            <SourceSelection
              selectedSource={selectedSource}
              onSourceSelect={setSelectedSource}
              marketingCode={formData.marketingCode}
              onCodeChange={(code) => {
                setFormData(prev => ({ ...prev, marketingCode: code }));
              }}
            />
            {errors.source && <div className="error-hint text-center mb-4">{errors.source}</div>}

            {/* Step 4: Dynamic Summary */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="summary-box"
            >
              <div className="summary-title">
                <Info className="w-5 h-5" />
                <span>ملخص الطلب</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">الباقة المختارة:</span>
                <span className={`summary-value text-${selectedPackage.id === 'professional' ? 'pro' : selectedPackage.id}`}>{selectedPackage.name}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">السعر:</span>
                <span className={`summary-value text-${selectedPackage.id === 'professional' ? 'pro' : selectedPackage.id}`}>
                  {formatCurrency(getPriceForCountry(selectedPackage.id, selectedCountry.id).price)} {getPriceForCountry(selectedPackage.id, selectedCountry.id).currency}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">الدولة:</span>
                <span className="summary-value">{selectedCountry.name}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">العملة:</span>
                <span className="summary-value">{selectedCountry.currency}</span>
              </div>
            </motion.div>

            {/* Step 5: Submit */}
            <div className="submit-actions">
              <button 
                type="submit" 
                className="smart-submit-btn"
                disabled={isSubmitting || !selectedSource}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-6 h-6" />
                    <span>جاري المعالجة...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>ابدأ الآن وقرر بنفسك</span>
                  </>
                )}
              </button>

              <motion.button
                type="submit"
                initial={isMobile ? false : { opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                transition={{ duration: 0.15 }}
                className="trial-btn"
                disabled={isSubmitting}
              >
                <span>ابدأ التجربة المجانية الآن</span>
                <CheckCircle2 className="w-6 h-6" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showRedirect && (
          <motion.div 
            initial={isMobile ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={isMobile ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="redirect-overlay"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">تم استلام طلبك!</h3>
              <p className="text-gray-400">جارٍ تحويلك إلى واتساب...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SmartForm;

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Users } from 'lucide-react';

const testimonials = [
  {
    name: 'أحمد محمود',
    role: 'صاحب صالة بلايستيشن',
    location: 'القاهرة، مصر',
    rating: 5,
    content: 'بصراحة كنت شايل هم الحسابات واللخبطة اللي كانت بتحصل بين الشيفتات، بس البرنامج ريحني جداً وكل حاجة بقت متسجلة بالدقيقة والقرش.'
  },
  {
    name: 'فهد العتيبي',
    role: 'مالك مركز ترفيهي',
    location: 'الرياض، السعودية',
    rating: 5,
    content: 'النظام جداً ممتاز وسهل، خاصة إنه يشتغل بدون إنترنت، وهذا كان أهم شيء عندي عشان ما يتوقف الشغل لو فصل النت فجأة.'
  },
  {
    name: 'محمد الشامسي',
    role: 'مدير صالة ألعاب',
    location: 'دبي، الإمارات',
    rating: 4.5,
    content: 'فرق كبير في تنظيم الوقت والطلبات، الحين أقدر أشوف تقارير يومية دقيقة وأعرف الدخل الحقيقي للصالة بدون تعب أو مراجعة يدوية.'
  },
  {
    name: 'خالد الصاوي',
    role: 'مبتدئ في إدارة الصالات',
    location: 'الإسكندرية، مصر',
    rating: 5,
    content: 'أول مرة أفتح صالة وكنت خايف من الإدارة، بس النظام بسيط وواضح، والشباب في الدعم الفني ما قصروا معايا في البداية لحد ما فهمت كل حاجة.'
  },
  {
    name: 'سعيد القحطاني',
    role: 'صاحب مشروع Gaming',
    location: 'جدة، السعودية',
    rating: 5,
    content: 'التحكم في الأجهزة من الكمبيوتر وفر علينا مجهود كبير، والزباين صاروا يثقون في الحسابات لأنها تطلع قدامهم واضحة في الشاشة.'
  },
  {
    name: 'محمود حسن',
    role: 'صاحب صالة بلايستيشن',
    location: 'المنصورة، مصر',
    rating: 4.5,
    content: 'كنت بضيع وقت كتير في الجرد والورقة والقلم، دلوقتي بضغطة واحدة بعرف كل حاجة، بجد تسلم إيدكم على المجهود ده.'
  },
  {
    name: 'عبد الله الملا',
    role: 'مالك صالة VIP',
    location: 'أبو ظبي، الإمارات',
    rating: 5,
    content: 'تصميم النظام مريح للعين وسريع جداً، والأهم إنه بيحفظ البيانات بأمان، أنصح فيه أي صاحب مشروع بلايستيشن حابب يريح راسه.'
  },
  {
    name: 'حسن علي',
    role: 'مستثمر في قطاع الألعاب',
    location: 'الجيزة، مصر',
    rating: 5,
    content: 'النظام ساعدني أكتشف تسريبات مالية مكنتش واخد بالي منها خالص، فعلاً استثمار ناجح جداً لأي صالة بتدور على الاحترافية.'
  }
];

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  city: string;
  loungeName: string;
  rating: number;
  avatar: string;
}

interface TestimonialsProps {
  customTestimonials?: TestimonialItem[];
}

export const Testimonials = ({ customTestimonials }: TestimonialsProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Merge or select testimonials. If custom is provided, we can prepend or use them directly.
  const displayTestimonials = customTestimonials && customTestimonials.length > 0 
    ? [
        ...customTestimonials.map(t => ({
          name: t.author,
          role: t.role,
          location: `${t.city}، ${t.loungeName}`,
          rating: t.rating,
          content: t.quote
        })),
        ...testimonials
      ]
    : testimonials;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-black/20">
      <div className="absolute inset-0 tech-grid opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold text-primary mb-6 border-primary/30"
          >
            <Users className="w-4 h-4" />
            +100 عميل يستخدم النظام يومياً
          </motion.div>
          
          <motion.h2
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            آراء عملائنا
          </motion.h2>
          
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            تجارب حقيقية من أصحاب صالات البلايستيشن بعد استخدام النظام والتحول من الفوضى إلى السيطرة الكاملة.
          </motion.p>
        </div>

        {/* Testimonials Grid / Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-8 md:pb-0 no-scrollbar">
          {displayTestimonials.map((item, idx) => {
            const cardContent = (
              <>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? 'text-primary fill-primary'
                          : i < item.rating
                          ? 'text-primary/50 fill-primary/50'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="relative mb-6 flex-grow">
                  <Quote className="absolute -top-2 -right-2 w-8 h-8 text-primary/10 group-hover/card:text-primary/20 transition-colors" />
                  <p className="text-lg text-gray-300 leading-relaxed relative z-10 font-light text-right">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/10 shrink-0">
                    {item.name[0]}
                  </div>
                  <div className="overflow-hidden text-right">
                    <h4 className="font-bold text-white truncate">{item.name}</h4>
                    <div className="flex flex-col text-xs text-gray-500">
                      <span className="truncate">{item.role}</span>
                      <span className="text-primary/70 truncate">{item.location}</span>
                    </div>
                  </div>
                </div>
              </>
            );

            // On mobile, render a standard div with zero JS animation tracking for 60 FPS scrolling.
            // On desktop, render a motion.div with extremely fast transform transition.
            return isMobile ? (
              <div
                key={idx}
                className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center glass p-8 rounded-[32px] border-white/5 hover:border-primary/30 transition-all duration-300 group/card flex flex-col h-full transform hover:-translate-y-1"
              >
                {cardContent}
              </div>
            ) : (
              <motion.div
                key={idx}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center glass p-8 rounded-[32px] border-white/5 hover:border-primary/30 transition-all duration-300 group/card flex flex-col h-full transform hover:-translate-y-2"
              >
                {cardContent}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe Notice */}
        <div className="mt-4 text-center md:hidden">
          <p className="text-xs text-gray-500">اسحب لليمين لمشاهدة المزيد</p>
        </div>
      </div>
    </section>
  );
};

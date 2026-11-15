import React, { useState } from 'react';
import { Monitor, ShieldCheck, FileSpreadsheet, Coffee, Users, CheckCircle2, ArrowLeft } from 'lucide-react';

interface InterfacePerspective3DProps {
  onStartTrial?: () => void;
}

export const InterfacePerspective3D: React.FC<InterfacePerspective3DProps> = ({ onStartTrial }) => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'cashier' | 'buffet' | 'audit'>('sessions');
  const [rotateX, setRotateX] = useState(6);
  const [rotateY, setRotateY] = useState(-8);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rY = ((x - centerX) / centerX) * 10;
    const rX = -((y - centerY) / centerY) * 8;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(4);
    setRotateY(-6);
  };

  return (
    <div className="relative max-w-5xl mx-auto my-12 px-4">
      {/* Tab Navigation for Interface Modules */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: 'sessions', label: 'مصفوفة الأجهزة والجلسات الحية', icon: <Monitor className="w-4 h-4" /> },
          { id: 'cashier', label: 'كاشير وتسعير الفردي والزوجي', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'buffet', label: 'مبيعات الكافيه وجرد المخزن', icon: <Coffee className="w-4 h-4" /> },
          { id: 'audit', label: 'تقرير إغلاق الوردية والمنع الآلي', icon: <ShieldCheck className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary/30 border border-primary'
                : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3D Perspective Card Container */}
      <div
        className="perspective-1000 transition-transform duration-200 ease-out"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative rounded-3xl bg-gradient-to-br from-[#12121e] via-[#09090f] to-[#040407] border-2 border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.2)] p-4 sm:p-7 overflow-hidden transition-all duration-300 transform-gpu"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top Window Bevel & Header bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-gray-400 font-mono text-[11px] mr-3">
                IDEA MAKERS POS v4.8 · SYSTEM ACTIVE · 100% OFFLINE SECURED
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>قاعدة البيانات محلية مؤمنة</span>
            </div>
          </div>

          {/* Module Interface View based on activeTab */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'جهاز 01 - VIP Lounge', time: '02:14:35', total: '145 ج.م', status: 'مشغول', single: 'زوجي' },
                  { name: 'جهاز 02 - صالة PS5', time: '01:05:12', total: '70 ج.م', status: 'مشغول', single: 'فردي' },
                  { name: 'جهاز 03 - شاشة 65"', time: '00:45:00', total: '55 ج.م', status: 'مشغول', single: 'زوجي' },
                  { name: 'جهاز 04 - غرفة شباب', time: '00:00:00', total: '0 ج.م', status: 'متاح للبدء', single: 'جاهز' },
                ].map((station, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      station.status === 'مشغول'
                        ? 'bg-primary/10 border-primary/30 shadow-md shadow-primary/10'
                        : 'bg-white/[0.02] border-white/5 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-300 mb-2">
                      <span className="truncate">{station.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        station.status === 'مشغول' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {station.status}
                      </span>
                    </div>
                    <div className="text-xl font-black font-mono text-white mb-1">{station.time}</div>
                    <div className="flex items-center justify-between text-xs text-primary font-bold">
                      <span>{station.total}</span>
                      <span className="text-[10px] text-gray-400">{station.single}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">حماية حقيقية ضد انقطاع الكهرباء</h4>
                    <p className="text-xs text-gray-400">حفظ الجلسات تلقائياً كل 3 ثوانٍ محلياً دون فقدان دقيقة واحدة</p>
                  </div>
                </div>

                {onStartTrial && (
                  <button
                    onClick={onStartTrial}
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-lg shadow-primary/20 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>طلب النسخة التجريبية</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'cashier' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">تسعيرة الفردي (Single):</span>
                  <div className="text-2xl font-black text-white">35 <span className="text-xs font-normal text-gray-400">ج.م / ساعة</span></div>
                  <p className="text-[11px] text-emerald-400 mt-2 font-medium">حساب للثانية مع تطبيق عروض الوقت</p>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">تسعيرة الزوجي (Multiplayer):</span>
                  <div className="text-2xl font-black text-white">50 <span className="text-xs font-normal text-gray-400">ج.م / ساعة</span></div>
                  <p className="text-[11px] text-primary mt-2 font-medium">تبديل فوري بضغطة زر دون إعادة تشغيل</p>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">تسعيرة غرف الـ VIP:</span>
                  <div className="text-2xl font-black text-white">75 <span className="text-xs font-normal text-gray-400">ج.م / ساعة</span></div>
                  <p className="text-[11px] text-amber-400 mt-2 font-medium">شامل خصومات المدة والحد الأدنى</p>
                </div>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-gray-300 leading-relaxed">
                💡 <strong className="text-white">منع التلاعب:</strong> لا يمكن للموظف تعديل وقت الساعة في ويندوز أو إغلاق الجلسة يدوياً دون تسجيل رقم الفاتورة في السجل المحاسبي المشفر.
              </div>
            </div>
          )}

          {activeTab === 'buffet' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-white mb-2">قائمة الكافيه المباشرة (POS Bar)</h4>
                  <div className="space-y-1.5 text-xs text-gray-300">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>قهوة تركي / إسبريسو</span>
                      <span className="font-bold text-white">25 ج.م (المخزن: 42 علبة)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>مشروبات طاقة / بيبسي</span>
                      <span className="font-bold text-white">30 ج.م (المخزن: 58 كانز)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>سناكس وشيبسي</span>
                      <span className="font-bold text-white">20 ج.م (المخزن: 80 كيس)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">الربط الآلي مع فاتورة الجلسة</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      أي طلب يطلبه الزبون ينزل فوراً على حساب الجهاز أو الغرفة الخاصة به ويُخصم فوراً من جرد المخزن لمنع إهدار أو سرقة المشروبات.
                    </p>
                  </div>
                  <div className="mt-3 text-xs text-primary font-bold">
                    +40% زيادة في متوسط مبيعات البوفيه شهرياً
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-950/20 via-black to-primary/10 border border-emerald-500/30 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-black text-white">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>تقرير مطابقة الخزينة وإغلاق الوردية (End of Shift)</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">مطابقة 100%</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3">
                  <div className="bg-white/5 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">إجمالي ساعات اللعب</span>
                    <span className="text-lg font-black text-white">48 ساعة</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">إيراد وقت الأجهزة</span>
                    <span className="text-lg font-black text-white">2,140 ج.م</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">إيراد البوفيه</span>
                    <span className="text-lg font-black text-white">860 ج.م</span>
                  </div>
                  <div className="bg-primary/20 border border-primary/40 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-300 block">النقدية الفعلية بالدرج</span>
                    <span className="text-lg font-black text-primary">3,000 ج.م</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 text-center mt-2">
                  يصل إشعار التقرير اليومي وتفاصيل الشيفت إلى هاتف صاحب الصالة مباشرة مع حظر التعديل بأثر رجعي.
                </p>
              </div>
            </div>
          )}

          {/* Dynamic Light Sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            style={{
              transform: `translate(${rotateY * 10}px, ${rotateX * 10}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default InterfacePerspective3D;

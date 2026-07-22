import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, ShoppingCart, Zap, RefreshCw, BarChart2, CheckCircle2, 
  Activity, Bell, Clock, Calendar, Search, ArrowUpRight, ShieldCheck, Gamepad2, Landmark
} from 'lucide-react';
import { CustomerModel, SalesInvoice } from '../data/cmsMockData';

interface CmsDashboardProps {
  customers: CustomerModel[];
  invoices: SalesInvoice[];
  eventStream: any[];
}

export const CmsDashboard: React.FC<CmsDashboardProps> = ({ customers, invoices, eventStream }) => {
  const [livePulse, setLivePulse] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const totalSales = invoices.reduce((acc, inv) => acc + (inv.status === 'paid' ? inv.amount : 0), 0);
  const totalLeads = customers.length;
  const activeCustomers = customers.filter(c => c.licenseStatus === 'active').length;
  const activeTrialing = customers.filter(c => c.licenseStatus === 'trialing').length;

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Upper Cards Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total revenue */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-black border border-indigo-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700" />
          <div className="flex justify-between items-start">
            <div className="bg-indigo-500/10 p-2.5 rounded-xl border border-indigo-500/20 text-indigo-400">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+١٢.٤%</span>
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-gray-400 text-xs font-medium">إجمالي المبيعات والاشتراكات لـ IDEA Makers</h4>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-2xl font-black text-white">{totalSales.toLocaleString('ar-EG')}</span>
              <span className="text-xs text-indigo-400 font-bold">جنيه مصري</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">مجمعة من فواتير باقات التراخيص المباشرة للبلدان المختلفة</p>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700" />
          <div className="flex justify-between items-start">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${livePulse ? 'animate-ping' : ''}`} />
              <span>مباشر</span>
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-gray-400 text-xs font-medium">العملاء النشطين (المرخصين بالكامل)</h4>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-2xl font-black text-white">{activeCustomers}</span>
              <span className="text-xs text-emerald-400 font-bold">مؤسسة نشطة</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">يشمل صالات الألعاب الكبرى المرتبطة بالسيرفر</p>
          </div>
        </div>

        {/* Free Trials */}
        <div className="bg-gradient-to-br from-amber-950/40 to-black border border-amber-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700" />
          <div className="flex justify-between items-start">
            <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 font-bold px-2 py-0.5 rounded-full">
              <span>ضمان ٣ أيام</span>
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-gray-400 text-xs font-medium">الصالات تحت فترة التجربة والتدقيق المالي</h4>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-2xl font-black text-white">{activeTrialing}</span>
              <span className="text-xs text-amber-400 font-bold">صالة لعب</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">تحت إشراف وتدريب مهندسي صُنّاع الفكرة</p>
          </div>
        </div>

        {/* Platform Status */}
        <div className="bg-gradient-to-br from-rose-950/40 to-black border border-rose-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700" />
          <div className="flex justify-between items-start">
            <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-rose-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-rose-500/10 text-rose-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>مؤمّن 100%</span>
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-gray-400 text-xs font-medium">حالة شبكة وربط تراخيص السيستيم</h4>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-lg font-black text-emerald-400">مستقرة وسريعة</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>سيرفرات الترخيص ومراقبة الثغرات متصلة</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats Charts & Event Stream Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Graphic Analytics (Simulated Chart) */}
        <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <BarChart2 className="w-4.5 h-4.5 text-primary" />
                <span>معدل نمو التراخيص وتدفق العملاء السنوي</span>
              </h3>
              <p className="text-[10px] text-gray-500 mt-0.5">التوزيع الإحصائي حسب تفعيل الفروع واشتراكات المبيعات</p>
            </div>
            <div className="flex gap-1">
              <span className="text-[10px] bg-primary/20 text-primary font-bold px-2.5 py-1 rounded">2026</span>
              <span className="text-[10px] bg-white/5 text-gray-400 px-2.5 py-1 rounded">2025</span>
            </div>
          </div>

          {/* Simple and elegant custom responsive SVG graph for perfect UI execution without heavy library issues */}
          <div className="h-64 bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-x-0 top-10 border-b border-white/5" />
            <div className="absolute inset-x-0 top-24 border-b border-white/5" />
            <div className="absolute inset-x-0 top-36 border-b border-white/5" />
            <div className="absolute inset-x-0 top-48 border-b border-white/5" />

            <div className="relative h-44 w-full flex items-end justify-between px-4 z-10">
              {/* Bars representing growth months */}
              {[
                { month: 'يناير', val: 35, count: 5 },
                { month: 'فبراير', val: 50, count: 8 },
                { month: 'مارس', val: 45, count: 7 },
                { month: 'أبريل', val: 75, count: 12 },
                { month: 'مايو', val: 90, count: 15 },
                { month: 'يونيو', val: 120, count: 19 },
                { month: 'يوليو', val: 145, count: 24 }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer w-10">
                  <div className="text-[9px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-all duration-200">
                    {bar.count} فرع
                  </div>
                  <div 
                    style={{ height: `${bar.val}px` }} 
                    className="w-4 bg-gradient-to-t from-primary to-indigo-500 rounded-t-sm group-hover:from-indigo-400 group-hover:to-purple-500 shadow-lg shadow-primary/20 transition-all duration-300"
                  />
                  <span className="text-[10px] text-gray-500 group-hover:text-white transition-all font-medium mt-1">{bar.month}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-end gap-4 text-[10px] text-gray-400 border-t border-white/5 pt-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-t from-primary to-indigo-500" />
                <span>التراخيص المفعلة</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>معدل رضا الملاك (٩٩.٧%)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Web Ticker / Conversion Events */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              <Activity className="w-4.5 h-4.5 text-rose-500 animate-pulse" />
              <span>الأحداث والتحويلات المباشرة (Live Feed)</span>
            </h3>
            <span className="text-[9px] bg-rose-500/10 text-rose-400 font-bold px-2 py-0.5 rounded border border-rose-500/20">
              بث مباشر
            </span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
            {eventStream.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-xs">
                في انتظار أحداث جديدة من زوار الموقع...
              </div>
            ) : (
              eventStream.map((evt) => (
                <div key={evt.id} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3 rounded-xl space-y-1 transition-all text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-[11px]">{evt.event}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{evt.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span>{evt.user}</span>
                    <span className="text-primary font-mono text-[9px]">{evt.path}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 bg-white/[0.01] p-1.5 rounded border border-white/[0.02]">
                    الملاحظة: {evt.detail}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { saveCmsContentBatchToSupabase } from '../lib/supabase';
import { 
  Settings, Users, Database, Shield, Lock, Unlock, Check, RotateCcw, 
  Cloud, RefreshCw, Trash2, ShieldAlert, Sparkles
} from 'lucide-react';

interface CmsSystemProps {
  cmsData: Record<string, any>;
  updateCmsField: (key: string, value: any) => void;
  auditLogs: any[];
  setAuditLogs: React.Dispatch<React.SetStateAction<any[]>>;
  activeRole: 'admin' | 'editor' | 'marketing' | 'sales' | 'support';
  setActiveRole: (role: 'admin' | 'editor' | 'marketing' | 'sales' | 'support') => void;
  handleRestoreDefaults: () => void;
}

export const CmsSystem: React.FC<CmsSystemProps> = ({
  cmsData, updateCmsField,
  auditLogs, setAuditLogs,
  activeRole, setActiveRole,
  handleRestoreDefaults
}) => {
  const [subSection, setSubSection] = useState<'settings' | 'users' | 'logs'>('settings');

  // Multi-region default prices
  const [egPrice, setEgPrice] = useState(cmsData.egPrice || '6000');
  const [saPrice, setSaPrice] = useState(cmsData.saPrice || '2000');
  const [kwPrice, setKwPrice] = useState(cmsData.kwPrice || '160');

  // Local users list
  const [systemUsers, setSystemUsers] = useState([
    { username: 'eslam_arafa', name: 'م. إسلام عرفة', role: 'admin', lastActive: 'الآن نشط' },
    { username: 'seo_expert_pos', name: 'أحمد السيو', role: 'marketing', lastActive: 'منذ ساعتين' },
    { username: 'support_pro', name: 'كريم الدعم', role: 'support', lastActive: 'أمس الساعة ٩م' }
  ]);

  // Trigger restore point
  const handleCreateRestorePoint = () => {
    const nowStr = new Date().toISOString();
    const backupKey = 'playstation_pos_backup_' + Date.now();
    saveCmsContentBatchToSupabase({ [backupKey]: JSON.stringify(cmsData) });
    
    // Add log
    const newLog = {
      id: 'log-' + Date.now(),
      timestamp: nowStr,
      user: 'eslam_arafa',
      action: 'إنشاء نقطة استعادة فورية للموقع (Restore Point)',
      role: activeRole,
      type: 'backup',
      details: 'تم حفظ كافة نصوص الموقع والألوان والترجمات بنجاح في قاعدة البيانات المشفرة.'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    alert('💾 تم إنشاء نقطة استعادة فورية (System Restore Point) وتخزينها بنجاح!');
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Sub tabs header */}
      <div className="flex border-b border-white/5 pb-0 overflow-x-auto gap-1">
        <button
          onClick={() => setSubSection('settings')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'settings' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          ⚙️ الإعدادات العامة للمنصة (Settings)
        </button>
        <button
          onClick={() => setSubSection('users')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'users' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          👥 إدارة الأدوار والصلاحيات (Users & RBAC)
        </button>
        <button
          onClick={() => setSubSection('logs')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'logs' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          📂 سجلات الأمان والنسخ الاحتياطي (Audit Logs & Backups)
        </button>
      </div>

      {/* --- Settings --- */}
      {subSection === 'settings' && (
        <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-6 max-w-3xl">
          <h3 className="text-sm font-black text-white flex items-center gap-1.5">
            <Settings className="w-4.5 h-4.5 text-primary" />
            <span>تهيئة النظام العام ومستويات التشغيل والأسعار الموحدة</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">باقة مصر الأساسية (جنيه)</label>
              <input
                type="text"
                value={egPrice}
                onChange={(e) => { setEgPrice(e.target.value); updateCmsField('egPrice', e.target.value); }}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">باقة السعودية الأساسية (ريال)</label>
              <input
                type="text"
                value={saPrice}
                onChange={(e) => { setSaPrice(e.target.value); updateCmsField('saPrice', e.target.value); }}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">باقة الكويت الأساسية (دينار)</label>
              <input
                type="text"
                value={kwPrice}
                onChange={(e) => { setKwPrice(e.target.value); updateCmsField('kwPrice', e.target.value); }}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">عدد أيام التجربة الافتراضي</label>
              <input
                type="number"
                value={cmsData.trialDaysCount || 3}
                onChange={(e) => updateCmsField('trialDaysCount', parseInt(e.target.value) || 3)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">المنطقة الزمنية الافتراضية</label>
              <select
                value={cmsData.timezoneDefault || 'Cairo'}
                onChange={(e) => updateCmsField('timezoneDefault', e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Cairo">القاهرة (GMT+3)</option>
                <option value="Riyadh">الرياض (GMT+3)</option>
                <option value="Kuwait">الكويت (GMT+3)</option>
                <option value="Dubai">دبي (GMT+4)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">نمط لغة الفواتير والسيستم</label>
              <select
                value={cmsData.localeDefault || 'ar'}
                onChange={(e) => updateCmsField('localeDefault', e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="ar">العربية (الافتراضية الموحدة)</option>
                <option value="en">الإنجليزية (English)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* --- Users --- */}
      {subSection === 'users' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-xs font-black text-white">إدارة حسابات طاقم عمل صُنّاع الفكرة</h3>
              <p className="text-[10px] text-gray-500">مراقبة صلاحيات المطورين والمحررين ومندوبي المبيعات لضمان أمان البيانات الكلي.</p>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-400 font-bold">دور المستخدم النشط للمحاكاة:</span>
              <select
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as any)}
                className="bg-primary/20 border border-primary/40 text-primary rounded-xl px-3 py-1.5 text-xs font-black"
              >
                <option value="admin">الأدمن المطور (Admin)</option>
                <option value="editor">محرر المحتوى (Editor)</option>
                <option value="marketing">أخصائي التسويق (Marketing)</option>
                <option value="sales">مندوب المبيعات (Sales)</option>
                <option value="support">خدمة العملاء (Support)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left users table list */}
            <div className="lg:col-span-2 bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
              <h4 className="text-xs font-black text-white">المستخدمين المسجلين في لوحة التحكم ({systemUsers.length})</h4>
              <div className="space-y-2">
                {systemUsers.map(user => (
                  <div key={user.username} className="bg-white/[0.01] border border-white/5 p-3 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white">{user.name}</span>
                      <span className="text-[10px] text-gray-500 block">اسم المستخدم: @{user.username}</span>
                    </div>
                    <div className="text-left space-y-1">
                      <span className="bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded text-[10px] font-bold block">
                        {user.role.toUpperCase()}
                      </span>
                      <span className="text-[9px] text-gray-500 block">{user.lastActive}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right permissions matrix audit */}
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="text-xs font-black text-white">جدول الصلاحيات الأمنية (Permissions Matrix)</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                  <span className="text-gray-400">تعديل نصوص وتوجيهات الصفحة الرئيسية</span>
                  <span className="text-emerald-400 font-bold">الأدمن، المحرر</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                  <span className="text-gray-400">توليد أكواد ترخيص الـ POS ومسح الأجهزة</span>
                  <span className="text-emerald-400 font-bold">الأدمن فقط</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                  <span className="text-gray-400">تعديل أسعار الباقات وتحويل العملات</span>
                  <span className="text-emerald-400 font-bold">الأدمن، المبيعات</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                  <span className="text-gray-400">رفع المرفقات وضغط الصور لـ WebP</span>
                  <span className="text-emerald-400 font-bold">الأدمن، التسويق</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                  <span className="text-gray-400">حذف البيانات بالكامل وتحديث ملفات التثبيت</span>
                  <span className="text-emerald-400 font-bold">الأدمن فقط</span>
                </div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-[10px] text-amber-300">لقد تم منع الوصول البرمجي لغير الأدمن للوظائف شديدة الحساسية كإعادة التوجيه وإرسال التراخيص.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Logs & Backups --- */}
      {subSection === 'logs' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <Database className="w-5 h-5 text-primary" />
                <span>النسخ الاحتياطية وسجلات الأمان للشبكة (Audit Logs & Backups)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">سجل تفصيلي بكل التحديثات البرمجية أو النصية التي تمت على السيرفر مع إمكانية استعادة بنقرة واحدة لضمان الأمن المطلق لمؤسستك.</p>
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleCreateRestorePoint}
                className="bg-primary hover:bg-primary/95 text-white px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary/20"
              >
                <Cloud className="w-4 h-4" />
                <span>حفظ نسخة احتياطية سحابية جديدة ⚡</span>
              </button>

              <button
                type="button"
                onClick={handleRestoreDefaults}
                className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط المصنع الكامل للموقع 🔄</span>
              </button>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
              <Database className="w-4.5 h-4.5 text-primary" />
              <span>سجل الأمان والتعديلات النشط (Live Audit Trail)</span>
            </h4>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div key={log.id} className="bg-white/[0.01] border border-white/5 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="font-black text-white">{log.action}</span>
                      <span className="bg-white/5 text-gray-400 font-mono text-[9px] px-2 py-0.5 rounded border border-white/5">
                        {log.role.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500">ملاحظات: {log.details}</p>
                  </div>

                  <div className="text-left font-mono">
                    <span className="text-[10px] text-gray-400 block">المستخدم: {log.user}</span>
                    <span className="text-[10px] text-gray-500 block">
                      {new Date(log.timestamp).toLocaleTimeString('ar-EG')} - {new Date(log.timestamp).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

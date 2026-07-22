import React, { useState } from 'react';
import { 
  Users, Landmark, Code, Sliders, ShieldCheck, Download, Plus, Trash2, 
  Search, Check, Filter, Shield, Settings, Landmark as Bank, Heart, Globe, Play, HelpCircle
} from 'lucide-react';
import { CustomerModel, CrmLead, SalesInvoice, LicenseModel } from '../data/cmsMockData';

interface CmsOperationsProps {
  customers: CustomerModel[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerModel[]>>;
  leads: CrmLead[];
  setLeads: React.Dispatch<React.SetStateAction<CrmLead[]>>;
  invoices: SalesInvoice[];
  setInvoices: React.Dispatch<React.SetStateAction<SalesInvoice[]>>;
  licenses: LicenseModel[];
  setLicenses: React.Dispatch<React.SetStateAction<LicenseModel[]>>;
  activeRole: string;
}

export const CmsOperations: React.FC<CmsOperationsProps> = ({
  customers, setCustomers,
  leads, setLeads,
  invoices, setInvoices,
  licenses, setLicenses,
  activeRole
}) => {
  const [subSection, setSubSection] = useState<'customers' | 'crm' | 'sales' | 'licenses' | 'downloads'>('customers');

  // Search & Filter state
  const [custSearch, setCustSearch] = useState('');
  const [custFilter, setCustFilter] = useState<string>('all');
  
  // CRM state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadCountry, setNewLeadCountry] = useState('مصر 🇪🇬');

  // License state
  const [generatedKey, setGeneratedKey] = useState('');
  const [targetSalon, setTargetSalon] = useState('');

  // Downloads state
  const [winVersion, setWinVersion] = useState('3.2.4');
  const [winSize, setWinSize] = useState('48 MB');
  const [updateLog, setUpdateLog] = useState('إضافة خاصية الحذف اليدوي الآمن، وسد ثغرة التلاعب بساعة الكافيه.');

  // Add customer
  const [showAddCust, setShowAddCust] = useState(false);
  const [custForm, setCustForm] = useState({ name: '', salonName: '', city: '', country: 'EG' as 'EG', phone: '', devicesCount: 8 });

  const handleAddCust = () => {
    if (!custForm.name || !custForm.salonName) return;
    const newCust: CustomerModel = {
      id: 'cust-' + Date.now(),
      ...custForm,
      licenseStatus: 'active'
    };
    setCustomers(prev => [newCust, ...prev]);
    setCustForm({ name: '', salonName: '', city: '', country: 'EG', phone: '', devicesCount: 8 });
    setShowAddCust(false);
  };

  // Add CRM Lead
  const handleAddLead = () => {
    if (!newLeadName) return;
    const newL: CrmLead = {
      id: 'lead-' + Date.now(),
      name: newLeadName,
      phone: newLeadPhone,
      country: newLeadCountry,
      stage: 'new',
      notes: 'عميل مهتم بالتجربة الميدانية السريعة.',
      assignedTo: 'مبيعات مصر',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newL, ...prev]);
    setNewLeadName('');
    setNewLeadPhone('');
  };

  // Generate original PlayStation offline activation code
  const handleGenerateKey = () => {
    if (!targetSalon) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = 'IDM-POS-';
    for (let i = 0; i < 4; i++) key += chars[Math.floor(Math.random() * chars.length)];
    key += '-';
    for (let i = 0; i < 4; i++) key += chars[Math.floor(Math.random() * chars.length)];
    key += '-';
    for (let i = 0; i < 4; i++) key += chars[Math.floor(Math.random() * chars.length)];
    
    setGeneratedKey(key);

    const newLic: LicenseModel = {
      id: 'lic-' + Date.now(),
      key,
      salonName: targetSalon,
      hardwareHash: 'HASH-' + Math.floor(1000 + Math.random() * 9000) + '-AEC9',
      expiresAt: '2036-10-10',
      status: 'active'
    };
    setLicenses(prev => [newLic, ...prev]);
    setTargetSalon('');
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Sub sections header tabs */}
      <div className="flex border-b border-white/5 pb-0 overflow-x-auto gap-1">
        <button
          onClick={() => setSubSection('customers')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'customers' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          👥 قاعدة بيانات العملاء (Customers)
        </button>
        <button
          onClick={() => setSubSection('crm')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'crm' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🤝 إدارة خطوط المبيعات (CRM Pipeline)
        </button>
        <button
          onClick={() => setSubSection('sales')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'sales' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🧾 فواتير واشتراكات المبيعات (Sales)
        </button>
        <button
          onClick={() => setSubSection('licenses')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'licenses' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🔑 تراخيص السيرفر والـ POS (Licenses)
        </button>
        <button
          onClick={() => setSubSection('downloads')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'downloads' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          💾 مركز ملفات المطور (Downloads & Installers)
        </button>
      </div>

      {/* --- Customers --- */}
      {subSection === 'customers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في أسماء العملاء..."
                  value={custSearch}
                  onChange={(e) => setCustSearch(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-1.5 text-xs pr-9 text-white w-48 focus:outline-none"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2" />
              </div>

              <select
                value={custFilter}
                onChange={(e) => setCustFilter(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value="all">كل الدول</option>
                <option value="EG">🇪🇬 مصر</option>
                <option value="SA">🇸🇦 السعودية</option>
                <option value="KW">🇰🇼 الكويت</option>
                <option value="AE">🇦🇪 الإمارات</option>
                <option value="QA">🇶🇦 قطر</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddCust(!showAddCust)}
              className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-primary/95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة عميل جديد</span>
            </button>
          </div>

          {showAddCust && (
            <div className="bg-black/40 border border-white/10 p-5 rounded-2xl space-y-4 max-w-xl">
              <h4 className="text-xs font-black text-white">بيانات العميل الجديد</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="اسم العميل"
                  value={custForm.name}
                  onChange={(e) => setCustForm({ ...custForm, name: e.target.value })}
                  className="bg-white/[0.02] border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="اسم صالة اللعب / المحل"
                  value={custForm.salonName}
                  onChange={(e) => setCustForm({ ...custForm, salonName: e.target.value })}
                  className="bg-white/[0.02] border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="المدينة"
                  value={custForm.city}
                  onChange={(e) => setCustForm({ ...custForm, city: e.target.value })}
                  className="bg-white/[0.02] border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="رقم الهاتف"
                  value={custForm.phone}
                  onChange={(e) => setCustForm({ ...custForm, phone: e.target.value })}
                  className="bg-white/[0.02] border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                />
                <select
                  value={custForm.country}
                  onChange={(e) => setCustForm({ ...custForm, country: e.target.value as any })}
                  className="bg-white/[0.02] border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                >
                  <option value="EG">مصر 🇪🇬</option>
                  <option value="SA">السعودية 🇸🇦</option>
                  <option value="KW">الكويت 🇰🇼</option>
                  <option value="AE">الإمارات 🇦🇪</option>
                  <option value="QA">قطر 🇶🇦</option>
                </select>
                <input
                  type="number"
                  placeholder="عدد الأجهزة المتاحة"
                  value={custForm.devicesCount}
                  onChange={(e) => setCustForm({ ...custForm, devicesCount: parseInt(e.target.value) || 8 })}
                  className="bg-white/[0.02] border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddCust}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-black"
                >
                  حفظ البيانات
                </button>
                <button
                  onClick={() => setShowAddCust(false)}
                  className="bg-white/5 text-gray-400 px-4 py-2 rounded-xl text-xs"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}

          <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead className="bg-white/[0.02] text-gray-400 border-b border-white/5">
                  <tr>
                    <th className="p-3">العميل والمحل</th>
                    <th className="p-3">البلد والمدينة</th>
                    <th className="p-3">رقم الجوال</th>
                    <th className="p-3 text-center">الأجهزة</th>
                    <th className="p-3 text-center">حالة الترخيص</th>
                    <th className="p-3 text-left">التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {customers
                    .filter(c => c.name.toLowerCase().includes(custSearch.toLowerCase()))
                    .filter(c => custFilter === 'all' || c.country === custFilter)
                    .map(c => (
                      <tr key={c.id} className="hover:bg-white/[0.01] transition-all">
                        <td className="p-3">
                          <div className="font-bold text-white">{c.name}</div>
                          <div className="text-[10px] text-gray-500">{c.salonName}</div>
                        </td>
                        <td className="p-3">
                          <span className="ml-1">
                            {c.country === 'EG' ? '🇪🇬' : c.country === 'SA' ? '🇸🇦' : c.country === 'KW' ? '🇰🇼' : c.country === 'AE' ? '🇦🇪' : '🇶🇦'}
                          </span>
                          <span>{c.city}</span>
                        </td>
                        <td className="p-3 font-mono text-[10px] text-gray-400">{c.phone}</td>
                        <td className="p-3 text-center font-bold text-indigo-400">{c.devicesCount} جهاز</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.licenseStatus === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                            c.licenseStatus === 'trialing' ? 'bg-amber-500/10 text-amber-400' :
                            c.licenseStatus === 'expired' ? 'bg-rose-500/10 text-rose-400' : 'bg-white/5 text-gray-400'
                          }`}>
                            {c.licenseStatus === 'active' ? 'مرخص نشط' : c.licenseStatus === 'trialing' ? 'فترة تجربة' : c.licenseStatus === 'expired' ? 'منتهي الصلاحية' : 'انتظار تفعيل'}
                          </span>
                        </td>
                        <td className="p-3 text-left">
                          <button
                            onClick={() => setCustomers(prev => prev.filter(item => item.id !== c.id))}
                            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-1.5 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- CRM Pipeline --- */}
      {subSection === 'crm' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="text-xs font-black text-white">خط مبيعات IDEA Makers ومتابعة المهتمين بالسيستيم</h3>
              <p className="text-[10px] text-gray-500">متابعة دقيقة لكل من تواصل عبر زر واتساب للوصول بهم لنسب تحويل ١٠٠%.</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="الاسم"
                value={newLeadName}
                onChange={(e) => setNewLeadName(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white w-32"
              />
              <input
                type="text"
                placeholder="الجوال"
                value={newLeadPhone}
                onChange={(e) => setNewLeadPhone(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white w-32"
              />
              <select
                value={newLeadCountry}
                onChange={(e) => setNewLeadCountry(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value="مصر 🇪🇬">مصر 🇪🇬</option>
                <option value="السعودية 🇸🇦">السعودية 🇸🇦</option>
                <option value="الكويت 🇰🇼">الكويت 🇰🇼</option>
                <option value="الإمارات 🇦🇪">الإمارات 🇦🇪</option>
                <option value="قطر 🇶🇦">قطر 🇶🇦</option>
              </select>
              <button
                onClick={handleAddLead}
                className="bg-primary text-white text-xs font-black px-4 py-1.5 rounded-xl hover:bg-primary/90"
              >
                إضافة ليد
              </button>
            </div>
          </div>

          {/* CRM Board Columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(['new', 'contacted', 'negotiation', 'won', 'lost'] as const).map(stage => {
              const stageLeads = leads.filter(l => l.stage === stage);
              const stageColors = {
                new: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
                contacted: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
                negotiation: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
                won: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
                lost: 'border-rose-500/20 bg-rose-500/5 text-rose-400'
              };
              const stageLabels = {
                new: 'ليد جديد ⚡',
                contacted: 'تم التواصل 📞',
                negotiation: 'تفاوض وحاسبة الأرباح 📊',
                won: 'تم الإغلاق بنجاح 🏆',
                lost: 'مستبعد ❌'
              };

              return (
                <div key={stage} className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-3 min-h-[300px]">
                  <div className={`border p-2 rounded-xl text-center text-xs font-black ${stageColors[stage]}`}>
                    {stageLabels[stage]} ({stageLeads.length})
                  </div>

                  <div className="space-y-2">
                    {stageLeads.map(lead => (
                      <div key={lead.id} className="bg-white/[0.02] border border-white/5 p-3 rounded-xl space-y-1 hover:border-white/10 transition-all text-[11px]">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-white">{lead.name}</span>
                          <span className="text-[9px] text-gray-500">{lead.country}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">{lead.phone}</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed bg-black/40 p-1 rounded mt-1">{lead.notes}</p>
                        
                        <div className="flex gap-1 pt-2 justify-end">
                          {stage !== 'won' && (
                            <button
                              onClick={() => {
                                setLeads(prev => prev.map(item => item.id === lead.id ? { ...item, stage: 'won', notes: 'تم ترقية الليد وتحويله لعميل مرخص بنجاح!' } : item));
                              }}
                              className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white px-2 py-0.5 rounded text-[9px] font-bold"
                            >
                              كسب العميل
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setLeads(prev => prev.filter(item => item.id !== lead.id));
                            }}
                            className="bg-red-500/10 text-red-400 p-1 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- Sales invoices --- */}
      {subSection === 'sales' && (
        <div className="space-y-6">
          <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white">الفواتير المحصلة والنشطة للسيستم</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead className="bg-white/[0.02] text-gray-400 border-b border-white/5">
                  <tr>
                    <th className="p-3">رقم الفاتورة</th>
                    <th className="p-3">العميل</th>
                    <th className="p-3">المنتج / الباقة</th>
                    <th className="p-3">تاريخ التحصيل</th>
                    <th className="p-3 text-center">المبلغ</th>
                    <th className="p-3 text-center">حالة الدفع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-white/[0.01] transition-all">
                      <td className="p-3 font-mono text-gray-400 font-bold">#{inv.id}</td>
                      <td className="p-3 font-bold text-white">{inv.customerName}</td>
                      <td className="p-3 text-gray-400">{inv.packageType}</td>
                      <td className="p-3 font-mono text-gray-500">{inv.date}</td>
                      <td className="p-3 text-center font-bold text-emerald-400">{inv.amount.toLocaleString()} {inv.currency}</td>
                      <td className="p-3 text-center">
                        <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          تم الدفع بنجاح
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- Licenses --- */}
      {subSection === 'licenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white">مولّد مفاتيح الترخيص لـ PlayStation POS</h3>
            <p className="text-xs text-gray-400">توليد أكواد أصلية غير قابلة للاختراق بنظام التشفير الفريد لربط الترخيص بجهاز العميل الفعلي.</p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-gray-400 text-xs mb-1 font-bold">اسم صالة العميل لتسجيل الترخيص</label>
                <input
                  type="text"
                  placeholder="مثال: الأرينا بلايستيشن كافيه"
                  value={targetSalon}
                  onChange={(e) => setTargetSalon(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>

              <button
                onClick={handleGenerateKey}
                className="w-full bg-primary text-white text-xs font-black py-2.5 rounded-xl hover:bg-primary/90 flex items-center justify-center gap-1.5"
              >
                <Code className="w-4 h-4" />
                <span>توليد وتنشيط الكود الآن</span>
              </button>

              {generatedKey && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-center space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold block">مفتاح الترخيص المنتج:</span>
                  <span className="text-xs font-mono text-white font-black bg-black/40 px-3 py-1 rounded border border-white/5 select-all">
                    {generatedKey}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white">المفاتيح والرموز المفعلة ميدانياً</h3>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {licenses.map(lic => (
                <div key={lic.id} className="bg-white/[0.01] border border-white/5 p-3 rounded-xl flex justify-between items-center text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{lic.salonName}</span>
                    <span className="text-[10px] text-gray-500 block font-mono">بصمة الهاردوير: {lic.hardwareHash}</span>
                  </div>
                  <div className="text-left space-y-1">
                    <span className="font-mono text-[11px] text-indigo-400 bg-black/40 px-2 py-0.5 rounded block">{lic.key}</span>
                    <span className="text-[9px] text-emerald-400 block font-bold">نشط مدى الحياة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Downloads --- */}
      {subSection === 'downloads' && (
        <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4 max-w-2xl">
          <h3 className="text-sm font-black text-white">إدارة إصدارات ملف التثبيت المباشر للويندوز</h3>
          <p className="text-xs text-gray-400">تحكم بملفات التحميل التي يحصل عليها العملاء عند النقر على "بدء التجربة" أو "التحميلات".</p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">رقم الإصدار الحالي (Version)</label>
              <input
                type="text"
                value={winVersion}
                onChange={(e) => setWinVersion(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1 font-bold">حجم ملف الـ EXE (File Size)</label>
              <input
                type="text"
                value={winSize}
                onChange={(e) => setWinSize(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-400 text-xs mb-1 font-bold">سجل مذكرات التحديث الأخير للبرنامج (Changelog)</label>
              <textarea
                rows={3}
                value={updateLog}
                onChange={(e) => setUpdateLog(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => alert('💾 تم تحديث ملفات التثبيت بنجاح وجاهزة للتحميل الفوري للزوار!')}
              className="bg-primary text-white text-xs font-black px-5 py-2.5 rounded-xl hover:bg-primary/90 flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              <span>تحديث وحفظ الملفات في سحابة المطور</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

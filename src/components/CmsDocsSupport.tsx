import React, { useState } from 'react';
import { 
  FileText, HelpCircle, CheckSquare, Plus, Trash2, Search, Check, 
  Sparkles, Save, BookOpen, Clock, Paperclip, MessageSquare, AlertTriangle, Play
} from 'lucide-react';
import { PlaybookArticle, CompanyDocument, PLAYBOOK_ARTICLES, COMPANY_DOCUMENTS } from '../data/cmsMockData';

interface CmsDocsSupportProps {
  activeRole: string;
}

export const CmsDocsSupport: React.FC<CmsDocsSupportProps> = ({ activeRole }) => {
  const [subSection, setSubSection] = useState<'playbook' | 'documents' | 'support'>('playbook');

  // Playbook state
  const [articles, setArticles] = useState<PlaybookArticle[]>(PLAYBOOK_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<PlaybookArticle | null>(PLAYBOOK_ARTICLES[0]);
  const [articleSearch, setArticleSearch] = useState('');

  // Documents state
  const [documents, setDocuments] = useState<CompanyDocument[]>(COMPANY_DOCUMENTS);
  const [docSearch, setDocSearch] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<'proposal' | 'contract' | 'guide' | 'specification'>('specification');

  // Support Tickets state
  const [tickets, setTickets] = useState<any[]>([
    { id: 't-1', name: 'أحمد محمود العشري', parlor: 'الأرينا كافيه', issue: 'فقدت كود الترخيص بعد فرمتة الويندوز بالكامل.', priority: 'high', status: 'open', date: '2026-07-10' },
    { id: 't-2', name: 'سعد العتيبي', parlor: 'The VIP Lounge', issue: 'أود ترقية عدد الأجهزة من ٨ إلى ١٢ في الترخيص الفعلي.', priority: 'medium', status: 'in_progress', date: '2026-07-09' },
    { id: 't-3', name: 'خالد الفضلي', parlor: 'جيم تراك', issue: 'هل يوجد ديمو لسيستم الـ POS لتجربته مع الموظفين؟', priority: 'low', status: 'closed', date: '2026-07-08' }
  ]);
  const [newTicketMsg, setNewTicketMsg] = useState('');
  const [newTicketName, setNewTicketName] = useState('');

  // FAQs state
  const [faqs, setFaqs] = useState<any[]>([
    { id: 'faq-1', question: 'هل يعمل النظام بدون إنترنت بالكامل؟', answer: 'نعم، النظام مصمم للعمل محلياً بنسبة 100% لحماية صالتك من انقطاع الإنترنت أو بطئه، ولا يحتاج للاتصال بالإنترنت إلا للتفعيل لأول مرة.' },
    { id: 'faq-2', question: 'هل توجد رسوم شهرية أو سنوية؟', answer: 'لا، الدفع لمرة واحدة وتمتلك السيستم مدى الحياة بدون اشتراكات أو رسوم خفية.' }
  ]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // Handle PDF Contract generation simulation
  const handlePdfGen = (doc: CompanyDocument) => {
    alert(`📄 محاكاة لتوليد وتنزيل وثيقة الـ PDF بنجاح:\n\nالاسم: ${doc.title}\nالإصدار: ${doc.version}\nبواسطة: ${doc.author}\nتاريخ الإنتاج: ${new Date().toLocaleDateString('ar-EG')}\n\nتم الحفظ كملف PDF رقمي مشفر للأمان.`);
  };

  // Add document
  const handleAddDoc = () => {
    if (!docTitle) return;
    const newDoc: CompanyDocument = {
      id: 'doc-' + Date.now(),
      title: docTitle,
      type: docType,
      version: 'v1.0',
      updatedAt: new Date().toISOString().split('T')[0],
      author: activeRole === 'admin' ? 'م. إسلام عرفة' : 'فريق الدعم الفني'
    };
    setDocuments(prev => [newDoc, ...prev]);
    setDocTitle('');
  };

  // Add Support ticket
  const handleAddTicket = () => {
    if (!newTicketName || !newTicketMsg) return;
    const newT = {
      id: 't-' + Date.now(),
      name: newTicketName,
      parlor: 'صالة ألعاب مجهولة',
      issue: newTicketMsg,
      priority: 'high',
      status: 'open',
      date: new Date().toISOString().split('T')[0]
    };
    setTickets(prev => [newT, ...prev]);
    setNewTicketName('');
    setNewTicketMsg('');
  };

  // Add FAQ
  const handleAddFaq = () => {
    if (!newFaqQ || !newFaqA) return;
    const newF = {
      id: 'faq-' + Date.now(),
      question: newFaqQ,
      answer: newFaqA
    };
    setFaqs(prev => [...prev, newF]);
    setNewFaqQ('');
    setNewFaqA('');
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Sub tabs header */}
      <div className="flex border-b border-white/5 pb-0 overflow-x-auto gap-1">
        <button
          onClick={() => setSubSection('playbook')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'playbook' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          📖 كتاب تشغيل الصالات (Lounge Playbook)
        </button>
        <button
          onClick={() => setSubSection('documents')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'documents' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          📂 وثائق وعقود الشركة (Company Documents)
        </button>
        <button
          onClick={() => setSubSection('support')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'support' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🤝 تذاكر الدعم والأسئلة الشائعة (Support Hub)
        </button>
      </div>

      {/* --- Playbook --- */}
      {subSection === 'playbook' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-black/40 border border-white/5 p-4 rounded-2xl space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في كتاب التشغيل..."
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs pr-9 text-white focus:outline-none"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
            </div>

            <div className="space-y-2">
              {articles
                .filter(a => a.title.toLowerCase().includes(articleSearch.toLowerCase()))
                .map(a => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedArticle(a)}
                    className={`w-full text-right p-3 rounded-xl transition-all border flex flex-col gap-1.5 ${
                      selectedArticle?.id === a.id ? 'bg-primary/10 border-primary text-white' : 'bg-white/[0.01] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="text-xs font-black line-clamp-2">{a.title}</span>
                    <div className="flex justify-between items-center text-[9px] text-gray-500 w-full">
                      <span className="bg-white/5 px-2 py-0.5 rounded text-gray-400">
                        {a.category === 'theft_prevention' ? 'مكافحة السرقة' : a.category === 'management' ? 'إدارة' : a.category === 'marketing' ? 'تسويق' : 'أجهزة وهاردوير'}
                      </span>
                      <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {a.readTime}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4">
            {selectedArticle ? (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white">{selectedArticle.title}</h3>
                
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-xs text-primary leading-relaxed flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary shrink-0" />
                  <p>
                    دليل تشغيلي مخصص لعملاء الباقة الاحترافية والدولية وملاك الصالات لتدريب عمال الكاشير وتفادي ثغرات الصالات.
                  </p>
                </div>

                <div className="bg-black/20 border border-white/5 p-5 rounded-xl whitespace-pre-line text-xs leading-relaxed text-gray-300 font-mono">
                  {selectedArticle.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500 text-xs">
                اختر مقالاً من اليمين لمعاينته وتعديله.
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Documents --- */}
      {subSection === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="عنوان الوثيقة أو العقد الجديد..."
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white w-56 focus:outline-none"
              />
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="specification">وثيقة مواصفات</option>
                <option value="contract">عقد ترخيص</option>
                <option value="proposal">عرض سعر سيادي</option>
                <option value="guide">دليل مستندات</option>
              </select>
              <button
                onClick={handleAddDoc}
                className="bg-primary text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-primary/95"
              >
                إضافة وثيقة
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents.map(doc => (
              <div key={doc.id} className="bg-black/40 border border-white/5 hover:border-white/10 p-4 rounded-2xl space-y-3 transition-all relative group">
                <div className="flex justify-between items-start">
                  <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 text-indigo-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded font-mono">
                    {doc.version}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-white line-clamp-1">{doc.title}</h4>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2 font-mono">
                    <span>بواسطة: {doc.author}</span>
                    <span>{doc.updatedAt}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/5 justify-between">
                  <button
                    onClick={() => handlePdfGen(doc)}
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all w-full text-center cursor-pointer"
                  >
                    تصدير ملف PDF المعتمد 📄
                  </button>

                  <button
                    onClick={() => setDocuments(prev => prev.filter(item => item.id !== doc.id))}
                    className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Support tickets and FAQs --- */}
      {subSection === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Support tickets list */}
          <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white">تذاكر الدعم الفني لعملاء الكاشير</h3>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {tickets.map(t => (
                <div key={t.id} className="bg-white/[0.01] border border-white/5 p-3 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white">{t.name}</span>
                      <span className="text-[10px] text-gray-500 block">{t.parlor}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      t.status === 'open' ? 'bg-rose-500/10 text-rose-400' :
                      t.status === 'in_progress' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {t.status === 'open' ? 'تذكرة مفتوحة' : t.status === 'in_progress' ? 'قيد العمل' : 'محلولة'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed bg-black/40 p-2 rounded">{t.issue}</p>
                  
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[9px] text-gray-500 font-mono">{t.date}</span>
                    <div className="flex gap-1">
                      {t.status !== 'closed' && (
                        <button
                          onClick={() => {
                            setTickets(prev => prev.map(item => item.id === t.id ? { ...item, status: 'closed' } : item));
                          }}
                          className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white px-2 py-0.5 rounded text-[9px] font-bold"
                        >
                          تم الحل ✔️
                        </button>
                      )}
                      <button
                        onClick={() => setTickets(prev => prev.filter(item => item.id !== t.id))}
                        className="bg-red-500/10 text-red-400 p-1 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add ticket */}
            <div className="border-t border-white/5 pt-3 space-y-2">
              <span className="text-[10px] text-gray-400 block font-bold">تسجيل تذكرة دعم فوري طارئة:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="اسم العميل المشتكي"
                  value={newTicketName}
                  onChange={(e) => setNewTicketName(e.target.value)}
                  className="bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white w-40"
                />
                <input
                  type="text"
                  placeholder="تفاصيل الشكوى أو طلب الاستعادة..."
                  value={newTicketMsg}
                  onChange={(e) => setNewTicketMsg(e.target.value)}
                  className="bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white w-full"
                />
                <button
                  onClick={handleAddTicket}
                  className="bg-primary text-white text-xs font-black px-4 py-1.5 rounded-xl hover:bg-primary/90"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>

          {/* Right FAQs control */}
          <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white">إدارة الأسئلة الشائعة في الموقع (FAQ)</h3>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {faqs.map(faq => (
                <div key={faq.id} className="bg-white/[0.01] border border-white/5 p-3 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-bold text-white text-[11px]">{faq.question}</span>
                    <button
                      onClick={() => setFaqs(prev => prev.filter(item => item.id !== faq.id))}
                      className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-1 rounded transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Quick add FAQ */}
            <div className="border-t border-white/5 pt-3 space-y-2">
              <span className="text-[10px] text-gray-400 block font-bold">إضافة سؤال جديد للموقع:</span>
              <input
                type="text"
                placeholder="السؤال باللغة العربية..."
                value={newFaqQ}
                onChange={(e) => setNewFaqQ(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <textarea
                rows={2}
                placeholder="الإجابة التفصيلية النموذجية للعملاء..."
                value={newFaqA}
                onChange={(e) => setNewFaqA(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <button
                onClick={handleAddFaq}
                className="w-full bg-indigo-600 text-white text-xs font-black py-2 rounded-xl hover:bg-indigo-700"
              >
                حفظ وإدراج السؤال في صفحة الهبوط
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

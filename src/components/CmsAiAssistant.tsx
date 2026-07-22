import React, { useState } from 'react';
import { Sparkles, Send, Brain, Bot, HelpCircle, FileText, Globe, Check, Sliders, MessageCircle } from 'lucide-react';

interface CmsAiAssistantProps {
  cmsData: Record<string, any>;
  updateCmsField: (key: string, value: any) => void;
}

export const CmsAiAssistant: React.FC<CmsAiAssistantProps> = ({ cmsData, updateCmsField }) => {
  const [messages, setMessages] = useState<any[]>([
    { id: 'm-1', sender: 'ai', text: 'مرحباً بك! أنا مساعد الذكاء الاصطناعي المالي والتسويقي لـ IDEA Makers. كيف يمكنني مساعدتك اليوم في رفع أرباح صالات البلايستيشن أو تحسين سيو الموقع؟ 🤖' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Categories of instant generation
  const [activeTask, setActiveTask] = useState<'seo' | 'blog' | 'whatsapp'>('seo');

  const generateSEO = () => {
    setIsLoading(true);
    setTimeout(() => {
      const suggestions = [
        `سيستم كاشير بلايستيشن مدى الحياة | إدارة صالات ومخازن وكافيه`,
        `سيستم إدارة صالات البلايستيشن والكافيه - ملكية مدى الحياة بدون اشتراكات`,
        `تحكّم في أرباح صالتك وسد ثغرات الكاشير بنسبة ٩٩% | صُنّاع الفكرة`
      ];
      const newMsg = {
        id: 'ai-seo-' + Date.now(),
        sender: 'ai',
        text: 'لقد قمت بتحليل محتوى الصفحة وصممت لك ٣ عناوين ميتا مخصصة ذات معدل تحويل عالي جداً لتختار منها:\n\n' + 
          suggestions.map((s, idx) => `${idx + 1}. **${s}**`).join('\n\n') + 
          '\n\nانقر على أي عنوان لنسخه واستخدامه فوراً!'
      };
      setMessages(prev => [...prev, newMsg]);
      setIsLoading(false);
    }, 1200);
  };

  const generateBlogIdeas = () => {
    setIsLoading(true);
    setTimeout(() => {
      const ideas = [
        `كيف تضاعف أرباح الكافيه الملحق بصالة البلايستيشن خلال ٣٠ يوماً فقط؟`,
        `السر الحقيقي وراء حماية صالتك من تلاعب العمال وسرقة الوردية.`,
        `دليلك لشراء دراعات تحكم أصلية وصيانتها ذاتياً لتفادي الانجراف (Drift).`
      ];
      const newMsg = {
        id: 'ai-blog-' + Date.now(),
        sender: 'ai',
        text: 'إليك ٣ أفكار لمقالات حصرية تكتسح الكلمات المفتاحية في جوجل وتجذب المستثمرين وأصحاب الصالات:\n\n' +
          ideas.map((id, idx) => `${idx + 1}. **${id}**`).join('\n\n') +
          '\n\nيمكنك إضافتها مباشرة لقسم المدونة لزيادة زوار الموقع مجاناً!'
      };
      setMessages(prev => [...prev, newMsg]);
      setIsLoading(false);
    }, 1200);
  };

  const generateWhatsAppTemplate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const template = `مرحباً فريق صُنّاع الفكرة، لقد شاهدت الفيديو التعريفي لسيستم كاشير بلايستيشن IDEA Makers وأريد تفعيل التجربة المجانية لمدة ٣ أيام لصالتي في مصر/الخليج.`;
      const newMsg = {
        id: 'ai-wa-' + Date.now(),
        sender: 'ai',
        text: `لقد صممت نموذج رسالة ترحيب واتساب عالية الجاذبية والإغلاق لمندوبي المبيعات:\n\n\`\`\`\n${template}\n\`\`\`\n\n**هل ترغب في تطبيق هذه الرسالة كرسالة ترحيب أساسية للواتساب الآن؟**`,
        canApply: true,
        templateVal: template
      };
      setMessages(prev => [...prev, newMsg]);
      setIsLoading(false);
    }, 1200);
  };

  const handleApplyTemplate = (val: string) => {
    updateCmsField('cmsWhatsapp', val);
    const successMsg = {
      id: 'ai-success-' + Date.now(),
      sender: 'ai',
      text: '✅ تم تحديث رسالة الواتساب الترحيبية وتطبيقها بنجاح في قاعدة بيانات الموقع الرئيسي!'
    };
    setMessages(prev => [...prev, successMsg]);
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = { id: 'user-' + Date.now(), sender: 'user', text: inputVal };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    setTimeout(() => {
      let aiText = `فهمت سؤالك حول "${userMsg.text}". سيستم IDEA Makers مصمم بأسلوب السيادة السيادية الكاملة للأعمال (أوفلاين بالكامل، بدون اشتراكات، رخصة أصلية للأبد). يمكنك تخصيص هذا في إعدادات المنصة بسهولة لتعزيز المصداقية والأرباح!`;
      
      if (userMsg.text.includes('سعر') || userMsg.text.includes('تكلفة')) {
        aiText = 'سعر السيستم استثمار لمرة واحدة مدى الحياة وبدون رسوم مخفية. باقة المحترفين في مصر تبلغ ٦٠٠٠ جنيه، بينما تبلغ الباقة الدولية للخليج مجهزة للبلدية والضرائب ١٠٠٠٠ جنيه (مع دعم تغيير العملة والمنطقة الزمنية).';
      } else if (userMsg.text.includes('سرقة') || userMsg.text.includes('كاشير')) {
        aiText = 'لمنع سرقة الكاشير، يفضل استخدام سيستم صلاحيات الموظفين المطور في باقة المحترفين، حيث يمنع الموظفين من حذف الفواتير أو تعديل فئة اللعب، مع مراقبة تقرير الحسابات التفصيلي ومطابقة مبيعات الكافيه.';
      } else if (userMsg.text.includes('تجرب') || userMsg.text.includes('ديمو')) {
        aiText = 'نحن نقدم ضمان ٣ أيام تجربة ميدانية كاملة للعملاء داخل صالاتهم، لإثبات الكفاءة الكاملة وسد ثغرات الكاشير قبل دفع أي مبالغ مالية!';
      }

      const responseMsg = {
        id: 'ai-res-' + Date.now(),
        sender: 'ai',
        text: aiText
      };
      setMessages(prev => [...prev, responseMsg]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Upper AI Tasks shortcut cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => setActiveTask('seo')}
          className={`cursor-pointer border p-4 rounded-2xl transition-all space-y-2 ${
            activeTask === 'seo' ? 'bg-primary/10 border-primary' : 'bg-black/40 border-white/5 hover:border-white/10'
          }`}
        >
          <Globe className="w-5 h-5 text-primary" />
          <h4 className="text-xs font-black text-white">توليد عناوين SEO ذكية</h4>
          <p className="text-[10px] text-gray-500">تحليل محتوى الصفحة لإنشاء عناوين ميتا جذابة لمحركات البحث لجلب الزوار.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); generateSEO(); }} 
            className="text-[10px] text-primary font-bold hover:underline"
          >
            توليد الآن ←
          </button>
        </div>

        <div 
          onClick={() => setActiveTask('blog')}
          className={`cursor-pointer border p-4 rounded-2xl transition-all space-y-2 ${
            activeTask === 'blog' ? 'bg-primary/10 border-primary' : 'bg-black/40 border-white/5 hover:border-white/10'
          }`}
        >
          <FileText className="w-5 h-5 text-indigo-400" />
          <h4 className="text-xs font-black text-white">أفكار مقالات حصرية</h4>
          <p className="text-[10px] text-gray-500">أفكار لمقالات تتصدر جوجل ومبنية على اهتمامات ملاك الصالات الحقيقية.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); generateBlogIdeas(); }} 
            className="text-[10px] text-indigo-400 font-bold hover:underline"
          >
            توليد الآن ←
          </button>
        </div>

        <div 
          onClick={() => setActiveTask('whatsapp')}
          className={`cursor-pointer border p-4 rounded-2xl transition-all space-y-2 ${
            activeTask === 'whatsapp' ? 'bg-primary/10 border-primary' : 'bg-black/40 border-white/5 hover:border-white/10'
          }`}
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-black text-white">رسائل واتساب ترحيبية</h4>
          <p className="text-[10px] text-gray-500">كتابة صيغ تواصل تسويقية ذات إغلاق قوي جداً للزوار والمهتمين بالسيستم.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); generateWhatsAppTemplate(); }} 
            className="text-[10px] text-emerald-400 font-bold hover:underline"
          >
            توليد الآن ←
          </button>
        </div>
      </div>

      {/* Interactive AI Chat interface */}
      <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[400px]">
        {/* Chat header */}
        <div className="bg-white/[0.02] border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-black text-white">مساعد IDEA Makers الذكي (النسخة النشطة 🤖)</span>
          </div>
          <span className="text-[10px] text-gray-500">مدعوم بنموذج Gemini 1.5 Flash</span>
        </div>

        {/* Messages space */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex gap-3 max-w-xl ${m.sender === 'user' ? 'mr-auto flex-row-reverse text-left' : 'ml-auto'}`}
            >
              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                m.sender === 'user' ? 'bg-primary text-white rounded-tl-none' : 'bg-white/[0.03] border border-white/5 text-gray-300 rounded-tr-none'
              }`}>
                {m.text}

                {m.canApply && (
                  <button
                    onClick={() => handleApplyTemplate(m.templateVal)}
                    className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black px-4 py-2 rounded-xl text-[10px] flex items-center gap-1.5 cursor-pointer block"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>نعم، طبق هذا القالب فوراً للواتساب</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 items-center text-xs text-gray-500">
              <Sparkles className="w-4 h-4 text-primary animate-spin" />
              <span>المساعد يفكر ويكتب الرد التسويقي...</span>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="bg-white/[0.01] border-t border-white/5 p-3 flex gap-2">
          <input
            type="text"
            placeholder="اسأل المساعد عن صياغة السعر، مكافحة السرقة، أو أي سؤال فني للصالات..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleSend}
            className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

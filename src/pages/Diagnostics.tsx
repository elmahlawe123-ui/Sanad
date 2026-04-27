import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Search, 
  Droplets, 
  Lightbulb, 
  Thermometer, 
  ChevronLeft, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Diagnostics = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string | null>(null);
  const [symptom, setSymptom] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const categories = [
    { id: 'hvac', title: 'التكييف', icon: <Thermometer />, color: 'cyan' },
    { id: 'plumbing', title: 'السباكة', icon: <Droplets />, color: 'blue' },
    { id: 'electrical', title: 'الكهرباء', icon: <Zap />, color: 'yellow' }
  ];

  const symptoms: Record<string, any[]> = {
    hvac: [
      { id: 'no_cool', text: 'المكيف لا يبرد', severity: 'high' },
      { id: 'noise', text: 'أصوات غريبة', severity: 'medium' },
      { id: 'leak', text: 'تسريب مياه داخلي', severity: 'medium' }
    ],
    plumbing: [
      { id: 'leak', text: 'تسريب في الأنابيب', severity: 'high' },
      { id: 'clog', text: 'انسداد المجاري', severity: 'medium' },
      { id: 'no_hot_water', text: 'لا توجد مياه ساخنة', severity: 'medium' }
    ],
    electrical: [
      { id: 'spark', text: 'شرارة كهربائية', severity: 'critical' },
      { id: 'blackout', text: 'انقطاع تيار جزئي', severity: 'high' },
      { id: 'flicker', text: 'رعشة في الإضاءة', severity: 'medium' }
    ]
  };

  const handleDiagnose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDiagnosis({
        title: 'التشخيص الأولي',
        cause: 'يرجح وجود خلل في الدائرة الكهربائية أو تسريب في غاز الفريون.',
        advice: 'نوصي بفصل التيار الكهربائي فوراً وتجنب محاولة الإصلاح اليدوي لتفادي الضرر.',
        action: 'طلب فني طوارئ فوراً'
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
      <div className="container max-w-4xl text-right">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-16 bg-[#0A2540] rounded-2xl flex items-center justify-center text-[#FF6B00]">
            <Search size={32} />
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-[#0A2540]">نظام التشخيص الذكي</h1>
            <p className="text-gray-500">حدد المشكلة لنقدم لك الحل الأمثل.</p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {!category && (
              <motion.div key="cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12">
                <h3 className="text-2xl font-bold mb-8">اختر القسم الذي يواجه مشكلة</h3>
                <div className="grid grid-cols-3 gap-6">
                  {categories.map((c) => (
                    <button 
                      key={c.id} 
                      onClick={() => setCategory(c.id)}
                      className="p-10 rounded-3xl border-2 border-gray-100 hover:border-[#FF6B00] hover:shadow-xl transition-all flex flex-col items-center gap-4 group"
                    >
                      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-[#0A2540] group-hover:scale-110 transition-transform">
                        {React.cloneElement(c.icon as any, { size: 40 })}
                      </div>
                      <span className="font-bold text-xl">{c.title}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {category && !diagnosis && (
              <motion.div key="symptom" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-12">
                <button onClick={() => setCategory(null)} className="flex items-center gap-2 text-gray-400 font-bold mb-8 hover:text-[#0A2540]">
                  <ArrowRight size={20} className="rotate-180" /> رجوع
                </button>
                <h3 className="text-2xl font-bold mb-8">ما هي الأعراض التي تظهر؟</h3>
                <div className="space-y-4">
                  {symptoms[category]?.map((s) => (
                    <button 
                      key={s.id}
                      onClick={() => { setSymptom(s.id); handleDiagnose(); }}
                      className="w-full p-6 rounded-2xl border-2 border-gray-100 hover:border-[#FF6B00] flex items-center justify-between group transition-all"
                    >
                      <ChevronLeft className="text-gray-300 group-hover:text-[#FF6B00] transition-colors" />
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <span className="font-bold text-lg">{s.text}</span>
                        {s.severity === 'critical' && <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">حرج</span>}
                        {s.severity === 'high' && <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">هام</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-[#FF6B00] rounded-full animate-spin mb-6"></div>
                <p className="text-xl font-bold text-[#0A2540]">جاري تحليل المشكلة بالذكاء الاصطناعي...</p>
              </motion.div>
            )}

            {diagnosis && (
              <motion.div key="diagnosis" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 text-right">
                <div className="bg-orange-50 border-r-8 border-orange-500 p-8 rounded-2xl mb-8">
                  <div className="flex items-center justify-between mb-4 flex-row-reverse">
                    <div className="flex items-center gap-3 text-orange-700">
                      <AlertTriangle size={24} />
                      <h4 className="text-2xl font-bold">{diagnosis.title}</h4>
                    </div>
                  </div>
                  <p className="text-orange-800 text-lg mb-4 font-semibold">{diagnosis.cause}</p>
                  <div className="bg-white/50 p-4 rounded-xl flex items-start gap-4 flex-row-reverse">
                    <Info className="text-blue-600 flex-shrink-0" size={20} />
                    <p className="text-gray-700 text-sm">{diagnosis.advice}</p>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <button 
                    onClick={() => navigate('/request-service', { state: { serviceType: category, description: `${diagnosis.title}: ${diagnosis.cause}` } })}
                    className="btn btn-accent flex-1 py-5 text-xl font-bold"
                  >
                    {diagnosis.action}
                  </button>
                  <button onClick={() => { setDiagnosis(null); setCategory(null); }} className="btn border border-gray-200 px-10">
                    إعادة الفحص
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 p-8 bg-[#0A2540] rounded-3xl text-white flex items-center justify-between">
          <div className="flex items-center gap-4 flex-row-reverse">
            <ShieldCheck className="text-[#FF6B00]" size={32} />
            <p className="font-bold">نظام التشخيص يقدم تقديرات أولية فقط. الفحص الميداني هو الفيصل.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;

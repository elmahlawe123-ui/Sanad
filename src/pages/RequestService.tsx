import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Droplets, 
  Lightbulb, 
  Thermometer, 
  Hammer, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RequestService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    description: '',
    address: '',
    date: '',
    time: '',
    priority: 'normal'
  });

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        serviceType: location.state.serviceType || '',
        description: location.state.description || ''
      }));
      if (location.state.serviceType) setStep(2);
    }
  }, [location]);

  const services = [
    { id: 'plumbing', title: 'سباكة', icon: <Droplets />, color: 'blue' },
    { id: 'electrical', title: 'كهرباء', icon: <Lightbulb />, color: 'yellow' },
    { id: 'hvac', title: 'تكييف', icon: <Thermometer />, color: 'cyan' },
    { id: 'contracting', title: 'مقاولات', icon: <Hammer />, color: 'orange' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // Simulate API call
    setTimeout(() => {
      // navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
      <div className="container max-w-4xl">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-[#0A2540] text-white' : 'bg-gray-200 text-gray-400'}`}>
                {s === 3 && step === 3 ? <CheckCircle2 size={20} /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 bg-gray-200 rounded-full overflow-hidden`}><div className={`h-full bg-[#0A2540] transition-all duration-500 ${step > s ? 'w-full' : 'w-0'}`}></div></div>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 flex-1 flex flex-col"
              >
                <h2 className="text-3xl font-bold text-[#0A2540] mb-2 text-right">ما هي الخدمة التي تحتاجها؟</h2>
                <p className="text-gray-500 mb-10 text-right">اختر نوع الخدمة لنتمكن من توجيه الخبير المناسب لك.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-auto">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setFormData({ ...formData, serviceType: s.id });
                        setStep(2);
                      }}
                      className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 hover:border-[#FF6B00] hover:shadow-lg ${formData.serviceType === s.id ? 'border-[#FF6B00] bg-[#FF6B00]/5' : 'border-gray-100'}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-[#0A2540] bg-gray-50`}>
                        {React.cloneElement(s.icon as any, { size: 32 })}
                      </div>
                      <span className="font-bold text-lg">{s.title}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 flex-1"
              >
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => setStep(1)} className="text-gray-400 hover:text-[#0A2540] flex items-center gap-2 font-bold">
                    <ArrowRight size={20} className="rotate-180" /> رجوع
                  </button>
                  <h2 className="text-3xl font-bold text-[#0A2540] text-right">تفاصيل الموعد والمكان</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-4">
                      <label className="block font-bold text-[#0A2540]">العنوان بالتفصيل</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#FF6B00]"
                          placeholder="المدينة، الحي، اسم الشارع"
                        />
                        <MapPin className="absolute right-4 top-4 text-gray-400" size={20} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="block font-bold text-[#0A2540]">وصف المشكلة</label>
                      <textarea 
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#FF6B00] h-32 resize-none"
                        placeholder="اشرح لنا ما الذي يحتاج للإصلاح..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-4">
                      <label className="block font-bold text-[#0A2540]">التاريخ المفضل</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#FF6B00]"
                        />
                        <Calendar className="absolute right-4 top-4 text-gray-400" size={20} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="block font-bold text-[#0A2540]">الوقت المناسب</label>
                      <div className="relative">
                        <select 
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#FF6B00] appearance-none"
                        >
                          <option value="">اختر الوقت</option>
                          <option value="morning">صباحاً (8:00 - 12:00)</option>
                          <option value="afternoon">بعد الظهر (12:00 - 4:00)</option>
                          <option value="evening">مساءً (4:00 - 8:00)</option>
                        </select>
                        <Clock className="absolute right-4 top-4 text-gray-400" size={20} />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-accent w-full py-5 text-xl mt-8">
                    تأكيد طلب الخدمة
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-16 flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={64} />
                </div>
                <h2 className="text-4xl font-bold text-[#0A2540] mb-4">تم استلام طلبك بنجاح!</h2>
                <p className="text-gray-500 text-lg max-w-md mb-10">
                  شكراً لثقتك بـ **سند تك**. سيقوم خبيرنا بالتواصل معك خلال أقل من ساعتين لتأكيد الموعد النهائي.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => navigate('/dashboard')} className="btn btn-primary px-8">الذهاب لطلباتي</button>
                  <button onClick={() => navigate('/')} className="btn border border-gray-200 px-8">العودة للرئيسية</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between bg-[#0A2540] p-8 rounded-3xl text-white gap-8">
          <div className="flex items-center gap-6 flex-row-reverse text-right">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-[#FF6B00]">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold">تحتاج لمساعدة فورية؟</h4>
              <p className="text-white/60">فريق الدعم الفني متاح 24/7 لحالات الطوارئ.</p>
            </div>
          </div>
          <button className="btn btn-accent px-10 py-4 text-lg w-full md:w-auto">
            اتصل الآن: +966 55 000 0000
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestService;

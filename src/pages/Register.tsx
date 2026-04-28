import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ShieldCheck, Mail, Lock, User, ArrowLeft, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      localStorage.setItem('demo_user', 'true');
      window.location.href = '#/dashboard';
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/dashboard');
    } catch (err: any) {
      setError('فشل إنشاء الحساب. قد يكون البريد مستخدماً بالفعل.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-[#0A2540]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full z-10 py-10"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-[48px] shadow-2xl p-10 lg:p-14 text-right border border-white/20">
          <div className="flex justify-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-20 h-20 bg-[#0A2540] rounded-3xl flex items-center justify-center text-[#FF6B00] shadow-xl shadow-[#0A2540]/20"
            >
              <ShieldCheck size={40} />
            </motion.div>
          </div>
          
          <h2 className="text-4xl font-bold text-[#0A2540] text-center mb-3">إنشاء حساب جديد</h2>
          <p className="text-gray-500 text-center mb-10 text-lg">انضم إلى آلاف العملاء الذين يثقون في سند تك</p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border-r-4 border-red-500 text-red-600 p-4 rounded-2xl text-sm mb-8 text-right font-bold"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-bold text-[#0A2540] mr-2">الاسم بالكامل</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-5 pr-14 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] focus:bg-white transition-all shadow-sm"
                  placeholder="محمد أحمد"
                  required
                />
                <User className="absolute right-5 top-5 text-gray-400 group-focus-within:text-[#FF6B00] transition-colors" size={24} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-[#0A2540] mr-2">البريد الإلكتروني</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 pr-14 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] focus:bg-white transition-all shadow-sm"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="absolute right-5 top-5 text-gray-400 group-focus-within:text-[#FF6B00] transition-colors" size={24} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-[#0A2540] mr-2">رقم الهاتف</label>
              <div className="relative group">
                <input 
                  type="tel" 
                  className="w-full p-5 pr-14 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] focus:bg-white transition-all shadow-sm"
                  placeholder="010XXXXXXXX"
                />
                <Phone className="absolute right-5 top-5 text-gray-400 group-focus-within:text-[#FF6B00] transition-colors" size={24} />
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-bold text-[#0A2540] mr-2">كلمة المرور</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-5 pr-14 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] focus:bg-white transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute right-5 top-5 text-gray-400 group-focus-within:text-[#FF6B00] transition-colors" size={24} />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-accent w-full py-5 text-xl font-bold shadow-lg shadow-[#FF6B00]/20 mt-4 md:col-span-2"
            >
              تأكيد إنشاء الحساب
            </motion.button>
          </form>

          <p className="mt-10 text-center text-gray-500 font-medium">
            لديك حساب بالفعل؟ <Link to="/login" className="text-[#FF6B00] font-bold hover:underline">سجل دخولك الآن</Link>
          </p>
        </div>
        
        {/* Back Link */}
        <Link to="/" className="flex items-center justify-center gap-2 mt-8 text-white/60 hover:text-white transition-colors font-bold">
          <ArrowLeft size={20} className="rotate-180" /> العودة للرئيسية
        </Link>
      </motion.div>
    </div>
  );
};

export default Register;

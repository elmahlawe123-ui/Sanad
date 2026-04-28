import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { ShieldCheck, Mail, Lock, ArrowLeft, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!import.meta.env.VITE_FIREBASE_API_KEY || email === 'demo@sanad.tech') {
      localStorage.setItem('demo_user', 'true');
      window.location.href = '#/dashboard';
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('خطأ في البريد الإلكتروني أو كلمة المرور');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      localStorage.setItem('demo_user', 'true');
      window.location.href = '#/dashboard';
      return;
    }

    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err: any) {
      setError('فشل تسجيل الدخول عبر جوجل');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-[#0A2540]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full z-10"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-[48px] shadow-2xl p-10 lg:p-14 text-right border border-white/20">
          <div className="flex justify-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 bg-[#0A2540] rounded-3xl flex items-center justify-center text-[#FF6B00] shadow-xl shadow-[#0A2540]/20"
            >
              <ShieldCheck size={40} />
            </motion.div>
          </div>
          
          <h2 className="text-4xl font-bold text-[#0A2540] text-center mb-3">مرحباً بعودتك</h2>
          <p className="text-gray-500 text-center mb-10 text-lg">سجل دخولك لمتابعة أعمال الصيانة الخاصة بك</p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border-r-4 border-red-500 text-red-600 p-4 rounded-2xl text-sm mb-8 text-right font-bold"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#0A2540] mr-2">البريد الإلكتروني</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 pr-14 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] focus:bg-white transition-all shadow-sm group-hover:shadow-md"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="absolute right-5 top-5 text-gray-400 group-focus-within:text-[#FF6B00] transition-colors" size={24} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <a href="#" className="text-xs text-[#FF6B00] font-bold hover:underline">نسيت كلمة المرور؟</a>
                <label className="text-sm font-bold text-[#0A2540]">كلمة المرور</label>
              </div>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-5 pr-14 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] focus:bg-white transition-all shadow-sm group-hover:shadow-md"
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
              className="btn btn-accent w-full py-5 text-xl font-bold shadow-lg shadow-[#FF6B00]/20 mt-4"
            >
              تسجيل الدخول
            </motion.button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-400 font-medium">أو سجل عبر</span></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <motion.button 
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={handleGoogleLogin}
              className="w-full py-4 px-6 border border-gray-200 rounded-2xl flex items-center justify-center gap-4 transition-all hover:border-[#FF6B00]/30"
            >
              <Chrome size={24} className="text-[#DB4437]" />
              <span className="font-bold text-[#0A2540]">حساب جوجل الذكي</span>
            </motion.button>
          </div>

          <p className="mt-10 text-center text-gray-500 font-medium">
            ليس لديك حساب بعد؟ <Link to="/register" className="text-[#FF6B00] font-bold hover:underline">انضم لعائلة سند تك</Link>
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

export default Login;

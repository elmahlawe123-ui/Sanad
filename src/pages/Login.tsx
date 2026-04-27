import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { ShieldCheck, Mail, Lock, Globe, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('خطأ في البريد الإلكتروني أو كلمة المرور');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err: any) {
      setError('فشل تسجيل الدخول عبر جوجل');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-8 lg:p-12 text-right">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#0A2540] rounded-2xl flex items-center justify-center text-[#FF6B00]">
            <ShieldCheck size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[#0A2540] text-center mb-2">تسجيل الدخول</h2>
        <p className="text-gray-500 text-center mb-8">مرحباً بك مجدداً في سند تك</p>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">{error}</div>}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0A2540]">البريد الإلكتروني</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00] transition-colors"
                placeholder="example@mail.com"
                required
              />
              <Mail className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0A2540]">كلمة المرور</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00] transition-colors"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>
          </div>

          <button type="submit" className="btn btn-accent w-full py-4 text-lg">
            دخول
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">أو عبر</span></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full py-4 px-6 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <Globe size={20} className="text-red-500" />
          <span className="font-semibold text-gray-700">التسجيل بواسطة جوجل</span>
        </button>

        <p className="mt-8 text-center text-gray-600">
          ليس لديك حساب؟ <Link to="/register" className="text-[#FF6B00] font-bold">إنشاء حساب جديد</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

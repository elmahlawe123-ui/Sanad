import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ShieldCheck, Mail, Lock, User, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Here you could also update the profile with the name
      navigate('/dashboard');
    } catch (err: any) {
      setError('حدث خطأ أثناء إنشاء الحساب. تأكد من صحة البيانات.');
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
        <h2 className="text-3xl font-bold text-[#0A2540] text-center mb-2">إنشاء حساب</h2>
        <p className="text-gray-500 text-center mb-8">انضم إلى مجتمع سند تك المتميز</p>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0A2540]">الاسم بالكامل</label>
            <div className="relative">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00] transition-colors"
                placeholder="أحمد محمد"
                required
              />
              <User className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>
          </div>

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
            إنشاء حساب
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          لديك حساب بالفعل؟ <Link to="/login" className="text-[#FF6B00] font-bold">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

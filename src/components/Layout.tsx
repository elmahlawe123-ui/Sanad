import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Globe, 
  Share2, 
  MessageCircle, 
  Send,
  User,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkNav = location.pathname !== '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isDarkNav ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#0A2540] rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-[#FF6B00]" size={24} />
          </div>
          <span className="text-2xl font-bold text-[#0A2540]">سند <span className="text-[#FF6B00]">تك</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'الرئيسية', path: '/' },
            { name: 'التشخيص الذكي', path: '/diagnostics' },
            { name: 'الخدمات', path: '/#services' },
            { name: 'عن الشركة', path: '/#about' },
            { name: 'المشاريع', path: '/projects' },
            { name: 'لوحة التحكم', path: '/dashboard' },
            { name: 'اتصل بنا', path: '/#contact' }
          ].map((item) => (
            <Link key={item.path} to={item.path} className="font-medium text-[#0A2540] hover:text-[#FF6B00]">
              {item.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 border-r pr-8">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 text-[#0A2540] font-bold">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><User size={16} /></div>
                حسابي
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary text-sm">تسجيل الدخول</Link>
            )}
            <button className="btn btn-accent text-sm">
              <Phone size={16} className="ml-2" />
              طلب طوارئ
            </button>
          </div>
        </div>

        <button className="md:hidden text-[#0A2540]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden">
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-right">الرئيسية</Link>
              {user ? (
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-right">حسابي</Link>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-right">تسجيل الدخول</Link>
              )}
              <button className="btn btn-accent w-full mt-2">طلب طوارئ</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white pt-20 pb-10 border-t">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-12 mb-20 text-right">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6 flex-row-reverse">
            <div className="w-10 h-10 bg-[#0A2540] rounded-lg flex items-center justify-center text-[#FF6B00]"><ShieldCheck size={24} /></div>
            <span className="text-2xl font-bold text-[#0A2540]">سند <span className="text-[#FF6B00]">تك</span></span>
          </div>
          <p className="text-gray-600 mb-8">إعادة تعريف الصيانة الاحترافية للعالم الحديث.</p>
          <div className="flex gap-4 justify-end">
            {[Globe, Share2, MessageCircle, Send].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#0A2540] hover:bg-[#FF6B00] hover:text-white transition-all"><Icon size={20} /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg mb-6">خدماتنا</h4>
          <ul className="space-y-4 text-gray-600">
            <li><a href="#" className="hover:text-[#FF6B00]">سباكة</a></li>
            <li><a href="#" className="hover:text-[#FF6B00]">كهرباء</a></li>
            <li><a href="#" className="hover:text-[#FF6B00]">تكييف</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg mb-6">روابط سريعة</h4>
          <ul className="space-y-4 text-gray-600">
            <li><Link to="/" className="hover:text-[#FF6B00]">الرئيسية</Link></li>
            <li><Link to="/login" className="hover:text-[#FF6B00]">تسجيل الدخول</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg mb-6">اتصل بنا</h4>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center gap-3 flex-row-reverse"><MapPin size={20} className="text-[#FF6B00]" /> طريق الأعمال، جناح 500</li>
            <li className="flex items-center gap-3 flex-row-reverse"><Phone size={20} className="text-[#FF6B00]" /> +966 55 000 0000</li>
          </ul>
        </div>
      </div>
      <div className="border-t pt-10 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">© 2024 سند تك. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

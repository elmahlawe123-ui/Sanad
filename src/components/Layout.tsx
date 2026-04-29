import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin, 
  Globe, 
  Share2, 
  MessageCircle, 
  Send,
  User,
  LayoutGrid,
  ClipboardList,
  FolderKanban,
  Headphones,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkNav = location.pathname !== '/';
  
  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: <Globe size={20} /> },
    { name: 'التشخيص الذكي', path: '/diagnostics', icon: <Settings size={20} /> },
    { name: 'المشاريع', path: '/projects', icon: <FolderKanban size={20} /> },
    { name: 'لوحة التحكم', path: '/dashboard', icon: <LayoutGrid size={20} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isDarkNav ? 'bg-white/90 backdrop-blur-md shadow-sm py-2 md:py-3' : 'bg-transparent py-4 md:py-5'}`}>
      <div className="container flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0A2540] rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-[#FF6B00]" size={20} md:size={24} />
          </div>
          <span className="text-xl md:text-2xl font-bold text-[#0A2540]">سند <span className="text-[#FF6B00]">تك</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link key={item.path} to={item.path} className="font-bold text-sm text-[#0A2540] hover:text-[#FF6B00] transition-colors">
              {item.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 border-r border-gray-100 pr-8">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 text-[#0A2540] font-bold text-sm bg-gray-50 px-4 py-2 rounded-xl">
                <User size={16} className="text-[#FF6B00]" />
                حسابي
              </Link>
            ) : (
              <Link to="/login" className="font-bold text-sm text-[#0A2540] hover:text-[#FF6B00]">تسجيل الدخول</Link>
            )}
            <button onClick={() => navigate('/request-service')} className="bg-[#FF6B00] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
              طلب صيانة
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-[#0A2540] bg-gray-50 rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#0A2540]/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-2xl p-6 flex flex-col text-right"
            >
              <div className="flex items-center justify-between mb-10">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <X size={24} />
                </button>
                <div className="flex items-center gap-2 flex-row-reverse">
                  <div className="w-8 h-8 bg-[#0A2540] rounded-lg flex items-center justify-center text-[#FF6B00]"><ShieldCheck size={20} /></div>
                  <span className="font-bold text-[#0A2540]">سند تك</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">القائمة الرئيسية</p>
                {navLinks.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all font-bold text-[#0A2540]"
                  >
                    <ChevronRight size={18} className="text-gray-300" />
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <span className="text-[#FF6B00]">{item.icon}</span>
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-4 pt-6 border-t border-gray-100">
                {user ? (
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-[#0A2540] text-white rounded-2xl font-bold"
                  >
                    انتقل للوحة التحكم <LayoutGrid size={20} />
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-gray-100 text-[#0A2540] rounded-2xl font-bold"
                  >
                    تسجيل الدخول <User size={20} />
                  </Link>
                )}
                <button className="w-full flex items-center justify-center gap-3 p-4 bg-[#FF6B00] text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20">
                  اتصل بنا <Phone size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ChevronRight = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const Footer = () => (
  <footer className="bg-[#0A2540] text-white pt-20 pb-10 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    
    <div className="container px-4 md:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-right">
        <div className="space-y-6">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-2xl font-bold">سند <span className="text-[#FF6B00]">تك</span></span>
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[#FF6B00]"><ShieldCheck size={24} /></div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs ml-auto">هويتنا هي الموثوقية، وهدفنا هو راحة بالك. نقدم حلول صيانة ذكية تتخطى التوقعات.</p>
          <div className="flex gap-3 justify-end">
            {[Globe, Share2, MessageCircle, Send].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#FF6B00] transition-all"><Icon size={18} /></a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 text-[#FF6B00]">خدماتنا</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">أنظمة السباكة الذكية</li>
            <li className="hover:text-white transition-colors cursor-pointer">الطاقة والكهرباء</li>
            <li className="hover:text-white transition-colors cursor-pointer">التكييف والتهوية</li>
            <li className="hover:text-white transition-colors cursor-pointer">الصيانة الوقائية</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 text-[#FF6B00]">روابط سريعة</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link to="/diagnostics" className="hover:text-white transition-colors">التشخيص الذكي</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">معرض المشاريع</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">بوابة العميل</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 text-[#FF6B00]">تواصل معنا</h4>
          <ul className="space-y-6 text-white/60 text-sm">
            <li className="flex items-start gap-4 justify-end">
              <span>شارع التقنية، المبنى الإداري 4، الطابق الثاني</span>
              <MapPin size={20} className="text-[#FF6B00] shrink-0" />
            </li>
            <li className="flex items-center gap-4 justify-end">
              <span>+966 50 123 4567</span>
              <Phone size={20} className="text-[#FF6B00] shrink-0" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-bold">
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
        </div>
        <p>© 2024 سند تك. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
};

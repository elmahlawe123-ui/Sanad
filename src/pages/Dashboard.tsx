import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { 
  User, 
  Settings, 
  LogOut, 
  Calendar, 
  Hammer, 
  Clock, 
  ChevronLeft,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Briefcase,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const data = [
  { name: 'يناير', requests: 4, cost: 400 },
  { name: 'فبراير', requests: 3, cost: 300 },
  { name: 'مارس', requests: 8, cost: 1200 },
  { name: 'أبريل', requests: 5, cost: 600 },
  { name: 'مايو', requests: 9, cost: 1500 },
  { name: 'يونيو', requests: 6, cost: 800 },
];

const StatCard = ({ title, value, trend, icon, gradient }: any) => (
  <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b ${gradient}`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-gray-50 text-[#0A2540] group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend} <TrendingUp size={14} className={trend.startsWith('-') ? 'rotate-90' : ''} />
      </div>
    </div>
    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-[#0A2540]">{value}</h3>
  </div>
);

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-16 h-16 border-4 border-gray-100 border-t-[#FF6B00] rounded-full animate-spin"></div>
    </div>
  );
  
  const isDemo = auth.app.options.apiKey === "demo-mode" || auth.app.options.apiKey === "YOUR_API_KEY";
  if (!user && !isDemo) return <Navigate to="/login" />;

  const sidebarItems = [
    { icon: <Briefcase size={20} />, label: 'نظرة عامة', active: true, path: '/dashboard' },
    { icon: <Hammer size={20} />, label: 'طلبات الصيانة' },
    { icon: <Calendar size={20} />, label: 'المواعيد المجدولة' },
    { icon: <CreditCard size={20} />, label: 'الفواتير والمدفوعات', path: '/invoices' },
    { icon: <User size={20} />, label: 'الملف الشخصي', path: '/profile' },
    { icon: <Settings size={20} />, label: 'إعدادات الحساب' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row overflow-x-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-[#0A2540]">
          <Menu size={28} />
        </button>
        <div className="flex items-center gap-2 flex-row-reverse">
          <div className="w-8 h-8 bg-[#0A2540] rounded-lg flex items-center justify-center text-[#FF6B00]">
            <ShieldCheck size={20} />
          </div>
          <span className="font-bold text-[#0A2540]">لوحة التحكم</span>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Premium Sidebar */}
      <aside className={`
        fixed md:sticky top-0 right-0 h-screen w-80 bg-white border-l border-gray-100 
        flex flex-col z-[70] shadow-2xl md:shadow-sm transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-gray-400">
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 flex-row-reverse">
            <div className="w-10 h-10 bg-[#0A2540] rounded-xl flex items-center justify-center text-[#FF6B00]">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold text-[#0A2540]">لوحة التحكم</span>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-3xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#0A2540] to-blue-900 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {user?.email?.charAt(0).toUpperCase() || 'D'}
            </div>
            <h3 className="text-md font-bold text-[#0A2540] truncate">{user?.displayName || 'عميل سند تك'}</h3>
            <p className="text-[10px] text-gray-400 truncate">{user?.email || 'demo@sanad.tech'}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item: any, i) => (
            <button 
              key={i} 
              onClick={() => {
                if(item.path) navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${item.active ? 'bg-[#0A2540] text-white shadow-lg' : 'hover:bg-gray-50 text-gray-500 hover:text-[#0A2540]'}`}
            >
              <div className="flex items-center gap-4 flex-row-reverse">
                <span className={item.active ? 'text-[#FF6B00]' : ''}>{item.icon}</span>
                <span className="font-bold">{item.label}</span>
              </div>
              <ChevronLeft size={16} className={item.active ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-gray-50">
          <button 
            onClick={async () => {
              localStorage.removeItem('demo_user');
              await signOut(auth);
              navigate('/login');
            }}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold flex-row-reverse"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen pt-8 md:pt-24 pb-12 px-4 md:px-8 overflow-x-hidden">
        <header className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6 text-right">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-2 leading-tight">مرحباً بك، {user?.displayName?.split(' ')[0] || 'عميلنا'} 👋</h1>
            <p className="text-gray-500 text-sm md:text-base">إليك ملخص سريع لنشاط حسابك.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <input type="text" placeholder="بحث..." className="w-full bg-white border border-gray-100 rounded-2xl py-3 pr-12 pl-4 outline-none focus:border-[#FF6B00] shadow-sm text-right" />
              <Search className="absolute right-4 top-3.5 text-gray-400" size={18} />
            </div>
            <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-500 relative shadow-sm hidden sm:flex">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard title="الطلبات النشطة" value="3" trend="+12%" icon={<Clock size={24} />} gradient="from-blue-500 to-blue-600" />
          <StatCard title="إجمالي المدفوعات" value="₪4,250" trend="+8%" icon={<CreditCard size={24} />} gradient="from-[#FF6B00] to-orange-600" />
          <StatCard title="المهام المكتملة" value="28" trend="+24%" icon={<ShieldCheck size={24} />} gradient="from-green-500 to-green-600" />
          <StatCard title="ساعات الصيانة" value="142" trend="-4%" icon={<Hammer size={24} />} gradient="from-purple-500 to-purple-600" />
        </div>

        {/* Charts & Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-xl border border-gray-100 text-right">
            <div className="flex items-center justify-between mb-8 flex-row-reverse">
              <h4 className="text-lg md:text-xl font-bold text-[#0A2540]">تحليل النشاط</h4>
              <select className="bg-gray-50 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-gray-500">
                <option>آخر 6 أشهر</option>
              </select>
            </div>
            <div className="h-[250px] md:h-[350px] w-full">
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="requests" stroke="#FF6B00" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-xl border border-gray-100 text-right">
            <h4 className="text-lg md:text-xl font-bold text-[#0A2540] mb-6">آخر التحديثات</h4>
            <div className="space-y-6 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-50">
              {[
                { time: 'منذ ساعتين', title: 'تأكيد السباكة', type: 'success' },
                { time: 'أمس', title: 'صيانة المكيف', type: 'info' },
                { time: 'قبل يومين', title: 'فاتورة جديدة', type: 'warning' },
                { time: '3 أيام', title: 'تحديث الملف', type: 'info' }
              ].map((activity, i) => (
                <div key={i} className="relative pr-10">
                  <div className={`absolute right-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm ${activity.type === 'success' ? 'bg-green-500' : activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                  <p className="text-[10px] text-gray-400 font-bold mb-1">{activity.time}</p>
                  <p className="text-sm font-bold text-[#0A2540]">{activity.title}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-gray-100 rounded-2xl text-[#0A2540] font-bold text-sm hover:bg-gray-50 transition-all">
              عرض الكل
            </button>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="mt-8 bg-white rounded-[32px] md:rounded-[40px] shadow-xl border border-gray-100 overflow-hidden text-right">
          <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between flex-row-reverse">
            <h4 className="text-lg md:text-xl font-bold text-[#0A2540]">الطلبات الأخيرة</h4>
            <button className="text-[#FF6B00] font-bold text-xs hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right min-w-[600px]">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">الخدمة</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">التاريخ</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">الحالة</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">التكلفة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { service: 'مكيف مركزي', date: '24 أبريل', status: 'جاري', cost: '₪250', color: 'blue' },
                  { service: 'تسريب مياه', date: '15 أبريل', status: 'مكتمل', cost: '₪180', color: 'green' }
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#0A2540]">{item.service}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">{item.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.color === 'green' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#0A2540]">{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
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
  Search
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-16 h-16 border-4 border-gray-100 border-t-[#FF6B00] rounded-full animate-spin"></div>
    </div>
  );
  
  const isDemo = auth.app.options.apiKey === "YOUR_API_KEY";
  if (!user && !isDemo) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Premium Sidebar */}
      <aside className="w-80 bg-white border-l border-gray-100 hidden md:flex flex-col fixed h-full right-0 z-40 shadow-sm">
        <div className="p-8 border-b border-gray-50">
          <div className="flex items-center gap-3 flex-row-reverse">
            <div className="w-10 h-10 bg-[#0A2540] rounded-xl flex items-center justify-center text-[#FF6B00]">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold text-[#0A2540]">لوحة التحكم</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 mb-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#0A2540] to-blue-900 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold uppercase shadow-lg shadow-blue-900/20">
              {user?.email?.charAt(0) || 'D'}
            </div>
            <h3 className="text-lg font-bold text-[#0A2540]">{user?.displayName || 'عميل سند تك'}</h3>
            <p className="text-xs text-gray-500">{user?.email || 'demo@sanad.tech'}</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {[
            { icon: <Briefcase size={20} />, label: 'نظرة عامة', active: true },
            { icon: <Hammer size={20} />, label: 'طلبات الصيانة' },
            { icon: <Calendar size={20} />, label: 'المواعيد المجدولة' },
            { icon: <CreditCard size={20} />, label: 'الفواتير والمدفوعات', path: '/invoices' },
            { icon: <User size={20} />, label: 'الملف الشخصي' },
            { icon: <Settings size={20} />, label: 'إعدادات الحساب' }
          ].map((item: any, i) => (
            <button 
              key={i} 
              onClick={() => item.path && navigate(item.path)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${item.active ? 'bg-[#0A2540] text-white shadow-lg shadow-[#0A2540]/20' : 'hover:bg-gray-50 text-gray-500 hover:text-[#0A2540]'}`}
            >
              <div className="flex items-center gap-4">
                <span className={item.active ? 'text-[#FF6B00]' : ''}>{item.icon}</span>
                <span className="font-bold">{item.label}</span>
              </div>
              <ChevronLeft size={16} className={item.active ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-gray-50">
          <button 
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:mr-80 min-h-screen pt-24 pb-12 px-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-right">
          <div>
            <h1 className="text-3xl font-bold text-[#0A2540] mb-2">مرحباً بك، {user?.displayName || 'عميلنا العزيز'} 👋</h1>
            <p className="text-gray-500">إليك ملخص سريع لنشاط حسابك وطلبات الصيانة الخاصة بك.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="بحث..." className="bg-white border border-gray-100 rounded-2xl py-3 pr-12 pl-4 outline-none focus:border-[#FF6B00] shadow-sm w-64 text-right" />
              <Search className="absolute right-4 top-3.5 text-gray-400" size={18} />
            </div>
            <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-500 relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="الطلبات النشطة" value="3" trend="+12%" icon={<Clock size={24} />} gradient="from-blue-500 to-blue-600" />
          <StatCard title="إجمالي المدفوعات" value="₪4,250" trend="+8%" icon={<CreditCard size={24} />} gradient="from-[#FF6B00] to-orange-600" />
          <StatCard title="المهام المكتملة" value="28" trend="+24%" icon={<ShieldCheck size={24} />} gradient="from-green-500 to-green-600" />
          <StatCard title="ساعات الصيانة" value="142" trend="-4%" icon={<Hammer size={24} />} gradient="from-purple-500 to-purple-600" />
        </div>

        {/* Charts & Table Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-xl border border-gray-100 text-right">
            <div className="flex items-center justify-between mb-8 flex-row-reverse">
              <h4 className="text-xl font-bold text-[#0A2540]">تحليل النشاط الشهري</h4>
              <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-500 outline-none">
                <option>آخر 6 أشهر</option>
                <option>آخر سنة</option>
              </select>
            </div>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="requests" stroke="#FF6B00" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100 text-right">
            <h4 className="text-xl font-bold text-[#0A2540] mb-8">آخر التحديثات</h4>
            <div className="space-y-8 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              {[
                { time: 'منذ ساعتين', title: 'تم تأكيد طلب السباكة', type: 'success' },
                { time: 'أمس', title: 'تم الانتهاء من صيانة المكيف', type: 'info' },
                { time: 'قبل يومين', title: 'فاتورة جديدة بانتظار الدفع', type: 'warning' },
                { time: '3 أيام', title: 'تم تحديث ملفك الشخصي', type: 'info' }
              ].map((activity, i) => (
                <div key={i} className="relative pr-10">
                  <div className={`absolute right-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${activity.type === 'success' ? 'bg-green-500' : activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                  <p className="text-xs text-gray-400 font-bold mb-1">{activity.time}</p>
                  <p className="text-sm font-bold text-[#0A2540]">{activity.title}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 border border-gray-100 rounded-2xl text-[#0A2540] font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              عرض كل النشاطات <ChevronLeft size={16} />
            </button>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="mt-8 bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden text-right">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between flex-row-reverse">
            <h4 className="text-xl font-bold text-[#0A2540]">طلبات الصيانة الأخيرة</h4>
            <button className="text-[#FF6B00] font-bold text-sm hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">الخدمة</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">التاريخ</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">الحالة</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">التكلفة</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: '1', service: 'صيانة مكيف مركزي', date: '24 أبريل 2024', status: 'جاري العمل', cost: '₪250', color: 'blue' },
                  { id: '2', service: 'إصلاح تسريب مياه', date: '15 أبريل 2024', status: 'مكتمل', cost: '₪180', color: 'green' },
                  { id: '3', service: 'فحص لوحة كهرباء', date: '10 أبريل 2024', status: 'ملغي', cost: '₪0', color: 'red' },
                  { id: '4', service: 'تركيب إضاءة ذكية', date: '02 أبريل 2024', status: 'مكتمل', cost: '₪540', color: 'green' }
                ].map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#0A2540] group-hover:bg-white transition-colors">
                          <Hammer size={18} />
                        </div>
                        <span className="font-bold text-[#0A2540]">{item.service}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">{item.date}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${item.color === 'green' ? 'bg-green-100 text-green-600' : item.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold text-[#0A2540]">{item.cost}</td>
                    <td className="px-8 py-6">
                      <button className="p-2 text-gray-400 hover:text-[#0A2540] hover:bg-gray-100 rounded-lg transition-all">
                        <ChevronLeft size={18} />
                      </button>
                    </td>
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

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Settings, 
  Camera,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    username: 'sanad_user_01',
    email: user?.email || 'demo@sanad.tech',
    firstName: 'محمد',
    lastName: 'أحمد',
    address: 'شارع فلسطين، الطابق الثالث',
    city: 'غزة',
    country: 'فلسطين',
    postalCode: '00970',
    about: 'عميل مميز لدى سند تك منذ عام 2024. أهتم بجودة الصيانة الدورية لمنزلي ومكتبي.'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header Background */}
      <div className="relative h-80 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] to-[#FF6B00]/20"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container -mt-40 relative z-10 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* User Summary Card (Sidebar Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-gray-100 text-center">
              <div className="h-24 bg-gray-50 border-b border-gray-100 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
                  <div className="relative group">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=0A2540&color=FF6B00&size=128`}
                      alt="Profile"
                      className="w-32 h-32 rounded-3xl border-8 border-white shadow-lg object-cover"
                    />
                    <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-md text-[#FF6B00] hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-10 px-8">
                <div className="flex justify-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#0A2540]">22</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">طلبات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#0A2540]">10</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">صور</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#0A2540]">89</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">تقييمات</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540] mb-1">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-500 mb-6 flex items-center justify-center gap-2 flex-row-reverse">
                   {profileData.city}، {profileData.country} <MapPin size={16} className="text-[#FF6B00]" />
                </p>
                <div className="space-y-4 border-t border-gray-50 pt-8 text-right">
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <Briefcase size={18} className="text-[#0A2540]" />
                    <span className="text-gray-600">مدير مشاريع - شركة التطوير العقاري</span>
                  </div>
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <GraduationCap size={18} className="text-[#0A2540]" />
                    <span className="text-gray-600">جامعة الهندسة والتكنولوجيا</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0A2540] rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4">عضوية سند النخبة</h4>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">أنت الآن تستمتع بميزات العضوية الفضية. احصل على خصم 15% على جميع الخدمات القادمة.</p>
                <button className="w-full py-4 bg-[#FF6B00] rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">ترقية العضوية</button>
              </div>
              <ShieldCheck className="absolute -bottom-10 -left-10 text-white/5 rotate-12" size={200} />
            </div>
          </motion.div>

          {/* Edit Profile Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between flex-row-reverse bg-gray-50/50">
                <h4 className="text-xl font-bold text-[#0A2540]">تعديل الملف الشخصي</h4>
                <button className="btn btn-accent px-8 py-2 text-sm font-bold">حفظ التغييرات</button>
              </div>
              <div className="p-10 text-right">
                <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-r-4 border-[#FF6B00] pr-3">معلومات المستخدم</h6>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">اسم المستخدم</label>
                    <input type="text" value={profileData.username} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">البريد الإلكتروني</label>
                    <input type="email" value={profileData.email} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">الاسم الأول</label>
                    <input type="text" value={profileData.firstName} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">اسم العائلة</label>
                    <input type="text" value={profileData.lastName} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                </div>

                <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-r-4 border-[#FF6B00] pr-3">معلومات الاتصال</h6>
                <div className="grid md:grid-cols-1 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">العنوان بالتفصيل</label>
                    <input type="text" value={profileData.address} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">المدينة</label>
                    <input type="text" value={profileData.city} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">الدولة</label>
                    <input type="text" value={profileData.country} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">الرمز البريدي</label>
                    <input type="text" value={profileData.postalCode} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all" />
                  </div>
                </div>

                <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-r-4 border-[#FF6B00] pr-3">نبذة عني</h6>
                <div className="space-y-2">
                  <textarea rows={4} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF6B00] transition-all resize-none" defaultValue={profileData.about}></textarea>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;

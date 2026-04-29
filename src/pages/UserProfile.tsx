import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Camera,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();
  const [profileData] = useState({
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
      {/* Back Button for Mobile */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Link to="/dashboard" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
          <ChevronRight size={24} />
        </Link>
      </div>

      {/* Premium Header Background */}
      <div className="relative h-64 md:h-80 bg-[#0A2540] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] to-[#FF6B00]/20"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-32 md:-mt-40 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* User Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-6 md:space-y-8"
          >
            <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-xl overflow-hidden border border-gray-100 text-center">
              <div className="h-20 md:h-24 bg-gray-50 border-b border-gray-100 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 md:-bottom-12">
                  <div className="relative group">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=0A2540&color=FF6B00&size=128`}
                      alt="Profile"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 md:border-8 border-white shadow-lg object-cover"
                    />
                    <button className="absolute bottom-1 right-1 p-1.5 md:p-2 bg-white rounded-xl shadow-md text-[#FF6B00]">
                      <Camera size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-14 md:pt-16 pb-8 md:pb-10 px-6 md:px-8">
                <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-bold text-[#0A2540]">22</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">طلبات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-bold text-[#0A2540]">10</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">صور</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-bold text-[#0A2540]">89</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">تقييمات</p>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#0A2540] mb-1">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-2 flex-row-reverse">
                   {profileData.city}، {profileData.country} <MapPin size={14} className="text-[#FF6B00]" />
                </p>
                <div className="space-y-3 md:space-y-4 border-t border-gray-50 pt-6 md:pt-8 text-right">
                  <div className="flex items-center gap-3 md:gap-4 flex-row-reverse">
                    <Briefcase size={16} className="text-[#0A2540]" />
                    <span className="text-xs md:text-gray-600">مدير مشاريع - شركة التطوير العقاري</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 flex-row-reverse">
                    <GraduationCap size={16} className="text-[#0A2540]" />
                    <span className="text-xs md:text-gray-600">جامعة الهندسة والتكنولوجيا</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0A2540] rounded-[32px] md:rounded-[40px] p-6 md:p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">عضوية سند النخبة</h4>
                <p className="text-white/60 text-xs md:text-sm mb-6 leading-relaxed">أنت الآن تستمتع بميزات العضوية الفضية. احصل على خصم 15% على الخدمات.</p>
                <button className="w-full py-3 md:py-4 bg-[#FF6B00] rounded-2xl font-bold text-sm md:text-base">ترقية العضوية</button>
              </div>
              <ShieldCheck className="absolute -bottom-10 -left-10 text-white/5 rotate-12" size={160} />
            </div>
          </motion.div>

          {/* Edit Profile Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between flex-row-reverse bg-gray-50/50">
                <h4 className="text-lg md:text-xl font-bold text-[#0A2540]">تعديل البيانات</h4>
                <button className="bg-[#FF6B00] text-white px-6 md:px-8 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold">حفظ</button>
              </div>
              <div className="p-6 md:p-10 text-right">
                <h6 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8 border-r-4 border-[#FF6B00] pr-3">المعلومات الشخصية</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-500">اسم المستخدم</label>
                    <input type="text" value={profileData.username} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-[#FF6B00]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-500">البريد الإلكتروني</label>
                    <input type="email" value={profileData.email} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-[#FF6B00]" />
                  </div>
                </div>

                <h6 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8 border-r-4 border-[#FF6B00] pr-3">العنوان والاتصال</h6>
                <div className="grid grid-cols-1 gap-4 md:gap-8 mb-6 md:mb-8">
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-500">العنوان بالتفصيل</label>
                    <input type="text" value={profileData.address} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-[#FF6B00]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-500">المدينة</label>
                    <input type="text" value={profileData.city} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-[#FF6B00]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-500">الدولة</label>
                    <input type="text" value={profileData.country} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-[#FF6B00]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-500">الرمز البريدي</label>
                    <input type="text" value={profileData.postalCode} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-[#FF6B00]" />
                  </div>
                </div>

                <h6 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8 border-r-4 border-[#FF6B00] pr-3">نبذة عني</h6>
                <div className="space-y-2">
                  <textarea rows={4} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-[#FF6B00] resize-none" defaultValue={profileData.about}></textarea>
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

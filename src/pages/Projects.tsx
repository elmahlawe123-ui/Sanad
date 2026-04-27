import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Camera, LayoutGrid } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "تحديث نظام التكييف المركزي",
      category: "تجاري",
      client: "برج بلازا التجاري",
      image: "/commercial.png",
      description: "إعادة تصميم وتحديث كامل لنظام التدفئة والتهوية وتكييف الهواء (HVAC) باستخدام تقنيات توفير الطاقة الحديثة."
    },
    {
      id: 2,
      title: "تكامل المنزل الذكي",
      category: "سكني",
      client: "قصر النخبة",
      image: "/hero.png",
      description: "تصميم وتنفيذ نظام كهربائي ذكي يتضمن الإضاءة، الحماية، والتحكم في المناخ عبر واجهة موحدة."
    },
    {
      id: 3,
      title: "صيانة مرافق مجمع سكني",
      category: "سكني",
      client: "مجمع الواحة",
      image: "/technician.png",
      description: "عقد صيانة شامل يغطي السباكة، الكهرباء، والتجهيزات العامة لأكثر من 50 وحدة سكنية."
    },
    {
      id: 4,
      title: "إصلاح أنظمة مياه المصانع",
      category: "صناعي",
      client: "مصنع الأمل للكيماويات",
      image: "/commercial.png",
      description: "معالجة تسريبات حرجة في أنظمة التبريد الصناعية مع ضمان استمرارية الإنتاج."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
      <div className="container text-right">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-16 gap-8">
          <div>
            <div className="badge">معرض الأعمال</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A2540] mt-4">مشاريع تعكس <span className="text-[#FF6B00]">دقتنا</span></h1>
            <p className="text-gray-500 mt-4 text-lg">نحن لا نقوم بالإصلاح فحسب، بل نبني الثقة من خلال التميز في كل تفصيل.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 flex-row-reverse">
              <div className="w-12 h-12 bg-[#0A2540] rounded-xl flex items-center justify-center text-[#FF6B00]"><LayoutGrid size={24} /></div>
              <div>
                <p className="font-bold text-[#0A2540]">150+</p>
                <p className="text-xs text-gray-500">مشروع تجاري</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 flex-row-reverse">
              <div className="w-12 h-12 bg-[#0A2540] rounded-xl flex items-center justify-center text-[#FF6B00]"><Camera size={24} /></div>
              <div>
                <p className="font-bold text-[#0A2540]">2000+</p>
                <p className="text-xs text-gray-500">مشروع سكني</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[40px] overflow-hidden shadow-xl group"
            >
              <div className="relative h-80 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#FF6B00]" />
                  <span className="text-white text-xs font-bold tracking-wider">سند تك - موثق</span>
                </div>
                <div className="absolute top-6 right-6 bg-[#FF6B00] text-white px-4 py-1 rounded-full text-xs font-bold">
                  {project.category}
                </div>
              </div>
              <div className="p-10">
                <p className="text-[#FF6B00] font-bold text-sm mb-2">{project.client}</p>
                <h3 className="text-2xl font-bold text-[#0A2540] mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{project.description}</p>
                <button className="flex items-center gap-2 text-[#0A2540] font-bold group-hover:text-[#FF6B00] transition-colors">
                  <ArrowLeft size={20} className="rotate-180" /> التفاصيل الفنية للمشروع
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-[#0A2540] rounded-[40px] p-12 text-center text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">هل لديك مشروع معقد يحتاج لخبراء؟</h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto text-lg">نحن متخصصون في الحلول التقنية المتقدمة التي تفشل الشركات العادية في حلها.</p>
            <button className="btn btn-accent px-12 py-5 text-xl font-bold shadow-2xl">تواصل مع قسم المشاريع الآن</button>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B00]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

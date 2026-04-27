import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  Hammer, 
  Lightbulb, 
  Droplets, 
  Thermometer, 
  ChevronLeft, 
  Star,
  CheckCircle2,
  ArrowLeft,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/hero.png" alt="صيانة متميزة" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/90 to-transparent"></div>
      </div>
      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-right">
          <div className="badge">موثوقية يمكنك الاعتماد عليها</div>
          <h1 className="text-5xl md:text-7xl mb-6 text-[#0A2540]">
            حلول صيانة متميزة <span className="text-[#FF6B00]">للمنازل والشركات.</span> مضمونة.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            فنيون خبراء، أسعار شفافة، وموثوقية لا تضاهى. نحن نتعامل مع التعقيدات التقنية حتى تتمكن من التركيز على ما يهمك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/request-service" className="btn btn-accent text-lg px-10 py-4">احجز خدمتك الآن <ArrowLeft size={20} className="mr-2" /></Link>
            <button className="btn border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white px-10">شاهد مشاريعنا</button>
          </div>
          <div className="mt-10 p-4 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl inline-flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 bg-[#0A2540] rounded-xl flex items-center justify-center"><ShieldCheck className="text-[#FF6B00]" size={24} /></div>
            <div>
              <p className="text-[#0A2540] font-bold">Sanad Tech Premium</p>
              <p className="text-xs text-gray-600">هوية معتمدة وخدمة مضمونة 100%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="services" className="section-padding bg-white">
    <div className="container">
      <div className="text-center mb-16">
        <div className="badge">خبراتنا</div>
        <h2 className="text-4xl md:text-5xl text-[#0A2540] mb-4">خدمات صيانة النخبة</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">نقدم مجموعة شاملة من الخدمات التقنية المصممة خصيصاً لأولئك الذين يطلبون التميز والمتانة على المدى الطويل.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { icon: <Droplets className="text-[#FF6B00]" size={32} />, title: "حلول السباكة", desc: "من كشف التسربات إلى تركيبات الأنابيب الكاملة." },
          { icon: <Lightbulb className="text-[#FF6B00]" size={32} />, title: "الأنظمة الكهربائية", desc: "كهربائيون معتمدون للتمديدات السكنية والتجارية." },
          { icon: <Thermometer className="text-[#FF6B00]" size={32} />, title: "خدمات التكييف", desc: "صيانة كاملة لأنظمة التكييف والتهوية." },
          { icon: <Hammer className="text-[#FF6B00]" size={32} />, title: "مقاولات متخصصة", desc: "إصلاحات هيكلية معقدة وتركيبات مخصصة." }
        ].map((s, idx) => (
          <motion.div key={idx} whileHover={{ y: -10 }} className="card group cursor-pointer text-right">
            <div className="mb-6 p-4 bg-gray-50 rounded-2xl inline-block group-hover:bg-[#FF6B00]/10 transition-colors">{s.icon}</div>
            <h3 className="text-xl mb-3">{s.title}</h3>
            <p className="text-gray-600 mb-6 text-sm">{s.desc}</p>
            <a href="#" className="flex items-center gap-2 text-[#FF6B00] font-bold text-sm">تعرف على المزيد <ChevronLeft size={16} /></a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section id="about" className="section-padding bg-[#F8FAFC]">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-right">
          <div className="badge">معيار سند</div>
          <h2 className="text-4xl md:text-5xl text-[#0A2540] mb-8">لماذا يختار العملاء المميزون <br /> سند تك؟</h2>
          <div className="space-y-8">
            {[
              { icon: <ShieldCheck size={40} />, title: "محترفون معتمدون", desc: "يخضع كل فني لفحوصات خلفية صارمة." },
              { icon: <Clock size={40} />, title: "أسعار شفافة", desc: "أسعار مسبقة بدون رسوم خفية." },
              { icon: <Star size={40} />, title: "ضمان الخدمة", desc: "جميع الأعمال مدعومة بضمان الرضا لمدة 12 شهراً." }
            ].map((f, i) => (
              <div key={i} className="flex gap-6 flex-row-reverse">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF6B00]">{f.icon}</div>
                <div className="text-right">
                  <h4 className="text-xl mb-2">{f.title}</h4>
                  <p className="text-gray-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl"><img src="/technician.png" alt="الفني" className="w-full" /></div>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
    </>
  );
};

export default Home;

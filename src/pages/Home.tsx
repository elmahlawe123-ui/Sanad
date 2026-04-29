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
  ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <img src="/hero.png" alt="صيانة متميزة" className="w-full h-full object-cover opacity-40 md:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 md:via-white/90 to-transparent"></div>
      </div>
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-3xl ml-auto text-right">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wider">موثوقية يمكنك الاعتماد عليها</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#0A2540] leading-tight md:leading-[1.1]">
              حلول صيانة متميزة <br className="hidden md:block" />
              <span className="text-[#FF6B00]">للمنازل والشركات.</span>
            </h1>
            <p className="text-base md:text-xl text-gray-500 mb-8 md:mb-10 max-w-xl ml-auto leading-relaxed">
              فنيون خبراء، أسعار شفافة، وموثوقية لا تضاهى. نحن نتعامل مع التعقيدات التقنية حتى تتمكن من التركيز على ما يهمك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end mb-12">
              <Link to="/request-service" className="w-full sm:w-auto bg-[#FF6B00] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                احجز خدمتك الآن <ArrowLeft size={20} />
              </Link>
              <Link to="/projects" className="w-full sm:w-auto border-2 border-[#0A2540] text-[#0A2540] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#0A2540] hover:text-white transition-all text-center">
                شاهد مشاريعنا
              </Link>
            </div>
            
            <div className="p-4 md:p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-[32px] inline-flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0A2540] rounded-2xl flex items-center justify-center shadow-lg"><ShieldCheck className="text-[#FF6B00]" size={24} md:size={28} /></div>
              <div className="text-right">
                <p className="text-[#0A2540] font-bold text-sm md:text-base">Sanad Tech Premium</p>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold">هوية معتمدة وخدمة مضمونة 100%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="services" className="py-20 md:py-32 bg-white">
    <div className="container px-4 md:px-8">
      <div className="text-center mb-16 md:mb-24">
        <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">خبراتنا</span>
        <h2 className="text-3xl md:text-5xl font-bold text-[#0A2540] mb-6">خدمات صيانة النخبة</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">نقدم مجموعة شاملة من الخدمات التقنية المصممة خصيصاً لأولئك الذين يطلبون التميز والمتانة على المدى الطويل.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[
          { icon: <Droplets size={32} />, title: "حلول السباكة", desc: "من كشف التسربات إلى تركيبات الأنابيب الكاملة." },
          { icon: <Lightbulb size={32} />, title: "الأنظمة الكهربائية", desc: "كهربائيون معتمدون للتمديدات السكنية والتجارية." },
          { icon: <Thermometer size={32} />, title: "خدمات التكييف", desc: "صيانة كاملة لأنظمة التكييف والتهوية." },
          { icon: <Hammer size={32} />, title: "مقاولات متخصصة", desc: "إصلاحات هيكلية معقدة وتركيبات مخصصة." }
        ].map((s, idx) => (
          <motion.div key={idx} whileHover={{ y: -10 }} className="bg-gray-50/50 p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 text-right group">
            <div className="mb-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#FF6B00] shadow-sm group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-500">{s.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0A2540] mb-4">{s.title}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">{s.desc}</p>
            <Link to="/request-service" className="inline-flex items-center gap-2 text-[#FF6B00] font-bold text-sm hover:translate-x-[-5px] transition-transform">اطلب الخدمة <ChevronLeft size={16} /></Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section id="about" className="py-20 md:py-32 bg-[#F8FAFC]">
    <div className="container px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
        <div className="text-right order-2 lg:order-1">
          <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">معيار سند</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A2540] mb-10 leading-tight">لماذا يختار العملاء المميزون <br className="hidden md:block" /> سند تك؟</h2>
          <div className="space-y-8 md:space-y-10">
            {[
              { icon: <ShieldCheck size={32} />, title: "محترفون معتمدون", desc: "يخضع كل فني لفحوصات خلفية صارمة لضمان أمانك." },
              { icon: <Clock size={32} />, title: "أسعار شفافة", desc: "نظام تسعير عادل ومسبق بدون أي رسوم خفية أو مفاجآت." },
              { icon: <Star size={32} />, title: "ضمان الجودة", desc: "جميع أعمالنا مدعومة بضمان كامل لمدة 12 شهراً." }
            ].map((f, i) => (
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="flex gap-6 flex-row-reverse group">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">{f.icon}</div>
                <div className="text-right">
                  <h4 className="text-lg md:text-xl font-bold text-[#0A2540] mb-2">{f.title}</h4>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="absolute -inset-4 bg-[#FF6B00]/10 rounded-[48px] rotate-3 blur-2xl"></div>
          <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border-4 md:border-8 border-white">
            <img src="/technician.png" alt="الفني المحترف" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" />
          </div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-6 md:p-8 rounded-[32px] shadow-2xl text-center border border-gray-50 animate-bounce-slow">
            <p className="text-3xl md:text-4xl font-bold text-[#0A2540]">15+</p>
            <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">عاماً من الخبرة</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Services />
      <WhyChooseUs />
    </div>
  );
};

export default Home;

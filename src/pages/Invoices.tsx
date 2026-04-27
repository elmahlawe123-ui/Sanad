import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronLeft,
  Printer,
  ShieldCheck,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Invoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const invoices = [
    { id: 'INV-2024-001', service: 'صيانة مكيف مركزي', date: '24 أبريل 2024', amount: '₪250', status: 'pending', items: [{ desc: 'فحص فريون', price: '₪150' }, { desc: 'تنظيف فلاتر', price: '₪100' }] },
    { id: 'INV-2024-002', service: 'إصلاح تسريب مياه', date: '15 أبريل 2024', amount: '₪180', status: 'paid', items: [{ desc: 'تبديل محبس', price: '₪120' }, { desc: 'أجرة يد', price: '₪60' }] },
    { id: 'INV-2024-003', service: 'فحص لوحة كهرباء', date: '10 أبريل 2024', amount: '₪450', status: 'overdue', items: [{ desc: 'فحص كابلات', price: '₪200' }, { desc: 'تبديل قاطع', price: '₪250' }] },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
      <div className="container max-w-6xl text-right">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0A2540]">الفواتير والمدفوعات</h1>
            <p className="text-gray-500">إدارة مستحقاتك وعرض فواتير الصيانة الخاصة بك.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="رقم الفاتورة..." className="bg-white border border-gray-200 rounded-2xl py-3 pr-12 pl-4 outline-none focus:border-[#FF6B00] shadow-sm w-64 text-right" />
              <Search className="absolute right-4 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between flex-row-reverse">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 /></div>
            <div>
              <p className="text-xs text-gray-400 font-bold mb-1 uppercase">إجمالي المدفوع</p>
              <h3 className="text-2xl font-bold text-[#0A2540]">₪1,280</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between flex-row-reverse text-[#FF6B00]">
            <div className="w-12 h-12 bg-orange-50 text-[#FF6B00] rounded-2xl flex items-center justify-center"><Clock /></div>
            <div>
              <p className="text-xs text-orange-400 font-bold mb-1 uppercase">بانتظار الدفع</p>
              <h3 className="text-2xl font-bold text-[#0A2540]">₪250</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between flex-row-reverse">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center"><AlertCircle /></div>
            <div>
              <p className="text-xs text-red-400 font-bold mb-1 uppercase">متأخرات</p>
              <h3 className="text-2xl font-bold text-[#0A2540]">₪450</h3>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-sm font-bold text-gray-500">رقم الفاتورة</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-500">الخدمة</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-500">التاريخ</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-500">المبلغ</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-500">الحالة</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6 font-bold text-[#0A2540]">{inv.id}</td>
                    <td className="px-8 py-6 text-gray-600">{inv.service}</td>
                    <td className="px-8 py-6 text-gray-500 text-sm">{inv.date}</td>
                    <td className="px-8 py-6 font-bold text-[#0A2540]">{inv.amount}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${inv.status === 'paid' ? 'bg-green-100 text-green-600' : inv.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                        {inv.status === 'paid' ? 'مدفوعة' : inv.status === 'pending' ? 'بانتظار الدفع' : 'متأخرة'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelectedInvoice(inv)} className="p-2 text-gray-400 hover:text-[#0A2540] bg-gray-100 rounded-xl transition-all"><FileText size={18} /></button>
                        {inv.status !== 'paid' && <button onClick={() => { setSelectedInvoice(inv); setShowPayment(true); }} className="p-2 text-white hover:bg-[#0A2540] bg-[#FF6B00] rounded-xl transition-all"><CreditCard size={18} /></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Modal */}
        <AnimatePresence>
          {selectedInvoice && !showPayment && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedInvoice(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></motion.div>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden text-right">
                <div className="p-10 border-b border-gray-50 bg-[#0A2540] text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#FF6B00]"><ShieldCheck size={24} /></div>
                    <span className="text-2xl font-bold">سند <span className="text-[#FF6B00]">تك</span></span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">فاتورة #{selectedInvoice.id}</h2>
                    <p className="text-white/60 text-sm">بتاريخ: {selectedInvoice.date}</p>
                  </div>
                </div>
                <div className="p-10">
                  <h4 className="font-bold text-[#0A2540] mb-6 border-b pb-2">تفاصيل الخدمات</h4>
                  <div className="space-y-4 mb-8">
                    {selectedInvoice.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-lg">
                        <span className="font-bold text-[#0A2540]">{item.price}</span>
                        <span className="text-gray-600">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center mb-10">
                    <span className="text-3xl font-bold text-[#0A2540]">{selectedInvoice.amount}</span>
                    <span className="text-xl font-bold text-gray-500 uppercase">المجموع النهائي</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="btn btn-primary flex-1 py-4 flex items-center justify-center gap-3"><Printer size={20} /> طباعة الفاتورة</button>
                    <button className="btn border border-gray-200 flex-1 py-4 flex items-center justify-center gap-3"><Download size={20} /> تحميل PDF</button>
                  </div>
                  {selectedInvoice.status !== 'paid' && (
                    <button onClick={() => setShowPayment(true)} className="btn btn-accent w-full mt-4 py-4 text-xl font-bold shadow-lg shadow-orange-500/20">ادفع الآن</button>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Payment Simulation Modal */}
          {showPayment && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayment(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md"></motion.div>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden text-right">
                <div className="p-8 border-b border-gray-50 text-center">
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-2">إتمام الدفع الآمن</h3>
                  <p className="text-gray-500">المبلغ المطلوب: <span className="text-[#FF6B00] font-bold text-xl">{selectedInvoice?.amount}</span></p>
                </div>

                <div className="p-8">
                  {/* Payment Method Selector */}
                  <div className="flex gap-4 mb-8 bg-gray-50 p-2 rounded-2xl">
                    {[
                      { id: 'card', label: 'بطاقة بنكية', icon: <CreditCard size={18} /> },
                      { id: 'vfcash', label: 'فودافون كاش', icon: <div className="w-5 h-5 bg-red-600 rounded-full"></div> },
                      { id: 'instapay', label: 'إنستا باي', icon: <div className="w-5 h-5 bg-purple-600 rounded-lg flex items-center justify-center text-[10px] text-white font-bold">iP</div> }
                    ].map((m) => (
                      <button 
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all ${paymentMethod === m.id ? 'bg-white shadow-sm text-[#0A2540] border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {m.icon}
                        <span className="text-xs font-bold">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('تمت عملية الدفع بنجاح (نسخة تجريبية)'); setShowPayment(false); setSelectedInvoice(null); }}>
                    {paymentMethod === 'card' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-500">رقم البطاقة</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00]" placeholder="**** **** **** ****" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">CVV</label>
                            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00]" placeholder="123" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">تاريخ الانتهاء</label>
                            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00]" placeholder="MM/YY" required />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === 'vfcash' && (
                      <div className="space-y-6 text-center">
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                          <p className="text-red-600 font-bold mb-2">يرجى تحويل المبلغ إلى الرقم التالي:</p>
                          <p className="text-3xl font-bold text-[#0A2540] tracking-widest">010 1234 5678</p>
                        </div>
                        <div className="space-y-2 text-right">
                          <label className="text-sm font-bold text-gray-500">رقم الهاتف المحول منه</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00]" placeholder="010XXXXXXXX" required />
                        </div>
                        <p className="text-xs text-gray-400">سيتم تأكيد الدفع خلال 5 دقائق من استلام التحويل.</p>
                      </div>
                    )}

                    {paymentMethod === 'instapay' && (
                      <div className="space-y-6 text-center">
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                          <p className="text-purple-600 font-bold mb-2">عنوان الدفع (InstaPay ID):</p>
                          <p className="text-2xl font-bold text-[#0A2540]">sanadtech@instapay</p>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-400 text-xs text-center p-4">
                            QR Code Placeholder
                          </div>
                        </div>
                        <div className="space-y-2 text-right">
                          <label className="text-sm font-bold text-gray-500">اسم المرسل أو رقم العملية</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF6B00]" placeholder="الاسم الكامل" required />
                        </div>
                      </div>
                    )}

                    <button type="submit" className="btn btn-accent w-full py-5 text-xl font-bold flex items-center justify-center gap-3">
                      <ShieldCheck size={24} /> تأكيد الدفع 
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Invoices;

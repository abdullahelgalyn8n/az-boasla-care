import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  User,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateCartSummary, validateCheckoutForm } from '../utils/catalogLogic';

const NAV_ITEMS = [
  { label: 'الرئيسية', to: '/' },
  { label: 'قسم الوالدين', to: '/parent-hub' },
  { label: 'قسم المراهقين', to: '/adolescent-hub' },
  { label: 'قسم الأطفال', to: '/child-hub' },
  { label: 'الكورسات', to: '/courses' },
  { label: 'المنتجات والقصص', to: '/products' },
  { label: 'المصادر المجانية', to: '/resources' },
  { label: 'الويبينارات', to: '/webinars' },
  { label: 'من نحن', to: '/about' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    addOrder,
    user,
    toastMessage,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'confirmed'>('cart');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vodafone' | 'card'>('cod');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const summary = calculateCartSummary(cart, promoCode);
  const hasPhysicalProduct = cart.some((item) => item.itemType === 'product');

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(
      { fullName, phone, email, city, address },
      hasPhysicalProduct
    );
    if (!validation.valid) {
      setFormErrors(validation.errors as Record<string, string>);
      return;
    }
    setFormErrors({});
    const orderId = `BSL-${Math.floor(1000 + Math.random() * 9000)}`;
    addOrder({
      id: orderId,
      createdAt: new Date().toLocaleDateString('ar-EG'),
      customerName: fullName,
      items: [...cart],
      total: summary.total,
      status: 'تم التأكيد وجاري التجهيز',
    });
    setConfirmedOrderId(orderId);
    clearCart();
    setCheckoutStep('confirmed');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F2942]" dir="rtl">
      {/* Sticky High-Contrast Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
          {/* Zone 1: Brand Wordmark + Official Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 focus:outline-none"
            aria-label="بوصلة - الصفحة الرئيسية"
          >
            <img
              src="/assets/boasla-logo.png"
              alt="بوصلة Boasla"
              className="h-11 w-auto object-contain"
            />
            <div className="hidden md:block">
              <span className="block text-base font-extrabold tracking-tight text-[#0F2942] leading-none">
                بوصلة
              </span>
              <span className="block text-[10px] font-semibold text-slate-600 mt-1 whitespace-nowrap">
                علمٌ، إنسانية، وتوازن نفسي
              </span>
            </div>
          </Link>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5" aria-label="التنقل الرئيسي">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-[13px] font-bold whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
                    isActive
                      ? 'text-[#1E3A5F] border-[#B45309]'
                      : 'text-slate-700 border-transparent hover:text-[#0F2942] hover:border-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Actions (Cart, Auth, Primary CTA) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setCheckoutStep('cart');
                setIsCartOpen(true);
              }}
              aria-label={`سلة المشتريات (${summary.itemCount} عناصر)`}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-[#0F2942] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-[#1E3A5F]" />
              <span className="hidden sm:inline">السلة</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#1E3A5F] text-white text-[11px] font-extrabold tabular-nums">
                {summary.itemCount}
              </span>
            </button>

            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F2942] text-xs font-bold transition-colors whitespace-nowrap"
              >
                <User className="w-4 h-4 text-[#0F766E]" />
                <span>حسابي ({user.name.split(' ')[0]})</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center px-2.5 py-2 rounded-xl text-slate-700 hover:text-[#0F2942] hover:bg-slate-100 text-xs font-bold transition-colors whitespace-nowrap"
              >
                تسجيل الدخول
              </Link>
            )}

            <Link
              to="/courses"
              className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-xs font-bold transition-colors whitespace-nowrap shadow-2xs"
            >
              ابدأ الآن
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="xl:hidden p-2 rounded-xl border border-slate-300 text-[#0F2942] hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-[#1E3A5F] text-white'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                to="/auth"
                className="flex-1 text-center py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#0F2942]"
              >
                تسجيل الدخول / حساب جديد
              </Link>
              <Link
                to="/contact"
                className="flex-1 text-center py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold"
              >
                تواصلي معنا
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-6 z-50 bg-[#0F2942] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-sm font-bold"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Slide-Over Cart & Checkout Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="سلة المشتريات وإتمام الطلب">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-6">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="p-5 bg-[#0F2942] text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h2 className="text-base font-extrabold">
                    {checkoutStep === 'cart' && `سلة مشتريات بوصلة (${summary.itemCount})`}
                    {checkoutStep === 'form' && 'إتمام الطلب وتأكيد البيانات'}
                    {checkoutStep === 'confirmed' && 'تم تأكيد طلبك بنجاح'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="إغلاق السلة"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 flex-1 overflow-y-auto">
                {checkoutStep === 'confirmed' ? (
                  <div className="text-center py-8 space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#0F766E]">
                        رقم الطلب: {confirmedOrderId}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0F2942]">
                        شكراً لثقتك في منصة بوصلة!
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        تم تسجيل طلبك بنجاح باسم <strong>{fullName}</strong>. سنتواصل معكِ عبر واتساب على الرقم <span className="tabular-nums font-bold">{phone}</span> لتأكيد التوصيل وتفعيل الكورسات فوراً.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-right text-xs text-slate-700 space-y-1.5">
                      <div className="font-bold text-[#0F2942]">ماذا يحدث الآن؟</div>
                      <p>1. الكورسات والملفات الرقمية متاحة فوراً في لوحة التحكم الخاصة بكِ.</p>
                      <p>2. القصص والحقائب المطبوعة يتم شحنها خلال 48 ساعة عمل لجميع المحافظات.</p>
                    </div>
                    <div className="pt-4 flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/dashboard');
                        }}
                        className="w-full py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-bold cursor-pointer"
                      >
                        الانتقال إلى لوحة التحكم ومشترياتي
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCheckoutStep('cart');
                          setIsCartOpen(false);
                        }}
                        className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                      >
                        متابعة التصفح
                      </button>
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-[#0F2942]">سلة المشتريات فارغة حالياً</h3>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                      يمكنكِ إضافة الكورسات التدريبية، القصص العلاجية، أو الحقائب التربوية للبدء في رحلتك مع طفلك.
                    </p>
                    <div className="pt-2 flex justify-center gap-2">
                      <Link
                        to="/products"
                        onClick={() => setIsCartOpen(false)}
                        className="px-4 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold"
                      >
                        تصفحي المتجر والقصص
                      </Link>
                      <Link
                        to="/courses"
                        onClick={() => setIsCartOpen(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-[#0F2942] text-xs font-bold"
                      >
                        استعرضي الكورسات
                      </Link>
                    </div>
                  </div>
                ) : checkoutStep === 'cart' ? (
                  <div className="space-y-5">
                    {/* Free Shipping Banner */}
                    <div className="p-3.5 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] text-xs font-bold text-[#115E59] flex items-center justify-between">
                      <span>
                        {summary.qualifiesForFreeShipping
                          ? '✓ طلبك مؤهل للشحن المجاني والتفعيل الفوري!'
                          : `أضيفي منتجات بقيمة ${500 - summary.subtotal} ج.م للحصول على شحن مجاني`}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-slate-200">
                      {cart.map((item) => (
                        <div key={item.id} className="py-4 flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <span className="text-[11px] font-bold text-[#0F766E]">
                              {item.itemType === 'course' ? 'كورس تدريبي' : 'منتج تربوي'} · {item.categoryLabel}
                            </span>
                            <h4 className="text-sm font-bold text-[#0F2942] leading-snug">
                              {item.title}
                            </h4>
                            <div className="text-sm font-extrabold text-[#1E3A5F] tabular-nums">
                              {item.price * item.quantity} ج.م
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`تقليل كمية ${item.title}`}
                              className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`زيادة كمية ${item.title}`}
                              className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`حذف ${item.title} من السلة`}
                              className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 mr-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Box */}
                    <div className="pt-2">
                      <label htmlFor="cart-promo" className="block text-xs font-bold text-slate-700 mb-1.5">
                        كود الخصم (جرّبي كود: BOASLA15 لخصم 15%)
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="cart-promo"
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="أدخلي كود الخصم مثل BOASLA15"
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-[#0F2942] focus:outline-none focus:border-[#1E3A5F]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="checkout-name" className="block text-xs font-bold text-[#0F2942] mb-1">
                        الاسم الثلاثي للأم / المستلم *
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: سارة أحمد محمود"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942] focus:outline-none focus:border-[#1E3A5F]"
                      />
                      {formErrors.fullName && (
                        <p className="text-xs font-bold text-rose-700 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="checkout-phone" className="block text-xs font-bold text-[#0F2942] mb-1">
                        رقم الهاتف / واتساب *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01095323649"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942] tabular-nums focus:outline-none focus:border-[#1E3A5F]"
                      />
                      {formErrors.phone && (
                        <p className="text-xs font-bold text-rose-700 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="checkout-email" className="block text-xs font-bold text-[#0F2942] mb-1">
                        البريد الإلكتروني (لتفعيل الكورسات والملفات) *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mother@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942] focus:outline-none focus:border-[#1E3A5F]"
                      />
                      {formErrors.email && (
                        <p className="text-xs font-bold text-rose-700 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    {hasPhysicalProduct && (
                      <>
                        <div>
                          <label htmlFor="checkout-city" className="block text-xs font-bold text-[#0F2942] mb-1">
                            المحافظة / المدينة *
                          </label>
                          <input
                            id="checkout-city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="القاهرة، الإسكندرية، الجيزة..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942] focus:outline-none focus:border-[#1E3A5F]"
                          />
                          {formErrors.city && (
                            <p className="text-xs font-bold text-rose-700 mt-1">{formErrors.city}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="checkout-address" className="block text-xs font-bold text-[#0F2942] mb-1">
                            العنوان بالتفصيل (لتوصيل الحقائب والقصص) *
                          </label>
                          <textarea
                            id="checkout-address"
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="اسم الشارع، رقم العمارة، الدور، علامة مميزة"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-[#0F2942] focus:outline-none focus:border-[#1E3A5F]"
                          />
                          {formErrors.address && (
                            <p className="text-xs font-bold text-rose-700 mt-1">{formErrors.address}</p>
                          )}
                        </div>
                      </>
                    )}

                    <div>
                      <span className="block text-xs font-bold text-[#0F2942] mb-2">طريقة الدفع المفضلة</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'cod', label: 'الدفع عند الاستلام' },
                          { id: 'vodafone', label: 'فودافون كاش / انستاباي' },
                          { id: 'card', label: 'بطاقة بنكية' },
                        ].map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id as 'cod' | 'vodafone' | 'card')}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                              paymentMethod === method.id
                                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                                : 'bg-slate-50 text-slate-700 border-slate-300'
                            }`}
                          >
                            {method.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Drawer Footer Summary */}
              {cart.length > 0 && checkoutStep !== 'confirmed' && (
                <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>المجموع الفرعي:</span>
                      <span className="font-bold tabular-nums">{summary.subtotal} ج.م</span>
                    </div>
                    {summary.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>خصم الكوبون (15%):</span>
                        <span className="tabular-nums">-{summary.discountAmount} ج.م</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>رسوم التوصيل:</span>
                      <span className="font-bold tabular-nums">
                        {summary.shippingCost === 0 ? 'مجاناً' : `${summary.shippingCost} ج.م`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-[#0F2942]">
                      <span>الإجمالي النهائي:</span>
                      <span className="tabular-nums">{summary.total} ج.م</span>
                    </div>
                  </div>

                  {checkoutStep === 'cart' ? (
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('form')}
                      className="w-full py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>متابعة إتمام الطلب</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        رجوع للسلة
                      </button>
                      <button
                        type="submit"
                        form="checkout-form"
                        className="flex-1 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>تأكيد الطلب الآن ({summary.total} ج.م)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Authentic Boasla Care Footer */}
      <footer className="bg-[#0F2942] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/95 p-2.5 rounded-2xl w-fit">
                <img
                  src="/assets/boasla-logo.png"
                  alt="بوصلة"
                  className="h-10 w-auto object-contain"
                />
                <span className="text-lg font-extrabold text-[#0F2942] pl-2">بوصلة</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                بوصلة منصة متخصصة في دعم الصحة النفسية للأمهات وأطفالهن من خلال برامج، قصص علاجية، وكورسات عملية. نساعدك تفهمي نفسك وطفلك بعمق، وتبني علاقة آمنة مليئة بالوعي والاحتواء. لأن بداية الجيل السليم… أم متزنة من الداخل.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.facebook.com/share/1AdwSkS5Hs/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="صفحة بوصلة على فيسبوك"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/dr.walaa.boasla"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="صفحة د. ولاء حسني على إنستغرام"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.snapchat.com/add/drwalaabwsl"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="حساب سناب شات"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Snapchat
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base font-extrabold text-amber-400 mb-4">روابط سريعة</h3>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    من نحن وفلسفة بوصلة
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="hover:text-white transition-colors">
                    الكورسات التدريبية
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white transition-colors">
                    متجر القصص والحقائب التربوية
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-white transition-colors">
                    مكتبة المصادر المجانية
                  </Link>
                </li>
                <li>
                  <Link to="/auth" className="hover:text-white transition-colors">
                    تسجيل الدخول
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white transition-colors">
                    لوحة التحكم للأسرة
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services & Hubs */}
            <div>
              <h3 className="text-base font-extrabold text-amber-400 mb-4">أقسامنا وخدماتنا</h3>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <Link to="/parent-hub" className="hover:text-white transition-colors">
                    ركن الوالدين (تمكين الأمهات)
                  </Link>
                </li>
                <li>
                  <Link to="/adolescent-hub" className="hover:text-white transition-colors">
                    ركن المراهقين (بناء الثقة والهوية)
                  </Link>
                </li>
                <li>
                  <Link to="/child-hub" className="hover:text-white transition-colors">
                    ركن الأطفال (القصص والأنشطة)
                  </Link>
                </li>
                <li>
                  <Link to="/webinars" className="hover:text-white transition-colors">
                    الويبينارات واللقاءات المباشرة
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    تواصل معنا وحجز استشارة
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base font-extrabold text-amber-400 mb-4">تواصل معنا</h3>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>مصر – القاهرة (خدماتنا متاحة أونلاين لكل العالم العربي)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span dir="ltr" className="tabular-nums font-bold">
                    +20 10 95323649
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>info@boaslacare.com</span>
                </li>
              </ul>

              <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-amber-300 mb-1">إشراف علمي معتمد</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  جميع المحتويات بإشراف د. ولاء حسني — استشاري طب نفسي أطفال ومراهقين.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline">جميع الحقوق محفوظة. A.Z Agency 2026 ©</a>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
              <Link to="/refund-policy" className="hover:text-white transition-colors">
                سياسة الاسترداد
              </Link>
              <Link to="/teen-safety-policy" className="hover:text-white transition-colors">
                سياسة أمان المراهقين
              </Link>
              <Link to="/parental-notice" className="hover:text-white transition-colors">
                تنبيه الأهل
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

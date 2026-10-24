import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  Search,
  Clock,
  BookOpen,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Star,
  ShieldCheck,
  PlayCircle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { COURSES, PRODUCTS, TopicId, ProductItem } from '../data/boaslaData';
import { filterCourses, filterProducts } from '../utils/catalogLogic';
import { CourseCard, ProductCard } from '../components/VisualCards';
import { useApp } from '../context/AppContext';

export const CoursesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTopic = (searchParams.get('topic') as TopicId) || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'parents' | 'children' | 'adolescents'>('all');
  const [topic, setTopic] = useState<'all' | TopicId>(initialTopic);

  const filtered = filterCourses(COURSES, { search, category, topic });

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold text-[#1E3A5F]">أكاديمية بوصلة التدريبية</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">
              استكشفي كورساتنا المتخصصة للأمهات، الأطفال، والمراهقين
            </h1>
            <p className="text-base text-slate-700">
              برامج تدريبية عملية وقصصية بإشراف د. ولاء حسني لمساعدتك على بناء علاقة آمنة ومتوازنة مع أبنائك.
            </p>
          </div>

          {/* Search & Filters Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="ابحثي عن كورس"
                  placeholder="ابحثي عن كورس (مثال: ADHD، القلق، حكايات مشاعري...)"
                  className="w-full pr-11 pl-4 py-3 rounded-2xl border border-slate-300 bg-[#F8FAFC] text-sm font-semibold text-[#0F2942] focus:outline-none focus:bg-white focus:border-[#1E3A5F]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'جميع الفئات' },
                { id: 'parents', label: 'كورسات الأمهات' },
                { id: 'children', label: 'كورسات الأطفال القصصية' },
                { id: 'adolescents', label: 'برامج المراهقين' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as typeof category)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    category === cat.id
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filter Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-600 ml-2">تصفية حسب الموضوع:</span>
            {[
              { id: 'all', label: 'الكل' },
              { id: 'adhd', label: 'فرط الحركة وتشتت الانتباه (ADHD)' },
              { id: 'anxiety', label: 'القلق والتوتر' },
              { id: 'anger', label: 'إدارة الغضب' },
              { id: 'self-esteem', label: 'تقدير الذات' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopic(t.id as typeof topic)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  topic === t.id
                    ? 'bg-[#0F766E] text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-600">
          <span>إجمالي الكورسات المعروضة: {filtered.length} كورس</span>
          {(search || category !== 'all' || topic !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('all');
                setTopic('all');
              }}
              className="text-rose-700 hover:underline cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <h3 className="text-lg font-extrabold text-[#0F2942]">لا توجد كورسات مطابقة لبحثك</h3>
            <p className="text-sm text-slate-600">جرّبي تغيير كلمات البحث أو اختيار فئة أخرى.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('all');
                setTopic('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
            >
              عرض جميع الكورسات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, setIsCartOpen } = useApp();
  const [activeLessonPreview, setActiveLessonPreview] = useState<string | null>(null);

  const course =
    COURSES.find((c) => c.id === id || c.slug === id) || COURSES[0];

  const relatedCourses = COURSES.filter((c) => c.id !== course.id).slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Course Hero & Contiguous Purchase Module */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:underline"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى جميع الكورسات</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Right Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0F766E]">
                <span>{course.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{course.topicLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{course.ageGroup}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F2942] leading-tight">
                {course.title}
              </h1>

              <p className="text-base text-slate-700 leading-relaxed">{course.fullDescription}</p>

              <div className="flex flex-wrap items-center gap-6 py-4 px-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs font-bold text-[#0F2942]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1E3A5F]" />
                  <span>المدة: {course.hoursLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0F766E]" />
                  <span>المحتوى: {course.lessonsLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B45309]" />
                  <span>وصول مدى الحياة + شهادة إتمام</span>
                </div>
              </div>

              {/* Learning Highlights */}
              <div className="space-y-3 pt-2">
                <h2 className="text-lg font-extrabold text-[#0F2942]">ماذا ستتعلمين في هذا الكورس؟</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.highlights.map((item) => (
                    <div
                      key={item}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs font-bold text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Sticky Purchase Card */}
            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="rounded-2xl overflow-hidden border border-slate-200 relative h-52">
                <img
                  src={course.image}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0F2942]/40 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveLessonPreview(course.modules[0].lessons[0])}
                    className="px-4 py-2.5 rounded-xl bg-white text-[#0F2942] text-xs font-extrabold flex items-center gap-2 shadow-md cursor-pointer hover:scale-105 transition-transform"
                  >
                    <PlayCircle className="w-5 h-5 text-[#1E3A5F]" />
                    <span>معاينة الدرس الأول مجاناً</span>
                  </button>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-600 block">سعر الاشتراك الشامل</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-[#0F2942] tabular-nums">
                      {course.price} ج.م
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-slate-500 line-through tabular-nums">
                        {course.originalPrice} ج.م
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#0F766E]">
                  استثمار في راحة طفلك وصحتك النفسية
                </span>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: course.id,
                      itemType: 'course',
                      title: course.title,
                      price: course.price,
                      originalPrice: course.originalPrice,
                      categoryLabel: course.categoryLabel,
                      slug: course.id,
                    });
                    setIsCartOpen(true);
                  }}
                  className="w-full py-4 rounded-2xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>اشتركي الآن في الكورس ({course.price} ج.م)</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: course.id,
                      itemType: 'course',
                      title: course.title,
                      price: course.price,
                      originalPrice: course.originalPrice,
                      categoryLabel: course.categoryLabel,
                      slug: course.id,
                    })
                  }
                  className="w-full py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 text-[#0F2942] text-xs font-bold transition-colors cursor-pointer"
                >
                  إضافة إلى السلة ومتابعة التصفح
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5 pt-2">
                <div>✓ تقديم وإشراف: {course.instructor} ({course.instructorRole})</div>
                <div>✓ مرفق ملفات عمل تطبيقية وقوائم PDF جاهزة للطباعة</div>
                <div>✓ إمكانية مشاهدة الدروس في أي وقت ومن أي جهاز</div>
              </div>
            </div>
          </div>

          {/* Interactive Lesson Preview Box */}
          {activeLessonPreview && (
            <div className="mt-8 p-6 rounded-2xl bg-[#0F2942] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400">معاينة مجانية للدرس الأول</span>
                <h3 className="text-base font-extrabold">{activeLessonPreview}</h3>
                <p className="text-xs text-slate-200">
                  في هذا الدرس التمهيدي، تشرح د. ولاء حسني الأساس العلمي والعملي لبناء بيئة آمنة للطفل في المنزل وكيفية البدء بتطبيق خطوات الكورس من اليوم الأول.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveLessonPreview(null)}
                className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold shrink-0 cursor-pointer"
              >
                إغلاق المعاينة
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Curriculum Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">منهج ومحتوى الكورس بالتفصيل</h2>
        <div className="space-y-4">
          {course.modules.map((mod, idx) => (
            <div key={mod.title} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F2942]">
                  0{idx + 1}. {mod.title}
                </h3>
                <span className="text-xs font-bold text-[#0F766E]">{mod.duration}</span>
              </div>
              <ul className="space-y-2.5">
                {mod.lessons.map((lesson, lIdx) => (
                  <li
                    key={lesson}
                    className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700 p-2.5 rounded-xl bg-slate-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <PlayCircle className="w-4 h-4 text-[#1E3A5F] shrink-0" />
                      <span>
                        الدرس {lIdx + 1}: {lesson}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveLessonPreview(lesson)}
                      className="text-xs font-bold text-[#1E3A5F] hover:underline cursor-pointer"
                    >
                      نبذة عن الدرس
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Related Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">كورسات أخرى قد تهمكِ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {relatedCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const ProductsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | ProductItem['category']>('all');
  const [topic, setTopic] = useState<'all' | TopicId>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filtered = filterProducts(PRODUCTS, { search, category, topic, sortBy });

  return (
    <div className="space-y-12 pb-16">
      {/* Store Header */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#B45309]">
              <Sparkles className="w-4 h-4" />
              <span>متجر إصدارات ومنتجات بوصلة</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">
              القصص العلاجية، الحقائب التربوية، وبطاقات الحوار الأسري
            </h1>
            <p className="text-base text-slate-700 leading-relaxed">
              مجموعة متكاملة من الإصدارات المطبوعة والرقمية والوسائل العملية المصممة بإشراف د. ولاء حسني لدعم طفلك في البيت والمدرسة.
            </p>
          </div>

          {/* Search, Category & Sort Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 items-center">
            <div className="lg:col-span-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="ابحثي عن منتج أو قصة"
                  placeholder="ابحثي عن قصة أو حقيبة (مثال: مذكرات طفل حركي...)"
                  className="w-full pr-11 pl-4 py-3 rounded-2xl border border-slate-300 bg-[#F8FAFC] text-sm font-semibold text-[#0F2942] focus:outline-none focus:bg-white focus:border-[#1E3A5F]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'storybooks', label: 'القصص والروايات' },
                { id: 'toolkits', label: 'الحقائب والمنظمات' },
                { id: 'cards', label: 'البطاقات التفاعلية' },
                { id: 'workbooks', label: 'دفاتر التمارين والأدلة' },
                { id: 'bundles', label: 'الباقات المخفضة' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as typeof category)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    category === cat.id
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <select
                aria-label="ترتيب المنتجات"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#0F2942] focus:outline-none focus:border-[#1E3A5F]"
              >
                <option value="featured">الأكثر تميزاً</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-600">
          <span>عدد المنتجات المعروضة: {filtered.length} منتج</span>
          <span>شحن سريع لجميع محافظات مصر + شحن مجاني للطلبات فوق 500 ج.م</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, setIsCartOpen } = useApp();
  const [qty, setQty] = useState(1);

  const product =
    PRODUCTS.find((p) => p.slug === slug || p.id === slug) || PRODUCTS[0];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:underline"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى متجر المنتجات والقصص</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Visual Showcase */}
            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-3xl border border-slate-200 p-8 flex flex-col items-center justify-center space-y-6">
              <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-md p-5 space-y-4">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="flex items-center justify-between text-xs font-bold text-[#0F2942]">
                  <span>{product.categoryLabel}</span>
                  <span className="flex items-center gap-1 tabular-nums text-amber-700">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
                    <span>{product.rating.toFixed(1)} ({product.reviewsCount} تقييم)</span>
                  </span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-3 text-xs font-bold text-slate-700">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="block text-slate-500 text-[11px]">الفئة العمرية</span>
                  <span>{product.ageRange}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="block text-slate-500 text-[11px]">صيغة المنتج</span>
                  <span>{product.format}</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#B45309]">
                  {product.categoryLabel} · {product.topicLabel}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F2942] leading-tight">
                  {product.title}
                </h1>
                <p className="text-sm font-bold text-[#0F766E]">{product.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-4 py-4 border-y border-slate-200">
                <span className="text-3xl font-extrabold text-[#0F2942] tabular-nums">
                  {product.price} ج.م
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-500 line-through tabular-nums">
                    {product.originalPrice} ج.م
                  </span>
                )}
                <span className="mr-auto text-xs font-extrabold text-emerald-800">
                  ✓ متوفر للشحن الفوري
                </span>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">{product.fullDescription}</p>

              {/* Contents of Box / Book */}
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
                <h2 className="text-base font-extrabold text-[#0F2942] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#1E3A5F]" />
                  <span>محتويات المنتج بالتفصيل:</span>
                </h2>
                <ul className="space-y-2">
                  {product.contents.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Psychological Benefits */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-extrabold text-[#0F2942]">الأثر النفسي والتربوي للطفل والأسرة:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.psychologicalBenefits.map((ben) => (
                    <div
                      key={ben}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0F2942] leading-relaxed"
                    >
                      {ben}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-xl bg-white">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="تقليل الكمية"
                    className="px-4 py-3 text-sm font-bold text-[#0F2942] hover:bg-slate-100 rounded-r-xl cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-sm font-extrabold tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="زيادة الكمية"
                    className="px-4 py-3 text-sm font-bold text-[#0F2942] hover:bg-slate-100 rounded-l-xl cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(
                      {
                        id: product.id,
                        itemType: 'product',
                        title: product.title,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        categoryLabel: product.categoryLabel,
                        slug: product.slug,
                      },
                      qty
                    );
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>أضف إلى السلة واطلبي الآن ({product.price * qty} ج.م)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">إصدارات ومنتجات أخرى من بوصلة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

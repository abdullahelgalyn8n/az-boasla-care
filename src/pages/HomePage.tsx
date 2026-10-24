import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Brain,
  AlertTriangle,
  Flame,
  Sprout,
  FileText,
  CheckSquare,
  MessageSquareQuote,
  PlayCircle,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  Calendar,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Scale,
  Lightbulb,
} from 'lucide-react';
import {
  HERO_SLIDES,
  PLATFORM_STATS,
  CORE_TOPICS,
  COURSES,
  PRODUCTS,
  WEBINARS,
  BOASLA_VALUES,
  FOUNDER_CREDENTIALS,
} from '../data/boaslaData';
import { CourseCard, ProductCard } from '../components/VisualCards';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [productTab, setProductTab] = useState<'all' | 'storybooks' | 'toolkits' | 'cards'>('all');
  const { registerWebinar, registeredWebinarIds } = useApp();

  const slide = HERO_SLIDES[activeSlide];
  const parentCourses = COURSES.filter((c) => c.category === 'parents').slice(0, 3);
  const childCourses = COURSES.filter((c) => c.category === 'children').slice(0, 3);

  const displayedProducts =
    productTab === 'all'
      ? PRODUCTS.slice(0, 6)
      : PRODUCTS.filter((p) =>
          productTab === 'cards'
            ? p.category === 'cards' || p.category === 'workbooks'
            : p.category === productTab
        ).slice(0, 6);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION — High-Contrast Light Mode Design (Fixing boaslacare.com washed-out text & overlapping arrows) */}
      <section className="relative bg-gradient-to-b from-white via-[#F8FAFC] to-[#EEF2F6] border-b border-slate-200 pt-8 pb-14 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Right Column (RTL): Crystal-Clear High-Contrast Content Box */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1E3A5F] tracking-wide">
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  <span>{slide.badge} · بإشراف د. ولاء حسني</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2942] leading-[1.22] text-balance">
                  <span className="block">{slide.titleLine1}</span>
                  <span className="block text-[#1E3A5F] mt-1">{slide.titleLine2}</span>
                  <span className="block text-[#0F766E] mt-1">{slide.titleLine3}</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <Link
                    to={slide.primaryCta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-bold transition-colors shadow-xs whitespace-nowrap"
                  >
                    <span>{slide.primaryCta.label}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <Link
                    to={slide.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0F2942] border border-slate-300 text-sm font-bold transition-colors whitespace-nowrap"
                  >
                    <span>{slide.secondaryCta.label}</span>
                  </Link>
                </div>
              </div>

              {/* Hero Bottom Bar: 3 Key Stats + Non-Overlapping Carousel Controls */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1E3A5F]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-[#0F2942] tabular-nums">+10K</div>
                      <div className="text-xs font-semibold text-slate-600">أسرة استفادت</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0F766E]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-[#0F2942] tabular-nums">+50</div>
                      <div className="text-xs font-semibold text-slate-600">دورة وورشة</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#B45309]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-[#0F2942] tabular-nums">+15</div>
                      <div className="text-xs font-semibold text-slate-600">سنة خبرة</div>
                    </div>
                  </div>
                </div>

                {/* Clean Slide Controls (Never overlap text!) */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="الشريحة السابقة"
                    className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[#0F2942] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1.5 px-2">
                    {HERO_SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`الانتقال للشريحة ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          activeSlide === idx ? 'w-7 bg-[#1E3A5F]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="الشريحة التالية"
                    className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[#0F2942] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Left Column (RTL): Framed High-Resolution Photography + Dark Scrim Caption */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-slate-200 shadow-md min-h-[360px] lg:min-h-full flex flex-col justify-end">
              <img
                src={slide.image}
                alt={slide.titleLine1}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2942]/90 via-[#0F2942]/35 to-transparent" />
              <div className="relative z-10 p-6 sm:p-8 text-white space-y-2">
                <div className="text-xs font-bold text-amber-300">
                  منصة بوصلة للطب النفسي والتربية الواعية
                </div>
                <p className="text-base font-bold leading-snug">
                  "لأن الطفل لا يحتاج إصلاحًا بل فهمًا، والأم لا تحتاج لومًا بل دعمًا علميًا وإنسانيًا."
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs text-slate-200">
                  <span>د. ولاء حسني</span>
                  <span aria-hidden="true">·</span>
                  <span>استشاري طب نفسي أطفال ومراهقين</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT BOASLA SECTION ("من نحن — نبذة عن منصة بوصلة") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-extrabold text-[#0F766E] tracking-wide">من نحن</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
            نبذة عن منصة بوصلة — علمٌ، إنسانية، وتوازن نفسي
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            نرافق الأمهات والأسر في رحلة التربية النفسية الواعية، من خلال محتوى علمي مبسّط، مبني على الطب النفسي والعلاج النفسي الحديث، ومقدَّم بلغة إنسانية دافئة تحترم مشاعر الأم والطفل معًا.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Vision & Offerings */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 space-y-8 shadow-2xs">
            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-[#0F2942] flex items-center gap-2.5">
                <Sprout className="w-6 h-6 text-[#0F766E]" />
                <span>رؤيتنا</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                نطمح في بوصلة إلى بناء جيل ينمو بوعي نفسي، وأسر تعيش تربية أكثر هدوءًا وتوازنًا، حيث تشعر كل أم أنها ليست وحدها، وأن الفهم والدعم العلمي يمكن أن يحوّلا رحلة التربية من صراع يومي… إلى نمو وازدهار.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-xl font-extrabold text-[#0F2942] flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-[#1E3A5F]" />
                <span>ماذا نقدّم في بوصلة؟</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm font-semibold text-slate-800">
                <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>دعمًا متخصصًا للأمهات في التعامل مع تحديات ADHD، القلق، الغضب، وتقدير الذات</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>برامج عملية وقصص علاجية للأطفال والمراهقين تعتمد على الأنشطة التفاعلية</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>حقائب وأدوات تربوية تساعد الأسرة على الانتقال من المعاناة اليومية إلى التوازن</span>
                </li>
                <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>إشراك الأهل كشركاء حقيقيين في رحلة الدعم النفسي والتعديل السلوكي</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Goals & Metrics Grid */}
          <div className="lg:col-span-5 bg-[#0F2942] text-white rounded-3xl p-7 sm:p-9 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400">أثرنا وأهدافنا</span>
              <h3 className="text-2xl font-extrabold">أرقام تعكس ثقة الأسر العربية</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                نسعى لتحقيق التميز في التثقيف النفسي والتمكين الأسري عبر محتوى موثوق علميًا.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
              {PLATFORM_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-white">{stat.label}</div>
                  <div className="text-xs text-slate-300">{stat.detail}</div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="w-full py-3.5 rounded-xl bg-white text-[#0F2942] hover:bg-slate-100 text-xs font-extrabold text-center transition-colors block"
            >
              تعرّفي أكثر على قصتنا وفلسفة بوصلة
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CORE TOPICS SECTION ("تخصصاتنا — المواضيع التي نغطيها") */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="text-xs font-extrabold text-[#1E3A5F]">تخصصاتنا</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
              المواضيع التي نغطيها — دعم متخصص لكل تحدٍ نفسي يواجه أبناءك
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              نوفّر مصادر شاملة ومتخصصة، مبنية على أسس علمية ونفسية، لمساعدة الأمهات والوالدين على فهم سلوك أبنائهم والتعامل الواعي مع التحديات النفسية الأكثر شيوعًا.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_TOPICS.map((topic) => {
              const IconComponent =
                topic.id === 'adhd'
                  ? Brain
                  : topic.id === 'anxiety'
                  ? AlertTriangle
                  : topic.id === 'anger'
                  ? Flame
                  : Sprout;

              return (
                <div
                  key={topic.id}
                  className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#1E3A5F] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl ${topic.badgeBg} ${topic.badgeText} flex items-center justify-center font-bold`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 tabular-nums">
                        {topic.coursesCount} كورسات · {topic.productsCount} منتجات
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#0F2942] leading-snug">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{topic.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold">
                    <Link
                      to={`/courses?topic=${topic.id}`}
                      className="text-[#1E3A5F] hover:underline flex items-center gap-1"
                    >
                      <span>استكشفي البرامج</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/resources?topic=${topic.id}`}
                      className="text-[#0F766E] hover:underline"
                    >
                      المصادر المجانية
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MAIN HUBS SECTION ("أقسامنا الرئيسية — محتوى مخصص لكل فئة") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-extrabold text-[#B45309]">أقسامنا الرئيسية</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
            محتوى مخصص لكل فئة من أفراد الأسرة
          </h2>
          <p className="text-base text-slate-700">
            نوفر مسارات متخصصة وأدوات تفاعلية لكل من الوالدين والمراهقين والأطفال، لكل قسم رابط وأدوات خاصة به.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Parent Hub */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF2F6] text-[#1E3A5F] flex items-center justify-center">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F2942]">قسم الوالدين</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                دعم وتمكين الأمهات والآباء للتعامل مع ADHD، القلق، الغضب، وتقدير الذات عند الأبناء، مع أداة "بوصلة الموقف التربوي" التفاعلية.
              </p>
              <div className="text-xs font-bold text-slate-600 pt-1">
                المجالات: ADHD · القلق · الغضب · تقدير الذات
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/parent-hub"
                className="w-full py-3.5 px-5 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>استكشفي قسم الوالدين</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Adolescent Hub */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F2942]">قسم المراهقين</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                محتوى تفاعلي وتمارين علاج معرفي سلوكي (CBT) تساعد المراهقين على فهم أنفسهم، إدارة ضغوط الدراسة، وبناء ثقة حقيقية بالنفس.
              </p>
              <div className="text-xs font-bold text-[#B45309] pt-1">
                يتضمن: مقياس التوازن النفسي للمراهق + كورسات ودفاتر CBT
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/adolescent-hub"
                className="w-full py-3.5 px-5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>استكشفي قسم المراهقين</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Child Hub */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F2942]">قسم الأطفال</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                كورسات قصصية، أنشطة تفاعلية ممتعة، وعجلة المشاعر الذكية التي تساعد الأطفال على فهم مشاعرهم والتعبير عنها بأمان.
              </p>
              <div className="text-xs font-bold text-[#0F766E] pt-1">
                يتضمن: عجلة مشاعري التفاعلية + القصص العلاجية المصورة
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/child-hub"
                className="w-full py-3.5 px-5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>استكشفي قسم الأطفال</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPECIALIZED COURSES FOR MOTHERS ("كورسات متخصصة للأمهات") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-extrabold text-[#1E3A5F]">الكورسات المتخصصة</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
              كورسات متخصصة للأمهات والوالدين
            </h2>
            <p className="text-base text-slate-700">
              برامج تدريبية شاملة مقدمة من استشاريين ومتخصصين في الطب النفسي وعلم النفس.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[#0F2942] text-xs font-bold whitespace-nowrap self-start md:self-auto"
          >
            <span>استعرضي جميع الكورسات ({COURSES.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {parentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 6. STORYTELLING COURSES FOR CHILDREN ("قسم الأطفال — كورسات قصصية تنمو مع طفلك") */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-[#0F766E]">قسم الأطفال</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
                كورسات قصصية تنمو مع طفلك
              </h2>
              <p className="text-base text-slate-700">
                برامج تدريبية تعتمد على القصص، الحوار، والأنشطة البسيطة لمساعدة الطفل على الفهم والتعبير بمشاركة أحد الوالدين.
              </p>
            </div>
            <Link
              to="/child-hub"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold whitespace-nowrap self-start md:self-auto"
            >
              <span>استكشفي قسم الأطفال كاملاً</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {childCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. EXPANDED PRODUCTS, STORYBOOKS & THERAPEUTIC TOOLKITS ("متجر إصدارات وحقائب بوصلة") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-extrabold text-[#B45309]">إصدارات ومنتجات بوصلة</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
              القصص العلاجية والحقائب التربوية للأسرة
            </h2>
            <p className="text-base text-slate-700 max-w-2xl">
              أدوات عملية ملموسة وقصص مصورة حائزة على جوائز إبداعية، مصممة لتحويل المفاهيم النفسية إلى ممارسة يومية ممتعة داخل البيت.
            </p>
          </div>

          {/* Interactive Filter Control Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl self-start lg:self-auto">
            {[
              { id: 'all', label: 'جميع المنتجات' },
              { id: 'storybooks', label: 'القصص العلاجية' },
              { id: 'toolkits', label: 'الحقائب والمنظمات' },
              { id: 'cards', label: 'البطاقات والدفاتر' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setProductTab(tab.id as typeof productTab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  productTab === tab.id
                    ? 'bg-white text-[#0F2942] shadow-2xs'
                    : 'text-slate-700 hover:text-[#0F2942]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-bold transition-colors shadow-xs"
          >
            <span>تصفحي جميع المنتجات والباقات المخفضة ({PRODUCTS.length} منتجات)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. FREE RESOURCES SECTION ("مجاني 100% — موارد عملية تبدئي بها فورًا") */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="text-xs font-extrabold text-[#0F766E]">مجاني 100%</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
              موارد عملية تبدئي بها فورًا
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              ابدئي رحلتك في دعم صحتك النفسية وصحة أبنائك من خلال مصادر مجانية، عملية، وقابلة للتطبيق اليوم في مواقف التربية اليومية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/resources?type=article"
              className="group bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 hover:border-[#1E3A5F] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2F6] text-[#1E3A5F] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0F2942] group-hover:text-[#1E3A5F]">
                  مقالات عملية
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  نصائح قصيرة وواضحة تساعدك على التعامل مع التحديات اليومية بثقة ووعي.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold text-[#1E3A5F]">
                <span>+25 مقال</span>
                <span>اقرئي الآن ←</span>
              </div>
            </Link>

            <Link
              to="/resources?type=pdf"
              className="group bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 hover:border-[#0F766E] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0F2942] group-hover:text-[#0F766E]">
                  قوائم مرجعية (PDF)
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  قوائم فحص جاهزة للتحميل تساعدك على تنظيم أفكارك واتخاذ قرارات تربوية أهدى.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold text-[#0F766E]">
                <span>+15 قائمة</span>
                <span>حمّلي الآن ←</span>
              </div>
            </Link>

            <Link
              to="/resources?type=script"
              className="group bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 hover:border-[#B45309] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center">
                  <MessageSquareQuote className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0F2942] group-hover:text-[#B45309]">
                  سكريبتات جاهزة
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  نصوص عملية تساعدك على الحوار مع أبنائك في المواقف الصعبة بدون صراخ أو شعور بالذنب.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold text-[#B45309]">
                <span>+30 سكريبت</span>
                <span>استعرضي النصوص ←</span>
              </div>
            </Link>

            <Link
              to="/resources?type=video"
              className="group bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 hover:border-rose-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFE4E6] text-rose-800 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0F2942] group-hover:text-rose-800">
                  فيديوهات توعوية
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  فيديوهات قصيرة تشرح المفاهيم النفسية بلغة بسيطة وسهلة التطبيق.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold text-rose-800">
                <span>+20 فيديو</span>
                <span>شاهدي الآن ←</span>
              </div>
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-bold transition-colors"
            >
              <span>استعرضي جميع المصادر المجانية</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. PHILOSOPHY & VALUES SECTION ("فلسفة بوصلة — نؤمن بأن الفهم يسبق الإصلاح" & "القيم التي نؤمن بها") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl border border-slate-200 p-7 sm:p-10 shadow-2xs">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-extrabold text-[#1E3A5F]">فلسفة بوصلة</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2942]">
              نؤمن بأن الفهم يسبق الإصلاح
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              في بوصلة، نؤمن بأن الطفل لا يحتاج "إصلاحًا" بل فهمًا، وأن الأم لا تحتاج لومًا بل دعمًا علميًا وإنسانيًا، وأن الأسرة هي حجر الأساس في أي رحلة علاج أو نمو نفسي.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                'الطفل لا يحتاج "إصلاحًا"… بل فهمًا',
                'الأم لا تحتاج لومًا… بل دعمًا علميًا وإنسانيًا',
                'الأسرة هي حجر الأساس في أي رحلة علاج',
                'الطب النفسي المبني على الدليل العلمي',
              ].map((pillar) => (
                <div
                  key={pillar}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-3 text-sm font-bold text-[#0F2942]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="/assets/hero-mother-child.jpg"
                alt="أم وطفلها في جلسة دعم"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 bg-[#0F2942] text-white px-5 py-3.5 rounded-2xl shadow-lg border border-slate-700">
              <div className="text-2xl font-extrabold text-amber-400 tabular-nums">15+</div>
              <div className="text-xs font-bold text-slate-200">سنة من الخبرة الإكلينيكية</div>
            </div>
          </div>
        </div>

        {/* 6 Core Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <div className="text-xs font-extrabold text-[#0F766E]">قيمنا</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
              القيم التي نؤمن بها
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              في بوصلة نعمل وفق قيم واضحة تضع مشاعر الأم والطفل في المقام الأول
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOASLA_VALUES.map((val, idx) => {
              const icons = [HeartHandshake, Scale, Lightbulb, Sparkles, ShieldCheck, Brain];
              const ValIcon = icons[idx % icons.length];
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#1E3A5F] flex items-center justify-center">
                    <ValIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0F2942]">{val.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FOUNDER SECTION ("المؤسِّسة — د. ولاء حسني") */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <img
                  src="/assets/founder-walaa.jpg"
                  alt="د. ولاء حسني"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] object-cover object-top"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-5 sm:left-5 bg-white text-[#0F2942] px-5 py-3.5 rounded-2xl shadow-lg border border-slate-200">
                <div className="text-2xl font-extrabold text-[#0F766E] tabular-nums">98%</div>
                <div className="text-xs font-bold text-slate-700">رضا الأمهات والعملاء</div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-extrabold text-[#B45309]">المؤسِّسة</div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2942] leading-snug">
                د. ولاء حسني{' '}
                <span className="text-[#1E3A5F] block sm:inline text-xl sm:text-2xl font-bold">
                  – استشاري طب نفسي أطفال ومراهقين
                </span>
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                طبيبة نفسية متخصصة في الاضطرابات النفسية لدى الأطفال والمراهقين مثل اضطرابات الانتباه والتركيز (ADHD)، اضطرابات القلق، والاضطرابات السلوكية. تعمل في هذا المجال منذ أكثر من 15 عامًا، وقد ساعدت آلاف الأسر على فهم أطفالهم ودعمهم بطرق علمية وعملية. كاتبة لقصص الأطفال وحاصلة على جائزة المركز الأول عن قصة "مذكرات طفل حركي" وجائزة الإبداع للدكتور يحيى الرخاوي عن قصة "وداعاً يليق بك".
              </p>

              <ul className="space-y-3 pt-2">
                {FOUNDER_CREDENTIALS.map((cred) => (
                  <li key={cred} className="flex items-start gap-3 text-sm font-bold text-[#0F2942]">
                    <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="px-5 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-xs font-bold transition-colors"
                >
                  تصفحي مؤلفات وإصدارات د. ولاء حسني
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-xl border border-slate-300 text-[#0F2942] hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  احجزي استشارة أو تواصلي معنا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. LIVE WEBINARS PREVIEW ("ندوات تفاعلية مباشرة — ويبينارات بوصلة") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-extrabold text-[#1E3A5F]">ندوات تفاعلية مباشرة</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">ويبينارات بوصلة</h2>
            <p className="text-base text-slate-700">
              انضمي لجلسات تفاعلية مباشرة مع خبراء متخصصين في تربية الأطفال والصحة النفسية
            </p>
          </div>
          <Link
            to="/webinars"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[#0F2942] text-xs font-bold whitespace-nowrap self-start md:self-auto"
          >
            <span>عرض كل الويبينارات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {WEBINARS.map((webinar) => {
            const isRegistered = registeredWebinarIds.includes(webinar.id);
            return (
              <div
                key={webinar.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-5 shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#0F766E]">{webinar.topicLabel}</span>
                    <span className="text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{webinar.date}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0F2942] leading-snug">
                    {webinar.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{webinar.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-xs font-bold text-slate-600">
                    {webinar.status === 'upcoming'
                      ? `متبقي ${webinar.seatsLeft} مقعداً · مجاني`
                      : `مسجل · ${webinar.registeredCount} مشاهدة`}
                  </div>
                  <button
                    type="button"
                    onClick={() => registerWebinar(webinar.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isRegistered
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-[#1E3A5F] hover:bg-[#0F2942] text-white'
                    }`}
                  >
                    {isRegistered
                      ? '✓ تم التسجيل'
                      : webinar.status === 'upcoming'
                      ? 'احجزي مقعدك مجاناً'
                      : 'مشاهدة اللقاء'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FINAL CTA BANNER ("ابدئي رحلتك مع بوصلة") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2942] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md">
          <h2 className="text-2xl sm:text-4xl font-extrabold">ابدئي رحلتك مع بوصلة</h2>
          <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto">
            من القلق والحيرة… إلى الهدوء، الثقة، والتوازن النفسي لكِ ولأبنائك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/resources"
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-[#0F2942] text-sm font-extrabold transition-colors"
            >
              استكشفي المصادر المجانية
            </Link>
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#0F2942] text-sm font-extrabold transition-colors"
            >
              تصفحي متجر القصص والحقائب
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl border border-white/30 hover:bg-white/10 text-white text-sm font-bold transition-colors"
            >
              تواصلي معنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

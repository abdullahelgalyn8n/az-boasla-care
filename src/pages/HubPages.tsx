import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  HeartHandshake,
  Compass,
  Sparkles,
  CheckCircle2,
  MessageSquareQuote,
  Wind,
} from 'lucide-react';
import { CORE_TOPICS, COURSES, PRODUCTS, FREE_RESOURCES, TopicId } from '../data/boaslaData';
import { CourseCard, ProductCard } from '../components/VisualCards';

export const ParentHubPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId>('adhd');

  const activeTopicObj = CORE_TOPICS.find((t) => t.id === selectedTopic) || CORE_TOPICS[0];
  const parentCourses = COURSES.filter((c) => c.category === 'parents');
  const topicResources = FREE_RESOURCES.filter((r) => r.topic === selectedTopic || r.topic === 'general').slice(0, 4);
  const parentProducts = PRODUCTS.filter(
    (p) => p.topic === selectedTopic || p.category === 'bundles' || p.id === 'prod-mother-scripts-book'
  ).slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1E3A5F]">
              <HeartHandshake className="w-4 h-4 text-[#B45309]" />
              <span>قسم الوالدين · تمكين الأمهات والآباء</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F2942] leading-tight">
              دعم وتمكين الأمهات لفهم أبنائهن بوعي وعلم
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              مصادر شاملة ودعم متخصص للتعامل مع تحديات ADHD، القلق، الغضب، وتقدير الذات عند الأطفال والمراهقين بعيداً عن اللوم أو الصراخ.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/resources"
                className="px-6 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-xs font-bold transition-colors"
              >
                استكشفي المصادر المجانية
              </Link>
              <Link
                to="/courses"
                className="px-6 py-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-[#0F2942] text-xs font-bold transition-colors"
              >
                شاهدي الكورسات المتخصصة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Parenting Situation Compass ("بوصلة تشخيص الموقف التربوي") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1.5">
              <div className="text-xs font-extrabold text-[#0F766E]">أداة تفاعلية للأمهات</div>
              <h2 className="text-2xl font-extrabold text-[#0F2942]">
                بوصلة التوجيه السريع: اختاري التحدي الذي يواجه طفلك الآن
              </h2>
              <p className="text-sm text-slate-700">
                اضغطي على المجال لعرض الأعراض الشائعة، النتائج المستهدفة، وأفضل المصادر والمنتجات المناسبة له.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CORE_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedTopic === topic.id
                      ? 'bg-[#1E3A5F] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {topic.shortTitle}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-extrabold text-[#0F2942]">{activeTopicObj.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{activeTopicObj.description}</p>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-extrabold text-rose-800">أبرز العلامات التي تلاحظها الأم:</div>
                {activeTopicObj.symptoms.map((sym) => (
                  <div key={sym} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <span className="text-rose-700">•</span>
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-extrabold text-[#0F766E]">النتائج العملية مع خطة بوصلة:</div>
                {activeTopicObj.outcomes.map((out) => (
                  <div key={out} className="text-xs font-bold text-[#0F2942] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-base font-extrabold text-[#0F2942]">
                مصادر مجانية وسكريبتات مقترحة لـ ({activeTopicObj.shortTitle}):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topicResources.map((res) => (
                  <Link
                    key={res.id}
                    to={`/resources/${res.id}`}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-[#1E3A5F] bg-white transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#0F766E]">
                        {res.typeLabel} · {res.topicLabel}
                      </span>
                      <h5 className="text-sm font-extrabold text-[#0F2942] mt-1 leading-snug">
                        {res.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{res.summary}</p>
                    </div>
                    <span className="text-xs font-bold text-[#1E3A5F] flex items-center gap-1">
                      <span>افتحي المصدر</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-extrabold text-[#1E3A5F]">الكورسات المتخصصة</div>
            <h2 className="text-2xl font-extrabold text-[#0F2942]">جميع كورسات الأمهات والوالدين</h2>
          </div>
          <Link to="/courses" className="text-xs font-bold text-[#1E3A5F] hover:underline">
            عرض الكتالوج الكامل ←
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {parentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Recommended Products for Parents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="text-xs font-extrabold text-[#B45309]">أدوات عملية للأم</div>
          <h2 className="text-2xl font-extrabold text-[#0F2942]">حقائب وأدلة تربوية موصى بها</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {parentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

const CHILD_EMOTIONS = [
  {
    id: 'angry',
    label: 'غاضب / متنرفز',
    bodyClue: 'وجهي ساخن، يداي مشدودتان، وصوتي يرتفع',
    calmExercise: 'تمرين السلحفاة الذكية وتنفس الوردة والشمعة (شهيق 4 ثوانٍ وزفير بطيء)',
    parentTip: 'تجنبي الجدال لحظة الفوران؛ سمّي شعوره بهدوء ووجهيه لركن الهدوء.',
    recommendedCourseId: 'b1b2c3d4-3333-4000-8000-000000000003',
  },
  {
    id: 'hyper',
    label: 'كثير الحركة / مشتت',
    bodyClue: 'عقلي يقفز بين أفكار كثيرة ولا أستطيع الجلوس طويلاً',
    calmExercise: 'لعبة "قف - فكّر - انطلق" وتقسيم المهمة إلى 10 دقائق مع مؤقت بصري',
    parentTip: 'أعطي تعليمة واحدة فقط مع تواصل بصري، واستخدمي المنظم البصري.',
    recommendedCourseId: 'b1b2c3d4-2222-4000-8000-000000000002',
  },
  {
    id: 'anxious',
    label: 'خائف / قلق',
    bodyClue: 'قلبي يدق بسرعة وأشعر بمغص خفيف في بطني',
    calmExercise: 'تمرين الحواس الخمس + رسم "وحش القلق الصغير" ومناقشته مع ماما',
    parentTip: 'امنحيه طمأنة دافئة مع تشجيع تدريجي على المواجهة الآمنة دون إجبار.',
    recommendedCourseId: 'b1b2c3d4-1111-4000-8000-000000000001',
  },
  {
    id: 'sad',
    label: 'حزين / محبط',
    bodyClue: 'أشعر برغبة في البكاء ولا أريد اللعب الآن',
    calmExercise: 'حضن الأمان الهادئ لمدة دقيقة + اختيار بطاقة من "حكايات مشاعري"',
    parentTip: 'اسمعي حزنه دون تقليل ("لا بأس أن تبكي، أنا بجانبك حتى تهدأ").',
    recommendedCourseId: 'b1b2c3d4-1111-4000-8000-000000000001',
  },
];

export const ChildHubPage: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(CHILD_EMOTIONS[0]);
  const childCourses = COURSES.filter((c) => c.category === 'children');
  const childProducts = PRODUCTS.filter(
    (p) => p.category === 'storybooks' || p.category === 'toolkits' || p.category === 'cards'
  ).slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0F766E]">
              <Sparkles className="w-4 h-4" />
              <span>قسم الأطفال · التعلم بالقصص والأنشطة</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F2942] leading-tight">
              كورسات قصصية وألعاب علاجية تنمو مع طفلك
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              برامج تدريبية وقصص مصورة تعتمد على الحوار والأنشطة البسيطة لمساعدة الطفل على فهم مشاعره، تنظيم انتباهه، والتعبير عن نفسه بمشاركة أحد الوالدين.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Emotion Wheel for Children */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="space-y-1.5">
            <div className="text-xs font-extrabold text-[#0F766E]">نشاط تفاعلي للأم والطفل</div>
            <h2 className="text-2xl font-extrabold text-[#0F2942]">
              عجلة مشاعري التفاعلية: بماذا يشعر طفلك الآن؟
            </h2>
            <p className="text-sm text-slate-700">
              اختاري مع طفلك الشعور الحالي لتظهر له خطوة التهدئة المناسبة والنشاط القصصي المقترح.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHILD_EMOTIONS.map((emo) => (
              <button
                key={emo.id}
                type="button"
                onClick={() => setSelectedEmotion(emo)}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                  selectedEmotion.id === emo.id
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
                    : 'bg-slate-50 text-[#0F2942] border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-sm font-extrabold">{emo.label}</div>
                <div
                  className={`text-xs mt-1 line-clamp-1 ${
                    selectedEmotion.id === emo.id ? 'text-teal-100' : 'text-slate-600'
                  }`}
                >
                  {emo.bodyClue}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4]">
            <div className="space-y-1.5">
              <div className="text-xs font-extrabold text-[#115E59] flex items-center gap-1.5">
                <Brain className="w-4 h-4" />
                <span>إشارة الجسم للطفل:</span>
              </div>
              <p className="text-sm font-bold text-[#0F2942]">{selectedEmotion.bodyClue}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-extrabold text-[#115E59] flex items-center gap-1.5">
                <Wind className="w-4 h-4" />
                <span>تمرين البطل للتهدئة الآن:</span>
              </div>
              <p className="text-sm font-bold text-[#0F2942]">{selectedEmotion.calmExercise}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-extrabold text-[#115E59] flex items-center gap-1.5">
                <MessageSquareQuote className="w-4 h-4" />
                <span>توجيه سريع للأم:</span>
              </div>
              <p className="text-sm font-bold text-[#0F2942]">{selectedEmotion.parentTip}</p>
              <Link
                to={`/courses/${selectedEmotion.recommendedCourseId}`}
                className="inline-block pt-1 text-xs font-extrabold text-[#1E3A5F] hover:underline"
              >
                استعرضي الكورس القصصي المخصص ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Children Storytelling Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">الكورسات القصصية للأطفال</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {childCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Children Storybooks & Toolkits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">القصص العلاجية وحقائب الأنشطة للأطفال</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {childProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const AdolescentHubPage: React.FC = () => {
  const [stressArea, setStressArea] = useState<'study' | 'confidence' | 'social'>('confidence');
  const teenCourses = COURSES.filter(
    (c) => c.category === 'adolescents' || c.slug === 'teen-self-esteem'
  );
  const teenProducts = PRODUCTS.filter(
    (p) => p.id === 'prod-teen-cbt-journal' || p.id === 'prod-farewell-book' || p.id === 'prod-feelings-cards'
  );

  const areaPlans = {
    confidence: {
      title: 'بناء الثقة بالنفس والتخلص من المقارنات',
      teenAdvice: 'قيمتك الحقيقية لا تحددها علامات الإعجاب على السوشيال ميديا أو مقارنتك بغيرك؛ اكتشف نقاط قوتك الخاصة.',
      parentAdvice: 'استبدلي النقد المستمر بالاستماع الفعّال، وامنحي ابنك مساحة لاتخاذ قراراته اليومية وتحمل نتيجتها.',
    },
    study: {
      title: 'إدارة القلق الدراسي والتفكير المفرط (Overthinking)',
      teenAdvice: 'قسّم أهدافك الدراسية إلى فترات 25 دقيقة، وتذكر أن القلق يضخم الصعوبات في خيالك أكثر من الواقع.',
      parentAdvice: 'افصلي حبك وتقديرك لابنك المراهق عن درجاته الدراسية، وكوني ملاذاً يهدئ توتره وقت الامتحانات.',
    },
    social: {
      title: 'العلاقات الصحية والحزم أمام ضغط الأقران',
      teenAdvice: 'الصديق الحقيقي يحترم حدودك وقيمك؛ قول "لا" لما لا يناسبك هو قمة القوة والنضج.',
      parentAdvice: 'تجنبي مهاجمة أصدقاء ابنك بشكل مباشر حتى لا يتخذ موقفاً دفاعياً، وناقشيه بالأسئلة المفتوحة.',
    },
  };

  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#B45309]">
              <Compass className="w-4 h-4" />
              <span>قسم المراهقين · فهم الذات وبناء الثقة</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F2942] leading-tight">
              مساحة آمنة للمراهقين والأهل لعبور مرحلة المراهقة بثقة وتوازن
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              محتوى تفاعلي وتمارين علاج معرفي سلوكي (CBT) تساعد المراهقين على فهم أنفسهم والتعامل مع تحديات الهوية، القلق الدراسي، والعلاقات الاجتماعية.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Teen Compass */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#B45309]">بوصلة المراهق التفاعلية</span>
              <h2 className="text-2xl font-extrabold text-[#0F2942]">
                اختر المحور النفسي لعرض إرشادات المراهق والوالدين
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'confidence', label: 'تقدير الذات والثقة' },
                { id: 'study', label: 'القلق الدراسي والتفكير المفرط' },
                { id: 'social', label: 'الأصدقاء والحدود النفسية' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStressArea(tab.id as typeof stressArea)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    stressArea === tab.id
                      ? 'bg-[#B45309] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
              <div className="text-xs font-extrabold text-[#B45309]">رسالة مباشرة للمراهق / الشاب:</div>
              <h3 className="text-lg font-extrabold text-[#0F2942]">{areaPlans[stressArea].title}</h3>
              <p className="text-sm text-slate-800 leading-relaxed">{areaPlans[stressArea].teenAdvice}</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
              <div className="text-xs font-extrabold text-[#1E3A5F]">توصية د. ولاء حسني للأم والأب:</div>
              <h3 className="text-lg font-extrabold text-[#0F2942]">كيف تدعمين ابنك المراهق؟</h3>
              <p className="text-sm text-slate-800 leading-relaxed">{areaPlans[stressArea].parentAdvice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teen Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">كورسات وبرامج مرحلة المراهقة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {teenCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Teen Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">دفاتر التمارين العلاجية والإصدارات للمراهقين</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {teenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  FileText,
  CheckSquare,
  MessageSquareQuote,
  PlayCircle,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  ShieldCheck,
  Award,
  ShoppingBag,
} from 'lucide-react';
import {
  FREE_RESOURCES,
  WEBINARS,
  BOASLA_VALUES,
  FOUNDER_CREDENTIALS,
  ResourceItem,
  TopicId,
} from '../data/boaslaData';
import { filterResources } from '../utils/catalogLogic';
import { useApp } from '../context/AppContext';

export const ResourcesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as ResourceItem['type']) || 'all';
  const initialTopic = (searchParams.get('topic') as TopicId) || 'all';

  const [search, setSearch] = useState('');
  const [type, setType] = useState<'all' | ResourceItem['type']>(initialType);
  const [topic, setTopic] = useState<'all' | TopicId>(initialTopic);
  const { savedResourceIds, toggleSaveResource } = useApp();

  const filtered = filterResources(FREE_RESOURCES, { search, type, topic });

  return (
    <div className="space-y-12 pb-16">
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold text-[#0F766E]">مجاني 100% · مكتبة بوصلة</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">
              مكتبة المصادر المجانية للأمهات والآباء
            </h1>
            <p className="text-base text-slate-700">
              مقالات عملية، ملفات PDF، سكريبتات حوارية جاهزة، وفيديوهات توعوية لمساعدتك في رحلتك اليومية مع أبنائك.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="ابحثي عن مصدر"
                  placeholder="ابحثي عن مصدر (مثال: نوبة الغضب، التنفس، نسيان التعليمات...)"
                  className="w-full pr-11 pl-4 py-3 rounded-2xl border border-slate-300 bg-[#F8FAFC] text-sm font-semibold text-[#0F2942] focus:outline-none focus:bg-white focus:border-[#1E3A5F]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-wrap items-center gap-2" role="tablist" aria-label="نوع المصدر">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'article', label: 'مقالات' },
                { id: 'pdf', label: 'قوائم PDF' },
                { id: 'script', label: 'سكريبتات جاهزة' },
                { id: 'video', label: 'فيديوهات' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={type === t.id}
                  onClick={() => setType(t.id as typeof type)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    type === t.id
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filter Buttons matching boaslacare.com/resources */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[
              { id: 'all', label: 'جميع المواضيع' },
              { id: 'adhd', label: 'ADHD' },
              { id: 'anxiety', label: 'القلق' },
              { id: 'anger', label: 'الغضب' },
              { id: 'self-esteem', label: 'تقدير الذات' },
              { id: 'general', label: 'عام' },
            ].map((top) => (
              <button
                key={top.id}
                type="button"
                onClick={() => setTopic(top.id as typeof topic)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  topic === top.id
                    ? 'bg-[#0F766E] text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {top.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => {
            const isSaved = savedResourceIds.includes(res.id);
            const ResIcon =
              res.type === 'article'
                ? FileText
                : res.type === 'pdf'
                ? CheckSquare
                : res.type === 'script'
                ? MessageSquareQuote
                : PlayCircle;

            return (
              <article
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between gap-5 hover:border-[#1E3A5F] transition-all shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E]">
                      <ResIcon className="w-4 h-4" />
                      <span>
                        {res.typeLabel} · {res.topicLabel}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSaveResource(res.id)}
                      aria-label={isSaved ? `إزالة ${res.title} من المحفوظات` : `حفظ ${res.title}`}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-amber-50 border-amber-300 text-[#B45309]'
                          : 'border-slate-200 text-slate-500 hover:text-[#0F2942]'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <Link to={`/resources/${res.id}`} className="block">
                    <h2 className="text-lg font-extrabold text-[#0F2942] hover:text-[#1E3A5F] leading-snug">
                      {res.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-700 leading-relaxed">{res.summary}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">{res.durationOrPages}</span>
                  <Link
                    to={`/resources/${res.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white transition-colors"
                  >
                    <span>
                      {res.type === 'article'
                        ? 'اقرئي المقال'
                        : res.type === 'script'
                        ? 'عرض السكريبت'
                        : res.type === 'pdf'
                        ? 'عرض القائمة وتحميلها'
                        : 'شاهدي الآن'}
                    </span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { savedResourceIds, toggleSaveResource, showToast } = useApp();

  const resource = FREE_RESOURCES.find((r) => r.id === id) || FREE_RESOURCES[0];
  const isSaved = savedResourceIds.includes(resource.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          to="/resources"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:underline"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى مكتبة المصادر المجانية</span>
        </Link>
        <button
          type="button"
          onClick={() => toggleSaveResource(resource.id)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#0F2942] cursor-pointer"
        >
          <Bookmark className="w-4 h-4 text-[#B45309]" />
          <span>{isSaved ? 'محفوظ في مكتبتك' : 'حفظ المصدر للرجوع إليه'}</span>
        </button>
      </div>

      <article className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-10 space-y-8 shadow-2xs">
        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="text-xs font-extrabold text-[#0F766E]">
            {resource.typeLabel} · تخصص: {resource.topicLabel} · {resource.durationOrPages}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F2942] leading-tight">
            {resource.title}
          </h1>
          <p className="text-base text-slate-700 font-medium">{resource.summary}</p>
        </div>

        {/* Main Content Paragraphs */}
        <div className="space-y-4 text-base text-slate-800 leading-relaxed">
          {resource.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Dialogue Script Comparison if available */}
        {resource.dialogueScript && (
          <div className="space-y-4 pt-2">
            <h2 className="text-xl font-extrabold text-[#0F2942]">
              نصوص الحوار التربوي الجاهزة للتطبيق:
            </h2>
            {resource.dialogueScript.map((sc, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F8FAFC] p-5 space-y-4"
              >
                <div className="text-sm font-extrabold text-[#1E3A5F]">
                  الموقف {idx + 1}: {sc.situation}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                    <span className="text-xs font-extrabold text-rose-800 block">تجنبي قول (عبارة شائعة):</span>
                    <p className="text-sm font-bold text-slate-900">"{sc.avoidSaying}"</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="text-xs font-extrabold text-emerald-900 block">
                      قولي بدلاً من ذلك (سكريبت بوصلة):
                    </span>
                    <p className="text-sm font-bold text-slate-900">"{sc.sayInstead}"</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[#0F766E]">السبب العلمي: </span>
                  {sc.whyItWorks}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actionable Steps */}
        <div className="p-6 rounded-2xl bg-[#EEF2F6] border border-slate-300 space-y-3">
          <h3 className="text-base font-extrabold text-[#0F2942]">
            خطوات عملية تبدئين بها اليوم:
          </h3>
          <ul className="space-y-2.5">
            {resource.actionSteps.map((step) => (
              <li key={step} className="flex items-start gap-2.5 text-sm font-bold text-[#0F2942]">
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              window.print();
              showToast('جاري تجهيز النسخة المطبوعة من المصدر');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
          >
            طباعة / حفظ كملف PDF
          </button>
          <Link
            to="/courses"
            className="text-xs font-extrabold text-[#0F766E] hover:underline"
          >
            استكشفي الكورسات المتخصصة في هذا الموضوع ←
          </Link>
        </div>
      </article>
    </div>
  );
};

export const WebinarsPage: React.FC = () => {
  const { registeredWebinarIds, registerWebinar } = useApp();

  return (
    <div className="space-y-12 pb-16">
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl mr-0 space-y-3">
          <div className="text-xs font-extrabold text-[#1E3A5F]">ندوات تفاعلية مباشرة ومسجلة</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">
            ويبينارات بوصلة التفاعلية مع د. ولاء حسني
          </h1>
          <p className="text-base text-slate-700 leading-relaxed">
            لقاءات مباشرة شهرية لمناقشة أهم تحديات التربية والصحة النفسية للأطفال والمراهقين والإجابة على أسئلة الأمهات مباشرة.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {WEBINARS.map((web) => {
          const isReg = registeredWebinarIds.includes(web.id);
          return (
            <div
              key={web.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xs"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                  <span className="text-[#0F766E]">{web.topicLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{web.date}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{web.time}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2942]">{web.title}</h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {web.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-extrabold text-[#0F2942]">محاور اللقاء:</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {web.agenda.map((item) => (
                      <li
                        key={item}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 space-y-4 text-center">
                <div className="text-xs font-bold text-slate-600">
                  تقديم: <strong className="text-[#0F2942]">{web.speaker}</strong>
                </div>
                <div className="text-2xl font-extrabold text-[#0F766E]">حضور مجاني</div>
                <div className="text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5">
                  <Users className="w-4 h-4 text-[#1E3A5F]" />
                  <span>سجّل حتى الآن {web.registeredCount} أم</span>
                </div>
                <button
                  type="button"
                  onClick={() => registerWebinar(web.id)}
                  className={`w-full py-3.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                    isReg
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-[#1E3A5F] hover:bg-[#0F2942] text-white'
                  }`}
                >
                  {isReg
                    ? '✓ تم تأكيد تسجيلك في الويبينار'
                    : web.status === 'upcoming'
                    ? 'احجزي مقعدك المجاني الآن'
                    : 'مشاهدة التسجيل الكامل'}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl mr-0 space-y-4">
          <div className="text-xs font-extrabold text-[#0F766E]">من نحن · فلسفة بوصلة</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F2942] leading-tight">
            بوصلة… علمٌ، إنسانية، وتوازن نفسي
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            نرافق الأمهات والأسر في رحلة التربية النفسية الواعية، من خلال محتوى علمي مبسّط، مبني على الطب النفسي والعلاج المعرفي السلوكي الحديث، ومقدَّم بلغة إنسانية دافئة تحترم مشاعر الأم والطفل معًا.
          </p>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <img
              src="/assets/founder-walaa.jpg"
              alt="د. ولاء حسني"
              referrerPolicy="no-referrer"
              className="w-full h-96 object-cover object-top rounded-2xl border border-slate-200"
            />
          </div>
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#B45309]">
              <Award className="w-4 h-4" />
              <span>مؤسِّسة منصة بوصلة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
              د. ولاء حسني – استشاري طب نفسي أطفال ومراهقين
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              استشاري طب نفسي، حاصلة على الزمالة المصرية (المركز الأول – 2024) والبورد العربي في الطب النفسي، ومدير إدارة الطب النفسي بوزارة الصحة المصرية. كاتبة لقصص الأطفال وحاصلة على جائزة المركز الأول عن قصة "مذكرات طفل حركي" وجائزة الإبداع للدكتور يحيى الرخاوي عن قصة "وداعاً يليق بك".
            </p>
            <ul className="space-y-2.5">
              {FOUNDER_CREDENTIALS.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm font-bold text-[#0F2942]">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-1" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl font-extrabold text-[#0F2942]">القيم الست التي تحكم عملنا في بوصلة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOASLA_VALUES.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
              <h3 className="text-lg font-extrabold text-[#1E3A5F]">{v.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('استشارة خاصة بـ ADHD');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3 || phone.trim().length < 8 || message.trim().length < 5) {
      setError('يرجى إدخال الاسم، رقم الهاتف، وتفاصيل رسالتك أو الاستشارة المطلوبة.');
      return;
    }
    setError('');
    setSubmitted(true);
    showToast('تم إرسال رسالتك لفريق بوصلة بنجاح!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-extrabold text-[#0F766E]">تواصلي معنا · حجز استشارة</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">
          نحن هنا لدعمكِ والإجابة على استفساراتك
        </h1>
        <p className="text-base text-slate-700">
          سواء كنتِ ترغبين في حجز استشارة تربوية ونفسية، أو الاستفسار عن الكورسات والحقائب، فريق بوصلة يسعد بالتواصل معكِ.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-2xs">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#0F766E] mx-auto" />
              <h2 className="text-xl font-extrabold text-[#0F2942]">
                تم استلام طلبك بنجاح يا {name}!
              </h2>
              <p className="text-sm text-slate-700 max-w-md mx-auto">
                سيتواصل معكِ فريق التنسيق في منصة بوصلة خلال 24 ساعة عبر الهاتف أو واتساب على الرقم ({phone}).
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-extrabold text-[#0F2942] mb-2">
                نموذج التواصل وحجز الاستشارات
              </h2>
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-[#0F2942] mb-1">
                  الاسم الكامل *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتبي اسمك الكريم"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0F2942]"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold text-[#0F2942] mb-1">
                  رقم الهاتف / واتساب *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01095323649"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0F2942] tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="contact-topic" className="block text-xs font-bold text-[#0F2942] mb-1">
                  نوع الطلب
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-bold text-[#0F2942] bg-white"
                >
                  <option>استشارة خاصة بـ ADHD وفرط الحركة</option>
                  <option>استشارة حول القلق أو نوبات الغضب</option>
                  <option>استفسار عن الكورسات التدريبية</option>
                  <option>طلب جملة للمدارس والمراكز التربوية</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-msg" className="block text-xs font-bold text-[#0F2942] mb-1">
                  رسالتك أو عمر الطفل وملخص التحدي *
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتبي تفاصيل استفسارك هنا..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0F2942]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-extrabold cursor-pointer"
              >
                إرسال الرسالة الآن
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-5">
            <h3 className="text-lg font-extrabold text-[#0F2942]">بيانات التواصل المباشر</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#1E3A5F] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">الهاتف وواتساب</div>
                  <div className="font-extrabold text-[#0F2942] tabular-nums" dir="ltr">
                    +20 10 95323649
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F766E] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">البريد الإلكتروني</div>
                  <div className="font-extrabold text-[#0F2942]">info@boaslacare.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#B45309] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold">المقر</div>
                  <div className="font-extrabold text-[#0F2942]">مصر – القاهرة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('مريم عبد الرحمن');
  const [email, setEmail] = useState('mariam@boaslacare.com');
  const [password, setPassword] = useState('12345678');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || 'أم واعية', email);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <img
            src="/assets/boasla-logo.png"
            alt="بوصلة"
            className="h-14 mx-auto object-contain"
          />
          <h1 className="text-2xl font-extrabold text-[#0F2942]">
            {mode === 'login' ? 'تسجيل الدخول إلى بوصلة' : 'إنشاء حساب جديد في بوصلة'}
          </h1>
          <p className="text-xs font-semibold text-slate-600">
            احفظي كورساتك، سكريبتاتك المفضلة، وتابعي طلباتك من مكان واحد
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
              mode === 'login' ? 'bg-white text-[#0F2942] shadow-2xs' : 'text-slate-600'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
              mode === 'register' ? 'bg-white text-[#0F2942] shadow-2xs' : 'text-slate-600'
            }`}
          >
            حساب جديد
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-bold text-[#0F2942] mb-1">
                الاسم الكامل
              </label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942]"
              />
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className="block text-xs font-bold text-[#0F2942] mb-1">
              البريد الإلكتروني
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942]"
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="block text-xs font-bold text-[#0F2942] mb-1">
              كلمة المرور
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-sm font-extrabold cursor-pointer"
          >
            {mode === 'login' ? 'دخول إلى لوحة التحكم' : 'إنشاء الحساب والبدء فوراً'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const DashboardPage: React.FC = () => {
  const { user, orders, savedResourceIds, registeredWebinarIds, logout } = useApp();
  const savedResources = FREE_RESOURCES.filter((r) => savedResourceIds.includes(r.id));
  const myWebinars = WEBINARS.filter((w) => registeredWebinarIds.includes(w.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="bg-white rounded-3xl border border-slate-200 p-7 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-extrabold text-[#0F766E]">لوحة تحكم الأسرة</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
            أهلاً بكِ، {user ? user.name : 'عزيزتي الأم'}
          </h1>
          <p className="text-sm text-slate-600">
            هنا تجدين جميع طلباتك، الكورسات المشترك بها، المصادر المحفوظة، والندوات المسجلة.
          </p>
        </div>
        {user && (
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-rose-700 hover:bg-rose-50 cursor-pointer"
          >
            تسجيل الخروج
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders & Enrolled Courses */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-4">
          <h2 className="text-lg font-extrabold text-[#0F2942] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1E3A5F]" />
            <span>طلباتي واشتراكات الكورسات ({orders.length})</span>
          </h2>
          {orders.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <p className="text-xs font-semibold text-slate-600">
                لا توجد طلبات مسجلة بعد. يمكنكِ تصفح الكورسات أو متجر القصص والحقائب التربوية.
              </p>
              <div className="flex justify-center gap-2">
                <Link
                  to="/products"
                  className="px-4 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold"
                >
                  تصفح المتجر
                </Link>
                <Link
                  to="/courses"
                  className="px-4 py-2 rounded-xl border border-slate-300 text-[#0F2942] text-xs font-bold"
                >
                  تصفح الكورسات
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#1E3A5F]">طلب رقم: {ord.id}</span>
                    <span className="text-emerald-800">{ord.status}</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex justify-between font-semibold">
                        <span>
                          • {it.title} (×{it.quantity})
                        </span>
                        <span className="tabular-nums">{it.price * it.quantity} ج.م</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-extrabold text-[#0F2942]">
                    <span>الإجمالي:</span>
                    <span className="tabular-nums">{ord.total} ج.م</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Resources & Webinars */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-4">
          <h2 className="text-lg font-extrabold text-[#0F2942] flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#B45309]" />
            <span>المصادر المحفوظة ({savedResources.length}) والويبينارات ({myWebinars.length})</span>
          </h2>
          <div className="space-y-3">
            {savedResources.map((res) => (
              <Link
                key={res.id}
                to={`/resources/${res.id}`}
                className="block p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1E3A5F]"
              >
                <div className="text-xs font-bold text-[#0F766E]">
                  {res.typeLabel} · {res.topicLabel}
                </div>
                <div className="text-sm font-extrabold text-[#0F2942] mt-0.5">{res.title}</div>
              </Link>
            ))}
            {myWebinars.map((web) => (
              <div
                key={web.id}
                className="p-4 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] text-xs font-bold text-[#0F2942]"
              >
                ✓ مسجلة في ويبينار: {web.title} ({web.date})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PolicyPage: React.FC<{ policyType: string }> = ({ policyType }) => {
  const policies: Record<string, { title: string; subtitle: string; sections: { h: string; p: string }[] }> = {
    privacy: {
      title: 'سياسة الخصوصية وحماية البيانات',
      subtitle: 'نلتزم في منصة بوصلة بالحفاظ التام على سرية وخصوصية بيانات الأمهات والأسر.',
      sections: [
        {
          h: '1. سرية البيانات والاستشارات',
          p: 'جميع البيانات الشخصية والتفاصيل التربوية أو النفسية التي تشاركها الأسرة عبر منصة بوصلة تعامل بسرية طبية ومهنية تامة ولا تتم مشاركتها مع أي طرف ثالث.',
        },
        {
          h: '2. حماية بيانات الدفع والطلبات',
          p: 'تُستخدم بيانات الاسم ورقم الهاتف والعنوان حصرياً لتوصيل القصص والحقائب التربوية وتفعيل حسابات الكورسات التدريبية.',
        },
      ],
    },
    terms: {
      title: 'الشروط والأحكام',
      subtitle: 'ضوابط استخدام منصة بوصلة للمحتوى العلمي والكورسات التدريبية.',
      sections: [
        {
          h: '1. طبيعة المحتوى التربوي والنفسي',
          p: 'المحتوى المقدم في الكورسات والمقالات يهدف إلى التثقيف النفسي والتمكين التربوي المبني على الدليل العلمي، ولا يغني عن الفحص الإكلينيكي المباشر في الحالات الحادة.',
        },
        {
          h: '2. حقوق الملكية الفكرية',
          p: 'جميع القصص العلاجية (مثل مذكرات طفل حركي ووداعاً يليق بك) والكورسات والحقائب هي ملكية فكرية مسجلة للدكتورة ولاء حسني ومنصة بوصلة.',
        },
      ],
    },
    refund: {
      title: 'سياسة الاستبدال والاسترداد',
      subtitle: 'ضمان رضا الأسرة عن جميع كورسات وإصدارات بوصلة.',
      sections: [
        {
          h: '1. الكورسات التدريبية الرقمية',
          p: 'يمكن طلب استرداد قيمة الكورس خلال 7 أيام من الاشتراك في حال عدم مشاهدة أكثر من 20% من محتوى الكورس.',
        },
        {
          h: '2. القصص والحقائب المطبوعة',
          p: 'يحق للعميل فحص الحقيبة أو القصة عند الاستلام، واستبدالها أو استرجاعها مجاناً خلال 14 يوماً في حال وجود أي عيب طباعة.',
        },
      ],
    },
    teenSafety: {
      title: 'سياسة أمان المراهقين والأطفال',
      subtitle: 'معايير الأمان النفسي والرقمي لمحتوى الأطفال والمراهقين على منصة بوصلة.',
      sections: [
        {
          h: '1. محتوى خالٍ من الوصم أو الضغط',
          p: 'تخضع جميع مواد قسم المراهقين وقسم الأطفال لمراجعة نفسية دقيقة لضمان خلوها من أي عبارات تشعر الطفل أو المراهق بالذنب أو الوصم.',
        },
        {
          h: '2. مشاركة الوالدين',
          p: 'نشجع دائماً مشاركة أحد الوالدين في الأنشطة القصصية للأطفال مع احترام الخصوصية الآمنة للمراهقين.',
        },
      ],
    },
    parentalNotice: {
      title: 'تنبيه وإرشادات الأهل',
      subtitle: 'إرشادات هامة للأمهات والآباء لتحقيق أقصى استفادة من برامج بوصلة.',
      sections: [
        {
          h: '1. التدرج والصبر في تطبيق المهارات',
          p: 'تعديل السلوك وبناء التنظيم العاطفي لدى الطفل عملية تدريجية تحتاج إلى الثبات والهدوء والاحتواء قبل التوجيه.',
        },
        {
          h: '2. متى نطلب استشارة متخصصة؟',
          p: 'إذا لاحظتِ استمرار الأعراض بشدة تعيق الطفل عن الدراسة أو النوم أو العلاقات الاجتماعية، نوصي بحجز استشارة متخصصة عبر صفحة التواصل.',
        },
      ],
    },
  };

  const current = policies[policyType] || policies.privacy;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6">
        <div className="border-b border-slate-200 pb-5 space-y-2">
          <div className="text-xs font-extrabold text-[#0F766E]">السياسات والضوابط المعتمدة</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">{current.title}</h1>
          <p className="text-sm text-slate-700">{current.subtitle}</p>
        </div>

        <div className="space-y-6">
          {current.sections.map((sec) => (
            <div key={sec.h} className="space-y-2">
              <h2 className="text-lg font-extrabold text-[#1E3A5F]">{sec.h}</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{sec.p}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <Link to="/" className="text-xs font-bold text-[#1E3A5F] hover:underline">
            العودة إلى الصفحة الرئيسية ←
          </Link>
        </div>
      </div>
    </div>
  );
};

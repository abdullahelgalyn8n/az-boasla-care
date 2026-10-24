import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, ShoppingBag, ArrowLeft, Star, Sparkles, Brain, HeartHandshake, ShieldCheck, Layers } from 'lucide-react';
import { CourseItem, ProductItem } from '../data/boaslaData';
import { useApp } from '../context/AppContext';

const THEME_STYLES: Record<
  string,
  { headerBg: string; iconBg: string; iconColor: string; accentBorder: string; tagText: string }
> = {
  navy: {
    headerBg: 'bg-gradient-to-br from-[#EEF2F6] via-[#E2E8F0] to-[#CBD5E1]',
    iconBg: 'bg-[#1E3A5F] text-white',
    iconColor: 'text-[#1E3A5F]',
    accentBorder: 'border-[#CBD5E1]',
    tagText: 'text-[#0F2942]',
  },
  amber: {
    headerBg: 'bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]',
    iconBg: 'bg-[#B45309] text-white',
    iconColor: 'text-[#B45309]',
    accentBorder: 'border-[#FDE68A]',
    tagText: 'text-[#78350F]',
  },
  teal: {
    headerBg: 'bg-gradient-to-br from-[#F0FDFA] via-[#CCFBF1] to-[#99F6E4]',
    iconBg: 'bg-[#0F766E] text-white',
    iconColor: 'text-[#0F766E]',
    accentBorder: 'border-[#99F6E4]',
    tagText: 'text-[#115E59]',
  },
  emerald: {
    headerBg: 'bg-gradient-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]',
    iconBg: 'bg-[#047857] text-white',
    iconColor: 'text-[#047857]',
    accentBorder: 'border-[#A7F3D0]',
    tagText: 'text-[#065F46]',
  },
  rose: {
    headerBg: 'bg-gradient-to-br from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]',
    iconBg: 'bg-[#BE123C] text-white',
    iconColor: 'text-[#BE123C]',
    accentBorder: 'border-[#FECDD3]',
    tagText: 'text-[#881337]',
  },
  indigo: {
    headerBg: 'bg-gradient-to-br from-[#EEF2FF] via-[#E0E7FF] to-[#C7D2FE]',
    iconBg: 'bg-[#3730A3] text-white',
    iconColor: 'text-[#3730A3]',
    accentBorder: 'border-[#C7D2FE]',
    tagText: 'text-[#1E1B4B]',
  },
  purple: {
    headerBg: 'bg-gradient-to-br from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]',
    iconBg: 'bg-[#6B21A8] text-white',
    iconColor: 'text-[#6B21A8]',
    accentBorder: 'border-[#E9D5FF]',
    tagText: 'text-[#4C1D95]',
  },
};

export const CourseCard: React.FC<{ course: CourseItem }> = ({ course }) => {
  const { addToCart } = useApp();
  const style = THEME_STYLES[course.coverTheme] || THEME_STYLES.navy;

  const getCourseIcon = () => {
    if (course.topic === 'adhd') return <Brain className="w-8 h-8" />;
    if (course.topic === 'anxiety') return <HeartHandshake className="w-8 h-8" />;
    if (course.topic === 'anger') return <ShieldCheck className="w-8 h-8" />;
    return <Sparkles className="w-8 h-8" />;
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 hover:border-[#1E3A5F]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top Visual Header matching boaslacare.com course cards with improved contrast */}
      <div className={`relative h-48 ${style.headerBg} p-6 flex flex-col justify-between border-b ${style.accentBorder}`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-bold ${style.tagText}`}>
            {course.categoryLabel} · {course.topicLabel}
          </span>
          {course.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-[#B45309] text-white shadow-2xs whitespace-nowrap">
              <Star className="w-3 h-3 fill-white text-white" />
              <span>{course.badge}</span>
            </span>
          )}
        </div>

        {/* Center Icon Emblem */}
        <div className="my-auto flex justify-center">
          <div className={`w-16 h-16 rounded-2xl ${style.iconBg} shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
            {getCourseIcon()}
          </div>
        </div>

        {/* Bottom Metadata Row inside Header (High Contrast) */}
        <div className="flex items-center justify-between text-xs font-bold text-[#0F2942] bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200/80">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#1E3A5F]" />
            <span>{course.hoursLabel}</span>
          </span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>{course.lessonsLabel}</span>
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div>
          <div className="text-xs font-semibold text-slate-600 mb-2">
            {course.instructor} · {course.ageGroup}
          </div>
          <Link to={`/courses/${course.id}`} className="block group-hover:text-[#1E3A5F] transition-colors">
            <h3 className="text-lg font-bold text-[#0F2942] leading-snug mb-2.5 line-clamp-2">
              {course.title}
            </h3>
          </Link>
          <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
            {course.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="block text-xs font-semibold text-slate-500">السعر</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#0F2942] tabular-nums">
                {course.price} ج.م
              </span>
              {course.originalPrice && (
                <span className="text-xs text-slate-500 line-through tabular-nums">
                  {course.originalPrice} ج.م
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
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
              aria-label={`إضافة كورس ${course.title} إلى السلة`}
              className="p-2.5 rounded-xl border border-slate-300 text-[#0F2942] hover:bg-slate-100 transition-colors cursor-pointer"
              title="إضافة سريعة للسلة"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <Link
              to={`/courses/${course.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              <span>عرض التفاصيل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const { addToCart } = useApp();
  const style = THEME_STYLES[product.coverTheme] || THEME_STYLES.amber;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 hover:border-[#1E3A5F]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Studio Book / Toolkit Cover Display */}
      <div className={`relative h-56 ${style.headerBg} p-5 flex flex-col justify-between border-b ${style.accentBorder}`}>
        <div className="flex items-center justify-between gap-2 z-10">
          <span className={`text-xs font-bold ${style.tagText}`}>
            {product.categoryLabel} · {product.topicLabel}
          </span>
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#0F2942] text-white whitespace-nowrap">
              {product.badge}
            </span>
          )}
        </div>

        {/* 3D Editorial Book / Box Mockup Representation */}
        <div className="my-auto flex items-center justify-center z-10">
          <div className="relative w-44 h-28 bg-white rounded-xl shadow-md border border-slate-200 p-3 flex items-center gap-3 group-hover:-translate-y-0.5 transition-transform duration-200">
            <img
              src={product.image}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-14 h-20 object-cover rounded-lg shrink-0 border border-slate-100"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold text-[#B45309] truncate">إصدارات بوصلة</div>
              <div className="text-xs font-extrabold text-[#0F2942] line-clamp-2 leading-tight mt-0.5">
                {product.title.replace('قصة ', '').replace('حقيبة ', '')}
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                <Layers className="w-3 h-3 text-[#0F766E] shrink-0" />
                <span className="truncate">{product.ageRange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Format Bar */}
        <div className="flex items-center justify-between text-xs font-bold text-[#0F2942] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 z-10">
          <span className="flex items-center gap-1 tabular-nums">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 font-normal">({product.reviewsCount} تقييم)</span>
          </span>
          <span className="text-[#0F766E] truncate max-w-[150px]">{product.format.split('+')[0]}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div>
          <Link to={`/products/${product.slug}`} className="block group-hover:text-[#1E3A5F] transition-colors">
            <h3 className="text-lg font-bold text-[#0F2942] leading-snug mb-1.5 line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs font-semibold text-[#B45309] mb-2.5">{product.subtitle}</p>
          <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="block text-xs font-semibold text-slate-500">السعر</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#0F2942] tabular-nums">
                {product.price} ج.م
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through tabular-nums">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/products/${product.slug}`}
              className="px-3 py-2.5 rounded-xl border border-slate-300 text-[#0F2942] hover:bg-slate-100 text-xs font-bold transition-colors whitespace-nowrap"
            >
              التفاصيل
            </Link>
            <button
              type="button"
              onClick={() =>
                addToCart({
                  id: product.id,
                  itemType: 'product',
                  title: product.title,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  categoryLabel: product.categoryLabel,
                  slug: product.slug,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#0F2942] text-white text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

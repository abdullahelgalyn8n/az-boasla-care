import { CourseItem, ProductItem, ResourceItem, TopicId } from '../data/boaslaData';

export interface CartItem {
  id: string;
  itemType: 'product' | 'course';
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  categoryLabel: string;
  slug: string;
}

export interface CartSummary {
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  itemCount: number;
  qualifiesForFreeShipping: boolean;
}

export function filterCourses(
  courses: CourseItem[],
  options: {
    search?: string;
    category?: 'all' | 'parents' | 'children' | 'adolescents';
    topic?: 'all' | TopicId;
  }
): CourseItem[] {
  const searchNorm = (options.search || '').trim().toLowerCase();
  const category = options.category || 'all';
  const topic = options.topic || 'all';

  return courses.filter((course) => {
    if (category !== 'all' && course.category !== category) {
      return false;
    }
    if (topic !== 'all' && course.topic !== topic) {
      return false;
    }
    if (searchNorm) {
      const hay = `${course.title} ${course.shortDescription} ${course.topicLabel} ${course.categoryLabel}`.toLowerCase();
      if (!hay.includes(searchNorm)) {
        return false;
      }
    }
    return true;
  });
}

export function filterProducts(
  products: ProductItem[],
  options: {
    search?: string;
    category?: 'all' | ProductItem['category'];
    topic?: 'all' | TopicId;
    sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  }
): ProductItem[] {
  const searchNorm = (options.search || '').trim().toLowerCase();
  const category = options.category || 'all';
  const topic = options.topic || 'all';
  const sortBy = options.sortBy || 'featured';

  const filtered = products.filter((product) => {
    if (category !== 'all' && product.category !== category) {
      return false;
    }
    if (topic !== 'all' && product.topic !== topic) {
      return false;
    }
    if (searchNorm) {
      const hay = `${product.title} ${product.subtitle} ${product.shortDescription} ${product.topicLabel} ${product.categoryLabel}`.toLowerCase();
      if (!hay.includes(searchNorm)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
  }

  return sorted;
}

export function filterResources(
  resources: ResourceItem[],
  options: {
    search?: string;
    type?: 'all' | ResourceItem['type'];
    topic?: 'all' | TopicId;
  }
): ResourceItem[] {
  const searchNorm = (options.search || '').trim().toLowerCase();
  const type = options.type || 'all';
  const topic = options.topic || 'all';

  return resources.filter((res) => {
    if (type !== 'all' && res.type !== type) {
      return false;
    }
    if (topic !== 'all' && res.topic !== topic) {
      return false;
    }
    if (searchNorm) {
      const hay = `${res.title} ${res.summary} ${res.topicLabel} ${res.typeLabel}`.toLowerCase();
      if (!hay.includes(searchNorm)) {
        return false;
      }
    }
    return true;
  });
}

export function calculateCartSummary(items: CartItem[], promoCode?: string): CartSummary {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const hasPhysicalProduct = items.some((item) => item.itemType === 'product');
  const normalizedCode = (promoCode || '').trim().toUpperCase();

  let discountAmount = 0;
  if (normalizedCode === 'BOASLA15') {
    discountAmount = Math.round(subtotal * 0.15);
  } else if (normalizedCode === 'BOASLA10') {
    discountAmount = Math.round(subtotal * 0.1);
  }

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const qualifiesForFreeShipping = afterDiscount >= 500 || !hasPhysicalProduct;
  const shippingCost = subtotal === 0 ? 0 : qualifiesForFreeShipping ? 0 : 45;
  const total = afterDiscount + shippingCost;

  return {
    subtotal,
    discountAmount,
    shippingCost,
    total,
    itemCount,
    qualifiesForFreeShipping,
  };
}

export interface CheckoutFormInput {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
}

export function validateCheckoutForm(input: CheckoutFormInput, requiresShipping: boolean): {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutFormInput, string>>;
} {
  const errors: Partial<Record<keyof CheckoutFormInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 3) {
    errors.fullName = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل)';
  }

  const cleanPhone = (input.phone || '').replace(/\s+/g, '');
  if (!/^(?:\+?20|0)?1[0125]\d{8}$/.test(cleanPhone) && !/^\+?\d{8,15}$/.test(cleanPhone)) {
    errors.phone = 'يرجى إدخال رقم هاتف صحيح للتواصل وتأكيد الطلب';
  }

  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح لاستلام الإيصال والوصول الرقمي';
  }

  if (requiresShipping) {
    if (!input.city || input.city.trim().length < 2) {
      errors.city = 'يرجى تحديد المحافظة أو المدينة';
    }
    if (!input.address || input.address.trim().length < 6) {
      errors.address = 'يرجى كتابة العنوان بالتفصيل لتوصيل المنتجات';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

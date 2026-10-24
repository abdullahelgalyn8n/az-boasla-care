import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES, PRODUCTS, FREE_RESOURCES } from '../data/boaslaData';
import {
  filterCourses,
  filterProducts,
  filterResources,
  calculateCartSummary,
  validateCheckoutForm,
} from './catalogLogic';

test('filterCourses filters by category, topic, and search query', () => {
  const parentCourses = filterCourses(COURSES, { category: 'parents' });
  assert.equal(parentCourses.every((c) => c.category === 'parents'), true);
  assert.equal(parentCourses.length >= 4, true);

  const adhdCourses = filterCourses(COURSES, { topic: 'adhd' });
  assert.equal(adhdCourses.every((c) => c.topic === 'adhd'), true);
  assert.equal(adhdCourses.length >= 2, true);

  const searchRes = filterCourses(COURSES, { search: 'حكايات مشاعري' });
  assert.equal(searchRes.length, 1);
  assert.equal(searchRes[0].slug, 'my-feelings-stories');
});

test('filterProducts filters by category and sorts by price ascending and descending', () => {
  const storybooks = filterProducts(PRODUCTS, { category: 'storybooks' });
  assert.equal(storybooks.length, 2);

  const sortedAsc = filterProducts(PRODUCTS, { sortBy: 'price-asc' });
  assert.equal(sortedAsc[0].price <= sortedAsc[1].price, true);
  assert.equal(sortedAsc[sortedAsc.length - 1].price >= sortedAsc[0].price, true);

  const sortedDesc = filterProducts(PRODUCTS, { sortBy: 'price-desc' });
  assert.equal(sortedDesc[0].price >= sortedDesc[1].price, true);
});

test('filterResources filters by resource type and topic', () => {
  const scripts = filterResources(FREE_RESOURCES, { type: 'script' });
  assert.equal(scripts.length, 3);
  assert.equal(scripts.every((r) => r.type === 'script'), true);

  const anxietyResources = filterResources(FREE_RESOURCES, { topic: 'anxiety' });
  assert.equal(anxietyResources.every((r) => r.topic === 'anxiety'), true);
});

test('calculateCartSummary computes subtotal, promo discount, and free shipping threshold', () => {
  const summarySmall = calculateCartSummary([
    {
      id: 'prod-adhd-diary',
      itemType: 'product',
      title: 'قصة مذكرات طفل حركي',
      price: 120,
      quantity: 2,
      categoryLabel: 'القصص',
      slug: 'memoirs-of-hyperactive-child-book',
    },
  ]);
  assert.equal(summarySmall.subtotal, 240);
  assert.equal(summarySmall.shippingCost, 45);
  assert.equal(summarySmall.total, 285);
  assert.equal(summarySmall.qualifiesForFreeShipping, false);

  const summaryPromo = calculateCartSummary(
    [
      {
        id: 'prod-complete-family-bundle',
        itemType: 'product',
        title: 'الباقة الشاملة',
        price: 890,
        quantity: 1,
        categoryLabel: 'الباقات',
        slug: 'complete-boasla-family-bundle',
      },
    ],
    'BOASLA15'
  );
  assert.equal(summaryPromo.subtotal, 890);
  assert.equal(summaryPromo.discountAmount, 134);
  assert.equal(summaryPromo.shippingCost, 0);
  assert.equal(summaryPromo.total, 756);
  assert.equal(summaryPromo.qualifiesForFreeShipping, true);
});

test('validateCheckoutForm validates required Arabic customer fields accurately', () => {
  const invalid = validateCheckoutForm(
    { fullName: 'أ', phone: '123', email: 'bad-email', city: '', address: '' },
    true
  );
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.city);
  assert.ok(invalid.errors.address);

  const valid = validateCheckoutForm(
    {
      fullName: 'سارة أحمد محمود',
      phone: '01095323649',
      email: 'sara@example.com',
      city: 'القاهرة',
      address: 'شارع الثورة، مصر الجديدة، عمارة 14',
    },
    true
  );
  assert.equal(valid.valid, true);
});

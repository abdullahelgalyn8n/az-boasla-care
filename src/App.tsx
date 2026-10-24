/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ParentHubPage, ChildHubPage, AdolescentHubPage } from './pages/HubPages';
import {
  CoursesPage,
  CourseDetailPage,
  ProductsPage,
  ProductDetailPage,
} from './pages/CatalogPages';
import {
  ResourcesPage,
  ResourceDetailPage,
  WebinarsPage,
  AboutPage,
  ContactPage,
  AuthPage,
  DashboardPage,
  PolicyPage,
} from './pages/ResourcesAndSecondaryPages';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/parent-hub" element={<ParentHubPage />} />
            <Route path="/adolescent-hub" element={<AdolescentHubPage />} />
            <Route path="/child-hub" element={<ChildHubPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:id" element={<ResourceDetailPage />} />
            <Route path="/resources/articles/:id" element={<ResourceDetailPage />} />
            <Route path="/resources/scripts/:id" element={<ResourceDetailPage />} />
            <Route path="/resources/pdfs/:id" element={<ResourceDetailPage />} />
            <Route path="/resources/videos/:id" element={<ResourceDetailPage />} />
            <Route path="/webinars" element={<WebinarsPage />} />
            <Route path="/blog" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/privacy-policy" element={<PolicyPage policyType="privacy" />} />
            <Route path="/terms" element={<PolicyPage policyType="terms" />} />
            <Route path="/refund-policy" element={<PolicyPage policyType="refund" />} />
            <Route path="/teen-safety-policy" element={<PolicyPage policyType="teenSafety" />} />
            <Route path="/parental-notice" element={<PolicyPage policyType="parentalNotice" />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

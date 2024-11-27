import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
// UserPage
const User = lazy(() => import('../pages/user/User'));
const HomePage = lazy(() => import('../pages/user/HomePage'));
const ContactPage = lazy(() => import('../pages/user/ContactPage'));
const PhonePage = lazy(() => import('../pages/user/PhonePage'));
const ProductDetailPage = lazy(() => import('../pages/user/ProductDetailPage'));
const PriceListPage = lazy(() => import('../pages/user/PriceListPage'));
const PostManagerPage = lazy(() => import('../pages/admin/PostManagerPage'));

// admin
const Admin = lazy(() => import('../pages/admin/Admin'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const PhoneManager = lazy(() => import('../pages/admin/PhoneManager'));
// not found page
const NotFound = lazy(() => import('../pages/404/NotFound'));
export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* User page  */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<User />}>
            <Route index path="" element={<HomePage />} />
            <Route path="price-list" element={<PriceListPage />} />
            <Route path="phone-list" element={<PhonePage />} />
            <Route path="product-detail" element={<ProductDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<DefaultLayout />}>
          <Route path="/admin" element={<Admin />}>
            <Route index path="" element={<DashboardPage />} />
            <Route path="phone-manager" element={<PhoneManager />} />
            <Route path="post-manager" element={<PostManagerPage />} />
          </Route>
        </Route>

        {/* 404 not found */}
        <Route element={<DefaultLayout />}>
          <Route errorElement={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

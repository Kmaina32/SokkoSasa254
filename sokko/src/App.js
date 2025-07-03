import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure this line is present and correct
import MainLayout from 'shared/layouts/MainLayout.jsx'; // Corrected path
import AuthPage from 'features/auth/pages/AuthPage.jsx'; // Corrected path
import ShopPage from 'features/ecommerce/pages/ShopPage.jsx'; // Corrected path
import ProductDetailPage from 'features/ecommerce/pages/ProductDetailPage.jsx'; // Corrected path
import CartPage from 'features/ecommerce/pages/CartPage.jsx'; // Corrected path
import CheckoutPage from 'features/ecommerce/pages/CheckoutPage.jsx'; // Corrected path
import AdminDashboardPage from 'features/admin/pages/AdminDashboardPage.jsx'; // Corrected path
import VendorDashboardPage from 'features/ecommerce/pages/VendorDashboardPage.jsx'; // Corrected path
import RidesPage from 'features/rides/pages/RidesPage.jsx'; // Corrected path
import ServicesPage from 'features/services/pages/ServicesPage.jsx'; // Corrected path
import PlumbingServicePage from 'features/services/pages/PlumbingServicePage.jsx'; // Corrected path
import ProtectedRoute from 'shared/components/ProtectedRoute.jsx'; // Corrected path
import NotFoundPage from 'shared/pages/NotFoundPage.jsx'; // Corrected path

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ShopPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="rides" element={<RidesPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/plumbing" element={<PlumbingServicePage />} />
        </Route>

        {/* Protected Routes - Customer/General User */}
        <Route element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'driver', 'service_provider', 'admin']} />}>
          {/* Add more general user protected routes here if needed */}
        </Route>

        {/* Protected Routes - Vendor */}
        <Route path="/vendor" element={<ProtectedRoute allowedRoles={['vendor', 'admin']} />}>
          <Route index element={<VendorDashboardPage />} />
        </Route>

        {/* Protected Routes - Admin */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route index element={<AdminDashboardPage />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
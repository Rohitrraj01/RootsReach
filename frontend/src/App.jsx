import React, { useState } from 'react';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import AuthLayout from './components/Auth/AuthLayout';
import { Routes, Route } from 'react-router-dom';



import Navbar from "./components/dashboard/artisian-dashboard/Navbar";
import WelcomeSection from './components/dashboard/artisian-dashboard/WelcomeSection';
import { useAuth } from './components/dashboard/artisian-dashboard/context/AuthContext';
import StatsCards from './components/dashboard/artisian-dashboard/StatsCards';
import RawMaterials from './components/dashboard/artisian-dashboard/RawMaterials';
import OrdersTable from './components/dashboard/artisian-dashboard/OrdersTable';
import EarningsCard from './components/dashboard/artisian-dashboard/EarningsCard';
import ProductsCard from './components/dashboard/artisian-dashboard/ProductsCard';
import TutorialsCard from './components/dashboard/artisian-dashboard/TutorialsCard';
import SupportChat from './components/dashboard/artisian-dashboard/SupportChat';
import DistributorDashboard from './components/dashboard/distributor-dashboard/DistributorDashboard';
import AdminDashboard from './components/dashboard/admin-dashboard/AdminDashboard.tsx';
import HomeDashboard from './components/dashboard/homedashboard/index.jsx';
import BuyerDashboard from './components/dashboard/buyerdashboard/index.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Unauthorized from './components/Auth/Unauthorized';

import { AuthProvider } from './components/Auth/AuthContext';

import {
  rawMaterials,
  products,
  orders,
  tutorials,
  earningsData,
  dashboardStats,
} from './components/dashboard/artisian-dashboard/data/mockData';

function ArtisanDashboard() {
  const { user } = useAuth();
  const userName = user?.name || 'User';

  const handleOrderMore = () => {
    console.log('Order more materials clicked');
  };
  const handleSearch = () => {
    console.log('Search orders clicked');
  };
  const handleFilter = () => {
    console.log('Filter orders clicked');
  };
  const handleAddNewProduct = () => {
    console.log('Add new product clicked');
  };
  const handleEditProduct = (productId) => {
    console.log('Edit product:', productId);
  };
  const handleDeleteProduct = (productId) => {
    console.log('Delete product:', productId);
  };
  const handlePlayTutorial = (tutorialId) => {
    console.log('Play tutorial:', tutorialId);
  };
  const handleOpenChat = () => {
    console.log('Open support chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <Navbar userName={userName} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection userName={userName} />
        <StatsCards stats={dashboardStats} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <RawMaterials onOrderMore={handleOrderMore} />
            <OrdersTable orders={orders} onSearch={handleSearch} onFilter={handleFilter} />
          </div>
          {/* Right Column */}
          <div className="space-y-8">
            <EarningsCard earnings={earningsData} />
            <ProductsCard
              products={products}
              onAddNew={handleAddNewProduct}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
            <TutorialsCard tutorials={tutorials} onPlayTutorial={handlePlayTutorial} />
          </div>
        </div>
      </div>
      <SupportChat onOpenChat={handleOpenChat} />
    </div>
  );
}

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              {isSignUp ? (
                <SignUp onToggleMode={handleToggleMode} />
              ) : (
                <Login onToggleMode={handleToggleMode} />
              )}
            </AuthLayout>
          }
        />

        <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
        <Route path="/distributor-dashboard" element={<DistributorDashboard />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;

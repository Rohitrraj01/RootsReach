import React, { useState, useEffect } from 'react';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import AuthLayout from './components/Auth/AuthLayout';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "./components/dashboard/artisian-dashboard/Navbar";
import WelcomeSection from './components/dashboard/artisian-dashboard/WelcomeSection';
import { useAuth, USER_ROLES } from './components/Auth/AuthContext';
import StatsCards from './components/dashboard/artisian-dashboard/StatsCards';
import RawMaterials from './components/dashboard/artisian-dashboard/RawMaterials';
import OrdersTable from './components/dashboard/artisian-dashboard/OrdersTable';
import EarningsCard from './components/dashboard/artisian-dashboard/EarningsCard';
import ProductsCard from './components/dashboard/artisian-dashboard/ProductsCard';
import TutorialsCard from './components/dashboard/artisian-dashboard/TutorialsCard';
import SupportChat from './components/dashboard/artisian-dashboard/SupportChat';
import AIProductDescription from './components/dashboard/artisian-dashboard/AIProductDescription';
import DistributorDashboard from './components/dashboard/distributor-dashboard/DistributorDashboard';
import AdminDashboard from './components/dashboard/admin-dashboard/AdminDashboard.tsx';
import HomeDashboard from './components/dashboard/homedashboard/index.jsx';
import BuyerDashboard from './components/dashboard/buyerdashboard/index.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Unauthorized from './components/Auth/Unauthorized';

// Using AuthProvider from main.jsx

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
  const [showAIDescription, setShowAIDescription] = useState(false);

  const handleOrderMore = () => {
    console.log('Order more materials clicked');
    toast.info('Order more materials feature coming soon!');
  };
  
  const handleSearch = () => {
    console.log('Search orders clicked');
  };
  
  const handleFilter = () => {
    console.log('Filter orders clicked');
  };
  
  const handleAddNewProduct = () => {
    console.log('Add new product clicked');
    setShowAIDescription(true);
    toast.info('Use AI to generate product descriptions!');
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
  
  const handleDescriptionGenerated = (description) => {
    toast.success('Product description generated successfully!');
    console.log('Generated description:', description);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <Navbar userName={userName} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection userName={userName} />
        <StatsCards stats={dashboardStats} />
        
        {showAIDescription && (
          <AIProductDescription onDescriptionGenerated={handleDescriptionGenerated} />
        )}
        
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
      <ToastContainer position="bottom-right" />
    </div>
  );
}

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
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

      <Route 
        path="/artisan-dashboard" 
        element={
          <ProtectedRoute roles={[USER_ROLES.ARTISAN]}>
            <ArtisanDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/distributor-dashboard" 
        element={
          <ProtectedRoute roles={[USER_ROLES.DISTRIBUTOR]}>
            <DistributorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute roles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/home-dashboard" element={<HomeDashboard />} />
      <Route 
        path="/buyer-dashboard" 
        element={
          <ProtectedRoute roles={[USER_ROLES.BUYER]}>
            <BuyerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;

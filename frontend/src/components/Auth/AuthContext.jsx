import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🔐 User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  ARTISAN: 'artisan',
  DISTRIBUTOR: 'distributor',
  BUYER: 'buyer'
};

// 🏗️ Auth Context
const AuthContext = createContext(null);

// 🎯 Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // 🔄 Check Authentication Status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔑 Login Function
  const login = async (credentials) => {
    try {
      // Import here to avoid circular dependency
      const { authAPI } = await import('../../services/api');
      const data = await authAPI.login(credentials);
      
      // 📝 Store user data and token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user.id || data.user._id);
      
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // 🚪 Logout Function
  const logout = async () => {
    try {
      // Import here to avoid circular dependency
      const { authAPI } = await import('../../services/api');
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage and state even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  // 🛡️ Role Check Functions
  const hasRole = (role) => {
    return user?.role === role;
  };

  const isAdmin = () => hasRole(USER_ROLES.ADMIN);
  const isArtisan = () => hasRole(USER_ROLES.ARTISAN);
  const isDistributor = () => hasRole(USER_ROLES.DISTRIBUTOR);
  const isBuyer = () => hasRole(USER_ROLES.BUYER);

  // 🔒 Permission Check
  const canAccessRawMaterials = () => {
    return isAdmin() || isArtisan();
  };

  const canManageRawMaterials = () => {
    return isAdmin();
  };

  const canOrderRawMaterials = () => {
    return isArtisan();
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin,
    isArtisan,
    isDistributor,
    isBuyer,
    canAccessRawMaterials,
    canManageRawMaterials,
    canOrderRawMaterials,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 🎯 Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 🛡️ Higher-Order Component for Role Protection
export const withRoleProtection = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { user, loading, hasRole } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !user) {
        navigate('/admin-login');
      }
    }, [user, loading, navigate]);

    if (loading || !user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    const hasRequiredRole = allowedRoles.length === 0 || allowedRoles.some(role => hasRole(role));

    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Insufficient Permissions</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthContext;

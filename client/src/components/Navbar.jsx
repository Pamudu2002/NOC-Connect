import React, { useState, useEffect } from 'react';
import { Home, User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navItems, setNavItems] = useState([
    { name: 'Home', icon: <Home size={24} />, path: '/athletes' },
    { name: 'Profile', icon: <User size={24} />, path: '/profile' },
    { name: 'Logout', icon: <LogOut size={24} />, path: '/' }
  ]); // Initialize with default values

  const navigate = useNavigate();

  // Check if screen is mobile and fetch user role
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await api.get('/users/logged', { withCredentials: true });
        const user = response.data;
        
        if (user.role === 'admin') {
          setNavItems([
            { name: 'Home', icon: <Home size={24} />, path: '/athletes' },
            { name: 'Profile', icon: <User size={24} />, path: '/admin' },
            { name: 'Logout', icon: <LogOut size={24} />, path: '/' }
          ]);
        } else if (user.role === 'sponsor') {
          setNavItems([
            { name: 'Home', icon: <Home size={24} />, path: '/athletes' },
            { name: 'Profile', icon: <User size={24} />, path: '/sponsor' },
            { name: 'Logout', icon: <LogOut size={24} />, path: '/' }
          ]);
        } else if (user.role === 'athlete') {
          setNavItems([
            { name: 'Home', icon: <Home size={24} />, path: '/athletes' },
            { name: 'Profile', icon: <User size={24} />, path: '/player' },
            { name: 'Logout', icon: <LogOut size={24} />, path: '/' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        // Keep default navItems in case of error
      }
    };

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Execute both functions
    checkUserRole();
    checkScreenSize();
    
    // Set up event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle navigation with logout logic
  const handleNavigation = (item) => {
    if (item.name === 'Logout') {
      api.get('/users/logout', { withCredentials: true })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    } else {
      navigate(item.path);
    }
    
    // Close sidebar if it's open
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // Desktop navbar
  const DesktopNav = () => (
    <nav className="bg-gradient-to-r from-sky-900 to-sky-950 py-4 shadow-lg border-b border-sky-800 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-10 w-10 bg-sky-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">NOC</span>
          </div>
          <span className="text-xl font-bold text-white">Connect</span>
        </motion.div>
        
        {/* Navigation */}
        <div className="flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleNavigation(item)}
            >
              <div className="text-sky-300 hover:text-sky-100 transition-colors duration-300 p-2">
                {item.icon}
                
                {/* Hover tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-sky-800 text-sky-100 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  );

  // Mobile sidebar
  const MobileNav = () => (
    <>
      <nav className="bg-gradient-to-r from-sky-900 to-sky-950 py-4 shadow-lg border-b border-sky-800 fixed w-full top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-10 w-10 bg-sky-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">NOC</span>
            </div>
            <span className="text-xl font-bold text-white">Connect</span>
          </motion.div>
          
          {/* Menu Toggle Button */}
          <motion.button
            onClick={toggleSidebar}
            className="text-sky-300 p-2"
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={28} />
          </motion.button>
        </div>
      </nav>
      
      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 right-0 h-full w-64 bg-sky-950 border-l border-sky-800 shadow-xl z-50"
          >
            <div className="p-4">
              {/* Close button */}
              <div className="flex justify-end">
                <motion.button
                  onClick={toggleSidebar}
                  className="text-sky-300 p-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              {/* Logo in sidebar */}
              <div className="flex items-center space-x-2 mb-8 mt-2">
                <div className="h-10 w-10 bg-sky-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">NOC</span>
                </div>
                <span className="text-xl font-bold text-white">Connect</span>
              </div>
              
              {/* Nav Items */}
              <div className="space-y-4 mt-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleNavigation(item)}
                    className="flex items-center space-x-4 text-sky-300 hover:text-sky-100 hover:bg-sky-900 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
}

export default Navbar;
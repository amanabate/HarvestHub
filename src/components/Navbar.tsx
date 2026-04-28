import { Search, Menu, X, ChevronRight, BookOpen, PenTool, Target, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo size="lg" linkTo="/" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8" role="navigation">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Lessons</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Resources</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all"
              aria-label="Log in to your account"
            >
              Log in
            </button>
            <Link 
              to="/get-started"
              className="px-5 py-2.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm transition-all shadow-orange-200"
              aria-label="Get started with HarvestHub"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative z-[70]"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[55] md:hidden"
              aria-hidden="true"
            />
            
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-xs bg-white shadow-2xl z-[60] md:hidden pt-24"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="px-6 py-6 space-y-6">
                <a href="#" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900 border-b border-gray-50 pb-2">Home</a>
                <a href="#" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900 border-b border-gray-50 pb-2">Lessons</a>
                <a href="#" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900 border-b border-gray-50 pb-2">About</a>
                <a href="#" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900 border-b border-gray-50 pb-2">Resources</a>
                <a href="#" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900 border-b border-gray-50 pb-2">Contact</a>
                <div className="pt-8 flex flex-col gap-4">
                  <button className="w-full px-5 py-4 text-base font-semibold text-gray-900 bg-gray-50 rounded-xl">Log in</button>
                  <Link 
                    to="/get-started"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-5 py-4 text-center text-base font-semibold text-white bg-orange-600 rounded-xl shadow-lg shadow-orange-100"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

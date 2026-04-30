import { Search, Menu, X, ChevronRight, BookOpen, PenTool, Target, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-gray-200/50 shadow-sm py-2' : 'bg-transparent border-transparent py-4'
        }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo size="lg" linkTo="/" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8" role="navigation">
            {['Home', 'Lessons', 'About', 'Resources', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-semibold text-gray-600 hover:text-primary-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left pb-1"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <button
              className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-primary-600 hover:bg-orange-50 rounded-xl transition-colors"
              aria-label="Log in to your account"
            >
              Log in
            </button>
            <Link
              to="/get-started"
              className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-orange-400 hover:from-primary-700 hover:to-orange-500 rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              aria-label="Get started with HarvestHub"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-orange-50 rounded-lg relative z-[70] transition-colors"
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
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[55] md:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ x: '100%', opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: '100%', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-[60] md:hidden pt-24 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="px-6 py-6 space-y-6">
                {['Home', 'Lessons', 'About', 'Resources', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-bold text-gray-800 hover:text-primary-600 border-b border-gray-100 pb-3 transition-colors"
                  >
                    {item}
                  </a>
                ))}

                <div className="pt-8 flex flex-col gap-4">
                  <button className="w-full px-5 py-3.5 text-base font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    Log in
                  </button>
                  <Link
                    to="/get-started"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-5 py-3.5 flex justify-center items-center gap-2 text-base font-bold text-white bg-gradient-to-r from-primary-600 to-orange-400 rounded-xl shadow-lg shadow-primary-500/25 active:scale-[0.98] transition-transform"
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

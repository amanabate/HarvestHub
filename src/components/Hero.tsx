import { ChevronRight, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Equip. Engage.<br />
              <span className="text-gray-800">Reach the World.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              HarvestHub is a Bible-based evangelism platform that helps you learn, grow, and share the Gospel with confidence.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/get-started"
                className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                aria-label="Start learning now with HarvestHub"
              >
                Start Learning
                <ChevronRight size={20} aria-hidden="true" />
              </Link>
              <button 
                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                aria-label="View our available lessons"
              >
                View Lessons
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                      alt=""
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">Join thousands</span> growing<br />
                in their evangelism journey
              </p>
            </div>
          </motion.div>

          {/* Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-full min-h-[500px] lg:min-h-[700px] flex items-center justify-end"
          >
            {/* Dissolved Image Container */}
            <div 
              className="absolute inset-0 lg:-right-24 h-full w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:[mask-image:linear-gradient(to_right,transparent_10%,black_45%)]"
              aria-hidden="true"
            >
              <img
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=1200"
                alt="A supportive community gathered together outdoors"
                className="w-full h-full object-cover object-center lg:object-[right_center]"
                referrerPolicy="no-referrer"
              />
              {/* Bottom fade for feature cards integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative z-30 mr-8 bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 group hover:scale-105 transition-transform"
              aria-label="Current statistics: 12,400+ Active Learners"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shadow-inner">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs text-orange-600/70 font-semibold tracking-wider uppercase">Active Status</p>
                <p className="text-lg font-extrabold text-gray-900">12,400+ Students</p>
              </div>
            </motion.div>

            {/* Subtle decorative circles */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-[100px] -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

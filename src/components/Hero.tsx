import { ChevronRight, Users, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const verses = [
  { text: "Go into all the world and preach the gospel to all creation.", ref: "Mark 16:15" },
  { text: "How beautiful are the feet of those who bring good news!", ref: "Romans 10:15" },
  { text: "You will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.", ref: "Acts 1:8" },
  { text: "For I am not ashamed of the gospel, because it is the power of God that brings salvation.", ref: "Romans 1:16" },
  { text: "The harvest is plentiful but the workers are few. Ask the Lord of the harvest to send out workers.", ref: "Matthew 9:37–38" },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % verses.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Equip. Engage.<br />
              <span className="text-gradient-primary">Reach the World.</span>
            </h1>

            {/* Animated Bible Verse */}
            <div className="relative h-24 mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed italic max-w-lg">
                    "{verses[index].text}"
                  </p>
                  <span className="text-sm font-bold text-orange-600 mt-1 block">
                    — {verses[index].ref}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Verse indicator dots */}
            <div className="flex gap-1.5 mb-8">
              {verses.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-orange-500' : 'w-1.5 bg-gray-300'}`}
                />
              ))}
            </div>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
              LightShare is a Bible-based evangelism platform that helps you learn, grow, and share the Gospel with absolute confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/get-started"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-orange-400 text-white rounded-xl font-bold hover:shadow-[0_8px_30px_rgb(240,70,0,0.3)] transition-all duration-300 hover:-translate-y-1"
                aria-label="Start learning now with HarvestHub"
              >
                Start Learning For Free
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <button
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md text-gray-900 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                aria-label="View our available lessons"
              >
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Play size={12} className="text-gray-900 translate-x-[1px]" />
                </div>
                View Lessons
              </button>
            </div>

          </motion.div>

          {/* Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full min-h-[500px] lg:min-h-[700px] flex items-center justify-end"
          >
            {/* Dissolved Image Container */}
            <div
              className="absolute inset-0 lg:-right-24 h-full w-full overflow-hidden rounded-[2.5rem] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] lg:[mask-image:linear-gradient(to_left,black_60%,transparent_100%)] shadow-2xl"
              aria-hidden="true"
            >
              <img
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=1200"
                alt="A supportive community gathered together outdoors"
                className="w-full h-full object-cover object-center lg:object-[right_center] hover:scale-105 transition-transform duration-[10s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-transparent to-transparent mix-blend-overlay" />
            </div>

            {/* Subtle decorative circles */}
            <div className="absolute top-1/4 -right-10 w-48 h-48 bg-primary-400/20 rounded-full blur-[80px] -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

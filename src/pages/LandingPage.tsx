import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, BookOpen, PenTool, Users, Shield,
  MessageCircle, Globe, ArrowRight, Star, CheckCircle
} from 'lucide-react';

const topics = [
  "Waaqayoo Eenyu?", "Yesuus Eenyu", "Karaa fayyinaa",
  "Macaafa Qulqulluu", "Muhaammad", "Qur'aana",
  "Dubartoota fi Islaamummaa", "Shororkeessummaa", "Deebilee Keenya",
];

const features = [
  {
    icon: <BookOpen size={22} />,
    title: "Bible-Centered Lessons",
    description: "Deep, scripture-rooted teachings that equip you to share the Gospel with clarity and confidence.",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "Thoughtful Responses",
    description: "Carefully crafted answers to the most common questions and objections from Muslim friends.",
  },
  {
    icon: <PenTool size={22} />,
    title: "Personal Notes",
    description: "Take notes as you study. Your insights are saved per lesson so you can revisit them anytime.",
  },
  {
    icon: <Shield size={22} />,
    title: "Grounded in Truth",
    description: "Every lesson is rooted in the authority of Scripture and historical Christian theology.",
  },
  {
    icon: <Globe size={22} />,
    title: "Afaan Oromo Content",
    description: "All teachings are written in Afaan Oromo, making them accessible to your community.",
  },
  {
    icon: <Users size={22} />,
    title: "For Every Believer",
    description: "Whether you're new to evangelism or experienced, HarvestHub meets you where you are.",
  },
];

const stats = [
  { value: "15+", label: "Topic Categories" },
  { value: "100+", label: "Lessons Available" },
  { value: "Afaan Oromo", label: "Primary Language" },
  { value: "Free", label: "Always & Forever" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-b from-orange-50/60 to-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50/60 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-6">
              <Star size={14} className="fill-orange-500 text-orange-500" />
              Bible-Based Evangelism Platform
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Equip. Engage.<br />
              <span className="text-orange-600">Reach the World.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              HarvestHub helps you learn, grow, and share the Gospel with confidence — with deep lessons in Afaan Oromo designed for reaching Muslim communities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/get-started"
                className="flex items-center gap-2 px-7 py-3.5 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 text-sm"
              >
                Start Learning
                <ChevronRight size={18} />
              </Link>
              <a
                href="#topics"
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-gray-800 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm"
              >
                Browse Topics
              </a>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                <p className="text-2xl font-bold text-orange-600 mb-1">{s.value}</p>
                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-widest mb-3">What You'll Learn</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Topics Covered</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Explore a wide range of subjects — from the nature of God to responding to Islamic objections.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/get-started"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-orange-700 rounded-xl text-sm font-medium transition-all"
                >
                  <BookOpen size={14} className="text-orange-500" />
                  {topic}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Built to help you study deeply, respond wisely, and share boldly.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-orange-100 transition-all"
              >
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HarvestHub */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-widest mb-3">Why HarvestHub</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                Prepared to Share.<br />Confident to Engage.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Many believers want to share their faith with Muslim friends but don't know where to start. HarvestHub gives you the knowledge, tools, and confidence to have meaningful, respectful conversations rooted in Scripture.
              </p>
              <ul className="space-y-3">
                {[
                  "Understand Islamic beliefs and how to respond biblically",
                  "Learn from structured lessons organized by topic",
                  "Take personal notes and track your growth",
                  "Access all content free, anytime, in Afaan Oromo",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-8 border border-orange-100">
                <div className="space-y-4">
                  {[
                    { label: "Waaqayoo Eenyu?", count: "4 lessons" },
                    { label: "Yesuus Eenyu", count: "6 lessons" },
                    { label: "Muhaammad", count: "8 lessons" },
                    { label: "Shororkeessummaa", count: "13 lessons" },
                    { label: "Dhuga Ba'iinsota", count: "15 lessons" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                          <BookOpen size={14} className="text-orange-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                      </div>
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">{item.count}</span>
                    </div>
                  ))}
                  <Link
                    to="/get-started"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl transition-all mt-2"
                  >
                    View All Topics
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-orange-100 text-lg mb-8 leading-relaxed">
              Join thousands of believers growing in their evangelism journey. All lessons are free and available in Afaan Oromo.
            </p>
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg text-sm"
            >
              Get Started — It's Free
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" linkTo="/" />
          </div>
          <p className="text-sm text-center">Bible-based evangelism platform · Afaan Oromo · Free forever</p>
          <p className="text-sm">© {new Date().getFullYear()} LightShare</p>
        </div>
      </footer>
    </div>
  );
}

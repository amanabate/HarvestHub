import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Hero from '../components/Hero';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  ChevronRight, BookOpen, Users, Shield,
  MessageCircle, Globe, ArrowRight, CheckCircle, Send, Star, Loader2
} from 'lucide-react';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';
const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || '';

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setError('');
    try {
      // Send notification to you
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      // Send auto-reply to the sender
      if (EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_AUTOREPLY_TEMPLATE_ID,
          formRef.current,
          { publicKey: EMAILJS_PUBLIC_KEY }
        );
      }
      setSent(true);
      formRef.current.reset();
    } catch (err: any) {
      setError(err?.text || err?.message || 'Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-4">
          <CheckCircle size={28} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Message Sent!</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Thank you for sharing your idea. We'll get back to you soon.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-5 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Your Name</label>
          <input
            type="text"
            name="from_name"
            required
            placeholder="Amanuel Abate"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition placeholder-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Email Address</label>
          <input
            type="email"
            name="from_email"
            required
            placeholder="amanuelabate@gmail.com"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition placeholder-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Your Message or Idea</label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Share your idea, question, or suggestion..."
          className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 transition placeholder-gray-400 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full flex items-center justify-center gap-2 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-100"
      >
        {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

const topics = [
  "Waaqayoo Eenyu?", "Yesuus Eenyu", "Karaa fayyinaa",
  "Macaafa Qulqulluu", "Muhaammad", "Qur'aana",
  "Dubartoota fi Islaamummaa", "Shororkeessummaa", "Deebilee Keenya",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-primary-200 selection:text-primary-900 overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Hero */}
      <section id="topics" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-3"
            >
              Curriculum Overview
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6"
            >
              Explore Our Topics
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500"
            >
              A comprehensive guide covering a wide range of subjects — from the nature of God to responding to Islamic objections with grace.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-4">
            {topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 100 }}
              >
                <Link
                  to="/get-started"
                  className="flex items-center gap-2 px-3 py-2 sm:px-6 sm:py-3.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary-200 text-gray-700 hover:text-primary-700 rounded-full text-xs sm:text-sm font-semibold transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] group w-full justify-center"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors shrink-0">
                    <BookOpen size={10} className="text-gray-500 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <span className="truncate">{topic}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent absolute bottom-0 left-0 right-0 w-full" />
      </section>

      {/* Features */}
      <section id="about" className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-3">The Mission</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Prepared to Share.<br />
                <span className="text-gradient">Confident to Engage.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
                Many believers want to share their faith with Muslim friends but don't know where to start. HarvestHub provides the knowledge, tools, and confidence to have meaningful, respectful discussions rooted in truth.
              </p>
              <ul className="space-y-4">
                {[
                  "Grasp Islamic beliefs and how to respond biblically",
                  "Learn from expertly crafted, structured lessons",
                  "Take personal notes and monitor your spiritual growth",
                  "Access premium content 100% free, localized in Afaan Oromo",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 border border-green-200/50">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary-100 to-orange-50 rounded-[3rem] transform rotate-3 scale-105 opacity-50 blur-lg -z-10" />
              <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-gray-100/80 dark:border-gray-700 shadow-[0_8px_40px_rgb(0,0,0,0.06)]">
                <div className="space-y-4">
                  {[
                    { label: "Waaqayoo Eenyu?", count: "4 lessons" },
                    { label: "Yesuus Eenyu", count: "6 lessons" },
                    { label: "Muhaammad", count: "8 lessons" },
                    { label: "Shororkeessummaa", count: "13 lessons" },
                    { label: "Dhuga Ba'iinsota", count: "15 lessons" },
                  ].map((item, i) => (
                    <div key={i} className="group flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 rounded-2xl px-5 py-4 border border-gray-100 dark:border-gray-700 hover:border-primary-100 hover:shadow-sm transition-all duration-300 cursor-default">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-gray-700 group-hover:bg-primary-50 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-600 group-hover:border-primary-100 transition-colors">
                          <BookOpen size={18} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                        <span className="text-base font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-700 transition-colors">{item.label}</span>
                      </div>
                      <span className="text-xs font-bold text-primary-600 bg-primary-50 dark:bg-orange-900/30 px-3 py-1.5 rounded-full border border-primary-100/50">{item.count}</span>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Link
                      to="/get-started"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white text-sm font-bold rounded-2xl transition-all shadow-md active:scale-[0.98]"
                    >
                      View All Free Topics
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact / Share Your Idea */}
      <section id="contact" className="py-28 bg-gray-50 relative border-t border-gray-200/50">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-100/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-3">Get in Touch</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                Share Your Idea<br />or Question
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10 font-medium">
                Have a lesson idea, a question about the content, or want to contribute? We'd love to hear from you. Every voice matters in building this community.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <MessageCircle size={20} />, label: "Share a lesson idea or topic suggestion" },
                  { icon: <BookOpen size={20} />, label: "Report an error or suggest a correction" },
                  { icon: <Users size={20} />, label: "Ask a question about the teachings" },
                  { icon: <Globe size={20} />, label: "Collaborate or contribute localized content" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-500 shrink-0 shadow-sm border border-gray-100 group-hover:border-primary-200 group-hover:bg-primary-50 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-base font-bold text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 text-xl md:text-2xl mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
              "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19
            </p>
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-primary-600 to-orange-400 border border-primary-500/50 text-white rounded-2xl font-bold hover:shadow-[0_8px_40px_rgb(240,70,0,0.4)] transition-all duration-300 hover:-translate-y-1 group"
            >
              Get Started — It's Free
              <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <Logo size="sm" linkTo="/" />
          </div>
          <p className="text-sm font-medium text-center">Bible-based evangelism platform · Afaan Oromo · Free forever</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-bold hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="text-sm font-bold hover:text-gray-300 transition-colors">Terms</a>
            <p className="text-sm ml-4">© {new Date().getFullYear()} LightShare</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

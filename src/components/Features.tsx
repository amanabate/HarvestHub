import { BookOpen, MessageCircle, PenTool, Shield, Globe, Users } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Bible-Centered Lessons",
    description: "Deep, scripture-rooted teachings that equip you to share the Gospel with clarity and confidence.",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Thoughtful Responses",
    description: "Carefully crafted answers to the most common questions and objections from Muslim friends.",
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Personal Notes",
    description: "Take notes as you study. Your insights are saved per lesson so you can revisit them anytime.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Grounded in Truth",
    description: "Every lesson is rooted in the authority of Scripture and historical Christian theology.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Afaan Oromo Content",
    description: "All teachings are written in Afaan Oromo, making them highly accessible to your community.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "For Every Believer",
    description: "Whether you're new to evangelism or experienced, HarvestHub meets you exactly where you are.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" aria-label="Platform Features">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-3"
          >
            Platform Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500"
          >
            Built to help you study deeply, respond wisely, and share boldly with minimal friction.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-50/0 group-hover:from-primary-50/50 group-hover:to-orange-50/50 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-primary-50 group-hover:to-orange-100 rounded-2xl flex items-center justify-center text-gray-600 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300 mb-6 shadow-sm border border-gray-200/50 group-hover:border-primary-200/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base font-medium">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

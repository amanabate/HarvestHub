import { BookOpen, PenTool, Users } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-orange-600" />,
    title: "Bible-Centered Lessons",
    description: "Learn the truth of God's Word and its power in evangelism."
  },
  {
    icon: <PenTool className="w-10 h-10 text-orange-600" />,
    title: "Reflect & Take Notes",
    description: "Write your insights and grow deeper in your understanding."
  },
  {
    icon: <Users className="w-10 h-10 text-orange-600" />,
    title: "Live Out the Mission",
    description: "Put your faith into action and make an eternal impact."
  }
];

const Features = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 -mt-16 pb-20 z-20" aria-label="Key Features">
      <ul className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 list-none p-0">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group p-8 bg-white border border-gray-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1"
          >
            <div 
              className="mb-6 inline-flex p-4 bg-orange-50 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300"
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-500 leading-relaxed">{feature.description}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Features;

import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

export default function Logo({ size = 'md', linkTo = '/' }: Props) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 22 : 18;
  const textClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const content = (
    <div className="flex items-center gap-2.5 group">
      <div className={`${size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'} bg-gradient-to-br from-primary-600 to-orange-400 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:-translate-y-0.5`}>
        <BookOpen size={iconSize} className="text-white" />
      </div>
      <span className={`${textClass} font-extrabold text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors`}>LightShare</span>
    </div>
  );

  return linkTo ? <Link to={linkTo} className="focus:outline-none">{content}</Link> : content;
}

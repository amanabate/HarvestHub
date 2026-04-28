import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

export default function Logo({ size = 'md', linkTo = '/' }: Props) {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const textClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-base';

  const content = (
    <div className="flex items-center gap-2">
      <div className={`${size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-9 h-9' : 'w-7 h-7'} bg-orange-600 rounded-lg flex items-center justify-center shrink-0`}>
        <BookOpen size={iconSize} className="text-white" />
      </div>
      <span className={`${textClass} font-bold text-gray-900 tracking-tight`}>LightShare</span>
    </div>
  );

  return linkTo ? <Link to={linkTo}>{content}</Link> : content;
}

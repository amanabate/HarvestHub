import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import lessonSlugs from '../content/lessonSlugs';
import { ChevronLeft } from 'lucide-react';

interface Props {
  slug: string;
  onBack: () => void;
}

export default function LessonContent({ slug, onBack }: Props) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const filename = lessonSlugs[slug];
    if (!filename) { setError(true); return; }

    fetch(`/content/teachings/${filename}`)
      .then(res => { if (!res.ok) throw new Error(); return res.text(); })
      .then(setContent)
      .catch(() => setError(true));
  }, [slug]);

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 mb-6 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to lessons
      </button>

      {error && (
        <p className="text-gray-400 text-center py-20">Content not found.</p>
      )}

      {!content && !error && (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
        </div>
      )}

      {content && (
        <>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-8 lg:px-10 lg:py-10">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-snug border-b border-gray-100 pb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold text-orange-600 mt-8 mb-3 leading-snug">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold text-gray-800 mt-6 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-orange-300 pl-4 my-5 text-gray-600 italic bg-orange-50 py-2 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700 text-[15px] leading-relaxed mb-1">{children}</li>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 mt-6 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to lessons
          </button>
        </>
      )}
    </div>
  );
}

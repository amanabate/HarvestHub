import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import lessonSlugs from '../content/lessonSlugs';

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
        className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 mb-8 transition-colors"
      >
        ← Back to lessons
      </button>

      {error && (
        <p className="text-gray-400 text-center py-20">Content not found.</p>
      )}

      {!content && !error && (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin" />
        </div>
      )}

      {content && (
        <>
          <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm px-8 py-10 lg:px-16 lg:py-14">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-8 leading-snug">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold text-orange-600 mt-10 mb-4 leading-snug">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-5 text-base">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-orange-300 pl-5 my-6 text-gray-600 italic">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900">{children}</strong>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 mt-8 transition-colors"
          >
            ← Back to lessons
          </button>
        </>
      )}
    </div>
  );
}

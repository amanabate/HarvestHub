import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Menu, 
  X, 
  Book, 
  User, 
  Users,
  MessageCircle, 
  ShieldAlert, 
  BookOpen, 
  HelpCircle, 
  Info, 
  FileText,
  Search,
  StickyNote,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const sidebarItems = [
  { label: "Barreeffamoota Haarawa", icon: <FileText size={20} /> },
  { label: "Waaqayoo Eenyu?", icon: <HelpCircle size={20} /> },
  { label: "Yesuus Eenyu", icon: <User size={20} /> },
  { label: "Karaa fayyinaa", icon: <Info size={20} /> },
  { label: "Macaafa Qulqulluu", icon: <Book size={20} /> },
  { label: "Muhaammad", icon: <User size={20} /> },
  { label: "Qur’aana", icon: <BookOpen size={20} /> },
  { label: "Dubartoota fi Islaamummaa", icon: <Users size={20} /> },
  { label: "Shororkeessummaa", icon: <ShieldAlert size={20} /> },
  { label: "Deebilee Keenya", icon: <MessageCircle size={20} /> },
  { label: "Dhuga Ba’iinsota", icon: <FileText size={20} /> },
  { label: "Eenyummaa keenya", icon: <Info size={20} /> },
  { label: "Kristiyaanotaaf", icon: <BookOpen size={20} /> },
  { label: "Kitaabota", icon: <Book size={20} /> },
];

type Note = { id: string; text: string; createdAt: string };
type NotesMap = Record<string, Note[]>;

export default function GetStarted() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Barreeffamoota Haarawa");
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<NotesMap>(() => {
    try {
      return JSON.parse(localStorage.getItem('harvesthub-notes') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('harvesthub-notes', JSON.stringify(notes));
  }, [notes]);

  const activeNotes = notes[activeItem] || [];

  const addNote = () => {
    const trimmed = noteInput.trim();
    if (!trimmed) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: trimmed,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setNotes(prev => ({ ...prev, [activeItem]: [newNote, ...(prev[activeItem] || [])] }));
    setNoteInput('');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => ({ ...prev, [activeItem]: (prev[activeItem] || []).filter(n => n.id !== id) }));
  };

  const getActiveContent = () => {
    if (activeItem === "Waaqayoo Eenyu?") {
      return [
        {
          title: "Barreessaan Qur’aanaa Waa’ee Barsiis Kiristiyaanaa Hubannoo Dogoggoraa Qabaachaa Ture",
          description: "An in-depth analysis of the Quranic perspective on Christian teachings and potential misunderstandings.",
          readTime: "12 min read"
        },
        {
          title: "Sadan-tokko/Sillaasee",
          description: "Understanding the doctrine of the Trinity: Three persons in one God, a fundamental Christian belief.",
          readTime: "18 min read"
        },
        {
          title: "Yesus, Ilma Waaqayyoo",
          description: "Exploring the divinity of Jesus Christ and what it means for Him to be called the Son of God.",
          readTime: "15 min read"
        },
        {
          title: "Hafuurri Qulqulluun Yaahiwweedha",
          description: "The personhood and deity of the Holy Spirit as Yahweh in biblical theology.",
          readTime: "10 min read"
        }
      ];
    }
    // Default mockup content
    return [1, 2, 3].map(i => ({
      title: activeItem,
      description: `Dive deep into the theological and practical implications of ${activeItem}. This section provides a comprehensive overview, supported by cross-references and historical data to strengthen your understanding...`,
      readTime: "15 min read"
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0 overflow-y-auto shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 text-orange-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">እውነት ለሁሉ</span>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeItem === item.label 
                    ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-100" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={activeItem === item.label ? "text-orange-600" : "text-gray-400"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-50">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors w-full px-4 py-2 hover:bg-gray-50 rounded-lg"
          >
            <ChevronLeft size={18} />
            Back to Home
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 text-orange-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          </div>
          <span className="text-lg font-bold">እውነት ለሁሉ</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-0 pt-16 lg:pt-0">
        <div className="max-w-5xl mx-auto px-6 py-10 lg:py-16">
          <header className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{activeItem}</h2>

          </header>

          <div className="grid gap-6">
            {getActiveContent().map((content, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {content.title}
                  </h3>
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600 transition-all">
                    <BookOpen size={24} />
                  </div>
                </div>
                <button className="mt-4 text-orange-600 font-bold text-sm tracking-tight flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start Lesson
                    <ChevronLeft size={16} className="rotate-180" />
                  </button>
              </motion.div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="mt-10">
            <button
              onClick={() => setNotesOpen(o => !o)}
              className="w-full flex items-center justify-between px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-xl text-orange-600">
                  <StickyNote size={20} />
                </div>
                <span className="font-bold text-gray-900">My Notes</span>
                {activeNotes.length > 0 && (
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {activeNotes.length}
                  </span>
                )}
              </div>
              {notesOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>

            <AnimatePresence>
              {notesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
                    {/* Input */}
                    <div className="flex gap-3">
                      <textarea
                        value={noteInput}
                        onChange={e => setNoteInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
                        placeholder="Write a note for this lesson..."
                        rows={2}
                        className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                      />
                      <button
                        onClick={addNote}
                        disabled={!noteInput.trim()}
                        className="self-end flex items-center gap-1.5 px-4 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-all"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>

                    {/* Notes List */}
                    {activeNotes.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No notes yet for this lesson. Add one above!</p>
                    ) : (
                      <div className="space-y-3">
                        {activeNotes.map(note => (
                          <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-start gap-3 p-4 bg-orange-50/60 border border-orange-100 rounded-xl group"
                          >
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{note.text}</p>
                              <p className="text-xs text-gray-400 mt-1">{note.createdAt}</p>
                            </div>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              aria-label="Delete note"
                            >
                              <Trash2 size={15} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-md z-[50]"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-white z-[60] shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 text-orange-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                  </div>
                  <span className="text-xl font-bold tracking-tight">እውነት ለሁሉ</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveItem(item.label);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-base font-semibold transition-all ${
                      activeItem === item.label 
                        ? "bg-orange-50 text-orange-600" 
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className={activeItem === item.label ? "text-orange-600" : "text-gray-400"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-12 pt-8 border-t border-gray-50">
                <button 
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold text-gray-600 bg-gray-50 rounded-2xl"
                >
                  <ChevronLeft size={20} />
                  Back to Home
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

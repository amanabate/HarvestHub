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
  StickyNote,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  PenTool
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonContent from '../components/LessonContent';
import Logo from '../components/Logo';

const sidebarItems = [
  { label: "Barreeffamoota Haarawa", icon: <FileText size={20} /> },
  { label: "Waaqayoo Eenyu?", icon: <HelpCircle size={20} /> },
  { label: "Yesuus Eenyu", icon: <User size={20} /> },
  { label: "Karaa fayyinaa", icon: <Info size={20} /> },
  { label: "Macaafa Qulqulluu", icon: <Book size={20} /> },
  { label: "Muhaammad", icon: <User size={20} /> },
  { label: "Qur'aana", icon: <BookOpen size={20} /> },
  { label: "Dubartoota fi Islaamummaa", icon: <Users size={20} /> },
  { label: "Shororkeessummaa", icon: <ShieldAlert size={20} /> },
  { label: "Deebilee Keenya", icon: <MessageCircle size={20} /> },
  { label: "Dhuga Ba'iinsota", icon: <FileText size={20} /> },
  { label: "Eenyummaa keenya", icon: <Info size={20} /> },
  { label: "Kristiyaanotaaf", icon: <BookOpen size={20} /> },
  { label: "Kitaabota", icon: <Book size={20} /> },
  { label: "Wantoota Hubachuu Qabnu", icon: <BookOpen size={20} /> },
];

// Map card titles to their markdown slugs (defined in src/content/lessonSlugs.ts)
const cardSlugMap: Record<string, string> = {
  "Barreessaan Qur'aanaa Waa'ee Barsiis Kiristiyaanaa Hubannoo Dogoggoraa Qabaachaa Ture": "quran-author-misunderstanding",
  "Sadan-tokko/Sillaasee": "trinity",
  "Yesus, Ilma Waaqayyoo": "son-of-god",
  "Yesus Kristos Waaqa ta'uu isaa dubbateera?": "yesus-waaqa-dubbateera",
  '"Ani Waaqayyodha na Waaqessaa" Jedhanii Dubbachuun Waaqummaa kan Mirkaneessudha?': 'ani-waaqayyodha',
  "Islaamummaa fi Fannifamuu Masihiichaa": "islaamummaa-fannifamuu",
  "Kaliimatullaah – Maqaa Waaqummaa Yesuus Mirkaneessu": "kaliimatullaah",
  "Ruhuullaah – Maqaa kan Biroo Waaqummaa Yesuus Mirkaneessu": "ruhuullaah",
  "Waaqayyo Dhugaa Tokkichi Yesusin kan Dhile dhaa?": "waaqayyo-yesusin-dhile",
  "Balballi Jannataa Banameera!": "balballi-jannataa",
  "Maaliif Kristaanummaa Qofti Amantaa Sirrii Ta'e?": "maaliif-kristaanummaa",
  "Macaafni Qulqulluun Sagalee Waaqayyooti?": "macaafni-sagalee",
  "Deebilee Amansiisoo": "deebilee-amansiisoo",
  "Macaafa Qulqulluu – Kitaaba Ajaa'ibsiisaa": "macaafa-kitaaba",
  "Rakkina Islaamummaa": "rakkina-islaamummaa",
  "Tawuraatii fi Injiliin Kitaaba Qulqulluudha?": "tawuraatii-injiliin",
  "Nabiyyummaa Muhaammad kan hin Fudhanneef Sababaawwan 12": "nabiyyummaa-12",
  '"Wangeelli Barnaabaas" Wangeela Dhugaa ti?': "wangeelli-barnaabaas",
  "Muhammadii fi Phaawulos Qulqullicha": "muhammadii-phaawulos",
  "Musee fi Muhammad kan ittiin wal hin fakkaanne qabxiiwwan Shantama": "musee-muhammad",
  "Muhammad Ergamaa Rabbii moo kan Sheeyxaanaa": "muhammad-ergamaa",
  "Sheeyxana Funyaan Musliimotaa Keessa Jiraatu": "sheeyxana-funyaan",
  "Haalli Du'aatii Muhammad Nabiyyii Sobaa Ta'uu Isaa Mirkaneessa": "haalli-duaatii",
  "Qamaleen Dhagaan Rukutamuun Ajjeefamte!": "qamaleen",
  "Qur'aanni Sirriitti Eeggameeraa?": "quraanni-eeggameeraa",
  "Miidhaginni Dhugaatti Ulaagaa Ta'uu Mala?": "miidhaginni",
  "Qur'aana Keessaa kan Badan Keyyatoota 213!": "keyyatoota-213",
  "Dogoggoroota Seenaa kan Qur'aana Keessatti Argaman": "dogoggoroota-seenaa",
  "Haalli Qur'aana Haafsi Ittiin Filatame Mormii Kaasuu Isaa": "haalli-quraana-haafsi",
  "Moggaasa Boqonnaawwan Qur'aanaa": "moggaasa-boqonnaawwan",
  "Qur'aana Keessaa Jechoota Walfaallessan": "jechoota-walfaallessan",
  "Dubartootaa Qur'ana, Haadisaa fi Macaafa Qulqulluu keessatti": "dubartootaa-quraana",
  "Amantaa Islaamummaa keessatti  Ragaa Ba'uu Dubartootaa": "ragaa-dubartootaa",
  "Muhammad Umurii Heerumaaf kan hin Geenye Ayishaa Fuudhuu Isaa": "ayishaa",
  "Muhammadii fi Dubartii Gurraattii": "dubartii-gurraattii",
  "Islaamummaan Amantaa Nagayaatii?": "islaamummaa-nagayaa",
  "ISIS Islaamummaa Dhugaatii?": "isis",
  "Wahaabiizimii Itiyoophiyaa keessatti": "wahaabiizimii",
  "Muhammad Gara-jabina Yihuudotarratti Raawwate": "muhammad-yihuudota",
  "Waadaa Zimmaa": "waadaa-zimmaa",
  "Giddu-gala Kiristiyaanaa kan Durii Irratti Weeyrara Musliimonni Gaggeessan": "giddu-gala-kiristiyaanaa",
  "Jihaadota Fashalaa'an": "jihaadota-fashalaan",
  "Jihaad Bifa Haarawaан": "jihaad-haarawa",
  "Hayyoota Shororkeesummaa": "hayyoota-shororkeesummaa",
  "Bara 1979 – Hokkaara idil addunyaafi taateewwan sadan": "bara-1979",
  'Shira Seenaa "Al-Najaashii" Duuba Jiru': "al-najaashii",
  "Ahimad Bitaatticha Maaf Leellisu?": "ahimad-bitaatticha",
  "Jihaad Itiyoophiyaa Keessatti Jaarraa 19ffaa Asitti": "jihaad-itiyoophiyaa",
  "Kiristiyaanoti Summii akka Dhuganiif Ajajamaniiruu?": "summii",
  "Macaafa Qulqulluu Keessati Dogoggorawwan Kuma Shantamni jiru?": "dogoggorawwan-kuma",
  "Soba Ahimad Diidaa": "soba-ahimad",
  "Kaa'ibaa – Waaqa Tolfamaa Islaamummaa!": "kaabaa",
  "Seensa": "dhuga-seensa",
  "Boqonnaa 1 – Humnaa fi Jaalala Waaqayyoo": "dhuga-boq1",
  "Boqonnaa 2 – Jireenya Muhaammad": "dhuga-boq2",
  "Boqonnaa 3 – Seenaa Gabaabaa Islaamummaa": "dhuga-boq3",
  "Boqonnaa 4 – Seenaa Islaamummaa Afrikaa Keessatti": "dhuga-boq4",
  "Boqonnaa 5 – Utubaalee Islaamummaa Shanan": "dhuga-boq5",
  "Boqonnaa 6 – Amantaalee Islaamummaan Yaada Irraa Waraabbate": "dhuga-boq6",
  "Boqonnaa 7 – Garaagarummaawwan Islaamummaa Keessatti Argaman": "dhuga-boq7",
  "Boqonnaa 8 – Qur'aana": "dhuga-boq8",
  "Boqonnaa 9 – Aadafi Seerota Musliimotaa": "dhuga-boq9",
  "Boqonnaa 10 – Aadafi Ilaalcha Musliimotaa": "dhuga-boq10",
  "Boqonnaa 11 – Dubartoota Islaamummaa Keessatti": "dhuga-boq11",
  "Boqonnaa 12 – Musliimonni Warra Musliima Hintaane Akkamitti Ilaalu?": "dhuga-boq12",
  "Boqonnaa 13 – Musliimotaaf Akkamitti Ragaa Baana?": "dhuga-boq13",
  "Hiika Jechootaa/Glossary": "dhuga-glossary",
  "SEENSA": "wanto-seensa",
  "BOQONNAA 1 – Deebii Jaalalaan Kennuu": "wanto-boq1",
  "BOQONNAA 2 – Kaayyoo Islaamummaan Afrikaa Irratti Qabu Hubachuu": "wanto-boq2",
  "BOQONNAA 3 – Waldaan Gutuu Addunyaa Kiristiyaanota Biyyoota Musliimni Itti Baay'atu Keessa Jiraatan Gargaaruu Kan Dandeessu Akkamitti?": "wanto-boq3",
  "BOQONNAA 4 – Biyyoota Islaama Hintaane Islaamessuuu": "wanto-boq4",
  "BOQONNAA 5 – Tooftaawwan Baramoo Islaamaa Biyyoota Afrikaa Musliima Hin Ta'in Keessatti": "wanto-boq5",
  "BOQONNAA 6 – Bu'uurota Kiristiyaanummaa Marii'annoodhaf hin Dhiyaanne": "wanto-boq6",
  "BOQONNAA 7 – Amantoonni Hundinuu Wangeelaa Labsuu fi Tajaajiluu ni Danda'u": "wanto-boq7",
  "BOQONNAA 8 – Yaa'ii Jamaa fi Falmii": "wanto-boq8",
  "BOQONNAA 9 – Yaadota Mormisiisoo Wangeela Labsu Keessatti Argaman": "wanto-boq9",
  "BOQONNAA 10 – Marii Amantaalee Gara Garaa Gidduutti Adeemsifamu": "wanto-boq10",
  "BOQONNAA 11 – Jijjirama Fiduuf Waaqayyo Kan Isin Fayyadamuu Danda'u Haala Kamiini? (Kutaa-1)": "wanto-boq11",
  "BOQONNAA 12 – Jijjirama Fiduuf Waaqayyo Kan Isin Fayyadamuu Danda'u Haala Kamiini? (Kutaa-2)": "wanto-boq12",
};

type Note = { id: string; text: string; createdAt: string };
type NotesMap = Record<string, Note[]>;

export default function GetStarted() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Barreeffamoota Haarawa");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
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

  // Reset lesson view when switching sidebar sections
  useEffect(() => { setActiveSlug(null); }, [activeItem]);

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
        { title: "Barreessaan Qur'aanaa Waa'ee Barsiis Kiristiyaanaa Hubannoo Dogoggoraa Qabaachaa Ture" },
        { title: "Sadan-tokko/Sillaasee" },
        { title: "Yesus, Ilma Waaqayyoo" },
        { title: "Hafuurri Qulqulluun Yaahiwweedha" },
      ];
    }
    if (activeItem === "Yesuus Eenyu") {
      return [
        { title: "Yesus Kristos Waaqa ta'uu isaa dubbateera?" },
        { title: '"Ani Waaqayyodha na Waaqessaa" Jedhanii Dubbachuun Waaqummaa kan Mirkaneessudha?' },
        { title: "Islaamummaa fi Fannifamuu Masihiichaa" },
        { title: "Kaliimatullaah – Maqaa Waaqummaa Yesuus Mirkaneessu" },
        { title: "Ruhuullaah – Maqaa kan Biroo Waaqummaa Yesuus Mirkaneessu" },
        { title: "Waaqayyo Dhugaa Tokkichi Yesusin kan Dhile dhaa?" },
      ];
    }
    if (activeItem === "Karaa fayyinaa") {
      return [
        { title: "Balballi Jannataa Banameera!" },
        { title: "Maaliif Kristaanummaa Qofti Amantaa Sirrii Ta'e?" },
      ];
    }
    if (activeItem === "Muhaammad") {
      return [
        { title: "Nabiyyummaa Muhaammad kan hin Fudhanneef Sababaawwan 12" },
        { title: '"Wangeelli Barnaabaas" Wangeela Dhugaa ti?' },
        { title: "Muhammadii fi Phaawulos Qulqullicha" },
        { title: "Musee fi Muhammad kan ittiin wal hin fakkaanne qabxiiwwan Shantama" },
        { title: "Muhammad Ergamaa Rabbii moo kan Sheeyxaanaa" },
        { title: "Sheeyxana Funyaan Musliimotaa Keessa Jiraatu" },
        { title: "Haalli Du'aatii Muhammad Nabiyyii Sobaa Ta'uu Isaa Mirkaneessa" },
        { title: "Qamaleen Dhagaan Rukutamuun Ajjeefamte!" },
      ];
    }
    if (activeItem === "Dhuga Ba'iinsota") {
      return [
        { title: "Seensa" },
        { title: "Boqonnaa 1 – Humnaa fi Jaalala Waaqayyoo" },
        { title: "Boqonnaa 2 – Jireenya Muhaammad" },
        { title: "Boqonnaa 3 – Seenaa Gabaabaa Islaamummaa" },
        { title: "Boqonnaa 4 – Seenaa Islaamummaa Afrikaa Keessatti" },
        { title: "Boqonnaa 5 – Utubaalee Islaamummaa Shanan" },
        { title: "Boqonnaa 6 – Amantaalee Islaamummaan Yaada Irraa Waraabbate" },
        { title: "Boqonnaa 7 – Garaagarummaawwan Islaamummaa Keessatti Argaman" },
        { title: "Boqonnaa 8 – Qur'aana" },
        { title: "Boqonnaa 9 – Aadafi Seerota Musliimotaa" },
        { title: "Boqonnaa 10 – Aadafi Ilaalcha Musliimotaa" },
        { title: "Boqonnaa 11 – Dubartoota Islaamummaa Keessatti" },
        { title: "Boqonnaa 12 – Musliimonni Warra Musliima Hintaane Akkamitti Ilaalu?" },
        { title: "Boqonnaa 13 – Musliimotaaf Akkamitti Ragaa Baana?" },
        { title: "Hiika Jechootaa/Glossary" },
      ];
    }
    if (activeItem === "Deebilee Keenya") {
      return [
        { title: "Kiristiyaanoti Summii akka Dhuganiif Ajajamaniiruu?" },
        { title: "Macaafa Qulqulluu Keessati Dogoggorawwan Kuma Shantamni jiru?" },
        { title: "Soba Ahimad Diidaa" },
        { title: "Kaa'ibaa – Waaqa Tolfamaa Islaamummaa!" },
      ];
    }
    if (activeItem === "Shororkeessummaa") {
      return [
        { title: "Islaamummaan Amantaa Nagayaatii?" },
        { title: "ISIS Islaamummaa Dhugaatii?" },
        { title: "Wahaabiizimii Itiyoophiyaa keessatti" },
        { title: "Muhammad Gara-jabina Yihuudotarratti Raawwate" },
        { title: "Waadaa Zimmaa" },
        { title: "Giddu-gala Kiristiyaanaa kan Durii Irratti Weeyrara Musliimonni Gaggeessan" },
        { title: "Jihaadota Fashalaa'an" },
        { title: "Jihaad Bifa Haarawaан" },
        { title: "Hayyoota Shororkeesummaa" },
        { title: "Bara 1979 – Hokkaara idil addunyaafi taateewwan sadan" },
        { title: "Shira Seenaa \"Al-Najaashii\" Duuba Jiru" },
        { title: "Ahimad Bitaatticha Maaf Leellisu?" },
        { title: "Jihaad Itiyoophiyaa Keessatti Jaarraa 19ffaa Asitti" },
      ];
    }
    if (activeItem === "Dubartoota fi Islaamummaa") {
      return [
        { title: "Dubartootaa Qur'ana, Haadisaa fi Macaafa Qulqulluu keessatti" },
        { title: "Amantaa Islaamummaa keessatti  Ragaa Ba'uu Dubartootaa" },
        { title: "Muhammad Umurii Heerumaaf kan hin Geenye Ayishaa Fuudhuu Isaa" },
        { title: "Muhammadii fi Dubartii Gurraattii" },
      ];
    }
    if (activeItem === "Qur'aana") {
      return [
        { title: "Qur'aanni Sirriitti Eeggameeraa?" },
        { title: "Miidhaginni Dhugaatti Ulaagaa Ta'uu Mala?" },
        { title: "Qur'aana Keessaa kan Badan Keyyatoota 213!" },
        { title: "Dogoggoroota Seenaa kan Qur'aana Keessatti Argaman" },
        { title: "Haalli Qur'aana Haafsi Ittiin Filatame Mormii Kaasuu Isaa" },
        { title: "Moggaasa Boqonnaawwan Qur'aanaa" },
        { title: "Qur'aana Keessaa Jechoota Walfaallessan" },
      ];
    }
    if (activeItem === "Macaafa Qulqulluu") {
      return [
        { title: "Macaafni Qulqulluun Sagalee Waaqayyooti?" },
        { title: "Deebilee Amansiisoo" },
        { title: "Macaafa Qulqulluu – Kitaaba Ajaa'ibsiisaa" },
        { title: "Rakkina Islaamummaa" },
        { title: "Tawuraatii fi Injiliin Kitaaba Qulqulluudha?" },
      ];
    }
    if (activeItem === "Wantoota Hubachuu Qabnu") {
      return [
        { title: "SEENSA" },
        { title: "BOQONNAA 1 – Deebii Jaalalaan Kennuu" },
        { title: "BOQONNAA 2 – Kaayyoo Islaamummaan Afrikaa Irratti Qabu Hubachuu" },
        { title: "BOQONNAA 3 – Waldaan Gutuu Addunyaa Kiristiyaanota Biyyoota Musliimni Itti Baay'atu Keessa Jiraatan Gargaaruu Kan Dandeessu Akkamitti?" },
        { title: "BOQONNAA 4 – Biyyoota Islaama Hintaane Islaamessuuu" },
        { title: "BOQONNAA 5 – Tooftaawwan Baramoo Islaamaa Biyyoota Afrikaa Musliima Hin Ta'in Keessatti" },
        { title: "BOQONNAA 6 – Bu'uurota Kiristiyaanummaa Marii'annoodhaf hin Dhiyaanne" },
        { title: "BOQONNAA 7 – Amantoonni Hundinuu Wangeelaa Labsuu fi Tajaajiluu ni Danda'u" },
        { title: "BOQONNAA 8 – Yaa'ii Jamaa fi Falmii" },
        { title: "BOQONNAA 9 – Yaadota Mormisiisoo Wangeela Labsu Keessatti Argaman" },
        { title: "BOQONNAA 10 – Marii Amantaalee Gara Garaa Gidduutti Adeemsifamu" },
        { title: "BOQONNAA 11 – Jijjirama Fiduuf Waaqayyo Kan Isin Fayyadamuu Danda'u Haala Kamiini? (Kutaa-1)" },
        { title: "BOQONNAA 12 – Jijjirama Fiduuf Waaqayyo Kan Isin Fayyadamuu Danda'u Haala Kamiini? (Kutaa-2)" },
      ];
    }
    return [1, 2, 3].map(() => ({ title: activeItem }));
  };

  const LogoSvg = ({ className }: { className?: string }) => null;

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-gray-950 font-sans selection:bg-primary-200 selection:text-primary-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-screen sticky top-0 z-30">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-100/80 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <Logo />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Library</p>
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm transition-all duration-300 text-left group
                ${activeItem === item.label
                  ? "bg-gradient-to-r from-primary-50 to-orange-50/50 text-primary-700 font-bold border border-primary-100 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium border border-transparent"}
              `}
            >
              <span className={`shrink-0 transition-colors duration-300 ${activeItem === item.label ? "text-primary-600" : "text-gray-400 group-hover:text-primary-500"}`}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              {activeItem === item.label && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 shadow-[0_0_8px_rgba(255,92,10,0.5)]" />
              )}
            </button>
          ))}
        </nav>

        {/* Back to Home */}
        <div className="p-4 border-t border-gray-100/80 bg-gray-50/50 mt-auto">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            <ChevronLeft size={16} />
            Back to Home
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800 flex items-center justify-between px-5 z-40 shadow-sm">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          {activeSlug && (
            <button
              onClick={() => setActiveSlug(null)}
              className="flex items-center gap-1 text-xs font-semibold text-orange-600 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 rounded-lg"
            >
              <ChevronLeft size={14} />
              Lessons
            </button>
          )}
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-xl transition-colors" aria-label="Open sidebar">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pt-16 lg:pt-0 min-w-0 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-100/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 relative z-10">
          {activeSlug ? (
            <motion.div initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, type: "spring", bounce: 0 }}>
              <LessonContent slug={activeSlug} onBack={() => setActiveSlug(null)} />
            </motion.div>
          ) : (
            <>
              {/* Section Header */}
              <div className="mb-10 lg:mb-12">
                <div className="flex items-center gap-2 text-xs font-bold text-primary-600 uppercase tracking-widest mb-3">
                  <span className="w-6 h-[2px] bg-primary-500 rounded-full" />
                  Lessons
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">{activeItem}</h2>
              </div>

              {/* Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {getActiveContent().map((content, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group relative bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 hover:border-primary-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all cursor-pointer overflow-hidden flex flex-col justify-between min-h-[140px]"
                    onClick={() => {
                      const slug = cardSlugMap[content.title];
                      if (slug) setActiveSlug(slug);
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-50/0 group-hover:from-primary-50/40 group-hover:to-orange-50/40 transition-colors duration-500" />
                    <div className="relative z-10 flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-primary-50 group-hover:to-orange-100 flex items-center justify-center text-gray-400 group-hover:text-primary-600 shrink-0 border border-gray-200/60 group-hover:border-primary-200/60 transition-all duration-300">
                        <BookOpen size={18} />
                      </div>
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-primary-700 transition-colors leading-snug line-clamp-3">
                        {content.title}
                      </h3>
                    </div>

                    <div className="relative z-10 mt-auto flex justify-end">
                      <button
                        disabled={!cardSlugMap[content.title]}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 group-hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        Read Lesson
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Notes Section */}
              <div className="mt-12">
                <button
                  onClick={() => setNotesOpen(o => !o)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:border-primary-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-primary-100 flex items-center justify-center text-orange-500 group-hover:text-primary-600 transition-colors border border-orange-100/50">
                      <StickyNote size={18} />
                    </div>
                    <span className="text-base font-bold text-gray-800">My Notes for This Section</span>
                    {activeNotes.length > 0 && (
                      <span className="bg-primary-100 border border-primary-200 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full">{activeNotes.length}</span>
                    )}
                  </div>
                  {notesOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>

                <AnimatePresence>
                  {notesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl" />

                        <div className="relative">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Reflect & Capture Insights</label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <textarea
                              value={noteInput}
                              onChange={e => setNoteInput(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
                              placeholder="Write down what you've learned..."
                              rows={3}
                              className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400 focus:bg-white transition-all"
                            />
                            <button
                              onClick={addNote}
                              disabled={!noteInput.trim()}
                              className="sm:self-end flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 disabled:opacity-40 disabled:from-gray-400 disabled:to-gray-400 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98] sm:w-auto w-full"
                            >
                              <Plus size={16} />
                              Save Note
                            </button>
                          </div>
                        </div>

                        {activeNotes.length === 0 ? (
                          <div className="text-center py-10 px-4 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                            <PenTool className="mx-auto text-gray-300 mb-3" size={24} />
                            <p className="text-sm font-medium text-gray-500">No notes yet. Add your first note above!</p>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-2">
                            {activeNotes.map(note => (
                              <motion.div
                                key={note.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="flex items-start gap-4 p-5 bg-gradient-to-r from-orange-50/80 to-white border border-primary-100/50 rounded-xl group/note shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                              >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-orange-400" />
                                <div className="flex-1 ml-1">
                                  <p className="text-sm text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">{note.text}</p>
                                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mt-3">{note.createdAt}</p>
                                </div>
                                <button
                                  onClick={() => deleteNote(note.id)}
                                  className="md:opacity-0 group-hover/note:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                  aria-label="Delete note"
                                >
                                  <Trash2 size={16} />
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
            </>
          )}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[50]"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 z-[60] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                <Logo size="sm" />
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
                <p className="px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Library</p>
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { setActiveItem(item.label); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm transition-all duration-300 text-left 
                      ${activeItem === item.label ? "bg-gradient-to-r from-primary-50 to-orange-50 text-primary-700 font-bold border border-primary-100 shadow-sm" : "text-gray-600 hover:bg-gray-50 font-medium border border-transparent"}
                    `}
                  >
                    <span className={`shrink-0 ${activeItem === item.label ? "text-primary-500" : "text-gray-400"}`}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    {activeItem === item.label && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-100/80 bg-gray-50/50">
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                >
                  <ChevronLeft size={16} />
                  Back to Home
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Global CSS for custom scrollbar embedded for simplicity in component since it's small, though index.css is better */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
        }
      `}</style>
    </div>
  );
}

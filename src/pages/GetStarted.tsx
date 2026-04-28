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
  ChevronUp
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Logo />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                activeItem === item.label
                  ? "bg-orange-50 text-orange-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
              }`}
            >
              <span className={`shrink-0 ${activeItem === item.label ? "text-orange-500" : "text-gray-400"}`}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              {activeItem === item.label && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              )}
            </button>
          ))}
        </nav>

        {/* Back to Home */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
          >
            <ChevronLeft size={16} />
            Back to Home
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <Logo size="sm" />
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" aria-label="Open sidebar">
          <Menu size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pt-14 lg:pt-0 min-w-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-10">

          {activeSlug ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <LessonContent slug={activeSlug} onBack={() => setActiveSlug(null)} />
            </motion.div>
          ) : (
            <>
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">
                  <span className="w-4 h-px bg-orange-400" />
                  Lessons
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{activeItem}</h2>
              </div>

              {/* Cards Grid */}
              <div className="grid gap-3">
                {getActiveContent().map((content, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-100 transition-colors">
                          <BookOpen size={18} />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                          {content.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          const slug = cardSlugMap[content.title];
                          if (slug) setActiveSlug(slug);
                        }}
                        disabled={!cardSlugMap[content.title]}
                        className="shrink-0 flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                      >
                        Read
                        <ChevronLeft size={14} className="rotate-180" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Notes Section */}
              <div className="mt-8">
                <button
                  onClick={() => setNotesOpen(o => !o)}
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-orange-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                      <StickyNote size={16} />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">My Notes</span>
                    {activeNotes.length > 0 && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">{activeNotes.length}</span>
                    )}
                  </div>
                  {notesOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>

                <AnimatePresence>
                  {notesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                        <div className="flex gap-3">
                          <textarea
                            value={noteInput}
                            onChange={e => setNoteInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
                            placeholder="Write a note for this lesson..."
                            rows={2}
                            className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                          />
                          <button
                            onClick={addNote}
                            disabled={!noteInput.trim()}
                            className="self-end flex items-center gap-1.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white text-sm font-semibold rounded-lg transition-all"
                          >
                            <Plus size={15} />
                            Add
                          </button>
                        </div>
                        {activeNotes.length === 0 ? (
                          <p className="text-sm text-gray-400 text-center py-3">No notes yet. Add one above!</p>
                        ) : (
                          <div className="space-y-2">
                            {activeNotes.map(note => (
                              <motion.div
                                key={note.id}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="flex items-start gap-3 p-3.5 bg-orange-50 border border-orange-100 rounded-lg group/note"
                              >
                                <div className="flex-1">
                                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{note.text}</p>
                                  <p className="text-xs text-gray-400 mt-1">{note.createdAt}</p>
                                </div>
                                <button
                                  onClick={() => deleteNote(note.id)}
                                  className="opacity-0 group-hover/note:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded transition-all"
                                  aria-label="Delete note"
                                >
                                  <Trash2 size={14} />
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
              className="lg:hidden fixed inset-0 bg-black/40 z-[50]"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-[60] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Logo size="sm" />
                <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { setActiveItem(item.label); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                      activeItem === item.label ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-600 hover:bg-gray-50 font-medium"
                    }`}
                  >
                    <span className={`shrink-0 ${activeItem === item.label ? "text-orange-500" : "text-gray-400"}`}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    {activeItem === item.label && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />}
                  </button>
                ))}
              </nav>
              <div className="px-3 py-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <ChevronLeft size={16} />
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

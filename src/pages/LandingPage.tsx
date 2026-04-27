import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      
      {/* Subtle background details */}
      <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-orange-50/50 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-orange-50/30 blur-[100px]" />
      </div>
    </>
  );
}

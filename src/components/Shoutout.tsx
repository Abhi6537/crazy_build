import { Heart } from "lucide-react";

export default function Shoutout() {
  return (
    <section className="py-16 bg-white border-t-8 border-black overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center justify-center bg-[#FF4D00] text-white px-6 py-4 border-4 border-black shadow-[8px_8px_0_0_#1a1a1a] transform -rotate-1 hover:rotate-1 transition-transform">
          <Heart className="w-8 h-8 mr-3 fill-current" />
          <h2 className="font-display font-black text-2xl md:text-4xl uppercase tracking-widest">
            A Massive Thank You
          </h2>
        </div>
        <div className="mt-8 max-w-2xl mx-auto">
          <p className="font-sans text-lg md:text-xl font-bold text-gray-800 leading-relaxed border-l-4 border-[#0055FF] pl-6 text-left">
            To all our judges, mentors, sponsors, and participants—thank you for making the Crazy Build Hackathon a roaring success. The energy was electric, and the projects were truly insane. See you all at the next sprint! 
          </p>
        </div>
      </div>
    </section>
  );
}

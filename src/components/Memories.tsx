import { createServiceClient } from "@/lib/supabase";
import Image from "next/image";

export default async function Memories() {
  const supabase = createServiceClient();
  
  const { data: photos } = await supabase
    .from("event_photos")
    .select("id, url")
    .order("created_at", { ascending: false });

  if (!photos || photos.length === 0) return null;

  return (
    <section className="py-20 relative bg-[#0A1128] overflow-hidden border-t-8 border-black">
      {/* Tape decorations */}
      <div className="absolute top-0 left-10 w-32 h-8 bg-[#FFB800] transform -rotate-3 -translate-y-4 border-2 border-black z-10 hidden md:block"></div>
      <div className="absolute top-0 right-10 w-32 h-8 bg-[#FF4D00] transform rotate-3 -translate-y-4 border-2 border-black z-10 hidden md:block"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-widest text-white mb-4 transform -rotate-1">
            Event <span className="text-[#FFB800]">Memories</span>
          </h2>
          <div className="w-24 h-2 bg-[#FF0033] mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, i) => (
            <div 
              key={photo.id} 
              className={`relative aspect-square bg-gray-200 border-4 border-black shadow-[8px_8px_0_0_#FFB800] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0_0_#FF4D00] transition-all transform ${i % 2 === 0 ? 'rotate-2' : '-rotate-1'} overflow-hidden group`}
            >
              <Image 
                src={photo.url} 
                alt="Event Memory" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { createServiceClient } from "@/lib/supabase";
import MemoriesClient from "./MemoriesClient";

export default async function Memories() {
  const supabase = createServiceClient();
  
  const { data: photos } = await supabase
    .from("event_photos")
    .select("id, url")
    .order("created_at", { ascending: false });

  if (!photos || photos.length === 0) return null;

  return <MemoriesClient photos={photos} />;
}

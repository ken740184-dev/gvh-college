import { getGalleryBlocks } from "@/actions/gallery";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  const res = await getGalleryBlocks();
  const blocks = res.success ? res.blocks : [];
  
  return <GalleryClient initialBlocks={blocks} />;
}

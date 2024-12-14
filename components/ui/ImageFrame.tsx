// Import library and external component
import Image from "next/image";
// Import internal component
// Import styles

// Define props type
interface ImageFrameProps {
  className: string; // Made optional
  src: string;
  alt: string;
  ImageClassName: string; // Define the object for image
  quality?: number; // Made optional
}
export default function ImageFrame({
  className,
  src,
  alt,
  ImageClassName,
  quality = 75,
}: ImageFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        quality={quality}
        alt={alt}
        src={src}
        fill={true}
        className={ImageClassName}
        // sizes="100vw"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

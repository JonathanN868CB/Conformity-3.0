import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, X, ZoomIn } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  technical: string;
}

interface ImageGalleryProps {
  color: string;
}

export function ImageGallery({ color }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
      caption: 'External Aircraft Inspection',
      technical: 'Fuselage and empennage condition - Annual inspection 04/10/2026',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1583267746180-e0b1bcb4b1b4?w=800&q=80',
      caption: 'Cockpit Avionics Panel',
      technical: 'Garmin G5000 integrated flight deck - Post-modification verification',
    },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-slate-800">Technical Images</h2>
        <p className="text-sm text-slate-600">
          High-resolution inspection and documentation photography
        </p>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 shadow-md">
              <img
                src={image.url}
                alt={image.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <ZoomIn className="size-4" />
                    <span className="text-sm font-medium">View details</span>
                  </div>
                </div>
              </div>
              <div
                className="absolute top-3 left-3 rounded px-2 py-1 text-xs font-bold text-white backdrop-blur-sm"
                style={{ backgroundColor: `${color}cc` }}
              >
                IMG {image.id}
              </div>
            </div>
            <div className="mt-3">
              <h4 className="mb-1 text-sm font-medium text-slate-800">{image.caption}</h4>
              <p className="line-clamp-2 text-xs text-slate-500">{image.technical}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 rounded-lg bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <X className="size-6 text-white" />
              </button>
              <div className="relative overflow-hidden rounded-lg bg-slate-900 shadow-2xl">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="h-auto max-h-[70vh] w-full object-contain"
                />
              </div>
              <div className="mt-6 rounded-lg bg-white/95 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-slate-800">
                      {selectedImage.caption}
                    </h3>
                    <p className="text-sm text-slate-600">{selectedImage.technical}</p>
                  </div>
                  <button
                    className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white shadow-sm transition-shadow hover:shadow-md"
                    style={{ backgroundColor: color }}
                  >
                    <Download className="size-4" />
                    Download
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Date: 4/10/2026</span>
                  <span>•</span>
                  <span>Format: JPEG</span>
                  <span>•</span>
                  <span>Size: 2.4 MB</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

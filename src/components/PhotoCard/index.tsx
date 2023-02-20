import Image from "next/image";
import { useState } from "react";

import cardPhoto from "../../assets/card_foto.svg";

export const PhotoCard = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="mb-10 w-[293px] h-[290px] bg-secondary/80 rounded-[6px]">
        <div
          className="w-full h-48"
          role="button"
          aria-label="image preview"
          onClick={() => setShowPreview((old) => !old)}
        >
          <Image src={cardPhoto} alt="dog" />
        </div>
        <div className="px-6 py-5">
          <span className="font-bold text-white text-2xl">Doge</span>
          <p className="text-white text-lg font-light">The best doge</p>
        </div>
      </div>

      {/* preview image */}
      {showPreview && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50"
          onClick={() => setShowPreview(false)}
        >
          <div className="rounded">
            <Image
              src={cardPhoto}
              height={400}
              width={450}
              alt="preview photo"
            />
          </div>
        </div>
      )}
    </>
  );
};

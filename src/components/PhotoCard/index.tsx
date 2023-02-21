import Image from "next/image";
import { useState } from "react";

import cardPhoto from "../../assets/card_foto.svg";

interface Props {
  id: string;
  ts: number;
  data: {
    url: string;
    title: string;
    description?: string;
  };
}

export const PhotoCard = ({ data }: Props) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="mb-10 w-[293px] h-[290px] bg-secondary/80 rounded-[6px]">
        <div
          className="w-full h-48 relative z-0"
          role="button"
          aria-label="image preview"
          onClick={() => setShowPreview((old) => !old)}
        >
          <Image
            src={data.url}
            alt={data.title}
            fill
            sizes="100%"
            style={{
              objectFit: "contain",
            }}
            quality={60}
            priority
          />
        </div>
        <div className="px-6 py-5">
          <span className="font-bold text-white text-2xl">{data.title}</span>
          <p className="text-white text-lg font-light">
            {data.description || "-"}
          </p>
        </div>
      </div>

      {showPreview && (
        <div
          className="z-20 fixed inset-0 flex justify-center items-center bg-black/50"
          onClick={() => setShowPreview(false)}
        >
          <div className="z-10 relative flex flex-col rounded">
            <Image
              src={data.url}
              alt="preview photo"
              width={500}
              height={500}
              priority
            />
            <a
              className="px-2 py-1 w-full bg-zinc-700 text-white text-xs font-semibold rounded-b"
              href={data.url}
              target="_blank"
              rel="noreferrer"
            >
              Ver original
            </a>
          </div>
        </div>
      )}
    </>
  );
};

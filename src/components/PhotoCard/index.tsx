/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";

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
      <div
        className={`mb-10 flex flex-col justify-between 
        w-60 h-60 lg:w-[293px] lg:h-[290px]
        bg-secondary/80 rounded-[6px]
      `}
      >
        <div
          className="w-full h-48 relative"
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
        <div className="px-6 py-5 bg-main/50">
          <span className="font-bold text-zinc-300 text-xl">{data.title}</span>
          <p className="text-zinc-400 text-sm font-light">
            {data.description || "-"}
          </p>
        </div>
      </div>

      {showPreview && (
        <div
          className="z-20 fixed inset-0 flex justify-center items-center bg-black/50"
          onClick={() => setShowPreview(false)}
        >
          <div className="flex flex-col items-center rounded">
            <img
              src={data.url}
              alt="preview"
              className="max-w-[350px] max-h-[250px] lg:max-w-[900px] lg:max-h-[600px] object-contain"
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

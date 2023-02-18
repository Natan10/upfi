import Image from "next/image";

import cardPhoto from "../../assets/card_foto.svg";

export const PhotoCard = () => {
  return (
    <div className="mb-10 w-[293px] h-[290px] bg-secondary/80 rounded-[6px]">
      <div className="w-full h-48">
        <Image src={cardPhoto} alt="dog" />
      </div>
      <div className="px-6 py-5">
        <span className="font-bold text-white text-2xl">Doge</span>
        <p className="text-white text-lg font-light">The best doge</p>
      </div>
    </div>
  );
};

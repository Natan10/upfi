import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import logo from "../../assets/logo.svg";

interface Props {
  triggerUploadPhoto: () => void;
}

export const Header = ({ triggerUploadPhoto }: Props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const setResizeWidth = (e: any) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener("resize", setResizeWidth);

    return () => window.removeEventListener("resize", setResizeWidth);
  }, []);

  return (
    <div className="w-full bg-secondary/80">
      <div className="mx-5 lg:mx-auto py-6 max-w-5xl flex items-center justify-between">
        <Image src={logo} alt="upfi_logo" />
        <button
          aria-label="adicionar imagem"
          className="px-4 py-[10px] text-white text-md bg-orange hover:bg-orange/90 transition-colors font-bold rounded-[6px]"
          onClick={triggerUploadPhoto}
        >
          {width > 400 ? (
            "Adicionar Imagem"
          ) : (
            <AiOutlineCloudUpload size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

import Image from "next/image";
import logo from "../../assets/logo.svg";

interface Props {
  triggerUploadPhoto: () => void;
}

export const Header = ({ triggerUploadPhoto }: Props) => {
  return (
    <div className="w-full bg-secondary/80">
      <div className="mx-auto py-6 max-w-5xl flex items-center justify-between">
        <Image src={logo} alt="upfi_logo" />
        <button
          aria-label="adicionar imagem"
          className="px-4 py-[10px] text-white text-md bg-orange hover:bg-orange/90 transition-colors font-bold rounded-[6px]"
          onClick={triggerUploadPhoto}
        >
          Adicionar Imagem
        </button>
      </div>
    </div>
  );
};

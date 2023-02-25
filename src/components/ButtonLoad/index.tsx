import { Spin } from "../Spin";

interface Props {
  cb: () => void;
  load?: boolean;
}

export const ButtonLoad = ({ load, cb }: Props) => {
  return (
    <button
      aria-label="adicionar imagem"
      className="mx-5 px-2 py-2 md:px-4 md:py-[10px] flex items-center gap-2 text-white text-xs lg:text-md bg-orange hover:bg-orange/90 disabled:bg-orange/80 transition-colors font-bold rounded-[6px]"
      onClick={cb}
      disabled={load}
    >
      Carregar mais
      {load && <Spin />}
    </button>
  );
};

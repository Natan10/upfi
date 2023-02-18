import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadModal = ({ visible, setVisible }: Props) => {
  return visible ? (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="w-full max-w-3xl px-6 py-4 pb-6 bg-main flex flex-col">
        <div className="relative flex justify-between items-center">
          <h1 className="text-white font-medium text-[36px]">Nova imagem</h1>
          <button
            className="absolute -right-1 -top-1 text-sm text-white"
            onClick={() => setVisible(false)}
          >
            <AiOutlineClose size={18} />
          </button>
        </div>

        <div className="mt-6 mx-auto w-full max-w-lg flex flex-col items-center">
          <div className="mb-5 w-[120px] h-[120px] flex flex-col justify-center items-center rounded-[6px] text-white/50 bg-secondary/80">
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center text-center"
            >
              <AiOutlinePlus size={24} />
              Adiciona sua Imagem
              <input id="fileInput" type="file" className="hidden" />
            </label>
          </div>
          <input
            placeholder="Titulo da imagem..."
            className="mb-4 px-7 py-3 w-full outline-none text-white bg-secondary/80 rounded-[6px]"
          />
          <input
            placeholder="Descricao da imagem..."
            className="px-7 py-3 w-full outline-none text-white bg-secondary/80 rounded-[6px]"
          />
          <button
            aria-label="adicionar imagem"
            className="mt-6 px-4 py-[10px] w-full text-white text-md bg-orange hover:bg-orange/90 transition-colors font-bold rounded-[6px]"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

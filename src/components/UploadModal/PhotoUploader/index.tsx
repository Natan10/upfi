import Image from "next/image";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

export type Props = {
  name: string;
  errors: FieldErrors<any>;
  photoField: Array<any>;
  setValue: any;
  register: UseFormRegister<any>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export const PhotoUploader = ({
  name,
  photoField,
  errors,
  register,
  setValue,
}: Props) => {
  return (
    <div
      className={`relative mb-5 w-[120px] h-[120px] flex flex-col justify-center items-center rounded-[6px] text-white/50 bg-secondary/80
     ${errors.photo && "border-[1px] border-red-600"}`}
    >
      {errors.photo && (
        <div className="error-photo absolute z-10 top-2 right-2" id="">
          <RiErrorWarningLine size={18} className="fill-red-600" />
          <Tooltip
            anchorSelect=".error-photo"
            content={errors.photo.message as string}
          />
        </div>
      )}
      {photoField.length === 0 ? (
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center text-center"
        >
          <AiOutlinePlus size={24} />
          Adiciona sua Imagem
          <input
            id="fileInput"
            type="file"
            className="hidden"
            {...register(name)}
          />
        </label>
      ) : (
        <div className="w-full h-full relative">
          <button
            onClick={() => setValue(name, [])}
            className="w-7 h-7 absolute z-10 -bottom-1 -right-2 flex items-center justify-center bg-red-500 rounded-full  cursor-pointer"
          >
            <BsTrash size={16} className="fill-white" />
          </button>
          <Image
            src={URL.createObjectURL(photoField[0])}
            alt="preview"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};

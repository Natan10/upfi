import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import { Input } from "../Input";
import { ImgbbModel } from "../../domain/Imgbb";
import { api } from "../../services/api";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = z.object({
  title: z
    .string({ required_error: "Titulo obrigatorio" })
    .min(1, { message: "Titulo obrigatorio" }),
  description: z.string().optional(),
});

type FormSchema = z.infer<typeof schema>;

const baseUrl = process.env.NEXT_PUBLIC_IMGBB_URL;
const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export const UploadModal = ({ visible, setVisible }: Props) => {
  const [load, setLoad] = useState(false);
  const [uploadFile, setUploadFile] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  async function transformImageToBinary(file: File) {
    const buffer = await file.arrayBuffer();
    const blob = new Blob([new Uint8Array(buffer)]);
    return blob;
  }

  async function onSubmit(form: FormSchema) {
    if (!uploadFile) {
      alert("Realize o upload do arquivo!");
      return;
    }
    setLoad(true);
    try {
      const file = await transformImageToBinary(uploadFile!);
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post<ImgbbModel>(baseUrl || "", formData, {
        params: {
          key,
        },
      });

      const { id, url } = data.data;

      await api.post("/database/create", {
        data: {
          title: form.title,
          description: form.description,
          id,
          url,
        },
      });

      setUploadFile(undefined);
      setLoad(false);
      setVisible(() => false);
    } catch (error) {
      setUploadFile(undefined);
      setLoad(false);
      console.error(error);
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setUploadFile(file);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ title: "", description: "" });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    return () => {
      reset({ title: "", description: "" });
      setUploadFile(undefined);
    };
  }, [reset, visible]);

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

        <form
          className="mt-6 mx-auto w-full max-w-lg flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={`mb-5 w-[120px] h-[120px] flex flex-col justify-center items-center rounded-[6px] text-white/50 bg-secondary/80 ${
              uploadFile ? "border-green-600 border" : ""
            }`}
          >
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center text-center"
            >
              <AiOutlinePlus size={24} />
              Adiciona sua Imagem
              <input
                onChange={handleFile}
                id="fileInput"
                type="file"
                className="hidden"
              />
            </label>
          </div>
          {uploadFile && (
            <span className="mb-3 text-white text-xs font-light">
              {uploadFile.name}
            </span>
          )}
          <Input
            name="title"
            placeholder="Titulo da imagem..."
            register={register}
            errorForm={errors?.title && (errors.title.message as string)}
          />
          <Input
            name="description"
            placeholder="Description da imagem..."
            register={register}
          />
          <button
            aria-label="adicionar imagem"
            className="px-4 py-[10px] w-full flex items-center justify-center gap-2 text-white text-md bg-orange disabled:bg-orange/80 hover:bg-orange/90 transition-colors font-bold rounded-[6px]"
            type="submit"
            disabled={load}
          >
            Enviar
            {load && (
              <div className="h-4 w-4 rounded-full border-4 border-r-slate-500 border-t-slate-500 animate-spin" />
            )}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

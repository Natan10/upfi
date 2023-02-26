import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./Input";
import { Spin } from "../Spin";
import { PhotoUploader } from "./PhotoUploader";

import { schemaValidation } from "./schemaValidation";
import { createImgbbPhoto } from "./functions/createImgbbPhoto";
import {
  createPhotoOnFauna,
  CreatePhotoParams,
} from "./functions/createPhotoOnFauna";
import { useGlobalContext } from "../../contexts/GlobalProvider";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FormSchema = z.infer<typeof schemaValidation>;

export const UploadModal = ({ visible, setVisible }: Props) => {
  const queryClient = useQueryClient();
  const { notification } = useGlobalContext();
  const mutation = useMutation({
    mutationFn: async ({ title, description, url }: CreatePhotoParams) =>
      createPhotoOnFauna({ title, description, url }),
    onSuccess: () => queryClient.invalidateQueries(["photos"]),
  });

  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(schemaValidation),
  });
  const photoField = watch("photo", []);

  async function onSubmit(form: FormSchema) {
    setLoad(true);
    try {
      const { data } = await createImgbbPhoto(form);
      const { url } = data.data;
      mutation.mutate({
        title: form.title,
        description: form.description,
        url,
      });

      notification.call({
        type: "success",
        content: "Foto carregata com sucesso",
      });
    } catch (error) {
      console.error(error);
      notification.call({
        type: "error",
        content: "Erro ao realizar upload, Tente novamente",
      });
    } finally {
      setLoad(false);
      setVisible(false);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ title: "", description: "", photo: undefined });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    return () => {
      reset({ title: "", description: "", photo: undefined });
    };
  }, [reset, visible]);

  return visible ? (
    <div className="fixed inset-0 px-10 flex justify-center items-center bg-black/50">
      <div className="w-full max-w-3xl px-6 py-4 pb-6 bg-main flex flex-col">
        <div className="relative flex justify-between items-center">
          <h1 className="text-white font-medium text-lg md:text-[36px]">
            Nova imagem
          </h1>
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
          <PhotoUploader
            name="photo"
            photoField={photoField}
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <Input
            name="title"
            placeholder="Titulo"
            register={register}
            errorForm={errors?.title && (errors.title.message as string)}
          />
          <Input
            name="description"
            placeholder="Descricao"
            register={register}
          />
          <button
            aria-label="adicionar imagem"
            className="px-4 py-2 md:py-[10px] w-full flex items-center justify-center gap-2 text-white text-sm md:text-md bg-orange disabled:bg-orange/80 hover:bg-orange/90 transition-colors font-bold rounded-[6px]"
            type="submit"
            disabled={load}
          >
            Enviar
            {load && <Spin />}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

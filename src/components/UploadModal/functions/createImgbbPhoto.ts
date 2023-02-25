import axios, { AxiosResponse } from "axios";

import { FormSchema } from "..";
import { ImgbbModel } from "../../../domain/Imgbb";

const baseUrl = process.env.NEXT_PUBLIC_IMGBB_URL;
const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

async function transformImageToBinary(file: File) {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([new Uint8Array(buffer)]);
  return blob;
}

export async function createImgbbPhoto(
  form: FormSchema
): Promise<AxiosResponse<ImgbbModel>> {
  const [formFile] = form.photo;
  const file = await transformImageToBinary(formFile);
  const formData = new FormData();
  formData.append("image", file);

  return await axios.post<ImgbbModel>(baseUrl || "", formData, {
    params: {
      key,
    },
  });
}

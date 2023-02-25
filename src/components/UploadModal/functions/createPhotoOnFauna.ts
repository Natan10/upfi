import { api } from "../../../services/api";

export interface CreatePhotoParams {
  title: string;
  description?: string;
  url: string;
}

export async function createPhotoOnFauna({
  title,
  description,
  url,
}: CreatePhotoParams) {
  return await api.post("/database/create", {
    data: {
      title,
      description,
      url,
    },
  });
}

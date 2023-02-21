import { PhotoModel } from "../domain/Photo";

export interface ApiResponseDTO {
  after: string | null;
  data: Array<{
    id: string;
    ts: number;
    data: PhotoModel;
  }>;
}

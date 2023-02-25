import { PhotoCard } from "../PhotoCard";

import { InfiniteData } from "react-query";
import { ApiResponseDTO } from "../../dto/apiResponseDTO";

interface Props {
  data: InfiniteData<ApiResponseDTO>;
}

export const PhotoCardContainer = ({ data }: Props) => {
  const photos = data.pages
    .map((photoData) => {
      return photoData.data.map((photo) => {
        return photo;
      });
    })
    .flatMap((photo) => photo)
    .sort((a, b) => a.ts - b.ts);

  return (
    <div className="mt-20">
      <div className="grid grid-cols-3 grid-flow-row-dense">
        {photos.map((photo) => {
          return <PhotoCard key={photo.id} {...photo} />;
        })}
      </div>
    </div>
  );
};

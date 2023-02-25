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
    <div className="mt-12 lg:mt-20">
      <div className="flex justify-around items-center flex-wrap">
        {photos.map((photo) => {
          return <PhotoCard key={photo.id} {...photo} />;
        })}
      </div>
    </div>
  );
};

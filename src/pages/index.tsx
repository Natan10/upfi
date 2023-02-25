import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { InfiniteData, useInfiniteQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ButtonLoad } from "../components/ButtonLoad";
import { Header } from "../components/Header";
import { PhotoCardContainer } from "../components/PhotoCardContainer";
import { UploadModal } from "../components/UploadModal";

import { ApiResponseDTO } from "../dto/apiResponseDTO";
import { api } from "../services/api";

async function getPhotos({
  pageParam = undefined,
}: {
  pageParam?: string;
}): Promise<ApiResponseDTO> {
  const { data } = await api.get<ApiResponseDTO>("/database/list", {
    params: {
      after: pageParam,
    },
  });
  return data;
}

const Home: NextPage = ({ payload }: any) => {
  const [after, setAfter] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery(
    ["photos"],
    getPhotos,
    {
      refetchOnWindowFocus: false,
      initialData: payload,
      onSuccess: (data) => {
        const afterParam = data.pages.reverse()[0].after;
        setAfter(afterParam);
      },
    }
  );

  return (
    <div className="w-full min-h-screen bg-main pb-20">
      <Header triggerUploadPhoto={() => setVisible(true)} />
      <div className="mx-auto w-full max-w-5xl">
        {!isLoading && data && <PhotoCardContainer data={data} />}
        {!!after && (
          <ButtonLoad
            load={isFetching}
            cb={() => fetchNextPage({ pageParam: after })}
          />
        )}
        <UploadModal visible={visible} setVisible={setVisible} />
      </div>
      <ReactQueryDevtools position="bottom-right" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPhotos({});

  const payload: InfiniteData<ApiResponseDTO> = {
    pageParams: [null],
    pages: [data],
  };

  return {
    props: {
      payload,
    },
  };
};

export default Home;

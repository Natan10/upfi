import { PhotoCard } from "../PhotoCard";

export const PhotoCardContainer = () => {
  const cards = new Array(6).fill(Math.round(Math.random() * 100));

  return (
    <div className="mx-auto py-20 w-full max-w-5xl">
      <div className="grid grid-cols-3 grid-flow-row-dense">
        {cards.map((_, i) => (
          <PhotoCard key={i} />
        ))}
      </div>
      <button
        aria-label="adicionar imagem"
        className="px-4 py-[10px] text-white text-md bg-orange hover:bg-orange/90 transition-colors font-bold rounded-[6px]"
      >
        Carregar mais
      </button>
    </div>
  );
};

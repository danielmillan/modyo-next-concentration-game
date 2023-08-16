import React from "react";

export default function CardComponent({
  index,
  card,
  clickEmitter,
  setIsFlipped,
}: {
  index: number;
  card: any;
  clickEmitter: Function;
  setIsFlipped: Function;
}) {
  const handleCardClick = () => {
    clickEmitter(index, card);
    setIsFlipped(index, card);
  };

  return (
    <div
      className={`game-card ${card.isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className="game-card-inner">
        <div className="game-card-front">
          <img src="/assets/images/back-card.png" alt="Card Image" />
        </div>
        <div className="game-card-back">
          <img src={card.animal.fields.image.url} alt="Card Back" />
        </div>
      </div>
    </div>
  );
}

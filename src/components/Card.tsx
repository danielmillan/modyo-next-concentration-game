import React, { useState } from "react";

export default function CardComponent({
  cardFrontImage,
}: {
  cardFrontImage: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`game-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className="game-card-inner">
        <div className="game-card-front">
          <img
            src="/assets/images/back-card.png"
            alt="Card Image"
            width={150}
            height={200}
          />
        </div>
        <div className="game-card-back">
          <img src={cardFrontImage} alt="Card Back" width={150} height={200} />
        </div>
      </div>
    </div>
  );
}

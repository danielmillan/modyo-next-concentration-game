import React from "react";
import CardComponent from "./Card";

export default function Matrix({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) {
  const renderCards = () => {
    const cards = [];
    const totalCards = rows * columns;
    for (let i = 0; i < totalCards; i++) {
      cards.push(
        <CardComponent
          key={i}
          cardFrontImage="https://cloud.modyocdn.com/uploads/8144e12d-4337-4630-80fd-278c399e48ed/original/lion.jpg"
        />
      );
    }
    return cards;
  };

  const matrixStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  };

  return (
    <div className="matrix" style={matrixStyle}>
      {renderCards()}
    </div>
  );
}

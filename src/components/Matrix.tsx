// @ts-ignore
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import CardComponent from "./Card";
import { useAppDispatch } from "@/redux/hooks";
import {
  addError,
  addHit,
  addNewScore,
  restoreStorage,
} from "@/redux/slices/game";

async function getAnimals() {
  const res = await fetch(
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Matrix({
  rows,
  columns,
  items,
  gameLabel,
  hits,
  errors,
  userName,
}: {
  rows: number;
  columns: number;
  items: number;
  gameLabel: string;
  hits: number;
  errors: number;
  userName: string;
}) {
  const [cardImages, setCardImages] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<
    { index: Number; animal: any; isFlipped: boolean }[]
  >([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [showResetGameModal, setShowResetGameModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCloseResetModal = () => setShowResetGameModal(false);
  const handleShowResetModal = () => setShowResetGameModal(true);

  useEffect(() => {
    if (!isImagesLoaded) {
      getAnimals().then((res) => {
        const availableAnimals = res.entries;
        const selectedImages: any[] = [];
        for (let i = 0; i < items; i++) {
          const randomIndex = Math.floor(
            Math.random() * availableAnimals.length
          );
          selectedImages.push({
            animal: availableAnimals[randomIndex],
            isFlipped: false,
          });
          selectedImages.push({
            animal: availableAnimals[randomIndex],
            isFlipped: false,
          });
          availableAnimals.splice(randomIndex, 1);
        }
        const shuffledImages = shuffleCards(selectedImages);
        setCardImages(shuffledImages);
        setIsImagesLoaded(true);
      });
    }
  }, [isImagesLoaded]);

  const shuffleCards = (array: any[]) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [selectedCards]);

  const calculateScore = () => {
    const maxScore = items * 100;
    const baseScore = hits * 100 - errors * 50;
    const finalScore = Math.max(0, Math.min(maxScore, baseScore));
    return finalScore;
  };

  useEffect(() => {
    if (hits === items) {
      dispatch(
        addNewScore({
          name: userName,
          attempts: hits + errors,
          rating: calculateScore(),
          game: gameLabel,
        })
      );
      handleShowResetModal();
    }
  }, [hits]);

  const clickFunction = (index: number, animal: any) => {
    if (selectedCards.length < 2) {
      setSelectedCards([
        ...selectedCards,
        { index, ...animal, isFlipped: animal.isFlipped },
      ]);
    }
  };

  const checkForMatch = () => {
    if (selectedCards.length === 2) {
      if (
        selectedCards[0].animal.meta.name === selectedCards[1].animal.meta.name
      ) {
        dispatch(addHit());
        setSelectedCards([]);
      } else {
        selectedCards.map((selectedCard: any) => {
          cardImages[selectedCard.index].isFlipped = false;
        });
        dispatch(addError());
        setSelectedCards([]);
      }
    }
  };

  const onChangeFlippedCard = (index: number, card: any) => {
    cardImages[index].isFlipped = !card.isFlipped;
  };

  const renderCards = () => {
    const cards = [];
    if (!isImagesLoaded) {
      return (
        <div className="d-flex">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }
    for (let i = 0; i < cardImages.length; i++) {
      cards.push(
        <CardComponent
          key={i}
          index={i}
          card={cardImages[i]}
          clickEmitter={clickFunction}
          setIsFlipped={onChangeFlippedCard}
        />
      );
    }
    return cards;
  };

  const matrixStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  };

  const returnSetupGame = () => {
    handleCloseResetModal();
    router.push("/setup");
  };

  const resetGame = () => {
    dispatch(restoreStorage());
    setIsImagesLoaded(false);
    handleCloseResetModal();
  };

  return (
    <div className="matrix" style={matrixStyle}>
      {renderCards()}

      <Modal show={showResetGameModal} onHide={handleCloseResetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Juego Terminado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            Felicidades has completado el tablero en {hits + errors} movimientos
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={returnSetupGame}
              className="me-2"
            >
              Regresar
            </Button>
            <Button variant="primary" onClick={resetGame}>
              Reiniciar Juego
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

"use client";

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { selectMatrix, selectName } from "@/redux/slices/config";
import Matrix from "@/components/Matrix";
import { selectErrors, selectHits } from "@/redux/slices/game";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function Game() {
  const name = useAppSelector(selectName);
  const matrix = useAppSelector(selectMatrix);
  const hits = useAppSelector(selectHits);
  const errors = useAppSelector(selectErrors);

  return (
    <main className={styles.main}>
      <Card className={`container ${styles.mtop_50}`}>
        <Card.Body>
          <div className="d-flex justify-content-end mb-3">
            <Link href="/">
              <Button type="button" variant="light">
                <FontAwesomeIcon
                  icon={faLeftLong}
                  style={{ fontSize: 15, color: "blue" }}
                />
                <span className="ms-2">Regresar</span>
              </Button>
            </Link>
          </div>
          <div className={styles.top_container}>
            <div className="d-flex flex-column">
              <span className="fw-bold">
                Nombre: <span className="fw-normal">{name}</span>
              </span>
              <span className="fw-bold">
                Juego: <span className="fw-normal">{matrix.label}</span>
              </span>
            </div>
            <div>
              <span className={`me-2 ${styles.hits}`}>
                Aciertos:
                <span className={styles.score_text}>{hits}</span>
              </span>
              <span className={`me-2 ${styles.errors}`}>
                Errores: <span className={styles.score_text}>{errors}</span>
              </span>
            </div>
          </div>

          <div className={styles.matrix_container}>
            <Matrix
              rows={matrix.rows}
              columns={matrix.columns}
              items={matrix.items}
              gameLabel={matrix.label}
              hits={hits}
              errors={errors}
              userName={name}
            />
          </div>
        </Card.Body>
      </Card>
    </main>
  );
}

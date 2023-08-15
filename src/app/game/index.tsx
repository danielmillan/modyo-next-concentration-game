"use client";

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { selectMatrix, selectName } from "@/redux/slices/config";
import CardComponent from "@/components/Card";
import Matrix from "@/components/Matrix";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function Game() {
  const name = useAppSelector(selectName);
  const matrix = useAppSelector(selectMatrix);

  return (
    <main className={styles.main}>
      <div className="card container">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <Link href="/">
              <button type="button" className="btn btn-light">
                <FontAwesomeIcon
                  icon={faLeftLong}
                  style={{ fontSize: 15, color: "blue" }}
                />
                <span className="ms-2">Regresar</span>
              </button>
            </Link>
          </div>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span className="fw-bold">
                Nombre: <span className="fw-normal">{name}</span>
              </span>
              <span className="fw-bold">
                Juego: <span className="fw-normal">{matrix.label}</span>
              </span>
            </div>
            <div>
              <span className={`me-2 ${styles.errors}`}>Aciertos:</span>
              <span className={`me-2 ${styles.hits}`}>Errores:</span>
            </div>
          </div>

          <div className={styles.matrix_container}>
            <Matrix rows={matrix.rows} columns={matrix.columns} />
          </div>
        </div>
      </div>
    </main>
  );
}

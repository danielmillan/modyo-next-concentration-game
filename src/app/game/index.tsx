"use client";

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function Game() {
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
          <div className="mt-3 d-flex justify-content-between">
            <div>
              <span>Nombre:</span>
            </div>
            <div>
              <span className={`me-2 ${styles.errors}`}>Aciertos:</span>
              <span className={`me-2 ${styles.hits}`}>Errores:</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

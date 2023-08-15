"use client";

import React from "react";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { matrixSize } from "@/data/matrix";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function Setup() {
  const router = useRouter();

  const submitForm = (e: any) => {
    e.preventDefault();
    router.push("/game");
    // console.log(e.target.matrix.value);
  };

  return (
    <main className={styles.main}>
      <div className="card">
        <div className="card-body">
          <div>
            <form onSubmit={submitForm}>
              <label htmlFor="name" className="form-label">
                Tamaño del tablero:
              </label>
              <select
                id="matrix"
                name="matrix"
                className="form-select"
                aria-label="Default select example"
              >
                <option>Selecciona el tamaño del tablero</option>
                {matrixSize.map((element, index) => (
                  <option key={index} value={index}>
                    {element.label}
                  </option>
                ))}
              </select>
              <div className="d-flex mt-4">
                <button type="submit" className="btn btn-primary w-100">
                  Crear Juego
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

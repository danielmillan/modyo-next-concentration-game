"use client";

import React, { useEffect } from "react";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./page.module.scss";
import { matrixSize } from "@/data/matrix";
import { useAppDispatch } from "@/redux/hooks";
import { setMatrix } from "@/redux/slices/config";
import { MatrixDefinition } from "@/types/MatrixDefinition";
import { restoreStorage } from "@/redux/slices/game";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function Setup() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreStorage());
  }, []);

  const submitForm = (e: any) => {
    e.preventDefault();
    const matrixOption: MatrixDefinition = matrixSize[e.target.matrix.value];
    dispatch(setMatrix(matrixOption));
    router.push("/game");
  };

  return (
    <main className={styles.main}>
      <Card>
        <Card.Body>
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
                required
              >
                <option>Selecciona el tamaño del tablero</option>
                {matrixSize.map((element: MatrixDefinition, index) => (
                  <option key={index} value={index}>
                    {element.label}
                  </option>
                ))}
              </select>
              <div className="d-flex mt-4">
                <Button type="submit" variant="primary" className="w-100">
                  Crear Juego
                </Button>
              </div>
            </form>
          </div>
        </Card.Body>
      </Card>
    </main>
  );
}

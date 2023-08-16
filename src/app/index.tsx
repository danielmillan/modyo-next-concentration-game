"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./page.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setName } from "@/redux/slices/config";
import { restoreStorage, selectScores } from "@/redux/slices/game";

export default function Home() {
  const [showScores, setshowScores] = useState(false);
  const scores = useAppSelector(selectScores);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(restoreStorage());
  }, []);

  const handleCloseScores = () => setshowScores(false);
  const handleShowScores = () => setshowScores(true);

  const submitForm = (e: any) => {
    e.preventDefault();
    dispatch(setName(e.target.name.value));
    router.push("/setup");
  };

  return (
    <main className={styles.main}>
      <Card>
        <Card.Body>
          <div>
            <form onSubmit={submitForm}>
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Jhon Doe"
                required
              />
              <div className="d-flex mt-4">
                <Button type="submit" variant="primary" className="w-100">
                  Iniciar
                </Button>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <Button type="button" variant="link" onClick={handleShowScores}>
                  Ver tabla de puntuaciones
                </Button>
              </div>
            </form>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showScores} onHide={handleCloseScores} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tabla de puntuaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Juego</th>
                  <th>Intentos</th>
                  <th>Puntos calculados</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={index}>
                    <td>{score.name}</td>
                    <td>{score.game}</td>
                    <td>{score.attempts}</td>
                    <td>{score.rating}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseScores}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

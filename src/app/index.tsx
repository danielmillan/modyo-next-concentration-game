"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { useAppDispatch } from "@/redux/hooks";
import { setName } from "@/redux/slices/config";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const submitForm = (e: any) => {
    e.preventDefault();
    dispatch(setName(e.target.name.value));
    router.push("/setup");
  };

  return (
    <main className={styles.main}>
      <div className="card">
        <div className="card-body">
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
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

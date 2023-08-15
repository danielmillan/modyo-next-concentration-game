import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "../page-wrapper";
import Game from "./index";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function GamePage() {
  return (
    <>
      <PageWrapper>
        <Game />
      </PageWrapper>
    </>
  );
}

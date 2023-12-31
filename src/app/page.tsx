import React from "react";
import type { Metadata } from "next";
import Home from "./index";
import { PageWrapper } from "./page-wrapper";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function HomePage() {
  return (
    <>
      <PageWrapper>
        <Home />
      </PageWrapper>
    </>
  );
}

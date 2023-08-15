import React from "react";
import type { Metadata } from "next";
import Home from "./index";

export const metadata: Metadata = {
  title: "Concentration Game - Modyo",
  description: "Concentration Game created by @danielmillan",
};

export default function HomeHomePage() {
  return (
    <>
      <Home />
    </>
  );
}

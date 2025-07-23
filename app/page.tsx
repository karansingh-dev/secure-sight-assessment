"use client";

import IncidentPreview from "@/components/feature/incidents";
import NavBar from "@/components/feature/navbar";

export default function Home() {
  return (
    <div className="h-260 bg-gradient-to-b from-[#151515] to-black space-y-8 ">
      <NavBar />
      <IncidentPreview />
    </div>
  );
}

"use client";
import TimeLineSvg from "@/components/custom/time-line-svg";
import IncidentPreview from "@/components/feature/incidents";
import NavBar from "@/components/feature/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#151515] to-black space-y-8 ">
      <NavBar />
      <IncidentPreview />
    </div>
  );
}

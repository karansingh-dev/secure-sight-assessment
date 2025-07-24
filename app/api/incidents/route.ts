import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get("resolved");

    await prisma.$connect();

    const where = resolved !== null ? { resolved: resolved === "true" } : {};

    const incidents = await prisma.incident.findMany({
      where,
      orderBy: { tsStart: "desc" },
      include: { camera: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully fetched incidents",
        incidents,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[GET /api/incidents] Error:", error);
    await prisma.$disconnect();

    return NextResponse.json(
      { error: "Failed to fetch incidents", success: false },
      { status: 500 }
    );
  }
}

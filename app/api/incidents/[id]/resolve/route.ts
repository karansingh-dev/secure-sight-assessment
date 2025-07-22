import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//uuid validator
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const incidentId = params.id;

    // Validate UUID
    if (!UUID_REGEX.test(incidentId)) {
      return NextResponse.json(
        { success: false, error: "Invalid incident ID format" },
        { status: 400 }
      );
    }

    const updated = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
    });

    if (!updated)
      return NextResponse.json(
        { success: false, error: "Incident not found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Incident successfully resolved",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/incidents/:id/resolve] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to resolve incident" },
      { status: 500 }
    );
  }
}

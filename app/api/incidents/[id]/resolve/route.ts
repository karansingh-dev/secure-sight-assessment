import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// UUID v4 validation regex pattern
// Ensures the incident ID follows proper UUID format before database operations
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * PATCH /api/incidents/[id]/resolve - Marks a security incident as resolved
 * 
 * Route Parameters:
 * - id: UUID of the incident to resolve
 * 
 * Functionality:
 * - Validates the incident ID format
 * - Updates the incident's resolved status to true
 * - Returns success/error response based on operation result
 * 
 
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const incidentId = id;

    // Validate incident ID format using UUID regex
    // Prevents unnecessary database calls with malformed IDs
    if (!UUID_REGEX.test(incidentId)) {
      return NextResponse.json(
        { success: false, error: "Invalid incident ID format" },
        { status: 400 }
      );
    }

    const incidentExist = await prisma.incident.findUnique({
      where: {
        id: incidentId,
      },
    });

    //  Check if incident exists and if not then return not found

    if (!incidentExist) {
      return NextResponse.json(
        { success: false, error: "Incident not found" },
        { status: 404 }
      );
    }

    //updates status
    await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
    });

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

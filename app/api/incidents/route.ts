import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/incidents - Retrieves security incidents from the database
 *
 * Query Parameters:
 * - resolved (optional): Filter incidents by resolution status
 *   - "true": Only resolved incidents
 *   - "false": Only unresolved incidents
 *   - omitted: All incidents regardless of status
 *
 * Returns: JSON response with incidents array including camera details
 */
export async function GET(request: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get("resolved");

    // Build conditional where clause based on resolved parameter
    // If resolved param exists, filter by boolean value, otherwise return all incidents

    const where = resolved !== null ? { resolved: resolved === "true" } : {};

    // Fetch incidents from database with applied filters
    const incidents = await prisma.incident.findMany({
      where,
      orderBy: { tsStart: "desc" }, // Sort by start time, newest first
      include: { camera: true },
    });

    // Return successful response with incidents data
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

    // Return error response to client
    return NextResponse.json(
      {
        error: "Failed to fetch incidents",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

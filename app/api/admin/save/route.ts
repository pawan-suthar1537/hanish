import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ADMIN_PASSWORD = "123456";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "portfolio.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read portfolio data", details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, data } = body;

    // Defense in depth: Verify password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid password" },
        { status: 401 }
      );
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid payload: 'data' object is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "portfolio.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Portfolio data successfully saved to data/portfolio.json",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save portfolio data", details: error?.message },
      { status: 500 }
    );
  }
}

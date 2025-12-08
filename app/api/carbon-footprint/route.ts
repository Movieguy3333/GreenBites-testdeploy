import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { calories, foodName } = await request.json();

    if (!calories || !foodName) {
      return NextResponse.json(
        { error: "Calories and foodName are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give me the approximate carbon footprint value of ${foodName} with ${calories} calories. Give it to me in kg of CO2 and only give me the number, nothing else`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Failed to fetch carbon footprint", details: errorData },
        { status: res.status }
      );
    }

    const data = await res.json();
    const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      return NextResponse.json(
        { error: "No response from API" },
        { status: 500 }
      );
    }

    const carbonFootprint = parseFloat(resultText) || 0;
    const rounded = Math.round(carbonFootprint * 100) / 100;
    console.log(rounded * 2);

    return NextResponse.json({ carbonFootprint: rounded });
  } catch (error) {
    console.error("Error calculating carbon footprint:", error);
    return NextResponse.json(
      {
        error: "Failed to calculate carbon footprint",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

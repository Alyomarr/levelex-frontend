import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Contact form submission:", body);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically send an email or save to a database

    return NextResponse.json({
      message: "Message received! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

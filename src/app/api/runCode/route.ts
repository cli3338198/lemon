// src/app/api/runCode/route.ts

import { NextRequest, NextResponse } from "next/server";
// const isolatedVm = require("isolated-vm");

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    const isolatedVm = await import("isolated-vm"); // Dynamically import
    const isolate = new isolatedVm.Isolate({ memoryLimit: 128 });
    const context = await isolate.createContext();
    const script = await isolate.compileScript(code);
    const result = await script.run(context);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

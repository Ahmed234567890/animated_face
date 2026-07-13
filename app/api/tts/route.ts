import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs/promises";

export async function POST(req: Request) {
  const { text } = await req.json();

  await new Promise((resolve, reject) => {
    exec(
      `echo "${text}" | piper --model /home/ahmed/piper/voices/en_US-amy-medium.onnx --output_file /tmp/speech.wav`,
      (err) => {
        if (err) reject(err);
        else resolve(null);
      }
    );
  });

  const audio = await fs.readFile("/tmp/speech.wav");

  return new NextResponse(audio, {
    headers: {
      "Content-Type": "audio/wav",
    },
  });
}

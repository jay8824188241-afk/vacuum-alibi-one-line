// The Vacuum's Alibi: One Line, 200 Characters
// Writes one original line in which a robot vacuum explains why it missed
// a spot, to /output/entry.txt (or the path given as the first argument).
// Node 22+, zero dependencies, fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const LINE =
  "I did not miss the spot. I scanned it twice, logged it as a crumb, and decided it had earned tenure.";

const outPath = resolve(process.argv[2] ?? process.env.OUTPUT_PATH ?? "/output/entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Self-check: the file on disk must be exactly the line we intended —
// one line, 1-200 characters, no trailing whitespace, byte length matching.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("output mismatch: file content differs from the entry line");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`output length ${written.length} is outside the 1-200 character gate`);
}
if (/\s$/.test(written) || written.includes("\n")) {
  throw new Error("output has trailing whitespace or more than one line");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(LINE, "utf8")) {
  throw new Error("output byte length does not match the entry line");
}

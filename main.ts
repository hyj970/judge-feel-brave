import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "entry.txt");
const outPath = path.join(outDir, "entry.txt");

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(entryPath, outPath);

// Read the output back and byte-compare: the grader must see exactly
// what entry.txt holds, so a silent partial copy is a hard failure.
const written = fs.readFileSync(outPath);
const source = fs.readFileSync(entryPath);
if (!written.equals(source)) {
  throw new Error("entry.txt copy mismatch: output differs from source");
}

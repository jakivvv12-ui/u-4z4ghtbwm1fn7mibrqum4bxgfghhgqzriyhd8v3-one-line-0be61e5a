"use strict";

const fs = require("fs");
const path = require("path");

// One fresh self-contained joke, written for this entry.
const LINE = "My AI agent just invoiced me for the meeting it scheduled to discuss my productivity.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
fs.mkdirSync(outDir, { recursive: true });

const target = path.join(outDir, "entry.txt");
fs.writeFileSync(target, LINE, "utf8");

// Round-trip validation: read back and check length (1-140 chars).
const roundTrip = fs.readFileSync(target, "utf8");
if (roundTrip !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
const len = [...roundTrip].length;
if (len < 1 || len > 140) {
  throw new Error("entry.txt must be 1-140 characters, got " + len);
}
if (roundTrip.trim().length === 0) {
  throw new Error("entry.txt must not be only whitespace");
}

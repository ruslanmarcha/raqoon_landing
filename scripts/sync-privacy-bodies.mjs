/**
 * Applies scripts/privacy-bodies/<code>.txt to src/i18n/locales/<file>.json → legal.privacy.body
 * Run from repo root: node scripts/sync-privacy-bodies.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BODIES = path.join(__dirname, "privacy-bodies");

const MAP = [
  ["ru", "ru.json"],
  ["en", "en.json"],
  ["de", "de.json"],
  ["fr", "fr.json"],
  ["ja", "ja.json"],
  ["ko", "ko.json"],
  ["ar", "ar.json"],
  ["th", "th.json"],
  ["pt-BR", "pt-BR.json"],
  ["tl", "tl.json"],
  ["pl", "pl.json"],
  ["id", "id.json"],
  ["zh-CN", "zh-CN.json"],
  ["cs", "cs.json"],
];

function main() {
  for (const [code, file] of MAP) {
    const txtPath = path.join(BODIES, `${code}.txt`);
    if (!fs.existsSync(txtPath)) {
      console.error(`Missing body file: ${txtPath}`);
      process.exit(1);
    }
    const body = fs.readFileSync(txtPath, "utf8").replace(/\r\n/g, "\n");
    const jsonPath = path.join(ROOT, "src", "i18n", "locales", file);
    const raw = fs.readFileSync(jsonPath, "utf8");
    const data = JSON.parse(raw);
    if (!data.legal?.privacy) {
      console.error(`No legal.privacy in ${file}`);
      process.exit(1);
    }
    data.legal.privacy.body = body;
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log("updated", file, body.length, "chars");
  }
}

main();

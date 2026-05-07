import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, "app");

const replacements = [
  ["rgba(22,163,74,0.08)", "var(--emerald-600-8)"],
  ["rgba(22,163,74,0.25)", "var(--emerald-600-25)"],

  ["rgba(255, 255, 255, 0.04)", "var(--white-4)"],
  ["rgba(255,255,255,0.04)", "var(--white-4)"],
  ["rgba(255, 255, 255, 0.1)", "var(--white-10)"],
  ["rgba(255,255,255,0.1)", "var(--white-10)"],

  ["rgba(34,197,94,0.05)", "var(--green-500-5)"],
  ["rgba(34,197,94,0.06)", "var(--green-500-6)"],
  ["rgba(34,197,94,0.1)", "var(--green-500-10)"],
  ["rgba(34,197,94,0.25)", "var(--green-500-25)"],

  ["rgba(74,222,128,0.07)", "var(--green-400-7)"],
  ["rgba(74,222,128,0.08)", "var(--green-400-8)"],
  ["rgba(74,222,128,0.1)", "var(--green-400-10)"],
  ["rgba(74,222,128,0.15)", "var(--green-400-15)"],
  ["rgba(74,222,128,0.2)", "var(--green-400-20)"],
  ["rgba(74,222,128,0.3)", "var(--green-400-30)"],
  ["rgba(74,222,128,0.4)", "var(--green-400-40)"],

  ["rgba(37,99,235,0.06)", "var(--blue-700-6)"],
  ["rgba(37,99,235,0.08)", "var(--blue-700-8)"],
  ["rgba(37,99,235,0.1)", "var(--blue-700-10)"],
  ["rgba(37,99,235,0.12)", "var(--blue-700-12)"],
  ["rgba(37,99,235,0.25)", "var(--blue-700-25)"],

  ["rgba(59,130,246,0.1)", "var(--blue-500-10)"],

  ["rgba(96,165,250,0.1)", "var(--blue-400-10)"],
  ["rgba(96,165,250,0.12)", "var(--blue-400-12)"],
  ["rgba(96,165,250,0.2)", "var(--blue-400-20)"],
  ["rgba(96,165,250,0.3)", "var(--blue-400-30)"],
];

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (/\.(tsx|ts|css|js)$/.test(file)) {
      let content = fs.readFileSync(filePath, "utf8");

      let updated = content;

      for (const [from, to] of replacements) {
        updated = updated.split(from).join(to);
      }

      if (updated !== content) {
        fs.writeFileSync(filePath, updated, "utf8");
        console.log("updated:", filePath);
      }
    }
  }
}

walk(TARGET_DIR);

console.log("Done ✅");
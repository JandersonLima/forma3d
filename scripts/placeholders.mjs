/**
 * Gera imagens provisórias para todo caminho /images/... citado em src/content/home.ts.
 * Não sobrescreve arquivos existentes (protege renders reais); use --force para regenerar.
 *
 *   npm run placeholders
 *   npm run placeholders -- --force
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");

const { home } = await import(new URL("../src/content/home.ts", import.meta.url).href);

// Proporções por pasta — manter em sincronia com os componentes que as exibem.
const SIZES = {
  showcase: [800, 1000], // 4:5 — ShowcaseCard usa aspect-[4/5]
  modes: [1200, 900],
  printing: [1600, 1000],
  games: [1200, 900],
  industries: [900, 1200],
  avatars: [160, 160],
  gallery: [800, 800],
  features: [1200, 750],
};

// Tons copiados dos tokens de src/app/globals.css (script de build, não componente).
const TONE = {
  neutral: { bg: "#1a1d24", border: "#272b35", ink: "#9ba3b4" }, // surface-2 / line / ink-muted
  result: { bg: "#1c2340", border: "#4d6bff", ink: "#f2f4f8" }, // accent-soft / accent / ink
};

const IMAGE_PATH = /^\/images\/.+\.(webp|svg)$/;

/** Percorre o conteúdo e devolve { src, label, tone } para cada caminho de imagem. */
function collect(node, out = []) {
  if (Array.isArray(node)) {
    node.forEach((child) => collect(child, out));
  } else if (node && typeof node === "object") {
    const base = node.label ?? node.title ?? node.name;
    for (const [key, value] of Object.entries(node)) {
      if (typeof value === "string" && IMAGE_PATH.test(value)) {
        const fallback = path.basename(value, path.extname(value));
        let label = base ?? fallback;
        let tone = "neutral";
        if (key === "imageBefore") label += " · entrada";
        if (key === "imageAfter") {
          label += " · resultado";
          tone = "result";
        }
        out.push({ src: value, label, tone });
      } else {
        collect(value, out);
      }
    }
  }
  return out;
}

const escapeXml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);

function rasterSvg([w, h], label, tone) {
  const t = TONE[tone];
  // Cabe na largura: ~0.55em por caractere, 80% da largura útil.
  const fontSize = Math.max(10, Math.round(Math.min(Math.min(w, h) / 14, (w * 0.8) / (label.length * 0.55))));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${t.bg}"/>
  <rect x="${fontSize / 2}" y="${fontSize / 2}" width="${w - fontSize}" height="${h - fontSize}" fill="none" stroke="${t.border}" stroke-width="2" rx="${fontSize / 2}"/>
  <text x="50%" y="50%" fill="${t.ink}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>
</svg>`;
}

function logoSvg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48" viewBox="0 0 160 48">
  <text x="80" y="24" fill="${TONE.neutral.ink}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="18" font-weight="600" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>
</svg>
`;
}

const exists = (file) =>
  access(file).then(
    () => true,
    () => false,
  );

const items = [...new Map(collect(home).map((item) => [item.src, item])).values()];
let created = 0;
let skipped = 0;

for (const { src, label, tone } of items) {
  const file = path.join(root, "public", ...src.split("/").filter(Boolean));
  if (!force && (await exists(file))) {
    skipped++;
    continue;
  }
  await mkdir(path.dirname(file), { recursive: true });

  if (src.endsWith(".svg")) {
    await writeFile(file, logoSvg(label));
  } else {
    const folder = src.split("/")[2];
    const size = SIZES[folder];
    if (!size) throw new Error(`Sem proporção definida para a pasta "${folder}" (${src})`);
    await sharp(Buffer.from(rasterSvg(size, label, tone))).webp({ quality: 80 }).toFile(file);
  }
  created++;
  console.log(`+ ${src}`);
}

console.log(`\n${created} criado(s), ${skipped} já existente(s) pulado(s).`);

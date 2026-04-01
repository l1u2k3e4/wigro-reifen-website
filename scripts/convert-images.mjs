// scripts/convert-images.mjs
// Konvertiert alle Bilder in /public zu WebP mit optimaler Kompression
import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname

const CONFIGS = {
  // Team-Fotos: 800px breit, Qualität 80%
  'Mitarbeiter Bilder': { width: 800, quality: 80 },
  // Werkstatt + Logos: 1200px breit (oder original wenn kleiner), Qualität 82%
  'Logo Sonstige': { width: 1200, quality: 82 },
  // Reifenmarken-Logos: 400px breit, Qualität 85%
  'Bilder Reifenmarken': { width: 400, quality: 85 },
}

async function convertDir(dirName, config) {
  const dirPath = join(PUBLIC_DIR, dirName)
  const files = await readdir(dirPath)

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue
    // Skip SVG
    if (file.endsWith('.svg')) continue

    const inputPath = join(dirPath, file)
    const outputName = basename(file, ext) + '.webp'
    const outputPath = join(dirPath, outputName)

    const inputStat = await stat(inputPath)
    const inputSizeMB = (inputStat.size / 1024 / 1024).toFixed(2)

    await sharp(inputPath)
      .resize({ width: config.width, withoutEnlargement: true })
      .webp({ quality: config.quality })
      .toFile(outputPath)

    const outputStat = await stat(outputPath)
    const outputSizeKB = (outputStat.size / 1024).toFixed(0)

    console.log(`✓ ${file} (${inputSizeMB} MB) → ${outputName} (${outputSizeKB} KB)`)
  }
}

console.log('Konvertiere Bilder zu WebP...\n')
for (const [dir, config] of Object.entries(CONFIGS)) {
  console.log(`📁 ${dir}`)
  await convertDir(dir, config)
  console.log()
}
console.log('Fertig!')

import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data/albums');

// Mengambil seluruh data album dari file JSON
export function getAllAlbums() {
  if (!fs.existsSync(dataDirectory)) return [];
  const fileNames = fs.readdirSync(dataDirectory);
  
  const allAlbums = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const slug = fileName.replace(/\.json$/, '');
      const fullPath = path.join(dataDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents);
      
      return {
        slug,
        ...data
      };
    });

  // Urutkan berdasarkan waktu file atau parameter custom (Default: Terbaru)
  return allAlbums.sort((a, b) => b.year - a.year);
}

// Mengambil single album berdasarkan slug
export function getAlbumBySlug(slug) {
  try {
    const fullPath = path.join(dataDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (e) {
    return null;
  }
}

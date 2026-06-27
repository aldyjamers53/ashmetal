import { getAlbumBySlug, getAllAlbums } from '@/lib/dataEngine';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/components/SchemaMarkup';
import AdPlaceholder from '@/components/AdPlaceholder';
import Link from 'next/link';

// Memaksa Next.js membuat static cache halaman (SSG)
export async function generateStaticParams() {
  const albums = getAllAlbums();
  return albums.map((album) => ({
    slug: album.slug,
  }));
}

// Otomatisasi SEO Metadata Eksklusif per Album
export async function generateMetadata({ params }) {
  const album = getAlbumBySlug(params.slug);
  if (!album) return {};

  const title = `Download Album ${album.artist} - ${album.title} Full MP3 (${album.year}) rar zip`;
  const description = `Unduh lagu full album gratis ${album.title} dari ${album.artist} Rilis tahun ${album.year}. Kualitas ${album.quality}, ukuran file ${album.size}. Link download Google Drive & Mirror resmi.`;

  return {
    title,
    description,
    alternates: { canonical: `/album/${params.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: album.cover }],
      type: 'music.album',
    },
  };
}

export default function AlbumDetail({ params }) {
  const album = getAlbumBySlug(params.slug);
  if (!album) notFound();

  // Algoritma Internal Linking Otomatis (Related Albums)
  const allAlbums = getAllAlbums();
  const relatedAlbums = allAlbums
    .filter(a => (a.artist === album.artist || a.genre === album.genre) && a.slug !== params.slug)
    .slice(0, 4);

  return (
    <main className="container WapLayout">
      <SchemaMarkup album={album} slug={params.slug} />
      
      {/* Breadcrumb Section */}
      <nav className="breadcrumb">
        <Link href="/">Home</Link> » <Link href={`/genre/${album.genre.toLowerCase()}`}>{album.genre}</Link> » <span>{album.title}</span>
      </nav>

      <AdPlaceholder zone="header_banner" />

      {/* Album Card Header */}
      <section className="album-header-card">
        <img src={album.cover} alt={`${album.title} Cover`} className="main-cover" loading="eager" />
        <div className="album-info-meta">
          <h1>{album.artist} - {album.title}</h1>
          <table>
            <tbody>
              <tr><td>Rilis</td><td>: {album.year}</td></tr>
              <tr><td>Negara</td><td>: {album.country}</td></tr>
              <tr><td>Label</td><td>: {album.label}</td></tr>
              <tr><td>Kualitas</td><td>: <span className="badge-quality">{album.quality}</span></td></tr>
              <tr><td>Ukuran File</td><td>: {album.size}</td></tr>
              <tr><td>Durasi</td><td>: {album.duration}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Description */}
      <article className="album-desc">
        <p>{album.description}</p>
      </article>

      {/* Tracklist Zone */}
      <section className="tracklist-box">
        <h3>🎼 Tracklist Full Album:</h3>
        <ul>
          {album.tracklist.map((track, idx) => (
            <li key={idx}><strong>{String(idx + 1).padStart(2, '0')}.</strong> {track}</li>
          ))}
        </ul>
      </section>

      <AdPlaceholder zone="below_tracklist" />

      {/* Download Action Core */}
      <section className="download-zone">
        <h3>📥 Link Download Full Album (.zip / .rar)</h3>
        <a href={album.download} target="_blank" rel="noopener noreferrer" className="btn-dl btn-gdrive">Download via Google Drive</a>
        {album.mirrors?.map((mirror, index) => (
          <a key={index} href={mirror} target="_blank" rel="noopener noreferrer" className="btn-dl btn-mirror">Mirror Link {index + 1}</a>
        ))}
      </section>

      <AdPlaceholder zone="below_download" />

      {/* Related Internal Links Engine */}
      <section className="related-box">
        <h3>💿 Album Terkait Lainnya:</h3>
        <div className="album-grid">
          {relatedAlbums.map(rel => (
            <Link href={`/album/${rel.slug}`} key={rel.slug} className="grid-item">
              <img src={rel.cover} alt={rel.title} loading="lazy" />
              <span>{rel.artist} - {rel.title} ({rel.year})</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

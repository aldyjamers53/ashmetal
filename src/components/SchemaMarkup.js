export default function SchemaMarkup({ album, slug }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": album.title,
    "image": album.cover,
    "byArtist": {
      "@type": "MusicGroup",
      "name": album.artist
    },
    "datePublished": album.year,
    "genre": album.genre,
    "numTracks": album.tracklist?.length || 0,
    "offers": {
      "@type": "Offer",
      "url": `https://domainanda.com/album/${slug}`,
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "track": album.tracklist?.map((track, index) => ({
      "@type": "MusicRecording",
      "name": track,
      "position": index + 1
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

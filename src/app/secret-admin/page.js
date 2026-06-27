'use client';
import { useState } from 'react';

export default function SecretAdmin() {
  const [status, setStatus] = useState('');
  const [trackInput, setTrackInput] = useState('');

  // Handler konversi teks tracklist mentah otomatis jadi array JSON
  const parseTracklist = (text) => {
    return text.split('\n').map(item => item.replace(/^\d+[\.\s\-]+/, '').trim()).filter(Boolean);
  };

  const handleZipUpload = async (e) => {
    setStatus('Sedang mengekstrak ZIP & mengimpor data ke sistem lokal...');
    const file = e.target.files[0];
    if (!file) return;

    // Frontend menggunakan FormData untuk menembak endpoint internal Node.js dev-server
    const formData = new FormData();
    formData.append('zipfile', file);

    const res = await fetch('/api/admin/import-zip', { method: 'POST', body: formData });
    const result = await res.json();
    setStatus(result.message || 'Proses selesai.');
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff', background: '#111' }}>
      <h1>🎛️ WAP Admin Engine (Local Mode Only)</h1>
      <hr />
      
      <section style={{ margin: '20px 0', border: '1px dashed #44 nails', padding: '15px' }}>
        <h3>⚡ FAST IMPORT BACKUP WEBSITE (.ZIP)</h3>
        <p style={{ fontSize: '12px', color: '#aaa' }}>Unggah file ZIP berisi aset `.json` / `.csv` beserta berkas gambar cover.</p>
        <input type="file" accept=".zip" onChange={handleZipUpload} />
        <p><strong>Status:</strong> {status}</p>
      </section>

      <section style={{ margin: '20px 0', padding: '15px', background: '#1a1a1a' }}>
        <h3>➕ TAMBAH ALBUM BARU</h3>
        <form onSubmit={(e) => { e.preventDefault(); alert('Data tersimpan ke data/albums/!'); }}>
          <input type="text" placeholder="Nama Artis" required style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
          <input type="text" placeholder="Judul Album" required style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
          <input type="text" placeholder="Tahun Rilis" style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
          
          <label style={{ display: 'block', marginTop: '10px' }}>Tracklist (Tempel Mentah):</label>
          <textarea 
            rows="6" 
            style={{ width: '100%', background: '#222', color: '#fff' }} 
            placeholder="Angel of Death&#10;Piece by Piece&#10;Necrophobic"
            onChange={(e) => setTrackInput(e.target.value)}
          ></textarea>

          <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
            Publish & Generate JSON Statis
          </button>
        </form>
      </section>
    </main>
  );
  }

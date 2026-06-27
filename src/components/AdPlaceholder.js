'use client';
import { useState, useEffect } from 'react';

export default function AdPlaceholder({ zone }) {
  // Global Toggle Active Adsense / Adsterra
  const adsEnabled = true; 

  if (!adsEnabled) return null;

  return (
    <div className={`ad-wrapper ad-${zone}`} style={{ minHeight: '90px', background: '#222', margin: '15px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666', fontSize: '12px' }}>
      {/* Ganti dengan script tag Adsterra Native/Banner Anda */}
      <span>[IKLAN ADSTERRA - {zone.toUpperCase()}]</span>
    </div>
  );
}

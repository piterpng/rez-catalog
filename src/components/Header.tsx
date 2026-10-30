import React from 'react';
import { ViewMode, SortOption, SegmentTier } from '../types/invitation';
import { SEGMENTS } from '../data/initialCatalog';

interface HeaderProps {
  totalCount: number;
  segmentCounts: Record<SegmentTier, number>;
  selectedSegment: string;
  onSelectSegment: (segment: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  segmentCounts,
  selectedSegment,
  onSelectSegment,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#dce2f7]">
      {/* Top Bar */}
      <div className="h-20 w-full px-4 sm:px-6 flex items-center justify-between border-b border-[#e9edff]">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <img
              alt="Logo UD REZ WAN JAYA"
              className="h-8 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UyxsX4j-OkCArZ6JY7dk31eB53Jv4WnycTKzFYop1zzFONuBB9Vc16Hi8Ro_XlT-TUqoyScsuhoY9F7bHQ7Z4zKbgIXrTfsKRChiTS-1Lrp5ez05Yh-82EpIcYqKPlsUWmcFmA5uPhx7REFR_zvjeYmyWqF76TXTd_HhWH3ZBiYeGp1ZX5lOPw9aNqUHbrcZvOU0MiC8Suj6Ir5w3LLuhiSEVG59o2iDFL2liPJdd1"
            />
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider uppercase text-[#964900] font-bold">
                UD REZ WAN JAYA
              </span>
              <span className="text-[20px] sm:text-[22px] text-[#141b2b] leading-tight font-serif font-semibold">
                Katalog Galeri Undangan
              </span>
            </div>
          </div>

          {/* Verified Designs Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e9edff] text-[#574235] text-[11px] font-semibold border border-[#dce2f7]">
            <span className="material-symbols-outlined text-[16px] text-[#964900]">verified</span>
            <span className="font-bold text-[#141b2b]">{totalCount} Desain</span> Terverifikasi • 4 Segmen
          </div>

          {/* Segment Pills */}
          <div className="hidden 2xl:flex items-center gap-2">
            {SEGMENTS.map((seg) => {
              const isSelected = selectedSegment === seg.id;
              const count = segmentCounts[seg.id as SegmentTier] ?? 0;
              return (
                <button
                  key={seg.id}
                  onClick={() => onSelectSegment(isSelected ? '' : seg.id)}
                  style={{
                    backgroundColor: seg.bg,
                    color: seg.text,
                    borderColor: seg.border,
                  }}
                  className={`px-3 py-0.5 rounded-full border text-[11px] font-bold transition-all hover:scale-105 cursor-pointer flex items-center gap-1 shadow-xs ${
                    isSelected ? 'ring-2 ring-[#f57c00] ring-offset-1 scale-105 font-extrabold' : ''
                  }`}
                  title={`Klik untuk filter ${seg.name}`}
                >
                  <span className="material-symbols-outlined text-[13px]">{seg.icon}</span>
                  {seg.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area: Profile */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full bg-[#964900] flex items-center justify-center text-white shadow-xs"
            title="UD Rez Wan Jaya"
          >
            <span className="material-symbols-outlined text-[19px]">person</span>
          </div>
        </div>
      </div>

      {/* Sub Header / Control Bar */}
      <div className="h-14 w-full px-4 sm:px-6 flex items-center justify-between bg-[#f9f9ff] gap-3">
        {/* Search & Sort Group */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7263] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama seri, kode produk, jenis kertas..."
              className="w-full h-10 pl-10 pr-8 rounded-md border border-[#dec1af] bg-white text-[14px] text-[#141b2b] placeholder:text-[#8b7263]/70 focus:outline-none focus:border-[#f57c00] focus:ring-2 focus:ring-[#f57c00]/20 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b7263] hover:text-[#141b2b] text-[16px] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-[#8b7263] text-[18px] hidden sm:inline-block">
              sort
            </span>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Urutkan Katalog Undangan"
              className="h-10 px-3 pr-8 rounded-md border border-[#dec1af] bg-white text-[12px] font-semibold text-[#141b2b] focus:outline-none focus:border-[#f57c00] shadow-2xs cursor-pointer"
            >
              <option value="series-az">Urutkan: Series & Kode (A–Z)</option>
              <option value="series-za">Urutkan: Series & Kode (Z–A)</option>
              <option value="popular">Model Terpopuler</option>
              <option value="latest">Rilisan Terbaru</option>
            </select>
          </div>
        </div>

        {/* View Mode Switcher */}
        <nav className="flex items-center p-1 bg-[#e9edff] rounded-lg text-[12px] font-semibold shrink-0">
          <button
            onClick={() => onViewModeChange('galeri-grid-4-kolom')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
              viewMode === 'galeri-grid-4-kolom'
                ? 'bg-[#f57c00] text-[#572800] font-bold shadow-xs'
                : 'text-[#574235] hover:text-[#141b2b]'
            }`}
            title="Tampilan Grid 4 Kolom"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span className="hidden md:inline">Grid 4 Kolom</span>
          </button>
          <button
            onClick={() => onViewModeChange('galeri-compact-6-kolom')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
              viewMode === 'galeri-compact-6-kolom'
                ? 'bg-[#f57c00] text-[#572800] font-bold shadow-xs'
                : 'text-[#574235] hover:text-[#141b2b]'
            }`}
            title="Tampilan Grid Compact 6 Kolom"
          >
            <span className="material-symbols-outlined text-[16px]">view_compact</span>
            <span className="hidden md:inline">Grid Compact</span>
          </button>
          <button
            onClick={() => onViewModeChange('galeri-tabel-data')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
              viewMode === 'galeri-tabel-data'
                ? 'bg-[#f57c00] text-[#572800] font-bold shadow-xs'
                : 'text-[#574235] hover:text-[#141b2b]'
            }`}
            title="Tampilan List / Tabel"
          >
            <span className="material-symbols-outlined text-[16px]">table_rows</span>
            <span className="hidden md:inline">List / Tabel</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

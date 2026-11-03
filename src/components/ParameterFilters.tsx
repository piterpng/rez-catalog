import React from 'react';

export interface FilterState {
  segment: string;
  primaryColor: string;
  secondaryColor: string;
  foldingType: string;
  orientation: string;
  hasEnvelope: string;
}

interface ParameterFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
  totalFiltered: number;
  totalCatalog: number;
  startIndex: number;
  endIndex: number;
  sortLabel: string;
  availableColors?: string[];
  availableFoldings?: string[];
}

export const ParameterFilters: React.FC<ParameterFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isFiltered,
  totalFiltered,
  totalCatalog,
  startIndex,
  endIndex,
  sortLabel,
  availableColors = [
    'Cokelat',
    'Biru',
    'Pink',
    'Hitam',
    'Krem',
    'Hijau',
    'Kuning / Emas',
    'Putih',
    'Ungu',
    'Abu-abu',
    'Merah',
  ],
  availableFoldings = ['Lipat 2', 'Lipat 3', 'Single Card'],
}) => {
  return (
    <section className="w-full px-4 sm:px-6 py-3 bg-[#f1f3ff] border-b border-[#dce2f7]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Dropdown selectors group */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Segmen Harga Filter */}
          <div className="relative min-w-[130px] flex-1 sm:flex-none">
            <select
              value={filters.segment}
              onChange={(e) => onFilterChange('segment', e.target.value)}
              aria-label="Filter Berdasarkan Segmen"
              className="w-full h-9 pl-3 pr-8 rounded-lg bg-white text-[#141b2b] text-[11px] font-semibold shadow-xs border border-[#dec1af]/60 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/20 appearance-none cursor-pointer"
            >
              <option value="">Segmen: Semua</option>
              <option value="SUPER HEMAT">Super Hemat</option>
              <option value="EKONOMIS">Ekonomis</option>
              <option value="MENENGAH">Menengah</option>
              <option value="PREMIUM">Premium</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#8b7263] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Warna Dominan Filter */}
          <div className="relative min-w-[130px] flex-1 sm:flex-none">
            <select
              value={filters.primaryColor}
              onChange={(e) => onFilterChange('primaryColor', e.target.value)}
              aria-label="Filter Berdasarkan Warna Dominan"
              className="w-full h-9 pl-3 pr-8 rounded-lg bg-white text-[#141b2b] text-[11px] font-semibold shadow-xs border border-[#dec1af]/60 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/20 appearance-none cursor-pointer"
            >
              <option value="">Warna Dominan</option>
              {availableColors.map((color) => (
                <option key={`p-${color}`} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#8b7263] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Warna Sekunder / Aksen Filter */}
          <div className="relative min-w-[130px] flex-1 sm:flex-none">
            <select
              value={filters.secondaryColor}
              onChange={(e) => onFilterChange('secondaryColor', e.target.value)}
              aria-label="Filter Berdasarkan Warna Sekunder"
              className="w-full h-9 pl-3 pr-8 rounded-lg bg-white text-[#141b2b] text-[11px] font-semibold shadow-xs border border-[#dec1af]/60 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/20 appearance-none cursor-pointer"
            >
              <option value="">Warna Sekunder</option>
              {availableColors.map((color) => (
                <option key={`s-${color}`} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#8b7263] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Jenis Lipatan Filter */}
          <div className="relative min-w-[130px] flex-1 sm:flex-none">
            <select
              value={filters.foldingType}
              onChange={(e) => onFilterChange('foldingType', e.target.value)}
              aria-label="Filter Berdasarkan Jenis Lipatan"
              className="w-full h-9 pl-3 pr-8 rounded-lg bg-white text-[#141b2b] text-[11px] font-semibold shadow-xs border border-[#dec1af]/60 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/20 appearance-none cursor-pointer"
            >
              <option value="">Jenis Lipatan</option>
              {availableFoldings.map((fold) => (
                <option key={fold} value={fold}>
                  {fold}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#8b7263] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Orientasi Layout Filter */}
          <div className="relative min-w-[110px] flex-1 sm:flex-none">
            <select
              value={filters.orientation}
              onChange={(e) => onFilterChange('orientation', e.target.value)}
              aria-label="Filter Berdasarkan Orientasi Layout"
              className="w-full h-9 pl-3 pr-8 rounded-lg bg-white text-[#141b2b] text-[11px] font-semibold shadow-xs border border-[#dec1af]/60 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/20 appearance-none cursor-pointer"
            >
              <option value="">Orientasi</option>
              <option value="Portrait">Portrait</option>
              <option value="Lanskap">Lanskap</option>
              <option value="Persegi">Persegi</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#8b7263] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Status Amplop Filter */}
          <div className="relative min-w-[125px] flex-1 sm:flex-none">
            <select
              value={filters.hasEnvelope}
              onChange={(e) => onFilterChange('hasEnvelope', e.target.value)}
              aria-label="Filter Berdasarkan Status Amplop"
              className="w-full h-9 pl-3 pr-8 rounded-lg bg-white text-[#141b2b] text-[11px] font-semibold shadow-xs border border-[#dec1af]/60 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/20 appearance-none cursor-pointer"
            >
              <option value="">Amplop</option>
              <option value="dengan-amplop">Dengan Amplop</option>
              <option value="tanpa-amplop">Tanpa Amplop</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#8b7263] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="h-9 px-3 rounded-lg bg-[#e9edff] text-[#574235] hover:text-[#964900] hover:bg-[#dce2f7] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Bersihkan semua filter"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Result Counter & Sort Indicator */}
        <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-1 lg:pt-0">
          <div className="flex items-center gap-1.5 text-[#574235] text-[12px]">
            <span className="w-2 h-2 rounded-full bg-[#f57c00] animate-pulse"></span>
            <span>
              Menampilkan{' '}
              <strong className="text-[#141b2b] font-bold">
                {totalFiltered === 0 ? 0 : `${startIndex}–${endIndex}`}
              </strong>{' '}
              dari <strong className="text-[#141b2b] font-bold">{totalFiltered}</strong> Produk
              {totalFiltered !== totalCatalog && (
                <span className="text-[#8b7263] ml-1">(total {totalCatalog})</span>
              )}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[#8b7263] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[15px]">sync_alt</span>
            <span>{sortLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

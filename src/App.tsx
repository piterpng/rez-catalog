/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { InvitationItem, ViewMode, SortOption, SegmentTier } from './types/invitation';
import { INITIAL_CATALOG } from './data/initialCatalog';
import { Header } from './components/Header';
import { SeriesFilterRail } from './components/SeriesFilterRail';
import { ParameterFilters, FilterState } from './components/ParameterFilters';
import { CardGrid4 } from './components/CardGrid4';
import { CardGridCompact6 } from './components/CardGridCompact6';
import { DataTable } from './components/DataTable';
import { PreviewModal } from './components/PreviewModal';
import { FooterPagination } from './components/FooterPagination';

export default function App() {
  const [catalog] = useState<InvitationItem[]>(INITIAL_CATALOG);

  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('series-az');
  const [viewMode, setViewMode] = useState<ViewMode>('galeri-grid-4-kolom');

  const [filters, setFilters] = useState<FilterState>({
    segment: '',
    primaryColor: '',
    secondaryColor: '',
    foldingType: '',
    orientation: '',
    hasEnvelope: '',
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  // Lightbox Preview Modal
  const [previewItem, setPreviewItem] = useState<InvitationItem | null>(null);

  // Counts by series
  const seriesCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    catalog.forEach((item) => {
      counts[item.series] = (counts[item.series] || 0) + 1;
    });
    return counts;
  }, [catalog]);

  // Counts by segment
  const segmentCounts = useMemo(() => {
    const counts: Record<SegmentTier, number> = {
      'SUPER HEMAT': 0,
      'EKONOMIS': 0,
      'MENENGAH': 0,
      'PREMIUM': 0,
    };
    catalog.forEach((item) => {
      if (counts[item.segment] !== undefined) {
        counts[item.segment]++;
      }
    });
    return counts;
  }, [catalog]);

  // Filter Handler
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedSeries('');
    setSearchQuery('');
    setFilters({
      segment: '',
      primaryColor: '',
      secondaryColor: '',
      foldingType: '',
      orientation: '',
      hasEnvelope: '',
    });
    setCurrentPage(1);
  };

  const isFiltered = Boolean(
    selectedSeries ||
      searchQuery ||
      filters.segment ||
      filters.primaryColor ||
      filters.secondaryColor ||
      filters.foldingType ||
      filters.orientation ||
      filters.hasEnvelope
  );

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      // Series filter
      if (selectedSeries && selectedSeries !== 'Semua Series' && item.series !== selectedSeries) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          item.code.toLowerCase().includes(q) ||
          item.series.toLowerCase().includes(q) ||
          item.paperType.toLowerCase().includes(q) ||
          item.foldingType.toLowerCase().includes(q);
        if (!match) return false;
      }
      // Segment filter
      if (filters.segment && item.segment !== filters.segment) {
        return false;
      }
      // Primary color
      if (filters.primaryColor && !item.primaryColorName.toLowerCase().includes(filters.primaryColor.toLowerCase())) {
        return false;
      }
      // Secondary color
      if (filters.secondaryColor && !item.secondaryColorName.toLowerCase().includes(filters.secondaryColor.toLowerCase())) {
        return false;
      }
      // Folding
      if (filters.foldingType && !item.foldingType.toLowerCase().includes(filters.foldingType.toLowerCase())) {
        return false;
      }
      // Orientation
      if (filters.orientation && item.orientation !== filters.orientation) {
        return false;
      }
      // Envelope
      if (filters.hasEnvelope === 'dengan-amplop' && !item.hasEnvelope) return false;
      if (filters.hasEnvelope === 'tanpa-amplop' && item.hasEnvelope) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'series-az') {
        const seriesCompare = a.series.localeCompare(b.series);
        if (seriesCompare !== 0) return seriesCompare;
        return a.code.localeCompare(b.code);
      }
      if (sortOption === 'series-za') {
        const seriesCompare = b.series.localeCompare(a.series);
        if (seriesCompare !== 0) return seriesCompare;
        return b.code.localeCompare(a.code);
      }
      if (sortOption === 'popular') {
        return (b.popularityScore || 0) - (a.popularityScore || 0);
      }
      if (sortOption === 'latest') {
        return (b.releaseDate || '').localeCompare(a.releaseDate || '');
      }
      return 0;
    });
  }, [catalog, selectedSeries, searchQuery, filters, sortOption]);

  // Pagination calculation
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, safeCurrentPage, pageSize]);

  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(safeCurrentPage * pageSize, totalItems);

  const sortLabels: Record<SortOption, string> = {
    'series-az': 'A–Z Series',
    'series-za': 'Z–A Series',
    'popular': 'Model Terpopuler',
    'latest': 'Rilisan Terbaru',
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#141b2b] flex flex-col font-sans">
      {/* Main Header */}
      <Header
        totalCount={catalog.length}
        segmentCounts={segmentCounts}
        selectedSegment={filters.segment}
        onSelectSegment={(seg) => handleFilterChange('segment', seg)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Container below fixed header */}
      <main className="w-full pt-[9.5rem] sm:pt-[8.5rem] bg-[#f9f9ff] flex-1 flex flex-col">
        {/* Series Quick Filter Navigation Rail */}
        <SeriesFilterRail
          selectedSeries={selectedSeries}
          onSelectSeries={(series) => {
            setSelectedSeries(series);
            setCurrentPage(1);
          }}
          seriesCounts={seriesCounts}
          totalCount={catalog.length}
        />

        {/* Advanced Parameter Filters Strip */}
        <ParameterFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
          totalFiltered={totalItems}
          totalCatalog={catalog.length}
          startIndex={startIndex}
          endIndex={endIndex}
          sortLabel={sortLabels[sortOption]}
        />

        {/* Main Content Area */}
        <div className="w-full px-4 sm:px-6 py-6 sm:py-8 flex-1">
          {totalItems === 0 ? (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-[#dec1af] p-6 shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#964900] mb-3">
                <span className="material-symbols-outlined text-[32px]">filter_alt_off</span>
              </div>
              <h3 className="font-serif font-bold text-[20px] text-[#141b2b] mb-1">
                Tidak ada desain undangan yang cocok
              </h3>
              <p className="text-[13px] text-[#574235] max-w-md mb-4">
                Coba sesuaikan kata kunci pencarian atau bersihkan parameter filter untuk melihat koleksi lainnya.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-lg bg-[#f57c00] text-[#572800] hover:bg-[#9b4500] hover:text-white font-bold text-[13px] transition-colors cursor-pointer shadow-xs"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <>
              {viewMode === 'galeri-grid-4-kolom' && (
                <CardGrid4
                  items={paginatedItems}
                  onPreview={setPreviewItem}
                />
              )}

              {viewMode === 'galeri-compact-6-kolom' && (
                <CardGridCompact6
                  items={paginatedItems}
                  onPreview={setPreviewItem}
                />
              )}

              {viewMode === 'galeri-tabel-data' && (
                <DataTable
                  items={paginatedItems}
                  onPreview={setPreviewItem}
                />
              )}
            </>
          )}
        </div>

        {/* Complete Pagination and Catalog Status Bottom Area */}
        <FooterPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </main>

      {/* Lightbox Preview Modal */}
      <PreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />
    </div>
  );
}

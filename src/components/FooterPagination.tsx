import React from 'react';

interface FooterPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  startIndex: number;
  endIndex: number;
}

export const FooterPagination: React.FC<FooterPaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  startIndex,
  endIndex,
}) => {
  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('•••');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('•••');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      {/* Complete Pagination and Catalog Status Bottom Area */}
      <footer className="w-full bg-white px-4 sm:px-6 py-4 shadow-sm border-t border-[#e9edff] mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status & Page Items Selector */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[12px] text-[#574235]">
              Menampilkan <span className="font-semibold text-[#141b2b]">{totalItems === 0 ? 0 : `${startIndex} – ${endIndex}`}</span> dari{' '}
              <span className="font-semibold text-[#141b2b]">{totalItems}</span> produk katalog
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#8b7263] uppercase font-bold">Tampil:</span>
              <div className="relative">
                <select
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  aria-label="Jumlah Tampilan per Halaman"
                  className="h-8 pl-2.5 pr-6 rounded-md bg-[#e9edff] text-[#141b2b] text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-[#964900] appearance-none cursor-pointer border border-[#dce2f7]"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                  <option value={96}>96</option>
                </select>
                <span className="material-symbols-outlined absolute right-1 top-1/2 -translate-y-1/2 text-[#8b7263] text-[16px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Pagination Buttons */}
          <nav aria-label="Pagination Katalog" className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="w-8 h-8 rounded-lg bg-[#e9edff] text-[#574235] hover:text-[#141b2b] hover:bg-[#dce2f7] flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Halaman Sebelumnya"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {getPageNumbers().map((p, idx) => {
              if (p === '•••') {
                return (
                  <span key={`dots-${idx}`} className="px-1 text-[#8b7263] text-[11px] select-none">
                    •••
                  </span>
                );
              }

              const pageNum = Number(p);
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={`page-${p}`}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-[#964900] text-white shadow-xs scale-105'
                      : 'bg-[#e9edff] hover:bg-[#dce2f7] text-[#141b2b]'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="w-8 h-8 rounded-lg bg-[#e9edff] text-[#141b2b] hover:text-[#964900] hover:bg-[#dce2f7] flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Halaman Berikutnya"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </nav>
        </div>
      </footer>

      {/* Brand Bottom Footer */}
      <footer className="w-full bg-[#f1f3ff] border-t border-[#dce2f7] py-6">
        <div className="w-full px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#574235] text-[12px]">
          <div>
            © 2025 <strong className="font-bold text-[#141b2b]">UD REZ WAN JAYA</strong>. Katalog Galeri Cetak & Desain Undangan Pernikahan Eksklusif.
          </div>
          <div className="flex items-center gap-6 text-[12px] text-[#574235]">
            <span>Percetakan & Desain Grafis Profesional</span>
            <span>Offset & Digital Printing</span>
          </div>
        </div>
      </footer>
    </>
  );
};

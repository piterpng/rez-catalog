import React from 'react';
import { SERIES_LIST } from '../data/initialCatalog';

interface SeriesFilterRailProps {
  selectedSeries: string;
  onSelectSeries: (series: string) => void;
  seriesCounts: Record<string, number>;
  totalCount: number;
}

export const SeriesFilterRail: React.FC<SeriesFilterRailProps> = ({
  selectedSeries,
  onSelectSeries,
  seriesCounts,
  totalCount,
}) => {
  return (
    <section className="w-full bg-white px-4 sm:px-6 py-2 border-b border-[#e9edff] shadow-2xs">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
        <span className="text-[10px] text-[#8b7263] uppercase tracking-wider font-bold whitespace-nowrap pl-1 pr-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-[#964900]">auto_awesome</span>
          Seri:
        </span>

        {SERIES_LIST.map((series) => {
          const isAll = series === 'Semua Series';
          const isSelected = selectedSeries === series || (isAll && (!selectedSeries || selectedSeries === 'Semua Series'));
          const count = isAll ? totalCount : seriesCounts[series] ?? 0;

          return (
            <button
              key={series}
              onClick={() => onSelectSeries(isAll ? '' : series)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none active:scale-95 ${
                isSelected
                  ? 'bg-[#f57c00] text-[#572800] font-bold shadow-[0_2px_8px_rgba(245,124,0,0.25)] ring-1 ring-[#9b4500]/20'
                  : 'bg-[#e9edff] text-[#574235] hover:text-[#141b2b] hover:bg-[#dce2f7] font-medium'
              }`}
            >
              <span>{series}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                  isSelected
                    ? 'bg-white/40 text-[#572800]'
                    : 'bg-white/70 text-[#8b7263]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { InvitationItem } from '../types/invitation';
import { SEGMENTS } from '../data/initialCatalog';
import { handleImageError } from '../utils/imageFallback';

interface CardGridCompact6Props {
  items: InvitationItem[];
  onPreview: (item: InvitationItem) => void;
}

export const CardGridCompact6: React.FC<CardGridCompact6Props> = ({
  items,
  onPreview,
}) => {
  const getSegmentMeta = (segment: string) => {
    return (
      SEGMENTS.find((s) => s.id === segment) || {
        id: segment,
        name: segment,
        bg: '#FEF3C7',
        text: '#92400E',
        border: '#FDE68A',
        icon: 'star',
      }
    );
  };

  const getShortFolding = (folding: string) => {
    if (folding.includes('Gatefold')) return 'Gatefold';
    if (folding.includes('Single')) return 'Single Sheet';
    if (folding.includes('Lipat 3')) return 'Lipat 3';
    if (folding.includes('Lipat 2')) return 'Lipat 2';
    if (folding.includes('Hardcover')) return 'Hardcover';
    return folding;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
      {items.map((item) => {
        const seg = getSegmentMeta(item.segment);

        return (
          <div
            key={item.id}
            onClick={() => onPreview(item)}
            className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#dce2f7] hover:shadow-lg hover:border-[#f57c00] transition-all cursor-pointer"
          >
            {/* Visual Box */}
            <div className="relative w-full aspect-square bg-[#f1f3ff] overflow-hidden p-2">
              <img
                src={item.image}
                alt={item.series}
                loading="lazy"
                onError={handleImageError}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-2xs"
              />

              {/* Segment Pill (Top Left) - Matches 6grid_be30d491.jpg */}
              <div className="absolute top-3 left-3">
                <span
                  style={{
                    backgroundColor: seg.bg,
                    color: seg.text,
                    borderColor: seg.border,
                  }}
                  className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight shadow-2xs border capitalize"
                >
                  {seg.name}
                </span>
              </div>

              {/* Hover Quick Action */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                <span className="px-3 py-1.5 rounded-lg bg-white text-[#141b2b] text-[11px] font-bold shadow-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  Lihat
                </span>
              </div>
            </div>

            {/* Information Area - Matches 6grid_be30d491.jpg */}
            <div className="p-3 flex flex-col justify-between flex-1 bg-white">
              {/* Row 1: Code (Left) & Swatches (Right) */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[12px] font-mono font-bold text-[#964900]">
                  {item.code}
                </span>
                <div className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: item.primaryColorHex }}
                    title={item.primaryColorName}
                  />
                  <span
                    className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: item.secondaryColorHex }}
                    title={item.secondaryColorName}
                  />
                </div>
              </div>

              {/* Row 2: Series Name */}
              <h3 className="text-[14px] font-serif font-bold text-[#141b2b] leading-tight group-hover:text-[#964900] transition-colors mb-2.5">
                {item.series}
              </h3>

              {/* Row 3: Folding (Left) & Amplop Status (Right) */}
              <div className="pt-2 border-t border-[#f1f3ff] flex items-center justify-between text-[11px] text-[#574235]">
                <div className="flex items-center gap-1 font-medium truncate">
                  <span className="material-symbols-outlined text-[13px] text-[#8b7263]">
                    menu_book
                  </span>
                  <span>{getShortFolding(item.foldingType)}</span>
                </div>

                <div className="shrink-0 font-medium">
                  {item.hasEnvelope ? (
                    <span className="text-[#964900] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#964900]">
                        mail
                      </span>
                      +Amplop
                    </span>
                  ) : (
                    <span className="text-[#8b7263]">
                      — No Amplop
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

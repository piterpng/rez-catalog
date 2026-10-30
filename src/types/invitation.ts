export type SegmentTier = 'PREMIUM' | 'MENENGAH' | 'EKONOMIS' | 'SUPER HEMAT';

export type OrientationType = 'Portrait' | 'Lanskap' | 'Persegi';

export interface InvitationItem {
  id: string;
  series: string;
  code: string;
  title: string;
  description: string;
  segment: SegmentTier;
  primaryColorName: string;
  primaryColorHex: string;
  secondaryColorName: string;
  secondaryColorHex: string;
  foldingType: string;
  orientation: OrientationType;
  hasEnvelope: boolean;
  image: string;
  paperType: string;
  dimensions: string;
  envelopeType: string;
  printTechnique?: string;
  foilType?: string;
  driveFolderUrl?: string;
  popularityScore?: number;
  releaseDate?: string;
}

export type ViewMode = 'galeri-grid-4-kolom' | 'galeri-compact-6-kolom' | 'galeri-tabel-data';

export type SortOption = 'series-az' | 'series-za' | 'popular' | 'latest';

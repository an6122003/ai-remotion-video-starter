export type MacbookModel = {
  name: string;
  size: string;
  chip: string;
  cpuCores: number;
  gpuCores: number;
  storage: string;
  highlight?: boolean;
  highlightGpu?: 'less' | 'same' | 'more';
};

export const MODELS: MacbookModel[] = [
  {
    name: 'MacBook Air 15"',
    size: '15-inch',
    chip: 'M5',
    cpuCores: 10,
    gpuCores: 10,
    storage: '256GB',
    highlightGpu: 'more',
  },
  {
    name: 'MacBook Air 13"',
    size: '13-inch',
    chip: 'M5',
    cpuCores: 10,
    gpuCores: 8,
    storage: '256GB',
    highlight: true,
    highlightGpu: 'less',
  },
  {
    name: 'MacBook Air 13"',
    size: '13-inch',
    chip: 'M4',
    cpuCores: 10,
    gpuCores: 10,
    storage: '512GB',
    highlightGpu: 'more',
  },
];

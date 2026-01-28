import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpreadsheetState {
  data: any[][];
  fileName: string;
  showSettings: boolean;
  
  setData: (data: any[][]) => void;
  setFileName: (name: string) => void;
}

export const useSpreadsheetStore = create<SpreadsheetState>()(
  persist(
    (set) => ({
      data: [
        ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13],
      ],
      fileName: 'Planilha sem título',
      showSettings: false,

      setData: (data) => set({ data }),
      setFileName: (fileName) => set({ fileName })
    }),
    {
      name: 'sheetio-storage',
    }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpreadsheetState {
  data: any[][];
  fileName: string;
  darkMode: boolean;
  isEditingName: boolean;
  showSettings: boolean;
  
  setData: (data: any[][]) => void;
  setFileName: (name: string) => void;
  toggleDarkMode: () => void;
  setDarkMode: (mode: boolean) => void;
  setEditingName: (editing: boolean) => void;
  setShowSettings: (show: boolean) => void;
  
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  
  calculateStats: () => { totalCells: number; filledCells: number; rows: number; cols: number };
}

export const useSpreadsheetStore = create<SpreadsheetState>()(
  persist(
    (set, get) => ({
      data: [
        ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13],
      ],
      fileName: 'Planilha sem título',
      darkMode: false,
      isEditingName: false,
      showSettings: false,

      setData: (data) => set({ data }),
      setFileName: (fileName) => set({ fileName }),
      
      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        set({ darkMode: newMode });
        if (typeof window !== 'undefined') {
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      
      setDarkMode: (darkMode) => {
        set({ darkMode });
        if (typeof window !== 'undefined') {
          if (darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      
      setEditingName: (isEditingName) => set({ isEditingName }),
      setShowSettings: (showSettings) => set({ showSettings }),
      
      saveToLocalStorage: () => {
        const { data, fileName } = get();
        if (typeof window !== 'undefined') {
          localStorage.setItem('sheetio_data', JSON.stringify(data));
          localStorage.setItem('sheetio_filename', fileName);
        }
      },
      
      loadFromLocalStorage: () => {
        if (typeof window !== 'undefined') {
          const savedData = localStorage.getItem('sheetio_data');
          const savedFileName = localStorage.getItem('sheetio_filename');
          
          if (savedData) {
            set({ data: JSON.parse(savedData) });
          }
          if (savedFileName) {
            set({ fileName: savedFileName });
          }
        }
      },
      
      calculateStats: () => {
        const { data } = get();
        const rows = data.length;
        const cols = data[0]?.length || 0;
        const totalCells = rows * cols;
        const filledCells = data.flat().filter(
          (cell) => cell !== null && cell !== '' && cell !== undefined
        ).length;
        
        return { totalCells, filledCells, rows, cols };
      },
    }),
    {
      name: 'sheetio-storage',
      partialize: (state) => ({
        data: state.data,
        fileName: state.fileName,
        darkMode: state.darkMode,
      }),
    }
  )
);
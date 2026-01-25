import * as FileHandler from '@/lib/file-handler';

export function useSpreadsheetFiles(
  hotTableRef: React.RefObject<any>,
  fileName: string,
  setData: (data: any[][]) => void
) {
  const getCurrentData = () =>
    hotTableRef.current?.hotInstance?.getData();

  const exportCSV = async () => {
    const data = getCurrentData();
    if (!data) return;

    await FileHandler.exportToCSV(data, fileName);
  };

  const exportExcel = async () => {
    const data = getCurrentData();
    if (!data) return;

    await FileHandler.exportToExcel(data, fileName);
  };

  const importFile = async (file: File) => {
    let data: any[][];

    if (file.name.endsWith('.csv')) {
      data = await FileHandler.importCSV(file);
    } else {
      data = await FileHandler.importExcel(file);
    }

    setData(data);
    hotTableRef.current?.hotInstance?.loadData(data);
  };

  return {
    exportCSV,
    exportExcel,
    importFile,
  };
}

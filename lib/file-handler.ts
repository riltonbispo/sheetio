export class FileHandler {
  static async exportToCSV(data: any[][], fileName: string): Promise<void> {
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    this.downloadFile(blob, `${fileName}_${Date.now()}.csv`);
  }

  static async exportToExcel(data: any[][], fileName: string): Promise<void> {
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha1');
    XLSX.writeFile(wb, `${fileName}_${Date.now()}.xlsx`);
  }

  static async importCSV(file: File): Promise<any[][]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const rows = text.split('\n').map(row => 
            row.split(',').map(cell => cell.trim())
          );
          resolve(rows);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  }

  static async importExcel(file: File): Promise<any[][]> {
    return new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const XLSX = await import('xlsx');
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          resolve(jsonData as any[][]);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsBinaryString(file);
    });
  }

  private static downloadFile(blob: Blob, filename: string): void {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
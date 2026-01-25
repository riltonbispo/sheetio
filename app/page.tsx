'use client';

import { useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/header';
import { Toolbar } from '@/components/toolbar';
import { Spreadsheet } from '@/components/spreadsheet';
import { Stats } from '@/components/stats';
import { SettingsModal } from '@/components/settings-modal';
import { useSpreadsheetStore } from '@/store/spreadsheet-store';
import { FileHandler } from '@/lib/file-handler';
import { useSpreadsheetActions } from '@/hooks/useSpreadsheetActions';

export default function Home() {
  const {
    data,
    fileName,
    setData,
    saveToLocalStorage,
    loadFromLocalStorage,
    calculateStats,
  } = useSpreadsheetStore();

  const hotTableRef = useRef<any>(null);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const handleHotTableReady = useCallback((hotTable: any) => {
    hotTableRef.current = hotTable;
  }, []);

  const actions = useSpreadsheetActions(hotTableRef);

  const handleSave = () => {
    if (!hotTableRef.current?.hotInstance) return;
    const currentData = hotTableRef.current.hotInstance.getData();
    setData(currentData);
    saveToLocalStorage();
    alert('Dados salvos com sucesso!');
  };

  const handleExportExcel = async () => {
    if (!hotTableRef.current?.hotInstance) return;
    const currentData = hotTableRef.current.hotInstance.getData();
    await FileHandler.exportToExcel(currentData, fileName);
  };

  const handleExportCSV = async () => {
    if (!hotTableRef.current?.hotInstance) return;
    const currentData = hotTableRef.current.hotInstance.getData();
    await FileHandler.exportToCSV(currentData, fileName);
  };

  const handleImport = async (file: File) => {
    try {
      let importedData: any[][];

      if (file.name.endsWith('.csv')) {
        importedData = await FileHandler.importCSV(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        importedData = await FileHandler.importExcel(file);
      } else {
        alert('Formato de arquivo não suportado');
        return;
      }

      setData(importedData);
      hotTableRef.current?.hotInstance?.loadData(importedData);
      alert('Arquivo importado com sucesso!');
    } catch (error) {
      console.error('Erro ao importar:', error);
      alert('Erro ao importar arquivo');
    }
  };

  const stats = calculateStats();

  return (
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <Toolbar
          onAddRow={actions.addRow}
          onAddColumn={actions.addColumn}
          onRemoveRow={actions.removeRow}
          onRemoveColumn={actions.removeColumn}
          onSave={handleSave}
          onExportExcel={handleExportExcel}
          onExportCSV={handleExportCSV}
          onImport={handleImport}
        />

        <main className="px-6 py-6">
          <Spreadsheet
            data={data}
            stats={stats}
            onHotTableReady={handleHotTableReady}
          />
          <Stats stats={stats} />
        </main>

        <SettingsModal />
      </div>
    </div>
  );
}
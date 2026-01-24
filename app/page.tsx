'use client';

import { useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/header';
import { Toolbar } from '@/components/toolbar';
import { Spreadsheet } from '@/components/spreadsheet';
import { Stats } from '@/components/stats';
import { SettingsModal } from '@/components/settings-modal';
import { useSpreadsheetStore } from '@/store/spreadsheet-store';
import { FileHandler } from '@/lib/file-handler';

export default function Home() {
  const {
    data,
    setData,
    saveToLocalStorage,
    loadFromLocalStorage,
    calculateStats,
  } = useSpreadsheetStore();

  const hotTableRef = useRef<any>(null);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const handleHotTableReady = useCallback((hotTable: any) => {
    hotTableRef.current = hotTable;
  }, []);

  const addRow = () => {
    if (!hotTableRef.current?.hotInstance) return;
    const rowCount = hotTableRef.current.hotInstance.countRows();
    hotTableRef.current.hotInstance.alter('insert_row_below', rowCount - 1);
  };

  const addColumn = () => {
    if (!hotTableRef.current?.hotInstance) return;
    const colCount = hotTableRef.current.hotInstance.countCols();
    hotTableRef.current.hotInstance.alter('insert_col_end', colCount);
  };

  const removeRow = () => {
    if (!hotTableRef.current?.hotInstance) return;
    const selected = hotTableRef.current.hotInstance.getSelected();
    if (selected && selected.length > 0) {
      const row = selected[0][0];
      hotTableRef.current.hotInstance.alter('remove_row', row);
    } else {
      alert('Selecione uma linha para remover');
    }
  };

  const removeColumn = () => {
    if (!hotTableRef.current?.hotInstance) return;
    const selected = hotTableRef.current.hotInstance.getSelected();
    if (selected && selected.length > 0) {
      const col = selected[0][1];
      hotTableRef.current.hotInstance.alter('remove_col', col);
    } else {
      alert('Selecione uma coluna para remover');
    }
  };

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
    await FileHandler.exportToExcel(currentData, useSpreadsheetStore.getState().fileName);
  };

  const handleExportCSV = async () => {
    if (!hotTableRef.current?.hotInstance) return;
    const currentData = hotTableRef.current.hotInstance.getData();
    await FileHandler.exportToCSV(currentData, useSpreadsheetStore.getState().fileName);
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
          onAddRow={addRow}
          onAddColumn={addColumn}
          onRemoveRow={removeRow}
          onRemoveColumn={removeColumn}
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
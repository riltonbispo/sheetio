'use client';

import { useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/header';
import { Toolbar } from '@/components/toolbar';
import { Spreadsheet } from '@/components/spreadsheet';
import { Stats } from '@/components/stats';
import { SettingsModal } from '@/components/settings-modal';
import { useSpreadsheetStore } from '@/store/spreadsheet-store';
import { useSpreadsheetActions } from '@/hooks/useSpreadsheetActions';
import { useSpreadsheetFiles } from '@/hooks/useSpreadsheetFiles';

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

  const file = useSpreadsheetFiles(
    hotTableRef,
    fileName,
    setData
  );

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
          onExportCSV={file.exportCSV}
          onExportExcel={file.exportExcel}
          onImport={file.importFile}
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
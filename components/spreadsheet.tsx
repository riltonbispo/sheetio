'use client';

import { useRef, useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Card, CardContent } from '@/components/ui/card';

if (typeof window !== 'undefined') {
  registerAllModules();
}

interface SpreadsheetProps {
  data: any[][];
  stats: { rows: number; cols: number };
  onHotTableReady: (hotTable: any) => void;
}

export function Spreadsheet({ data, stats, onHotTableReady }: SpreadsheetProps) {
  const hotTableRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (hotTableRef.current && isClient) {
      onHotTableReady(hotTableRef.current);
    }
  }, [isClient, onHotTableReady]);

  if (!isClient) {
    return <div>Carregando...</div>;
  }

  return (
    <Card>
      <div className="px-4 py-3 border-b bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-gray-200">
                {stats.rows}
              </strong>{' '}
              linhas ×{' '}
              <strong className="text-gray-900 dark:text-gray-200">
                {stats.cols}
              </strong>{' '}
              colunas
            </span>
            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
              Pronto para edição
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            SheetIO v2.0
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <HotTable
          ref={hotTableRef}
          data={data}
          rowHeaders={true}
          colHeaders={true}
          height="auto"
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey="non-commercial-and-evaluation"
          customBorders={true}
          dropdownMenu={true}
          multiColumnSorting={true}
          filters={true}
          contextMenu={true}
        />
      </CardContent>
    </Card>
  );
}
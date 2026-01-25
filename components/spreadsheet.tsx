'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import 'handsontable/dist/handsontable.full.min.css';
import { useSpreadsheetStore } from '@/store/spreadsheet-store';

if (typeof window !== 'undefined') {
  registerAllModules();
}

interface SpreadsheetProps {
  onHotTableReady: (hotTable: any) => void;
  header?: ReactNode;
}

export function Spreadsheet({header, onHotTableReady }: SpreadsheetProps) {
  const hotTableRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const {data} = useSpreadsheetStore();

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
      <CardHeader>{header}</CardHeader>
      <CardContent>
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
'use client';

import { Plus, Trash2, Save, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { ButtonGroup } from '@/components/ui/button-group';

interface ToolbarProps {
  onAddRow: () => void;
  onAddColumn: () => void;
  onRemoveRow: () => void;
  onRemoveColumn: () => void;
  onSave: () => void;
  onExportExcel: () => void;
  onExportCSV: () => void;
  onImport: (file: File) => void;
}

export function Toolbar({
  onAddRow,
  onAddColumn,
  onRemoveRow,
  onRemoveColumn,
  onSave,
  onExportExcel,
  onExportCSV,
  onImport,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center gap-2 flex-wrap">
        <ButtonGroup>
          <Button onClick={onAddRow} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Linha
          </Button>
          <Button onClick={onAddColumn} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Coluna
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button onClick={onRemoveRow} variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Linha
          </Button>
          <Button onClick={onRemoveColumn} variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Coluna
          </Button>
        </ButtonGroup>

        <Button onClick={onSave} variant="outline">
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>

        <ButtonGroup>
          <Button onClick={onExportExcel} variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button onClick={onExportCSV} variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
        </ButtonGroup>

        <Button onClick={handleImportClick} variant="link">
          <Upload className="w-4 h-4 mr-2" />
          Importar
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
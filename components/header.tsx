'use client';

import { FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSpreadsheetStore } from '@/store/spreadsheet-store';
import { useState } from 'react';
import {ModeToggle} from "@/components/mode-toggle";

export function Header() {
  const {
    fileName,
    setFileName,
  } = useSpreadsheetStore();
  const [isEditingName, setEditingName] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SheetIO
              </h1>
            </div>

            {isEditingName ? (
              <Input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                onBlur={() => setEditingName(false)}
                className="w-64"
                autoFocus
              />
            ) : (
              <Button
                variant="ghost"
                onClick={() => setEditingName(true)}
                className="text-gray-700 dark:text-gray-300"
              >
                {fileName}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle/>
          </div>

        </div>
      </div>
    </header>
  );
}
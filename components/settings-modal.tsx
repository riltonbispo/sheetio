'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSpreadsheetStore } from '@/store/spreadsheet-store';

export function SettingsModal() {
  const { showSettings, darkMode, toggleDarkMode, setShowSettings, loadFromLocalStorage } =
    useSpreadsheetStore();

  const handleLoadData = () => {
    loadFromLocalStorage();
    setShowSettings(false);
  };

  return (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tema</label>
            <Button onClick={toggleDarkMode} variant="outline" className="w-full">
              {darkMode ? 'Modo Escuro' : 'Modo Claro'}
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Carregar dados salvos
            </label>
            <Button onClick={handleLoadData} className="w-full">
              Carregar do LocalStorage
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
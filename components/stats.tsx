'use client';

import { Card, CardContent } from '@/components/ui/card';

interface StatsProps {
  stats: {
    totalCells: number;
    filledCells: number;
    rows: number;
    cols: number;
  };
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
            Total de Células
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalCells}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
            Células Preenchidas
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.filledCells}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
            Linhas
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.rows}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
            Colunas
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.cols}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
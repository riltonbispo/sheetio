import Handsontable from 'handsontable';
import { toast } from "sonner"

export function useSpreadsheetActions(hotRef: React.RefObject<{ hotInstance: Handsontable }>) {
  const getHot = () => hotRef.current?.hotInstance;

  const addRow = () => {
    const hot = getHot();
    if (!hot) return;

    hot.alter('insert_row_below', hot.countRows() - 1);
  };

  const addColumn = () => {
    const hot = getHot();
    if (!hot) return;

    hot.alter('insert_col_end', hot.countCols());
  };

  const removeRow = () => {
      const hot = getHot();
      if (!hot) return;

      const totalRows = hot.countRows();

      if (totalRows <= 1) {
        toast.warning("Não é possível remover todas as linhas", {
          position: "top-center",
        });
        return;
      }

      hot.alter("remove_row", totalRows - 1);
  };

  const removeColumn = () => {
    const hot = getHot();
    if (!hot) return;

    const totalCols = hot.countCols();

    if (totalCols <= 1) {
      toast.warning("Não é possível remover todas as colunas", {
        position: "top-center",
      });
      return;
    }

    hot.alter("remove_col", totalCols - 1);
  };

  return {
    addRow,
    addColumn,
    removeRow,
    removeColumn,
  };
}

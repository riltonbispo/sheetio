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

    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const row = selected[0][0];
      hot.alter('remove_row', row);
    } else {
      toast.warning("Selecione uma linha para remover", {position: "top-center"});
    }
  };

  const removeColumn = () => {
    const hot = getHot();
    if (!hot) return;
    const selected = hot.getSelected();
    if (selected && selected.length > 0) {
      const col = selected[0][1];
      hot.alter('remove_col', col);
    } else {
      toast.warning("Selecione uma coluna para remover", {position: "top-center"});
    }
  };

  return {
    addRow,
    addColumn,
    removeRow,
    removeColumn,
  };
}

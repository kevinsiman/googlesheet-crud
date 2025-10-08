import type { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { getDoc } from "./getdoc-repository.js";

const ABA_NAME = process.env.NEXT_PUBLIC_ABA_NAME!;

let sheetInstance: GoogleSpreadsheetWorksheet | null = null;
export const getSheet = async (): Promise<GoogleSpreadsheetWorksheet> => {
  if (sheetInstance) {
    return sheetInstance;
  }
  const doc = await getDoc();

  const sheet: GoogleSpreadsheetWorksheet = doc.sheetsByTitle[ABA_NAME]!;

  if (!sheet) {
    throw new Error(`Nenhuma aba encontrada com este nome!`);
  }

  sheetInstance = sheet;

  return sheetInstance;
};

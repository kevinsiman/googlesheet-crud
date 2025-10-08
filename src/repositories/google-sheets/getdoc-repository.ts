import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { JWT } from "google-auth-library";

const CLIENT_EMAIL = process.env.NEXT_PUBLIC_CLIENT_EMAIL!;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY!.replace(/\\n/g, "\n");
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID!;

let docInstance: GoogleSpreadsheet | null = null;
export const getDoc = async (): Promise<GoogleSpreadsheet> => {
  if (docInstance) {
    return docInstance;
  }

  const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);

  try {
    await doc.loadInfo();

    docInstance = doc;

    return docInstance;
  } catch (error) {
    throw new Error("Falha ao buscar a instancia de DOC na planilha!");
  }
};

import type { GoogleSpreadsheetRow } from "google-spreadsheet";
import {
  type CreateTodos,
  type DeleteTodos,
  type GetTodo,
  type GetTodos,
  type TodoDataType,
  type UpdateTodos,
} from "../todos-interface-repositories.js";
import { getSheet } from "./getsheet-repository.js";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../../application-errors/application-errors.js";

export class SpreadsheetRepository implements GetTodos, GetTodo, CreateTodos {
  /* READ ALL*/
  async read() {
    const sheet = await getSheet();

    const rows: GoogleSpreadsheetRow[] = await sheet.getRows();

    if (!rows) {
      throw new BadRequestError("Erro ao receber linhas da Tabela");
    }

    const response = rows.map(
      (row: GoogleSpreadsheetRow) => row.toObject() as TodoDataType
    );

    return response;
  }

  /* GET A ROW */
  async get(id: string) {
    const sheet = await getSheet();

    const rows = await sheet.getRows();

    if (!rows) {
      throw new BadRequestError("Erro ao receber linhas da Tabela");
    }

    const row = rows.find((row: GoogleSpreadsheetRow) => row.get("ID") === id);

    if (!row) {
      throw new NotFoundError("Nenhum item com o id encontrado.");
    }

    const response = row.toObject() as TodoDataType;

    console.log(response);

    return response;
  }

  /* CREATE NEW TODO */
  async create(dados: TodoDataType) {
    const { id, data, desc, status } = dados;

    const sheet = await getSheet();

    const checkId = await sheet.getRows();

    const exist = checkId.find(
      (row: GoogleSpreadsheetRow) => row.get("ID") === id
    );

    if (exist) {
      throw new ConflictError("Id do item já existe na tabela.");
    }

    try {
      await sheet.addRow({
        ID: id,
        DATA: data,
        DESC: desc,
        STATUS: status,
      });
    } catch (error) {
      throw new InternalServerError("Erro ao criar nova TO-DO");
    }
  }

  /* UPDATE TODO */

  async update(dados: TodoDataType) {
    const { id, data, desc, status } = dados;

    const sheet = await getSheet();

    const checkId = await sheet.getRows();

    const rowToUpdate = checkId.find(
      (row: GoogleSpreadsheetRow) => row.get("ID") === id
    );

    if (!rowToUpdate) {
      throw new NotFoundError("Id não encontrado na tabela.");
    }

    try {
      rowToUpdate.assign({
        DATA: data,
        DESC: desc,
        STATUS: status,
      });

      await rowToUpdate.save();
    } catch (error) {
      throw new InternalServerError("Erro ao atualizar TO-DO");
    }
  }

  /* DELETE TODO  */

  async delete(id: string) {
    const sheet = await getSheet();

    const rows = await sheet.getRows();

    const rowToDelete = rows.find(
      (row: GoogleSpreadsheetRow) => row.get("ID") === id
    );

    if (!rowToDelete) {
      throw new NotFoundError("Id não encontrado na tabela.");
    }

    try {
      await rowToDelete.delete();
    } catch (error) {
      throw new InternalServerError("Erro ao deletar TO-DO");
    }
  }
}

import { BaseError } from "./base-error.js";

export class NotFoundError extends BaseError {
  constructor(message: string = "Dados nao encontrados.") {
    super(message, 404);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = "Erro na validação de dados.") {
    super(message, 400);
  }
}

export class ConflictError extends BaseError {
  constructor(
    message: string = "Tentativa de criar um recurso que já existe."
  ) {
    super(message, 409);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = "Erro interno inesperado.") {
    super(message, 500);
  }
}

import { Router } from "express";
import { GetTodosUseCase } from "./usecases/get-todos-usecase/get-todos.usecase.js";
import { SpreadsheetRepository } from "./repositories/google-sheets/spreadsheet-repository.js";
import { GetTodoUseCase } from "./usecases/get-todo-usecase/get-todo-usecase.js";
import { CreateTodoUseCase } from "./usecases/create-todos-usecase/create-todo-usecase.js";
import { UpdateTodoUseCase } from "./usecases/update-todos-usecase/update-todo-usecase.js";
import { DeleteTodoUseCase } from "./usecases/delete-todos-usecase/delete-todo-usecase.js";
import { BaseError } from "./application-errors/base-error.js";
import { error } from "console";

export const routes = Router();

routes.post("/read", async (req, res) => {
  try {
    const spreadsheet = new SpreadsheetRepository();
    const getTodos = new GetTodosUseCase(spreadsheet);

    const response = await getTodos.execute();
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.httpStatus).json({
        success: false,
        message: error.message,
      });
    }
  }

  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Erro inesperado interno!",
  });
});

routes.post("/get", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Nenhum parametro recebido!",
    });
  }

  try {
    const spreadsheet = new SpreadsheetRepository();
    const getTodo = new GetTodoUseCase(spreadsheet);

    const response = await getTodo.execute(id);

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.httpStatus).json({
        success: false,
        message: error.httpStatus,
      });
    }
  }

  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Erro inesperado interno",
  });
});

routes.post("/create", async (req, res) => {
  const { id, data, desc, status } = req.body;

  if (!id || !data || !desc || !status) {
    return res.status(400).json({
      success: false,
      message: "Erro ao enviar parametros.",
    });
  }

  try {
    const spreadsheet = new SpreadsheetRepository();
    const createTodo = new CreateTodoUseCase(spreadsheet);

    const response = await createTodo.execute({
      id,
      data,
      desc,
      status,
    });

    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.httpStatus).json({
        success: false,
        message: error.message,
      });
    }
  }

  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Erro interno inesperado.",
  });
});

routes.put("/update", async (req, res) => {
  const { id, data, desc, status } = req.body;

  if (!id || !data || !desc || !status) {
    return res.status(400).json({
      success: false,
      message: "Erro ao receber paramentros.",
    });
  }

  try {
    const spreadsheet = new SpreadsheetRepository();
    const updateTodo = new UpdateTodoUseCase(spreadsheet);

    const response = await updateTodo.execute({
      id,
      data,
      desc,
      status,
    });
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.httpStatus).json({
        success: false,
        message: error.message,
      });
    }
  }

  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Erro interno insperado.",
  });
});

routes.delete("/delete", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Nenhum id recebido.",
    });
  }

  try {
    const spreadsheet = new SpreadsheetRepository();
    const deleteTodo = new DeleteTodoUseCase(spreadsheet);

    const response = await deleteTodo.execute(id);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(error.httpStatus).json({
        success: false,
        message: error.message,
      });
    }
  }

  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Erro interno inesperado",
  });
});

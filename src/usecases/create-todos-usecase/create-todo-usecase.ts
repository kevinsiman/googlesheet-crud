import type {
  CreateTodos,
  TodoDataType,
} from "../../repositories/todos-interface-repositories.js";

export class CreateTodoUseCase {
  constructor(private CreateTodos: CreateTodos) {}

  async execute(data: TodoDataType) {
    const response = await this.CreateTodos.create(data);
    return response;
  }
}

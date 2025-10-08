import type {
  TodoDataType,
  UpdateTodos,
} from "../../repositories/todos-interface-repositories.js";

export class UpdateTodoUseCase {
  constructor(private UpdateTodos: UpdateTodos) {}
  async execute(dados: TodoDataType) {
    const response = await this.UpdateTodos.update(dados);
    return response;
  }
}

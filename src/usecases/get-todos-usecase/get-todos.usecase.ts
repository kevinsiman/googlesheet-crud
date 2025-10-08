import type { GetTodos } from "../../repositories/todos-interface-repositories.js";

export class GetTodosUseCase {
  constructor(private GetTodos: GetTodos) {}
  async execute() {
    const response = await this.GetTodos.read();
    return response;
  }
}

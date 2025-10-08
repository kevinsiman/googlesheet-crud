import type { GetTodo } from "../../repositories/todos-interface-repositories.js";

export class GetTodoUseCase {
  constructor(private GetTodo: GetTodo) {}
  async execute(id: string) {
    const response = await this.GetTodo.get(id);
    return response;
  }
}

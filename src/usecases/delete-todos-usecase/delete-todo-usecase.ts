import { BadRequestError } from "../../application-errors/application-errors.js";
import type { DeleteTodos } from "../../repositories/todos-interface-repositories.js";

export class DeleteTodoUseCase {
  constructor(private DeleteTodos: DeleteTodos) {}
  async execute(id: string) {
    if (!id) {
      throw new BadRequestError("O ID é obrigatorio para deletar uma To-Do");
    }

    const response = await this.DeleteTodos.delete(id);

    return response;
  }
}

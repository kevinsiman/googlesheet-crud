export interface TodoDataType {
  id: string;
  data: string;
  desc: string;
  status: string;
}

export interface GetTodos {
  read: () => Promise<TodoDataType[]>;
}

export interface GetTodo {
  get: (id: string) => Promise<TodoDataType>;
}

export interface CreateTodos {
  create: (data: TodoDataType) => Promise<void>;
}

export interface UpdateTodos {
  update: (data: TodoDataType) => Promise<void>;
}

export interface DeleteTodos {
  delete: (id: string) => Promise<void>;
}

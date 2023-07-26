export type TodoListItemModel = {
  id: string;
  description: string;
  status: TodoListItemStatus;
};

export type TodoListItemStatus = 'Later' | 'Now' | 'Waiting' | 'Completed';

export type TodoListEntryModel = Pick<TodoListItemModel, 'description'>;

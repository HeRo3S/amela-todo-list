import { TodoStatus } from "./enum";

export interface ITodoDetails {
  title: string;
  content: string;
  todoAt: string;
  status: TodoStatus;
}

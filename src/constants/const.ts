import dayjs from "dayjs";
import { TodoStatus } from "./enum";
import { ITodoDetails } from "./interface";

export const DEFAULT_DETAILS: ITodoDetails = {
  title: "Nothing to show",
  content: "Try add a new card",
  status: TodoStatus.RESOLVED,
  todoAt: "2024-12-04",
};

export const DEFAULT_ADD: ITodoDetails = {
  title: "Write your title",
  content: "Write something here",
  status: TodoStatus.OPEN,
  todoAt: dayjs().format("YYYY-MM-DD"),
};

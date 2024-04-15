import { TodoStatus } from "../../constants/enum";
import { ITodoDetails } from "../../constants/interface";

const todosMockdata: ITodoDetails[] = [
  {
    title: "Say hello",
    content: "Try to write something here",
    todoAt: "2024-12-04",
    status: TodoStatus.OPEN,
  },
  {
    title: "Item2",
    content: "Try to write something here",
    todoAt: "2024-12-04",
    status: TodoStatus.OPEN,
  },
];

export default todosMockdata;

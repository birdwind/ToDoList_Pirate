import { UUID } from "uuid-generator-ts";

export interface ToDoTaskInterface {
  id: string;
  statusColor: string;
  statusText: string;
  title: string;
  content: string;
}

export class ToDoTask implements ToDoTaskInterface {
  content!: string;
  id!: string;
  statusColor!: string;
  statusText!: string;
  title!: string;

  constructor() {
    this.id = new UUID().toString();
    this.statusColor = "";
    this.statusText = "";
    this.title = "";
    this.content = "";
  }
}

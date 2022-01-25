import { ToDoTaskInterface } from "@/model/ToDoTask";
import { UUID } from "uuid-generator-ts";

export interface ToDoCardInterface {
  id: string;
  name: string;
  task: ToDoTaskInterface[];
}

export class ToDoCard implements ToDoCardInterface {
  id!: string;
  name!: string;
  task!: ToDoTaskInterface[];

  constructor() {
    this.id = new UUID().toString();
    this.name = "";
    this.task = [];
  }
}

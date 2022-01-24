import { ToDoCardInterface } from "@/model/ToDoCard";
import { UUID } from "uuid-generator-ts";

export interface ToDoWorkInterface {
  id: string;
  name: string;
  cardList: ToDoCardInterface[];
}

export class ToDoWork implements ToDoWorkInterface {
  cardList!: ToDoCardInterface[];
  id!: string;
  name!: string;

  constructor() {
    this.id = new UUID().toString();
    this.cardList = [];
    this.name = "";
  }
}

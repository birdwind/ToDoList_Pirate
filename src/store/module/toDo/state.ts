import { ToDoCardInterface } from "@/model/ToDoCard";

export interface ToDoState {
  cardList: ToDoCardInterface[];
  taskStatus: any[];
}

export const state: ToDoState = {
  cardList: [],
  taskStatus: [
    {
      value: "普通",
      color: "#6D6d6d",
    },
    {
      value: "優先",
      color: "#F06D73",
    },
  ],
};

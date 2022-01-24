import { ToDoWorkInterface } from "@/model/ToDoWork";
import { UUID } from "uuid-generator-ts";

export interface ToDoState {
  workList: ToDoWorkInterface[];
  taskStatus: any[];
}

export const state: ToDoState = {
  workList: [
    {
      name: "首頁",
      id: new UUID().toString(),
      cardList: [],
    },
  ],
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

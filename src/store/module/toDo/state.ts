import { ToDoWorkInterface } from "@/model/ToDoWork";
import { UUID } from "uuid-generator-ts";

export interface ToDoState {
  focusWork: string;
  workList: ToDoWorkInterface[];
  taskStatus: any[];
}

export const state: ToDoState = {
  focusWork: "",
  workList: [
    {
      id: new UUID().toString(),
      name: "首頁",
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

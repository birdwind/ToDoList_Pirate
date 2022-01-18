import { ToDoCard } from "@/model/ToDoCard";

export interface ToDoState {
  cardList: ToDoCard[];
}

export const state: ToDoState = {
  cardList: [
    {
      name: "待辦",
      task: [
        {
          id: "001",
          statusColor: "#f06d73",
          statusText: "普通",
          title: "測試1",
          content: "這是測試資料",
        },
        {
          id: "002",
          statusColor: "#f06d73",
          statusText: "普通",
          title: "測試2",
          content: "這是測試資料",
        },
        {
          id: "003",
          statusColor: "#f06d73",
          statusText: "普通",
          title: "測試3",
          content: "這是測試資料",
        },
      ],
    },
    {
      name: "進行中",
      task: [
        {
          id: "002",
          statusColor: "#f06d73",
          statusText: "普通",
          title: "測試1",
          content: "這是測試資料",
        },
      ],
    },
    {
      name: "已完成",
      task: [],
    },
  ],
};

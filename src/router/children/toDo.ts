export const toDoRoutes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "ToDoHome",
    component: () => import("@/views/ToDo/ToDo.vue"),
  },
  {
    path: "/todo/:workId",
    name: "ToDo",
    component: () => import("@/views/ToDo/ToDo.vue"),
  },
];

// auth模組
import { HistoryMessage } from "@/base/data/historyMessage";
import { ToDoCardInterface } from "@/model/ToDoCard";
import { ToDoTaskInterface } from "@/model/ToDoTask";

export type Login = (data: { account: string; password: string }) => Promise<void>;

// ui模組
export type ShowLoading = (isShow: boolean) => void;
export type Reload = (isReload: boolean) => Promise<void>;
export type AddHistoryMessage = (message: HistoryMessage) => Promise<void>;

// todo模組
export type UpdateFocusWork = (data: string) => void;
export type AddWork = (data: any) => void;
export type AddCard = (data: { workIndex: number; toDoCard: ToDoCardInterface }) => void;
export type DeleteWork = (data: string) => void;
export type DeleteCard = (data: { workIndex: number; cardId: string }) => void;
export type DeleteTask = (data: { workIndex: number; cardIndex: number; taskId: string }) => void;
export type UpdateCardTitle = (data: { workIndex: number; title: string; index: number }) => void;
export type UpdateWorkList = () => void;
export type UpdateCardList = () => void;
export type UpdateTaskList = () => void;
export type AddTask = (data: { workIndex: number; cardIndex: number; task: ToDoTaskInterface }) => void;

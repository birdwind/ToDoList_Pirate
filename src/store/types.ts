// auth模組
import { HistoryMessage } from "@/base/data/historyMessage";

export type Login = (data: { account: string; password: string }) => Promise<void>;

// ui模組
export type ShowLoading = (isShow: boolean) => void;
export type Reload = (isReload: boolean) => Promise<void>;
export type AddHistoryMessage = (message: HistoryMessage) => Promise<void>;

// todo模組
export type AddCard = (name: string) => void;
export type UpdateCardTitle = (data: { title: string; index: number }) => void;
export type UpdateTaskList = (data: any) => void;
export type AddTask = (data: any) => void;

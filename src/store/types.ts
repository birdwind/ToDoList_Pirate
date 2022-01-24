// auth模組
import { HistoryMessage } from "@/base/data/historyMessage";

export type Login = (data: { account: string; password: string }) => Promise<void>;

// ui模組
export type ShowLoading = (isShow: boolean) => void;
export type Reload = (isReload: boolean) => Promise<void>;
export type AddHistoryMessage = (message: HistoryMessage) => Promise<void>;

// todo模組
export type AddWork = (data: any) => void;
export type AddCard = (data: { workIndex: number; title: string }) => void;
export type UpdateCardTitle = (data: { workIndex: number; title: string; index: number }) => void;
export type UpdateWorkList = () => void;
export type UpdateCardList = () => void;
export type UpdateTaskList = () => void;
export type AddTask = (data: any) => void;

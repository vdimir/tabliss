import { API } from "../../types";

type Data = {
    username: string;
    showSummary: boolean;
    apiKey: string;
};

export type Cache = { hasNotifications: boolean; timestamp: number };

export type Props = API<Data, Cache>;

export const defaultData: Data = {
    username: "joelshepherd",
    showSummary: false,
    apiKey: '',
};

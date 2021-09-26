import { API } from "../../types";
import { Notifications } from "./api"

export type Data = {
    username: string;
    showActivitySummary: boolean;
    apiKey: string;
    showNotificationItems: boolean;
    notificationLastClick: number;
};

export type Cache = { timestamp: number; notifications?: Notifications };

export type Props = API<Data, Cache>;

export const defaultData: Data = {
    username: "joelshepherd",
    showActivitySummary: false,
    apiKey: '',
    showNotificationItems: false,
    notificationLastClick: 0,
};

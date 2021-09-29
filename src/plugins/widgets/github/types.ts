import { API } from "../../types";
import { Notifications } from "./api"

export type Data = {
    username: string;
    showActivitySummary: boolean;
    apiKey: string;
    showNotificationItems: boolean;
};

export type Cache = { timestamp: number; since: number; notifications?: Notifications };

export type Props = API<Data, Cache>;

export const defaultData: Data = {
    username: "joelshepherd",
    showActivitySummary: false,
    apiKey: '',
    showNotificationItems: false,
};

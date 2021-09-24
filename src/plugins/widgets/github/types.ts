import { API } from "../../types";

type Data = {
    username: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
    username: "joelshepherd",
};

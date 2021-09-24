import React, { FC } from "react";

import { Props, defaultData } from "./types";

const GitHubSettings: FC<Props> = ({ data = defaultData, setData }) => (
    <div className="MessageSettings">
        <label>
            UserName
            <input
                type="text"
                value={data.username}
                onChange={(event) => setData({ username: event.target.value })}
            />
        </label>
    </div>
);

export default GitHubSettings;

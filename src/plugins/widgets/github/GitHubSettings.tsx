import React, { FC } from "react";

import { Props, defaultData } from "./types";

const GitHubSettings: FC<Props> = ({ data = defaultData, setData }) => (
    <div className="MessageSettings">
        <label>
            UserName
            <input
                type="text"
                value={data.username}
                onChange={(event) => setData({ ...data, username: event.target.value })}
            />
        </label>
        <label>
            <input
                type="checkbox"
                checked={data.showSummary}
                onChange={(event) => setData({ ...data, showSummary: !data.showSummary })}
            />{" "}
            Show summary overview
        </label>
        <label>
            <a href="https://github.com/settings/tokens/new?scopes=notifications&description=Tabliss">API key</a> for notifications indicator
            <input
                type="text"
                value={data.apiKey}
                onChange={(event) => setData({ ...data, apiKey: event.target.value })}
            />
        </label>
    </div>
);

export default GitHubSettings;

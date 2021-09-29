import { Config } from "../../types";
import GitHubWidget from "./GitHub";
import GitHubSettings from "./GitHubSettings";

const config: Config = {
    key: "widget/github",
    name: "GitHub",
    description: "Shows GitHub activity overview & notification indicator",
    dashboardComponent: GitHubWidget,
    settingsComponent: GitHubSettings,
};

export default config;

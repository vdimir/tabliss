import React, { FC, useEffect } from "react";
import GitHubCalendar from "github-calendar";
import { Props, defaultData } from "./types";

import "github-calendar/dist/github-calendar.css";
import "./github-calendar.css";

const GitHubCalendarWidget: FC<Props> = ({ data = defaultData, loader }) => {
    useEffect(() => {
        loader.push()
        GitHubCalendar(
            ".GitHubCalendar",
            data.username,
            {
                responsive: false,
                global_stats: false,
            }
        ).finally(loader.pop);
    }, []);

    return <div className="GitHubCalendar" />
};

export default GitHubCalendarWidget;

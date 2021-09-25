import React, { FC, useEffect } from "react";
import GitHubCalendar from "github-calendar";
import { Props, defaultData } from "./types";
import { getNotifications } from "./api"
import "github-calendar/dist/github-calendar.css";
import "./github-calendar.css";
import { useCachedEffect } from "../../../hooks";

const EXPIRE_IN = 5 * 60 * 1000; // 5 minues

const GitHubWidget: FC<Props> = ({ data = defaultData, loader, cache, setCache }) => {
    useEffect(() => {
        loader.push()
        GitHubCalendar(
            ".GitHubCalendar",
            data.username,
            {
                responsive: false,
                global_stats: data.showSummary,
            }
        ).finally(() => {
            loader.pop()
        });
    }, []);

    let markNotification = (hasNotifications: boolean) => setCache({ timestamp: Date.now(), hasNotifications });

    useCachedEffect(() => {
        if (!data.apiKey) {
            markNotification(false)
            return
        }
        loader.push()
        getNotifications(data.apiKey)
            .then(markNotification)
            .catch(err => console.warn(err))
            .finally(() => loader.pop());
    }, cache ? cache.timestamp + EXPIRE_IN : 0, []);

    let notifcationsOnClick = () => {
        // Do not indicate notification after click
        markNotification(false)
        window.open("https://github.com/notifications", "_self")
    }

    return (
        <div className="GitHubWidget">
            {cache?.hasNotifications && <span className="GitHubMailStatus"></span>}
            <a className="GitHubCalendar" href="#" onClick={notifcationsOnClick} />
        </div>
    );
};

export default GitHubWidget;

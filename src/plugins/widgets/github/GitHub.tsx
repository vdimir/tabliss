import React, { FC, useEffect } from "react";
import GitHubCalendar from "github-calendar";
import { Props, defaultData, Data } from "./types";
import { getNotifications, Notifications } from "./api"
import "github-calendar/dist/github-calendar.css";
import "./github-calendar.css";
import { useCachedEffect } from "../../../hooks";
import { Icon } from "../../../views/shared";

const isDebug = process.env.NODE_ENV == "development"
const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const EXPIRE_IN = isDebug ? 10 * SECONDS : 5 * MINUTES;

function getNotificationUrl(notification: Notifications[0]) {
    return notification.subject.url.replace("api.github.com/repos", "github.com").replace("/pulls/", "/pull/")
}

function renderNotification(notification: Notifications[0], data: Data, setData: (c: Data) => void) {
    let marked = Date.parse(notification.updated_at) > data.notificationLastClick;
    let onClick = () => {
        setData({ ...data, notificationLastClick: Date.now() })
        window.open(getNotificationUrl(notification), "_self")
    }
    return <div>{marked ? <>&bull;</> : <>&#9702;</>} <a href="#" onClick={onClick}> {notification.subject.title}</a ></div>
}

const GitHubWidget: FC<Props> = ({ data = defaultData, loader, cache, setCache, setData }) => {
    useEffect(() => {
        loader.push()
        let options = { responsive: false, global_stats: data.showActivitySummary, }
        GitHubCalendar(".GitHubCalendar", data.username, options).finally(loader.pop);
    }, []);

    useCachedEffect(() => {
        if (!data.apiKey) {
            setCache({ notifications: [], timestamp: Date.now() })
            return
        }
        loader.push()
        getNotifications(data.apiKey)
            .then(res => setCache({ notifications: res, timestamp: Date.now() }))
            .catch(err => console.warn(err))
            .finally(() => loader.pop());
    }, cache ? cache.timestamp + EXPIRE_IN : 0, []);

    let notifcationsOnClick = () => {
        setData({ ...data, notificationLastClick: Date.now() })
        window.open("https://github.com/notifications", "_self")
    }

    let openAllNotifications = () => cache?.notifications?.forEach(n => window.open(getNotificationUrl(n), "_blank"))

    return (
        <div className="GitHubWidget">
            <a className="GitHubCalendar" href="#" onClick={notifcationsOnClick} />
            {cache?.notifications && (cache?.notifications?.length > 0) &&
                <div className="github-notifications">
                    <div onClick={() => setData({ ...data, showNotificationItems: !data.showNotificationItems })} className="github-hide-notifications">
                        <Icon name={data.showNotificationItems ? "chevron-up" : "bell"} />
                    </div>
                    {data.showNotificationItems && cache.notifications.map(n => renderNotification(n, data, setData))}
                    {data.showNotificationItems && (cache.notifications.length > 1) && <div> - <a href="#" onClick={openAllNotifications}> Open All</a></div>}
                </div>
            }
        </div >
    );
};

export default GitHubWidget;

import React, { FC, useEffect, useState } from "react";
import GitHubCalendar from "github-calendar";
import { Props, defaultData, Data } from "./types";
import { getNotifications, Notifications } from "./api"
import "github-calendar/dist/github-calendar.css";
import "./github-calendar.css";
import { useCachedEffect } from "../../../hooks";
import { Icon } from "../../../views/shared";

const EXPIRE_IN = 5 * 60 * 1000;

function getNotificationUrl(notification: Notifications[0]) {
    return notification.subject.url.replace("api.github.com/repos", "github.com").replace("/pulls/", "/pull/")
}

function renderNotification(notification: Notifications[0], data: Data, setData: (c: Data) => void) {
    return <div>&bull; <a href={getNotificationUrl(notification)}> {notification.subject.title}</a></div>
}

const GitHubWidget: FC<Props> = ({ data = defaultData, loader, cache, setCache, setData }) => {
    useEffect(() => {
        loader.push()
        let options = { responsive: false, global_stats: data.showActivitySummary, }
        GitHubCalendar(".GitHubCalendar", data.username, options).finally(loader.pop);
    }, []);

    let [forceRefresh, doForceRefresh] = useState(false);
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
    }, cache && cache.timestamp ? cache.timestamp + EXPIRE_IN : 0, [forceRefresh]);

    let openAllNotifications = () => cache?.notifications?.forEach(n => window.open(getNotificationUrl(n), "_blank"))

    let hasNotifications = cache?.notifications && (cache?.notifications?.length > 0);
    return (
        <div className="GitHubWidget">
            <a className="GitHubCalendar" href="http://github.com/nostifications" />

            <div className="github-notifications">
                <div className="github-toggle-notifications">
                    {!hasNotifications && <span onClick={() => doForceRefresh(!forceRefresh)} ><Icon name="refresh-cw" /></span>}
                    {hasNotifications &&
                        <span onClick={() => setData({ ...data, showNotificationItems: !data.showNotificationItems })}>
                            <Icon name={data.showNotificationItems ? "chevron-up" : "bell"} />
                        </span>}
                </div>
                {hasNotifications && data.showNotificationItems && cache?.notifications?.map(n => renderNotification(n, data, setData))}
                {hasNotifications && data.showNotificationItems && cache?.notifications && (cache.notifications.length > 1) &&
                    <div> - <a href="#" onClick={openAllNotifications}> Open All</a></div>}
                {hasNotifications && data.showNotificationItems && <div style={{ fontSize: 12, textAlign: "center" }}>
                    <a href="#" onClick={() => doForceRefresh(!forceRefresh)} >
                        <span style={{ fontSize: 12, textAlign: "center" }}><Icon size="14" name="refresh-cw" /></span>
                    </a>
                </div>}
            </div>
        </div >
    );
};

export default GitHubWidget;

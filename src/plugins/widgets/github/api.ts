import { Octokit } from "@octokit/rest";

import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

const octokit = new Octokit();
export type Notifications = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.activity.listNotificationsForAuthenticatedUser>

export async function getNotifications(apiKey: string): Promise<Notifications> {
    const octokit = new Octokit({ auth: apiKey });
    const notifications = await octokit.rest.activity.listNotificationsForAuthenticatedUser()
    if (notifications.status >= 500) {
        throw new Error("Octokit getNotifications: " + notifications.status.toString())
    }
    return notifications.data;
}



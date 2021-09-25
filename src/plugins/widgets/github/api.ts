import { Octokit } from "@octokit/rest";

export async function getNotifications(apiKey: string) {
    const octokit = new Octokit({ auth: apiKey });
    const notifications = await octokit.rest.activity.listNotificationsForAuthenticatedUser()
    if (notifications.status >= 500) {
        throw new Error("Octokit getNotifications: " + notifications.status.toString())
    }
    return notifications.data.length > 0;
}



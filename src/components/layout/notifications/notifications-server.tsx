import { getNotifications } from "@/lib/apis/get-notifications.api";
import Notifications from "./notifications-client";
import { getUnReadCount } from "@/lib/apis/get-unreadcount.api";
import { NotificationsResponse } from "@/lib/types/notification";
// import RouteRefresher from "./route-refresher";

export type UnreadResponse = {
  unread_count: number;
};
export default async function NotificationsServer() {
  try {
    const data: NotificationsResponse = await getNotifications();
    const count: UnreadResponse = await getUnReadCount();

    return (
      <>
        <Notifications
          data={data.notifications ?? []}
          count={count.unread_count ?? 0}
        />
        {/* <RouteRefresher /> */}
      </>
    );
  } catch {
    return <Notifications data={[]} count={0} />;
  }
}

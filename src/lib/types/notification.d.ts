export type Notification = {
  id: number;
  message: string;
  read: boolean;
  user_id: number;
  created_at: Date;
};
export type NotificationsResponse = {
  notifications: Notification[];
  page: number;
  pages: number;
  total: number;
  unread_count: number;
};
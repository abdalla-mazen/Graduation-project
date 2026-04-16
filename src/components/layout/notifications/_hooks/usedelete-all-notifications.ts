import { useMutation } from "@tanstack/react-query"
import { deleteAllNotification } from "../_actions/delete-all-notifications.action"

export function useDeleteAllNotifications() {
  return useMutation({
    mutationFn: () => deleteAllNotification() 
  })
}
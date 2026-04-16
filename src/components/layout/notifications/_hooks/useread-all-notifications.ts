import { useMutation } from "@tanstack/react-query"
import { readAllNotification } from "../_actions/read-all-notification.actions"

export function useReadAllNotifications() {
  return useMutation({
    mutationFn: () => readAllNotification() 
  })
}
import { useMutation } from "@tanstack/react-query"
import { readSpecificNotification } from "../_actions/read-specific-notification.action"


export function useReadSpecificNotification() {
  return useMutation({
    mutationFn: (notif_id: string) => readSpecificNotification(notif_id)
  })
}
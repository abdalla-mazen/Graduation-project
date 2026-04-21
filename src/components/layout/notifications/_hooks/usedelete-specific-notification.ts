import { useMutation } from "@tanstack/react-query"
import { deleteSpecificNotification } from "../_actions/delete-specific-notification.action"


export function useDeleteSpecificNotification() {
  return useMutation({
    mutationFn: (notif_id: string) => deleteSpecificNotification(notif_id)
  })
}
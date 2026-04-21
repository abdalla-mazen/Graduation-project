"use client";
import React from "react";
import { BellRing, Trash2, Check } from "lucide-react";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem, DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { useReadSpecificNotification } from "./_hooks/useread-specific-notification";
import { useReadAllNotifications } from "./_hooks/useread-all-notifications";
import { useDeleteSpecificNotification } from "./_hooks/usedelete-specific-notification";
import { useDeleteAllNotifications } from "./_hooks/usedelete-all-notifications";
import { RefreshCw } from 'lucide-react';
import { useRouter } from "next/navigation";
type NotificationItem = {
  id?: string | number;
  message: string;
  read: boolean;
};

type NotificationsProps = {
  data: NotificationItem[];
  count: number;
};

export default function Notifications({ data, count }: NotificationsProps) {
  const { mutate: readOne } = useReadSpecificNotification();
  const { mutate: readAll, isPending } = useReadAllNotifications();
  const { mutate: deleteOne } = useDeleteSpecificNotification();
  const { mutate: deleteAll, isPending: isDeleting } = useDeleteAllNotifications();

  const router = useRouter()
  const handleRead = (id: string | number) => {
    readOne(String(id));
  };

  const handleDelete = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    deleteOne(String(id));
  };

  const handleReadAll = () => {
    readAll();
  };

  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all notifications?")) {
      deleteAll();
    }
  };

  const refrshAll = ()=>{
   router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative flex flex-col items-center md:mt-2 group"
        >
          <div className="relative">
            <BellRing className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
              {count}
            </span>
          </div>
          <span className="text-xs text-gray-600">Notifications</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel className="flex items-center justify-between text-sm font-semibold">
          <span>Notifications</span>

          {count >= 0 && (
            <div className="flex items-center gap-2">
               {/* Refresh all */}
              <span onClick={()=>refrshAll()}> <RefreshCw  className="text-mainColor w-5 h-5 cursor-pointer"/></span>
              {/* Mark all */}
              <span
                onClick={handleReadAll}
                className={`text-xs cursor-pointer px-2 py-1 rounded-full border
                  border-blue-200 bg-blue-50 text-blue-600
                  hover:bg-blue-100 transition
                  ${isPending ? "opacity-50 pointer-events-none" : ""}
                `}
              >
                {isPending ? "..." : "Mark all"}
              </span>

              {/* Delete all */}
              <span
                onClick={handleDeleteAll}
                className={`text-xs cursor-pointer px-2 py-1 rounded-full border
                  border-red-200 bg-red-50 text-red-600
                  hover:bg-red-100 transition
                  ${isDeleting ? "opacity-50 pointer-events-none" : ""}
                `}
              >
                {isDeleting ? "..." : "Delete all"}
              </span>
            </div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="max-h-60 overflow-y-auto">
          {data.length > 0 ? (
            data.map((item, i) => {
              const isRead = item.read;

              return (
                <DropdownMenuItem
                  key={item.id ?? i}
                  onClick={() => item.id && !isRead && handleRead(item.id)}
                  className={`cursor-pointer rounded-md text-sm transition flex items-center justify-between ${
                    isRead
                      ? "text-gray-400 bg-gray-50"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isRead ? "bg-gray-300" : "bg-blue-500"
                      }`}
                    />
                    <span>{item.message}</span>
                  </div>

                  {item.id && (
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      {!isRead && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRead(item.id!);
                          }}
                          className="p-1 rounded hover:bg-blue-100 text-blue-400 hover:text-blue-600 transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}

                      <span
                        onClick={(e) => handleDelete(e, item.id!)}
                        className="p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </span>

                    </div>
                  )}
                </DropdownMenuItem>
              );
            })
          ) : (
            <div className="p-3 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

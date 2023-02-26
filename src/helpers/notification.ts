import { BrowserNotification } from "./notificationType/BrowserNotification";
import { ToastNotification } from "./notificationType/ToastNotification";

type PermissionType = "denied" | "granted" | "default";

export async function notificationInstance() {
  if (!("Notification" in window)) {
    console.log("Esse browser nao suporta notifications!");
    return new ToastNotification();
  }

  const response = await Notification.requestPermission();
  if (response === "granted") {
    return new BrowserNotification();
  }
  return new ToastNotification();
}

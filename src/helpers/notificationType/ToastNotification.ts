import { toast } from "react-toastify";
import { INotification, INotificationParams } from "../base/NotificationBase";

export class ToastNotification implements INotification {
  constructor() {}
  notify({ type, content }: INotificationParams) {
    toast[type](content);
  }
}

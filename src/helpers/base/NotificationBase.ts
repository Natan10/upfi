export interface INotificationParams {
  content: string;
  icon?: any;
  type: "error" | "success" | "info";
}

export interface INotification {
  notify: (params: INotificationParams) => void;
}

export class NotificationBase {
  constructor(private readonly notification: INotification) {}

  call(params: INotificationParams) {
    this.notification.notify(params);
  }
}

import { INotification, INotificationParams } from "../base/NotificationBase";

const mapperType = {
  error: "Erro",
  success: "Sucesso",
  info: "Info",
};

export class BrowserNotification implements INotification {
  constructor() {}
  notify({ type, content, icon }: INotificationParams) {
    new Notification(mapperType[type], {
      body: content,
      icon: icon,
    });
  }
}

export interface UserNotification {
  title: string;
  text: string;
  //confirm
  confirmed?: boolean;
  //prompt
  value?: string;
}

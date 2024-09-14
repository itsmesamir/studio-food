export enum NotificationType {
  LEAVE_PENDING = 'LEAVE_PENDING',
  LEAVE_APPROVED = 'LEAVE_APPROVED',
  LEAVE_REJECTED = 'LEAVE_REJECTED',
  LEAVE_CACELED = 'LEAVE_CACELED',
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  message: string;
  data?: object;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy: number;
  updatedBy?: number;
}
export interface NotificationBody {
  userId: number;
  type: string;
  message: string;
  data?: object;
  isRead: boolean;
  createdBy: number;
  updatedBy?: number;
}

export interface ChatLogMessage {
  messageId: string;
  userId: string;
  fullName: string;
  timestamp: string;
  email: string;
  message: string;
  avatar: string | null;
}

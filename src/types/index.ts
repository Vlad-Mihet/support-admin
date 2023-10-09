export interface ChatMessage {
  id: string;
  text: string;
  timestamp: number;
  sentByAdmin: boolean;
}

export interface Chat {
  id: string;
  messages: ChatMessage[];
}

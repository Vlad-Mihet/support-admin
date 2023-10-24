import { RawDraftContentState } from "draft-js";

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

export interface Contract {
  id: string;
  name: string;
  link: string;
  header: string;
  content: RawDraftContentState;
  contractContent: RawDraftContentState;
}

import { useEffect, useState } from "react";

import { rdb } from "../modules/firebase";
import { onValue, ref } from "firebase/database";

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: number;
  sentByAdmin: boolean;
}

export const useChatMessages = (sessionId?: string) => {
  // Retrieve chat messages from firebase realtime database
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const chatMessagesRef = ref(rdb, `messages/${sessionId}`);

  const unsubscribe = onValue(
    chatMessagesRef,
    (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.val();

      if (data) {
        const messages = Object.entries(data).map(([id, message]: any) => ({
          ...message,
          id,
        }));

        setMessages(messages);
      }
    },
    {
      onlyOnce: true,
    }
  );

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, [unsubscribe]);

  return messages;
};

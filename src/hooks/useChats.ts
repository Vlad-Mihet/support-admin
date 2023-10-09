import { onValue, ref } from "firebase/database";
import { rdb } from "../modules/firebase";
import { useEffect, useState } from "react";
import { Chat, ChatMessage } from "../types";

type FirebaseChat = {
  [key: string]: {
    [key: string]: ChatMessage;
  };
};

export const useChats = (): { chats: Chat[] } => {
  const [chats, setChats] = useState<Chat[]>([]);

  // Retrieve all firebase realtime database `chats` entries
  const chatsRef = ref(rdb, "messages");

  // Listen for changes in chatsRef
  const unsubscribe = onValue(
    chatsRef,
    (snapshot) => {
      const data: FirebaseChat = snapshot.val();

      if (!data) return;

      // Convert data to array of ChatMessage objects
      const chatsWithMessages: any[] = Object.entries(data).map(
        ([chatId, chatData]: any) => ({
          id: chatId,
          messages: Object.entries(chatData).map(
            ([messageId, messageData]: any) => ({
              id: messageId,
              ...messageData,
            })
          ),
        })
      );

      // Convert array of ChatMessage objects to array of Chat objects
      const chatsArray: Chat[] = chatsWithMessages.map((chat) => ({
        id: chat.id,
        messages: chat.messages,
      }));

      setChats(chatsArray);
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

  return { chats };
};

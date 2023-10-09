import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import type { Chat } from "../../types";
import { FormEvent, useMemo, useRef, useState } from "react";
import { child, push, ref, update } from "firebase/database";
import { rdb } from "../../modules/firebase";
import { useChatMessages } from "../../hooks/useChatMessages";

interface Props {
  chats: Chat[];
  chatId?: string;
}

const ChatsContainer = ({ chats, chatId }: Props) => {
  const [chatInputValue, setChatInputValue] = useState("");

  const messagesListRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleChatClick = (chatId: string) => {
    navigate(`/${chatId}`);
  };

  const chatsOrderedByLastMessage = useMemo(
    () =>
      chats.sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];

        return lastMessageB.timestamp - lastMessageA.timestamp;
      }),
    [chats]
  );

  const chatMessages = useChatMessages(chatId);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!chatId) return;

    // Send message to firebase realtime database

    // Add a new message entry to the database
    const newMessageKey = push(child(ref(rdb), `messages/${chatId}`)).key;

    // Update the messages list with the new messagE
    update(ref(rdb), {
      [`messages/${chatId}/${newMessageKey}`]: {
        id: chatId,
        text: chatInputValue,
        timestamp: Date.now(),
        sentByAdmin: true,
      },
    });

    // Clear the input
    setChatInputValue("");

    // Scroll to the bottom of the messages list
    messagesListRef.current?.scrollTo({
      top: messagesListRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles["chats-container"]}>
      <div className={styles["chats-container__chats-sidebar"]}>
        <ul>
          {chatsOrderedByLastMessage.map((chat) => {
            return (
              <li
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className={styles["chats-container__chats-sidebar__chat"]}>
                <p>{chat.messages[0].text}</p>
                <span>
                  {format(
                    chat.messages[chat.messages.length - 1].timestamp,
                    // Relative time format with day, month, hours and minutes
                    // E.g 1 day ago, 2 days ago, 1 month ago, 1 month and 1 day ago
                    "PPPp"
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles["chats-container__chat"]}>
        {chatMessages ? (
          <>
            <div
              ref={messagesListRef}
              className={styles["chats-container__chat__messages"]}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.sentByAdmin
                      ? styles[
                          "chats-container__chat__messages__message--admin"
                        ]
                      : styles["chats-container__chat__messages__message--user"]
                  }>
                  <p>{message.text}</p>
                  <span>{format(message.timestamp, "PPPp")}</span>
                </div>
              ))}
            </div>
            <form
              className={styles["chats-container__chat__input"]}
              onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message"
                value={chatInputValue}
                onChange={(e) => setChatInputValue(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className={styles["chats-container__chat__no-chat"]}>
            <p>Select a chat to start messaging</p>
            <span>👈</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsContainer;

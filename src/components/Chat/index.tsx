import { useChatMessages } from "../../hooks/useChatMessages";
import { useGenerateSessionId } from "../../hooks/useGenerateSessionId";
import { ChatInput, Message } from "./components";

import { child, push, ref, update } from "firebase/database";

import styles from "./index.module.scss";
import { rdb } from "../../modules/firebase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: number;
  sentByAdmin: boolean;
}

const Chat = ({ isOpen, onClose }: Props) => {
  const sessionId = useGenerateSessionId();

  const messages = useChatMessages(sessionId);

  const handleSendMessage = (message: ChatMessage) => {
    // Send message to firebase realtime database

    // Add a new message entry to the database
    const newMessageKey = push(child(ref(rdb), `messages/${sessionId}`)).key;

    // Update the messages list with the new messagE
    update(ref(rdb), {
      [`messages/${sessionId}/${newMessageKey}`]: message,
    });
  };

  return (
    <div className={styles.chat}>
      <h2>How can we help?</h2>
      <div className={styles["messages-container"]}>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      <div className={styles["input-container"]}>
        <ChatInput
          handleSendMessage={(message) =>
            handleSendMessage({
              id: sessionId,
              text: message,
              timestamp: Date.now(),
              sentByAdmin: false,
            })
          }
        />
      </div>
    </div>
  );
};

export default Chat;

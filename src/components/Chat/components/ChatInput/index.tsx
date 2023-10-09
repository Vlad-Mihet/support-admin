import styles from "./index.module.scss";
import { useState } from "react";

interface Props {
  handleSendMessage: (message: string) => void;
}

const ChatInput = ({ handleSendMessage }: Props) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    handleSendMessage(message);
    setMessage("");
  };

  return (
    <div className={styles["chat-input"]}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;

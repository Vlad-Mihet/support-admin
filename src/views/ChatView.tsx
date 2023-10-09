import { useParams } from "react-router-dom";
import { ChatsContainer } from "../components";
import { Chat } from "../types";

const ChatView = ({ chats }: { chats: Chat[] }) => {
  const { chatId } = useParams();

  return <ChatsContainer chats={chats} chatId={chatId} />;
};

export default ChatView;

import { ChatsContainer } from "../components";
import { Chat } from "../types";

const Home = ({ chats }: { chats: Chat[] }) => {
  return <ChatsContainer chats={chats} />;
};

export default Home;

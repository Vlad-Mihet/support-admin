import { ChatsContainer } from "../components";
import Layout from "../layout";
import { Chat } from "../types";

const Home = ({ chats }: { chats: Chat[] }) => {
  return (
    <Layout>
      <ChatsContainer chats={chats} />
    </Layout>
  );
};

export default Home;

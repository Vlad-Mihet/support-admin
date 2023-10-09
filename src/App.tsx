import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import ChatView from "./views/ChatView";
import { useChats } from "./hooks/useChats";

function App() {
  const { chats } = useChats();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home chats={chats} />} />
          <Route path="/:chatId" element={<ChatView chats={chats} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

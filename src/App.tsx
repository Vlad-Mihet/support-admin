import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import ChatView from "./views/ChatView";
import { useChats } from "./hooks/useChats";
import Contracts from "./views/Contracts";
import CreateContract from "./views/CreateContract";
import ContractView from "./views/ContractView";

import "draft-js/dist/Draft.css";
import EditContract from "./views/EditContract";

function App() {
  const { chats } = useChats();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home chats={chats} />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contracts/:contractId" element={<ContractView />} />
          <Route path="/contracts/create" element={<CreateContract />} />
          <Route
            path="/contracts/:contractId/edit"
            element={<EditContract />}
          />
          <Route path="/:chatId" element={<ChatView chats={chats} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { v4 as uuidv4 } from "uuid";

export const useGenerateSessionId = () => {
  // Check if session id in local storage
  const sessionId = localStorage.getItem("sessionId");

  if (sessionId) {
    return sessionId;
  }

  // Generate session id
  const newSessionId = uuidv4();

  localStorage.setItem("sessionId", newSessionId);

  return newSessionId;
};

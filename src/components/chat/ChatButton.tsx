import { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useChat } from "./useChat";
import ChatModal from "./ChatModal";
import "./Chat.css";

const ChatButton = () => {
  const [open, setOpen] = useState(false);
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <>
      {!open && (
        <button
          type="button"
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label="Open résumé assistant"
        >
          <IoChatbubbleEllipses />
          <span>Ask my AI</span>
        </button>
      )}
      {open && (
        <ChatModal
          onClose={() => setOpen(false)}
          messages={messages}
          isLoading={isLoading}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
};

export default ChatButton;

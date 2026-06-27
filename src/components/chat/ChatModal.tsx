import { useEffect } from "react";
import type { ChatMessage } from "./types";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import SuggestionChips from "./SuggestionChips";

const ChatModal = ({
  onClose,
  messages,
  isLoading,
  sendMessage,
}: {
  onClose: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const last = messages[messages.length - 1];
  const showChips = messages.length === 0 || (last?.role === "assistant" && last.grounded === false);

  return (
    <div className="chat-backdrop" onClick={onClose}>
      <div
        className="chat-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Résumé assistant"
        onClick={(e) => e.stopPropagation()}
      >
        <ChatHeader onClose={onClose} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        {showChips && <SuggestionChips onSelect={sendMessage} disabled={isLoading} />}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatModal;

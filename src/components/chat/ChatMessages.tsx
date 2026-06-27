import { useEffect, useRef } from "react";
import type { ChatMessage } from "./types";
import { GREETING } from "./suggestions";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

const ChatMessages = ({
  messages,
  isLoading,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
}) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat-messages">
      <ChatBubble role="assistant" content={GREETING} />
      {messages.map((m, i) => (
        <ChatBubble key={i} role={m.role} content={m.content} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;

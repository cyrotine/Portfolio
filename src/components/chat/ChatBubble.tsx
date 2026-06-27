import type { ChatRole } from "./types";

const ChatBubble = ({ role, content }: { role: ChatRole; content: string }) => (
  <div className={`chat-bubble chat-bubble-${role}`}>{content}</div>
);

export default ChatBubble;

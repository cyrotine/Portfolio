import { IoClose } from "react-icons/io5";

const ChatHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="chat-header">
    <div>
      <p className="chat-header-title">Prahar's AI Assistant</p>
      <p className="chat-header-subtitle">Ask me about Prahar's résumé</p>
    </div>
    <button type="button" className="chat-close" onClick={onClose} aria-label="Close chat">
      <IoClose />
    </button>
  </div>
);

export default ChatHeader;

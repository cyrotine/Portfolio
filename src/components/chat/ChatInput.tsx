import { useState, type KeyboardEvent } from "react";
import { IoSend } from "react-icons/io5";

const ChatInput = ({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled: boolean;
}) => {
  const [text, setText] = useState("");

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask about Prahar's résumé…"
        rows={1}
        aria-label="Message"
      />
      <button
        type="button"
        className="chat-send"
        onClick={submit}
        disabled={disabled || !text.trim()}
        aria-label="Send message"
      >
        <IoSend />
      </button>
    </div>
  );
};

export default ChatInput;

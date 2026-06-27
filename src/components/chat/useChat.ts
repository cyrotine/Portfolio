import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, ChatResponse } from "./types";

const STORAGE_KEY = "chat-messages";
const FALLBACK_ERROR = "The assistant is unavailable right now. Please try again.";

function load(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(load);
  const [isLoading, setIsLoading] = useState(false);
  const sending = useRef(false);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || sending.current) return;
      sending.current = true;
      setIsLoading(true);

      // history = conversation before this message (server appends `message` itself)
      const history = messages;
      setMessages((prev) => [...prev, { role: "user", content: message }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history }),
        });
        const data = (await res.json()) as ChatResponse;
        if (!res.ok || !data.answer) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.error ?? FALLBACK_ERROR, grounded: true },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.answer!, grounded: data.grounded ?? true },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: FALLBACK_ERROR, grounded: true },
        ]);
      } finally {
        sending.current = false;
        setIsLoading(false);
      }
    },
    [messages]
  );

  return { messages, isLoading, sendMessage };
}

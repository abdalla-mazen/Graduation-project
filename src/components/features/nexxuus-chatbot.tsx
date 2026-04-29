"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  BotMessageSquare,
  LoaderCircle,
  SendHorizontal,
  Sparkles,
  User2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "bot";
  content: string;
};

type ChatRequest = {
  message: string;
};

type ChatResponse = {
  response: string;
};

const API_ENDPOINT = "/api/nexus-chatbot";

export default function NexxuusChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const trimmedMessage = userMessage.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const newUserMessage: ChatMessage = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserMessage("");
    setError("");
    setIsLoading(true);

    try {
      const requestBody: ChatRequest = {
        message: trimmedMessage,
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data: ChatResponse = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "bot",
          content: data.response,
        },
      ]);
    } catch (err) {
      console.error("Failed to send chat message:", err);
      setError("An error occurred while sending the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await sendMessage();
    }
  };

  return (
    <section className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100vw-2rem)] max-w-[440px] -translate-x-1/2 flex-col items-center sm:bottom-6 sm:left-auto sm:right-6 sm:w-auto sm:max-w-none sm:translate-x-0 sm:items-end">
      {isOpen ? (
        <div className="relative mb-3 flex h-[min(78vh,680px)] w-full max-w-[440px] flex-col overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_24px_70px_-32px_rgba(37,99,235,0.45)] dark:border-blue-950/40 dark:bg-zinc-950 sm:mb-4 sm:h-[min(80vh,720px)] sm:rounded-[28px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 opacity-95" />
          <div className="pointer-events-none absolute -right-12 top-12 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute left-8 top-8 h-20 w-20 rounded-full bg-sky-200/30 blur-2xl" />

          <header className="relative z-10 border-b border-white/15 px-4 py-4 text-white sm:px-6 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur sm:h-12 sm:w-12">
                  <BotMessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                      Nexus ChatBot
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium ring-1 ring-white/20">
                      <Sparkles className="h-3.5 w-3.5" />
                      AI Assistant
                    </span>
                  </div>
                  <p className="mt-1 max-w-[16rem] text-xs text-blue-50/90 sm:max-w-none sm:text-sm">
                    Ask about any academic topic and get an instant reply.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white transition hover:bg-white/25"
                aria-label="Close chatbot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950">
            <ScrollArea className="min-h-0 flex-1 px-3 py-4 sm:px-6 sm:py-5">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="flex min-h-[38vh] items-center justify-center sm:min-h-[48vh]">
                    <div className="max-w-md rounded-3xl border border-blue-100 bg-white/90 px-5 py-6 text-center shadow-sm backdrop-blur dark:border-blue-950/40 dark:bg-zinc-900/80 sm:px-6 sm:py-8">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300 sm:h-14 sm:w-14">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">
                        Start a New Chat
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        Type your question below and Nexus ChatBot will reply in this chat window.
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={cn(
                        "flex w-full items-end gap-3",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "bot" ? (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-500/15 dark:text-blue-300">
                          <BotMessageSquare className="h-5 w-5" />
                        </div>
                      ) : null}

                      <div
                        dir="auto"
                        className={cn(
                          "max-w-[82%] rounded-[20px] px-3.5 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%] sm:rounded-[22px] sm:px-4",
                          message.role === "user"
                            ? "rounded-br-md bg-gradient-to-br from-blue-600 to-blue-500 text-white"
                            : "rounded-bl-md border border-blue-100 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                        )}
                      >
                        {message.content}
                      </div>

                      {message.role === "user" ? (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                          <User2 className="h-5 w-5" />
                        </div>
                      ) : null}
                    </div>
                  ))
                )}

                {isLoading ? (
                  <div className="flex items-end gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-500/15 dark:text-blue-300">
                      <BotMessageSquare className="h-5 w-5" />
                    </div>

                    <div className="rounded-[22px] rounded-bl-md border border-blue-100 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-300" />
                        Typing a reply...
                      </div>
                    </div>
                  </div>
                ) : null}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t border-blue-100 bg-white/90 p-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 sm:p-5">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Input
                    type="text"
                    value={userMessage}
                    onChange={(event) => setUserMessage(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    disabled={isLoading}
                    dir="auto"
                    className="h-11 rounded-2xl border-blue-200 bg-blue-50/60 text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 sm:h-12"
                  />

                  <Button
                    type="submit"
                    disabled={isLoading || userMessage.trim() === ""}
                    className="h-11 w-full rounded-2xl bg-blue-600 px-5 text-white hover:bg-blue-700 sm:h-12 sm:min-w-28 sm:w-auto"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Sending
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <SendHorizontal className="h-4 w-4" />
                        Send
                      </span>
                    )}
                  </Button>
                </div>

                {error ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-950/50 dark:bg-red-950/20 dark:text-red-300">
                    {error}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <Button
        type="button"
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="h-12 rounded-full bg-blue-600 px-5 text-white shadow-[0_16px_40px_-18px_rgba(37,99,235,0.95)] hover:bg-blue-700 sm:h-14 sm:px-6"
      >
        <span className="flex items-center gap-2">
          {isOpen ? <X className="h-5 w-5" /> : <BotMessageSquare className="h-5 w-5" />}
          {isOpen ? "Close Chat" : "Open Chat"}
        </span>
      </Button>
    </section>
  );
}

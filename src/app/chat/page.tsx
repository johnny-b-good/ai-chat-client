import { MessageBubble, ChatLayout, MessageForm, MessageList } from "./ui";

export default function ChatPage() {
  return (
    <ChatLayout>
      <MessageList>
        {[1, 2, 3, 4, 5, 6, 7].map((index) => {
          return (
            <MessageBubble
              key={index}
              author={index % 2 === 0 ? "Assistant" : "You"}
              authorType={index % 2 === 0 ? "user" : "ai"}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          );
        })}
      </MessageList>

      <MessageForm />
    </ChatLayout>
  );
}

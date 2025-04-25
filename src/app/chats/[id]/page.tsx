import {
  MessageBubble,
  ChatLayout,
  MessageForm,
  MessageList,
  EmptyMessageList,
} from "./ui";
import prisma from "@/app/lib/prisma";

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = parseInt(params.id);

  const chat = await prisma.chat.findFirstOrThrow({
    where: { id },
    include: {
      model: true,
    },
  });

  const messages = await prisma.message.findMany({
    where: {
      chatId: id,
    },
  });

  return (
    <ChatLayout>
      <MessageList>
        {messages.map((message) => {
          return (
            <MessageBubble
              key={message.id}
              author={message.author === "MODEL" ? chat.model.name : "You"}
              authorType={message.author === "MODEL" ? "ai" : "user"}
              text={message.text}
            />
          );
        })}

        {messages.length === 0 && <EmptyMessageList />}
      </MessageList>

      <MessageForm />
    </ChatLayout>
  );
}

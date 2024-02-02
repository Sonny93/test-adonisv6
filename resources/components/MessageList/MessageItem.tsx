export default function MessageItem({ message }: Readonly<{ message: Message }>) {
  return <li>{message.content}</li>
}

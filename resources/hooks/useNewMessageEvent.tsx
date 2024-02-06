import useSubscribe from './useSubscribe'

type MessageEventData = {
  type: 'user' | 'system'
} & Message

export default function useNewMessageEvent(
  channelId: Channel['id'],
  cb: (newData: MessageEventData) => void
) {
  useSubscribe<MessageEventData>(`channels/${channelId}`, cb)
}

import useChannel from '@/hooks/useChannel'
import { HiHashtag } from 'react-icons/hi2'

export default function ChannelName() {
  const { channel } = useChannel()
  return (
    <div
      css={{
        padding: '.25em .5em',
        display: 'flex',
        gap: '.35em',
        alignItems: 'center',
        borderBottom: '1px solid #dadce0',
      }}
    >
      <HiHashtag size={24} /> {channel.name}
    </div>
  )
}

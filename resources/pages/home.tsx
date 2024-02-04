import ChannelList from '@/components/ChannelList/ChannelList'
import CreateChannelForm from '@/components/CreateChannelForm'

export default function Home({ channels }: { channels: Channel[] }) {
  return (
    <div
      css={{
        padding: '1em',
        display: 'flex',
        gap: '.75em',
        flexDirection: 'column',
      }}
    >
      <h1>List of channels</h1>
      <CreateChannelForm />
      <ChannelList channels={channels} />
    </div>
  )
}

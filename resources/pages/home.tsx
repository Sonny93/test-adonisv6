import ChannelList from '@/components/ChannelList/ChannelList'
import CreateChannelForm from '@/components/CreateChannelForm'
import Navbar from '@/components/Navbar'

export default function Home({ channels }: { channels: Channel[] }) {
  return (
    <>
      <Navbar />
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
    </>
  )
}

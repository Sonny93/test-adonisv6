import ChannelList from "@/components/ChannelList/ChannelList";
import CreateChannelForm from "@/components/CreateChannelForm";

export default function Home({ channels }: { channels: Channel[]}) {
  return (
    <>
      <h1>List of channels</h1>
      <CreateChannelForm />
      <ChannelList channels={channels} />
    </>
  )
}

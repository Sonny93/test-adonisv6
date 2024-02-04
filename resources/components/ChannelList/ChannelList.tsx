import { Link } from "@inertiajs/react"

export default function ChannelList({ channels }: { channels: Channel[]}) {
  return (<ul>{channels.map((channel) => <ChannelItem channel={channel} />)}</ul>)
}

function ChannelItem ({ channel }: { channel: Channel }) {
  console.log(channel)
  return (
    <li>
      <Link href={`/channels/${channel.id}`}>
      {channel.name}
      </Link>
    </li>
  )
}

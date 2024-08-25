import { Link } from '@inertiajs/react';

export default function ChannelList({ channels }: { channels: Channel[] }) {
  return (
    <ul css={{ paddingLeft: '1em' }}>
      {channels.map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </ul>
  );
}

function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <li
      css={{
        listStyle: 'circle',
      }}
    >
      <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
    </li>
  );
}

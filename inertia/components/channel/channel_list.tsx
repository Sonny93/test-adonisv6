import { ChannelItem } from '~/components/channel/channel_item';
import { Channel } from '~/types';

export const ChannelList = ({ channels }: { channels: Channel[] }) => (
  <ul>
    {channels.map((channel) => (
      <ChannelItem channel={channel} key={channel.id} />
    ))}
  </ul>
);

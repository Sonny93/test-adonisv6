import { SimpleGrid } from '@mantine/core';
import { ChannelItem } from '~/components/channel/channel_item';
import { TimerProvider } from '~/contexts/time_provider';
import { ChannelWithMessages } from '~/types';

interface ChannelListProps {
  channels: ChannelWithMessages[];
}
export const ChannelList = ({ channels }: ChannelListProps) => (
  <SimpleGrid cols={3}>
    <TimerProvider>
      {channels.map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </TimerProvider>
  </SimpleGrid>
);

import { Title } from '@mantine/core';
import { HiHashtag } from 'react-icons/hi2';
import useChannel from '~/hooks/useChannel';

export default function ChannelName() {
  const { channel } = useChannel();
  return (
    <Title order={2}>
      <HiHashtag size={24} /> {channel.name}
    </Title>
  );
}

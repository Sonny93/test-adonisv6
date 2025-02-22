import { Link } from '@inertiajs/react';
import { Avatar, Card, Group, Image, Text, Tooltip } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTime } from '~/hooks/use_time';
import { ChannelWithMessages } from '~/types';
import classes from './channel_item.module.css';

dayjs.extend(relativeTime);

const SPLASH_IMAGE =
  'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';

interface ChannelItemProps {
  channel: ChannelWithMessages;
}
export function ChannelItem({ channel }: ChannelItemProps) {
  const currentTime = useTime();
  return (
    <Card
      component={Link}
      href={`/channels/${channel.id}`}
      withBorder
      padding="lg"
      radius="md"
      className={classes.card}
    >
      <Card.Section mb="sm">
        <Image src={SPLASH_IMAGE} alt="yes" height={180} />
      </Card.Section>

      <Tooltip label={channel.name}>
        <Text fw={700} className={classes.title} mt="xs" truncate>
          {channel.name}
        </Text>
      </Tooltip>

      <Group mt="lg">
        <Avatar src={channel.author.avatarUrl} radius="sm" />
        <div>
          <Text fw={500}>{channel.author.nickName}</Text>
          <Text fz="xs" c="dimmed">
            {dayjs(channel.createdAt).from(dayjs(currentTime))}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {channel.messages.length} message
            {channel.messages.length > 1 ? 's' : ''}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  );
}

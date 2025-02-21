import { Link } from '@inertiajs/react';
import { Channel } from '~/types';

export const ChannelItem = ({ channel }: { channel: Channel }) => (
  <li>
    <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
  </li>
);

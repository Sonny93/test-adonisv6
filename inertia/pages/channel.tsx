import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import { ContextProviders } from '~/components/context_providers';
import MessageList from '~/components/message/message_list';
import { ChannelLayout } from '~/layouts/channel_layout';
import { ChannelExtended, User } from '~/types';
import type { NewMediaTransport } from '~/types/transport';

interface ChannelPageProps {
  channel: ChannelExtended;
  routerRtpCapabilities: {
    rtpCapabilities: RtpCapabilities;
  };
  producers: NewMediaTransport[];
  users: User[];
}

const ChannelPage = ({
  channel,
  routerRtpCapabilities,
  producers,
  users,
}: ChannelPageProps) => (
  <ContextProviders
    channel={channel}
    routerRtpCapabilities={routerRtpCapabilities}
  >
    <ChannelLayout users={users} channel={channel} producers={producers}>
      <MessageList />
    </ChannelLayout>
  </ContextProviders>
);

export default ChannelPage;

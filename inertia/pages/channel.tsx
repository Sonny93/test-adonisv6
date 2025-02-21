import { Container, Tabs } from '@mantine/core';
import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import ChannelName from '~/components/channel_name';
import { ContextProviders } from '~/components/context_providers';
import { CreateMessageForm } from '~/components/create_message_form';
import MessageList from '~/components/message/message_list';
import { WhosTyping } from '~/components/typing_indicator/typing_indicator_list';
import { UserList } from '~/components/user_list/user_list';
import { VideoList } from '~/components/video_list/video_list';
import DefaultLayout from '~/layouts/default_layout';
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
    <Container>
      <UserList users={users} />
      <Tabs defaultValue="messages">
        <Tabs.List>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
          <Tabs.Tab value="call">Call</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="messages">
          <ChannelName />
          <MessageList />
          <WhosTyping />
          <CreateMessageForm />
        </Tabs.Panel>
        <Tabs.Panel value="call">
          <VideoList producers={producers} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  </ContextProviders>
);

ChannelPage.layout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default ChannelPage;

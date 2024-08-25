import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import ChannelName from '~/components/ChannelName';
import CreateMessageForm from '~/components/CreateMessageForm';
import MessageList from '~/components/MessageList/MessageList';
import Navbar from '~/components/Navbar';
import UserList from '~/components/UserList/UserList';
import VideoList from '~/components/VideoList/VideoList';
import WhosTyping from '~/components/WhosTypings/WhosTypings';
import { ChannelContextProvider } from '~/contexts/channelContext';
import { MediaTransportsContextProvider } from '~/contexts/mediaTransportsContext';
import { MessagesContextProvider } from '~/contexts/messagesContext';
import { RtpDeviceContextProvider } from '~/contexts/rtpDeviceContext';
import { TransmitContextProvider } from '~/contexts/transmitContext';
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
  routerRtpCapabilities: { rtpCapabilities },
  producers,
  users,
}: ChannelPageProps) => (
  <TransmitContextProvider>
    <ChannelContextProvider channel={channel}>
      <MessagesContextProvider messages={channel.messages}>
        <RtpDeviceContextProvider routerRtpCapabilities={rtpCapabilities}>
          <MediaTransportsContextProvider mediaTransports={[]}>
            <Container h="calc(100vh)" minWidth="100%">
              <Navbar />
              <div
                css={{
                  height: 'calc(100% - 24px - 1.5em)', // 24px = height of navbar; 1.5em navbar padding
                  padding: '1em',
                  paddingTop: '0',
                  display: 'flex',
                  flex: '1',
                  gap: '.5em',
                }}
              >
                <UserList users={users} />
                <Tabs
                  css={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {
                    <TabList>
                      <Tab>Messages</Tab>
                      <Tab>Call</Tab>
                    </TabList>
                  }

                  <TabPanels css={{ flex: 1 }}>
                    <TabPanel
                      padding={0}
                      pt={4}
                      css={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <ChannelName />
                      <MessageList />
                      <WhosTyping />
                      <CreateMessageForm />
                    </TabPanel>
                    <TabPanel>
                      <VideoList producers={producers} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </Container>
          </MediaTransportsContextProvider>
        </RtpDeviceContextProvider>
      </MessagesContextProvider>
    </ChannelContextProvider>
  </TransmitContextProvider>
);

export default ChannelPage;

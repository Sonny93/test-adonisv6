import { Container, Heading } from '@chakra-ui/react';
import ChannelList from '~/components/ChannelList/ChannelList';
import CreateChannelForm from '~/components/CreateChannelForm';
import Navbar from '~/components/Navbar';

export default function Home({ channels }: { channels: Channel[] }) {
  return (
    <Container css={{ margin: 0 }}>
      <Navbar />
      <div
        css={{
          padding: '1em',
          display: 'flex',
          gap: '.75em',
          flexDirection: 'column',
        }}
      >
        <Heading>List of channels</Heading>
        <CreateChannelForm />
        <ChannelList channels={channels} />
      </div>
    </Container>
  );
}

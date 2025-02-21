import { Container, Stack, Title } from '@mantine/core';
import { ChannelList } from '~/components/channel/channel_list';
import CreateChannelForm from '~/components/create_channel_form';
import DefaultLayout from '~/layouts/default_layout';
import { Channel } from '~/types';

const Home = ({ channels }: { channels: Channel[] }) => (
  <Container>
    <Stack>
      <Title>List of channels</Title>
      <CreateChannelForm />
      <ChannelList channels={channels} />
    </Stack>
  </Container>
);

Home.layout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;

export default Home;

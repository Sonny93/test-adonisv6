import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { CreateMessageForm } from '~/components/create_message_form';
import { WhosTyping } from '~/components/typing_indicator/typing_indicator_list';
import { UserList } from '~/components/user_list/user_list';
import { VideoList } from '~/components/video_list/video_list';
import { useIsMobile } from '~/hooks/use_screen';
import { Channel, User } from '~/types';
import { NewMediaTransport } from '~/types/transport';

interface ChannelLayoutProps {
  children: React.ReactNode;
  users: User[];
  producers: NewMediaTransport[];
  channel: Channel;
}

export function ChannelLayout({
  children,
  users,
  producers,
  channel,
}: ChannelLayoutProps) {
  const { isMobile, isTablet } = useIsMobile();
  const [opened, { toggle, close }] = useDisclosure();
  const [asideOpened, { toggle: toggleAside, close: closeAside }] =
    useDisclosure();

  useEffect(() => {
    if (!isMobile && opened) {
      close();
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isTablet && asideOpened) {
      closeAside();
    }
  }, [isTablet]);

  return (
    <AppShell
      header={{
        height: 50,
      }}
      footer={{
        height: 75,
      }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      aside={{
        width: 250,
        breakpoint: 'md',
        collapsed: { mobile: !asideOpened },
      }}
      layout="alt"
      padding="md"
    >
      <AppShell.Navbar p="xs">
        <Group hiddenFrom="sm">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Text>{channel.name}</Text>
        </Group>
        <UserList users={users} />
      </AppShell.Navbar>

      <AppShell.Header p="xs">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>{channel.name}</Text>
          <Burger
            opened={asideOpened}
            onClick={toggleAside}
            size="sm"
            ml="auto"
            hiddenFrom="md"
          />
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer p="md" withBorder={false}>
        <CreateMessageForm />
        <WhosTyping />
      </AppShell.Footer>

      <AppShell.Aside>
        <Group hiddenFrom="md">
          <Burger opened={asideOpened} onClick={toggleAside} size="sm" />
          <Text>Call</Text>
        </Group>
        <VideoList producers={producers} />
      </AppShell.Aside>
    </AppShell>
  );
}

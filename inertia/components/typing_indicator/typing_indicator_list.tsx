import { Group, Text } from '@mantine/core';
import { Fragment, useState } from 'react';
import useChannel from '~/hooks/useChannel';
import useNewMessageEvent from '~/hooks/useNewMessageEvent';
import useSubscribe from '~/hooks/useSubscribe';
import { useAuth } from '~/hooks/use_auth.js';
import { User } from '~/types/index.js';
import { TypingItem } from './typing_indicator_item.js';

const REMOVE_DELAY = 3000;

export function WhosTyping() {
  const { channel } = useChannel();
  const [typings, setTypings] = useState<{ user: User; expiration: number }[]>(
    []
  );
  const { user: currentUser } = useAuth();

  useSubscribe<{ user: User }>(`channels/${channel.id}/typing`, ({ user }) => {
    if (currentUser?.id === user.id) return;
    setTypings((_typings) => {
      const newTypings = [..._typings];
      const userIndex = newTypings.findIndex(({ user: u }) => u.id === user.id);
      const expirationTimestamp = Date.now() + REMOVE_DELAY;

      if (userIndex === -1) {
        newTypings.push({ user, expiration: expirationTimestamp });
      } else {
        newTypings[userIndex] = {
          user,
          expiration: expirationTimestamp,
        };
      }

      return newTypings;
    });
  });
  useNewMessageEvent(channel.id, ({ author }) => removeTypingUser(author!));

  function removeTypingUser(user: User) {
    setTypings((_typings) => {
      const typs = [..._typings];
      const userIndex = typs.findIndex(({ user: u }) => u.id === user.id);
      if (userIndex !== -1) {
        typs.splice(userIndex, 1);
      }
      return typs;
    });
  }

  const label = typings.length === 1 ? 'is typing' : 'are typing';
  return (
    <Group gap={2} style={{ position: 'absolute', bottom: 0, left: 0 }} pl="md">
      {typings.map(({ user, expiration }, index) => (
        <Fragment key={user.id}>
          {!!index && ', '}
          <TypingItem
            user={user}
            expiration={expiration}
            removeUser={removeTypingUser}
          />
        </Fragment>
      ))}{' '}
      <Text size="xs">{typings.length !== 0 && label}</Text>
    </Group>
  );
}

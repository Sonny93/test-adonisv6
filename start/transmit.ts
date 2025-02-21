import { USER_CONNECTED } from '#constants/channel_events';
import online_user_service from '#services/online_user_service';
import logger from '@adonisjs/core/services/logger';
import transmit from '@adonisjs/transmit/services/main';

const userConnectStartString = 'user_connected';
const userDisconnectStartString = 'user_disconnected';

transmit.on('connect', ({ uid, context }) => {
  logger.info('%s connected', uid);
  if (context.auth.user) {
    transmit.broadcast(USER_CONNECTED, { user: context.auth.user.serialize() });
  }
});
transmit.on('disconnect', ({ uid, context }) => {
  logger.info('%s disconnected', uid);
  if (context.auth.user) {
    const userId = online_user_service.getUserIdFromUid(uid);
    const channelId = online_user_service.getCurrentChannelForUid(uid);
    if (userId && channelId) {
      transmit.broadcast(`${userDisconnectStartString}/${channelId}`, {
        userId,
      });
    }
    online_user_service.removeUserFromChannel(uid);
  }
});

function getChannelIdFromChannelString(channel: string, prefix: string) {
  return channel.replaceAll('/', '').split(prefix)[1];
}

transmit.on('subscribe', async ({ channel, context, uid }) => {
  await context.auth.authenticateUsing(['web']);
  if (!context.auth.user) return logger.warn('Unable to get auth user');

  if (channel.startsWith(userConnectStartString)) {
    const channelId = getChannelIdFromChannelString(
      channel,
      userConnectStartString
    );
    online_user_service.addUserToChannel(uid, context.auth.user.id, channelId);
    transmit.broadcast(`${userConnectStartString}/${channelId}`, {
      user: context.auth.user.serialize(),
    });
  }
});

// transmit.on('broadcast', ({ channel, payload }) =>
//   logger.info('"%s" broadcast %s', channel, JSON.stringify(payload))
// );

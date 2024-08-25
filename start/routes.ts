/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const MessagesController = () => import('#controllers/messages_controller');
const UserController = () => import('#controllers/user_controller');
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const RtpController = () => import('#controllers/rtp_controller');
const ChannelsController = () => import('#controllers/channels_controller');

router.get('/discord/redirect', [UserController, 'discord']);
router.get('/discord/callback', [UserController, 'callbackAuth']);

router
  .group(() => {
    router.get('/', [MessagesController, 'index']);
    router.get('/logout', [UserController, 'logout']);

    router.post('/channels', [ChannelsController, 'create']);
    router.get('/channels/:channel_id', [
      ChannelsController,
      'renderFromChannelId',
    ]);
    router.post('/channels/:channel_id/messages', [
      MessagesController,
      'createMessage',
    ]);
    router.post('/channels/:channel_id/typing', [ChannelsController, 'typing']);

    router.get('/router-capabilities', [RtpController, 'getRtpCapabilities']);
    router.post('/transport/:channel_id/produce', [
      RtpController,
      'produceMedia',
    ]);
    router.post('/transport/:channel_id/consume', [
      RtpController,
      'consumeMedia',
    ]);
    router.post('/transport/:channel_id/create/:direction', [
      RtpController,
      'createTransport',
    ]);
    router.post('/transport/:channel_id/connect/:direction', [
      RtpController,
      'connectTransport',
    ]);
  })
  .middleware([middleware.auth()]);

router.get('*', async ({ inertia }) => inertia.render('error_404'));
router.on('/inertia').renderInertia('home', { version: 6 });

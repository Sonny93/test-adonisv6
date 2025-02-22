import Channel from '#models/channel';
import { createMessageValidator } from '#validators/message';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import transmit from '@adonisjs/transmit/services/main';
import ChannelsController from './channels_controller.js';

@inject()
export default class MessagesController {
  constructor(protected channelController: ChannelsController) {}

  async index({ inertia }: HttpContext) {
    const channels = await this.channelController.getAllChannels();
    return inertia.render('home', { channels: channels.reverse() });
  }

  async createMessage({ request, response, auth }: HttpContext) {
    const { content } = await request.validateUsing(createMessageValidator);
    const channelId = request.param('channel_id');
    const channel = await Channel.findByOrFail('id', channelId);

    if (channel && content) {
      const message = await channel.related('messages').create({
        content,
        authorId: auth.user?.id,
        channelId,
      });
      await message.load('author');
      transmit.broadcast(`channels/${channel.id}/messages`, {
        type: 'user',
        ...message.serialize(),
      });

      return response.json({
        message,
      });
    }

    return response.status(400).json({
      message: 'An error occurred while sending your message',
    });
  }
}

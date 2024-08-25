import Channel from '#models/channel';
import { createChannelValidator } from '#validators/channel';
import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';
import transmit from '@adonisjs/transmit/services/main';
import RtpController from './rtp_controller.js';

@inject()
export default class ChannelsController {
  constructor(protected rtpController: RtpController) {}

  async getAllChannels() {
    return await Channel.all();
  }

  async create({ request, auth, response }: HttpContext) {
    const { name } = await request.validateUsing(createChannelValidator);
    const channel = await Channel.create({
      name,
      authorId: auth.user!.id,
    });
    return response.redirect(`/channels/${channel.id}`);
  }

  async renderFromChannelId({ request, inertia }: HttpContext) {
    const channel = await this.getChannelById(request.param('channel_id'));
    const routerRtpCapabilities = this.rtpController.getRtpCapabilities();
    const producers = this.rtpController.getProducers();

    return inertia.render('channel', {
      channel,
      routerRtpCapabilities,
      producers,
    });
  }

  async getChannelById(channelId: Channel['id']) {
    const channel = await Channel.findBy('id', channelId);
    if (!channel) {
      throw new Error(`Channel with id "${channelId}" does not exist`);
    }
    await channel.load((loader) => {
      loader
        .load('messages', (messageLoader) => messageLoader.preload('author'))
        .load('author');
    });
    return channel;
  }

  async typing({ request, auth }: HttpContext) {
    const channelId = request.param('channel_id');
    transmit.broadcast(`channels/${channelId}/typing`, {
      user: auth.user!.serialize()!,
    });
  }
}

import { beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import AppBaseModel from './app_base_model.js';
import Channel from './channel.js';
import User from './user.js';

export default class Message extends AppBaseModel {
  static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare content: string;

  @column({ serializeAs: 'authorId' })
  declare authorId: string;

  @column({ serializeAs: 'channelId' })
  declare channelId: string;

  @belongsTo(() => User, { foreignKey: 'authorId' })
  declare author: BelongsTo<typeof User>;

  @belongsTo(() => Channel, { foreignKey: 'channelId' })
  declare channel: BelongsTo<typeof Channel>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @beforeCreate()
  static assignUuid(message: Message) {
    message.id = uuidv4();
  }
}

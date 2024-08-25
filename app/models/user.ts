import { Oauth1AccessToken, Oauth2AccessToken } from '@adonisjs/ally/types';
import { withAuthFinder } from '@adonisjs/auth';
import { compose } from '@adonisjs/core/helpers';
import hash from '@adonisjs/core/services/hash';
import { beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm';
import type { ManyToMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import AppBaseModel from './app_base_model.js';
import Channel from './channel.js';
import Message from './message.js';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
});

export default class User extends compose(AppBaseModel, AuthFinder) {
  static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  declare id: string;

  @column({ serializeAs: null })
  declare email: string | null;

  @column({ serializeAs: 'nickName' })
  declare nickName: string;

  @column()
  declare name: string;

  @column({ serializeAs: null })
  declare isVerified: boolean;

  @column({ serializeAs: 'avatarUrl' })
  declare avatarUrl: string | null;

  @column({ serializeAs: null })
  declare accessToken: (Oauth2AccessToken | Oauth1AccessToken)['token'];

  @column({
    serializeAs: null,
  })
  declare original: string;

  @manyToMany(() => Channel, {
    relatedKey: 'authorId',
  })
  declare channels: ManyToMany<typeof Channel>;

  @manyToMany(() => Message, {
    relatedKey: 'authorId',
  })
  declare messages: ManyToMany<typeof Message>;

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'createdAt',
  })
  declare createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'updatedAt',
  })
  declare updatedAt: DateTime;

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = uuidv4();
  }
}

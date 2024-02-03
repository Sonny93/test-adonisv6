import { beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './app_base_model.js'
import Message from './message.js'
import User from './user.js'

export default class Channel extends AppBaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column({ serializeAs: 'authorId' })
  declare authorId: string

  @belongsTo(() => User, { foreignKey: 'authorId' })
  declare author: BelongsTo<typeof User>

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @manyToMany(() => Message)
  declare messages: ManyToMany<typeof Message>

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'createdAt',
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'updatedAt',
  })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(channel: Channel) {
    channel.id = uuidv4()
  }
}

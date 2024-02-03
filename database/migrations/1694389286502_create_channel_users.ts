import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateChannelUser extends BaseSchema {
  protected tableName = 'channel_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('channel_id').references('id').inTable('channels').onDelete('CASCADE')
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

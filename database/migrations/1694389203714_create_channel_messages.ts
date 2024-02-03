import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateChannelMessage extends BaseSchema {
  protected tableName = 'channel_message'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('channel_id').references('id').inTable('channels').onDelete('CASCADE')
      table.uuid('message_id').references('id').inTable('messages').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

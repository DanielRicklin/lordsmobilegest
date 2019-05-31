'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuildSchema extends Schema {
  up () {
    this.create('guilds', (table) => {
      table.increments()
      table.integer('user_id_creator').notNullable()
      table.string('guild_trigram', 3).notNullable()
      table.string('guildname', 80).notNullable()
      table.string('nationality', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('guilds')
  }
}

module.exports = GuildSchema

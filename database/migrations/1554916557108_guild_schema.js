'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuildSchema extends Schema {
  up () {
    this.create('guilds', (table) => {
      table.increments()
      table.string('guildname', 80).notNullable().unique()
      table.string('nationality', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('guilds')
  }
}

module.exports = GuildSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('igg_id', 80).notNullable().unique()
      table.integer('guild_id')
      table.string('guildname', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountSchema

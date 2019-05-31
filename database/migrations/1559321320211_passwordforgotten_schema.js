'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PasswordforgottenSchema extends Schema {
  up () {
    this.create('passwordforgotten', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('uuid', 80).notNullable().unique()
      table.boolean('validated')
      table.timestamps()
    })
  }

  down () {
    this.drop('passwordforgotten')
  }
}

module.exports = PasswordforgottenSchema

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Account extends Model {
    guild () {
        return this.hasOne('App/Models/Guild')
    } 
}

module.exports = Account

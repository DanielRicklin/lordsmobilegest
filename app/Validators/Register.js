'use strict'

class Register {
  get rules () {
    return {
      username: 'required|unique:users',
      password: 'required|min:5|confirmed'
    }
  }

  get messages() {
    return {
      'username.required': 'Tu dois bien avoir un pseudo nan ?',
      'username.unique': 'Ce pseudo est déjà pris, allez un peu d\'imagination',
      'password.required': 'Un mot de passe stp',
      'password.min': 'Il me faut au moins 5 caractères stp',
      'password.confirmed': 'Les mots de passe ne sont pas les mêmes'
    }
  }
}

module.exports = Register

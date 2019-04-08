'use strict'

class Login {
  get rules () {
    return {
      username: 'required',
      password: 'required'
    }
  }

  get messages() {
    return {
      'username.required': 'Ce pseudo n\'existe pas chez moi',
      // 'username.unique': 'Ce pseudo est déjà pris, allez un peu d\'imagination',
      'password.required': 'Un mot de passe stp'
    }
  }
}

module.exports = Login

'use strict'

class Login {
  get rules () {
    return {
      email: 'required',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Cet email n\'existe pas chez moi',
      // 'username.unique': 'Ce pseudo est déjà pris, allez un peu d\'imagination',
      'password.required': 'Un mot de passe stp'
    }
  }
}

module.exports = Login

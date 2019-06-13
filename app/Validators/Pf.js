'use strict'

class Pf {
  get rules () {
    return {
      password: 'required|min:5|confirmed'
    }
  }

  get messages() {
    return {
      'password.required': 'Un mot de passe stp',
      'password.min': 'Il me faut au moins 5 caractères stp',
      'password.confirmed': 'Les mots de passe ne sont pas les mêmes'
    }
  }

  async fails (errorMessages, { session }) {
    // return this.ctx.response.send(errorMessages)
    return session.flash({
      notification: {
        type: 'danger',
        message: errorMessages.message
      }
    })
  }
}

module.exports = Pf

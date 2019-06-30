'use strict'

class Register {
  get rules () {
    return {
      email: 'required|unique:users',
      password: 'required|min:5|confirmed'
    }
  }

  get messages() {
    return {
      'email.required': 'Tu dois bien avoir un mail nan ?',
      'email.unique': 'Cet email est déjà pris 😔',
      'password.required': 'Un mot de passe stp',
      'password.min': 'Il me faut au moins 5 caractères stp',
      'password.confirmed': 'Les mots de passe ne sont pas les mêmes'
    }
  }

  async fails(errorMessages) {
    console.log(this.ctx.response)
    return this
      .ctx
      .response
      .route('register.create', {
        errorValidation: errorMessages[0].message
      })

    // return this
    //   .ctx
    //   .session
    //   .flash({ successMessage: errorMessages[0].message })
  }
}

module.exports = Register

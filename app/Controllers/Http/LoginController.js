'use strict'

const uuidv4 = require('uuid/v4')

const User = use('App/Models/User')
const Hash = use('Hash')
const Mail = use('Mail')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with logins
 */
class LoginController {
  /**
   * Show a list of all logins.
   * GET logins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new login.
   * GET logins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('login')
  }

  /**
   * Create/save a new login.
   * POST logins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, session }) {
    
    const { remember, password, email } = request.all()

    // if(await User.findByOrFail('username', pseudo)){
    //   await auth.attempt(pseudo, password)

    //   return response.route('home')
    // } else {

    //   response.status(400).json({
    //     status: 'error',
    //     message: 'Invalid username'
    //   })
    // }

    const user = await User.query()
      .where('email', email)
      .first()

    if (user) {
      
      const passwordVerified = await Hash.verify(password, user.password)

      if (passwordVerified) {

        await auth.remember(!!remember).login(user)

        return response.route('home')
      } else {

        session.flash({
          notification: {
            type: 'danger',
            message: `Le mot de passe n'est pas bon 🙁`
          }
        })
    
        return response.redirect('back')
      }
    } else {
      session.flash({
        notification: {
          type: 'danger',
          message: `L'utilisateur n'existe pas 🙁`
        }
      })

      return response.redirect('back')
    }

  }

  /**
   * Display a single login.
   * GET logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing login.
   * GET logins/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update login details.
   * PUT or PATCH logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const uuid = uuidv4()

    const user = await User.query()
      .where('email', request.input('emailforgotpwd'))
      .first()

    if(user){
      await Mail.send('emails.welcome', { user: user.toJSON(), uuid: uuid }, (message) => {
        message
          .to(user.email)
          .from('ricklin.daniel@gmail.com', 'Lords Mobile Gest')
          .subject('Changement de mot de passe')
      })

      //! FAIRE UN LIEN UNIQUE CLIQUABLE QU'UNE FOIS, creer table avec uuid.v4

      session.flash({
        notification: {
          type: 'success',
          message: `Email envoyé, va checker (même les mails indésirables 😉)`
        }
      })
    } else {
      session.flash({
        notification: {
          type: 'danger',
          message: `L'utilisateur n'existe pas 🙁`
        }
      })

    }
    return response.redirect('back')
  }

  /**
   * Delete a login with id.
   * DELETE logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    await auth.logout()

    return response.route('login.store')
  }
}

module.exports = LoginController

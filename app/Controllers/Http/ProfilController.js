'use strict'

const User = use('App/Models/User')
const Account = use('App/Models/Account')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profils
 */
class ProfilController {
  /**
   * Show a list of all profils.
   * GET profils
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const user = await User.find(auth.current.user.id)
    const accounts = await user.accounts().fetch()

    console.log(accounts)

    return view.render('profil', { accounts })
  }

  /**
   * Render a form to be used for creating a new profil.
   * GET profils/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new profil.
   * POST profils
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single profil.
   * GET profils/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing profil.
   * GET profils/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update profil details.
   * PUT or PATCH profils/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth, session }) {

    const { pseudo, email, password } = request.all()

    console.log(request.all())

    try {

      let user = auth.current.user
  
      user.username = pseudo
      user.email = email
  
      if(password){
        user.password = password
      }
  
      await user.save()

      session.flash({ 
        notification: {
          type: 'success',
          message: 'Compte mis à jour' 
        }
      })

    } catch(error) {

      session.flash({
        notification: {
          type: 'danger',
          message: `Un problème est survenu lors de la mise à jour du compte`
        }
      })

    }

    return response.redirect('back')
  }

  /**
   * Delete a profil with id.
   * DELETE profils/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProfilController

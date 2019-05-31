'use strict'

const Account = use('App/Models/Account')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with accounts
 */
class AccountController {
  /**
   * Show a list of all accounts.
   * GET accounts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new account.
   * GET accounts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new account.
   * POST accounts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, session }) {
    const { pseudo, igg_id } = request.all()

    try {
      const account = new Account()

      account.user_id = auth.current.user.id
      account.username = pseudo
      account.igg_id = igg_id

      await account.save()

      session.flash({ 
        notification: {
          type: 'success',
          message: 'Compte crée' 
        }
      })
    }catch(error){
      session.flash({ 
        notification: {
          type: 'danger',
          message: 'Le compte n\'a pas été crée' 
        }
      })
    }

    return response.redirect('back')

  }

  /**
   * Display a single account.
   * GET accounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing account.
   * GET accounts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update account details.
   * PUT or PATCH accounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const req = request.all()
    
    if(req.data.hasOwnProperty('save')){
      let account = await Account.findBy('igg_id', req.igg_id)

      if(account){
        account.username = req.pseudo

        await account.save()

        session.flash({ 
          notification: {
            type: 'success',
            message: 'Le compte a bien été mis à jour' 
          }
        })

      } else {
        session.flash({ 
          notification: {
            type: 'danger',
            message: 'Le compte n\'a pas été mis à jour' 
          }
        })
      }
    } else if(req.data.hasOwnProperty('trash')){
      let account = await Account.findBy('igg_id', req.igg_id)

      if(account){
        await account.delete()
      }
    }

    return response.redirect('back')

  }

  /**
   * Delete a account with id.
   * DELETE accounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AccountController

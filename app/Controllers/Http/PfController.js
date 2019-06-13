'use strict'

const Pf = use('App/Models/Passwordforgotten')
const User = use('App/Models/User')
const { validate } = use('Validator')
const Hash = use('Hash')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pfs
 */
class PfController {
  /**
   * Show a list of all pfs.
   * GET pfs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new pf.
   * GET pfs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pf.
   * POST pfs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single pf.
   * GET pfs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const pf = await Pf.query().where('uuid', params.uuid).first()

    if(pf){
      return view.render('pf', {
        pfToken: params.uuid
      })
    } else {
      return view.render('404')
    }
  }

  /**
   * Render a form to update an existing pf.
   * GET pfs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view, session }) {
    const pf = await Pf.query().where('uuid', params.uuid).first()

    const rules = {
        password: 'required|min:5|confirmed'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session.flash({
        notification: {
          type: 'danger',
          message: 'Y\'a un problème avec le mot de passe, minimum 5 caratères ou vérifie qu\'ils sont similaires'
        }
      })

      return response.redirect('back')
    }

    if(pf.validated != 1){

      try {
        const user = await User.findByOrFail('id', pf.user_id)
  
        user.password = request.input('password')

        await user.save()

        
      } catch(e) {
        resizeBy.send('An error has occured')
      }
      
      pf.validated = 1
      await pf.save()
      
      return response.route('login.create')
    } else {
      return view.render('404')
    }

  }

  /**
   * Update pf details.
   * PUT or PATCH pfs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pf with id.
   * DELETE pfs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PfController

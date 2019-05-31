'use strict'

const Guild = use('App/Models/Guild')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with guilds
 */
class GuildController {
  /**
   * Show a list of all guilds.
   * GET guilds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let guilds = await Guild.query().limit(5).fetch()

    return response.json(guilds)
  }

  /**
   * Render a form to be used for creating a new guild.
   * GET guilds/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    
  }

  /**
   * Create/save a new guild.
   * POST guilds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { guildname, nationality } = request.all()
    console.log(request.all())

    try{
      let guild = new Guild()

      guild.guildname = guildname
      guild.nationality = nationality

      console.log(guild)
      
      await guild.save()

      return response.json(guild)

    } catch(e){
      return response.json("erreur")
    }
  }

  /**
   * search a guild.
   * GET guilds/:search
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let guilds = await Guild.query().where('guildname', 'LIKE', `%${params.search}%`).fetch()

    return response.json(guilds)
  }

  /**
   * Render a form to update an existing guild.
   * GET guilds/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update guild details.
   * PUT or PATCH guilds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a guild with id.
   * DELETE guilds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = GuildController

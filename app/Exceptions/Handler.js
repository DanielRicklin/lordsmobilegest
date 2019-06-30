'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response, session }) {
    response.status(error.status).send(error.message)

    if(error.name === 'InvalidSessionException') {
      return response.route('login.create')
    }

    if(error.name === 'HttpException') {
      return response.redirect('/')
    }

    // if (error.name === 'PasswordMisMatch') {
    //   console.log('error mot de passe')
    //   return session.flash({ passwordError: 'Mauvais mot de passe' })
    // }

    // if (error.name === 'ValidationException') {
    //   return session.flash({ successMessage: 'Le mot de passe doit avoir au moins 5 caractères et ils doivent corespondre' })
    // }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler

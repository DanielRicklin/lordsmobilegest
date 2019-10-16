'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=> {
    Route.get('/register', 'RegisterController.create').as('register.create')
    Route.post('/register', 'RegisterController.store').as('register.store')

    Route.get('/login', 'LoginController.create').as('login.create')
    Route.post('/login', 'LoginController.store').as('login.store')
    Route.patch('/login', 'LoginController.update').as('login.password')

    Route.get('/pf/:uuid', 'PfController.show').as('pf.show')
    Route.post('/pf/:uuid', 'PfController.edit').as('pf.edit')

}).middleware(['guest'])

Route.group(()=> {
    // Recherche de guilde
    Route.get('/guildsearch/:search', 'GuildController.show')
    Route.get('/guilds', 'GuildController.index')

    Route.get('/guildes', 'GuildController.page').as('guildes')

    Route.get('/', 'MainController.home').as('home')

    Route.get('/profil', 'ProfilController.index').as('profil')
    Route.patch('/profil', 'ProfilController.update').as('profil.update')

    Route.post('/account', 'AccountController.store').as('account.store')
    Route.patch('/account', 'AccountController.update').as('account.update')

    Route.post('/logout', 'LoginController.destroy').as('logout')
}).middleware(['auth'])

Route.any('*', ({ view }) => view.render('404'))
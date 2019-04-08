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

Route.get('/', 'MainController.home').as('home')

Route.get('/register', 'RegisterController.create').as('register.create')
Route.post('/register', 'RegisterController.store').as('register.store').validator('Register')

Route.get('/login', 'LoginController.create').as('login.create')
Route.post('/login', 'LoginController.store').as('login.store')
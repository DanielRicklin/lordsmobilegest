'use strict'

class MainController {

    home({ request, response, view}) {
        return view.render('home')
    }

}

module.exports = MainController

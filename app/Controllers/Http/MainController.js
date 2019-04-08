'use strict'

class MainController {

    home({ view }) {
        return view.render('home')
    }

}

module.exports = MainController

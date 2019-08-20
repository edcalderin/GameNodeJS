const express = require('express')
const controllerGame = require('../controller/gameController')

const router = express.Router()

router.post('/', controllerGame.playGame)
router.get('/', controllerGame.getAllGames)
router.get('/:id', controllerGame.getGameById)

module.exports = router

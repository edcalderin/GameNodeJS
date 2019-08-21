const express = require('express')
const controllerGame = require('../controller/gameController')

const router = express.Router()

router.post('/', controllerGame.playGame)
router.get('/', controllerGame.getAllGames)
router.get('/:id', controllerGame.getGameById)
router.delete('/:id', controllerGame.deleteGameById)

module.exports = router

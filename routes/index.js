const express = require('express')
const validate = require('../src/utils')
const logic = require('../src/logic')

const router = express.Router()
const Logic = new logic()

router.post('/', (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(404).send(error.details[0].message)
    else {
        const { id, x, y } = req.body
        const gameFound = Logic.searchGame(id)

        if (gameFound) {
            return res.send(Logic.continuePlaying(gameFound, x, y))
        } else {
            const result = Logic.newGame(id, x, y)
            return res.send(result)
        }

    }
})
router.get('/', (req, res) => {
    res.json(Logic.getGames())
})
router.get('/:id', (req, res) => {
    const game = Logic.getGames().find(g => g.id == req.params.id)
    if (game) return res.json(game)
    else res.status(404).send('Game not found')
})
module.exports = router

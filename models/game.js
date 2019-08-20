class Game {
    constructor(id, time_tracked, winner) {
        this.id = id
        this.time_tracked = time_tracked
        this.winner = winner
        this.board = []
    }
}
module.exports = Game
class Game {
    constructor(id, time_tracked, winner) {
        this.id = id
        this.time_start = new Date().getTime()
        this.time_tracked_seconds = time_tracked
        this.winner = winner
        this.board = []
    }
}
module.exports = Game
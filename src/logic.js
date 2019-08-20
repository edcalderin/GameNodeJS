const game = require('../models/game')
const enum_winner_type = require('../models/enum_winner_type')

class Logic {
    constructor() {
        this.games = []
    }

    initializeBoard(board) {
        for (let i = 0; i < 3; i++) {
            board[i] = new Array(3)
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = ''
            };
        }
    }

    newGame(id, x, y) {
        const actual_game = new game(id, '', '')
        this.initializeBoard(actual_game.board)
        if (x != undefined && y != undefined) {
            actual_game.board[x][y] = 'O'
            this.machinePlays(actual_game)
        }
        else { this.machinePlays(actual_game) }
        this.games.push(actual_game)
        return this.games
    }

    searchGame(id) {
        //console.log(games.length)
        var found = this.games.find(g => g.id == id)
        return found
    }

    machinePlays(actual_game) {
        var valide = false
        var x = Math.floor(Math.random() * 3)
        var y = Math.floor(Math.random() * 3)
        while (!valide) {
            if (this.isEmptyPosition(actual_game.board, x, y)) {
                actual_game.board[x][y] = 'X'
                valide = true
            }
            else {
                x = Math.floor(Math.random() * 3)
                y = Math.floor(Math.random() * 3)
            }
        }
        return actual_game
    }

    findByRowOrColumn(actual_game, type_search, x, y, symbol) {
        var count = 0
        for (let i = 0; i < 3; i++) {
            if (type_search == 'row' && actual_game.board[x][i] == symbol) count++
            else if (type_search == 'column' && actual_game.board[i][y] == symbol) count++
            else break;
        }
        var winner = ''
        if (count == 3) {
            winner = (symbol == 'O') ? enum_winner_type.Human : enum_winner_type.Machine
        }
        return winner
    }

    diagonalRightToLeft(actual_game, symbol) {
        var count = 0
        for (let i = 0; i < 3; i++) {
            if (actual_game.board[i, 2 - i] == symbol) count++
            else break
        }
        var winner = ''
        if (count == 3) {
            winner = (symbol == 'O') ? enum_winner_type.Human : enum_winner_type.Machine
            console.log('winnner ', winner)
            console.log('symbol ', symbol)
        }
        return winner
    }

    diagonalLeftToRight(actual_game, symbol) {
        var count = 0
        for (let i = 0; i < 3; i++) {
            if (actual_game.board[i][i] == symbol) {
                count++
            }
            else break;
        }
        var winner = ''
        if (count == 3) {
            winner = (symbol == 'O') ? enum_winner_type.Human : enum_winner_type.Machine
            console.log('winnner ', actual_game.winner)
            console.log('symbol ', symbol)
        }
        return winner
    }

    findWinner(actual_game, x, y, symbol) {
        var countByRow = this.findByRowOrColumn(actual_game, 'row', x, y, symbol)
        var countByColumn = this.findByRowOrColumn(actual_game, 'column', x, y, symbol)
        var countByDiagLeftToRight = ''
        var countByDiagRightToLeft = ''

        if (x == y) {
            countByDiagLeftToRight = this.diagonalLeftToRight(actual_game, symbol)
            console.log('countByDiagLeftToRight', countByDiagLeftToRight)
        }
        if ((x == 0 && y == 2) || (x == 2 && y == 0) || (x == 1 && y == 1)) {
            countByDiagRightToLeft = this.diagonalRightToLeft(actual_game)
            console.log('countByDiagRightToLeft', countByDiagRightToLeft)
        }
        if (countByRow == '' && countByColumn == '' && countByDiagLeftToRight == '' && countByDiagRightToLeft == '') {
            if (this.isFullBoard(actual_game.board)) {
                return actual_game.winner = enum_winner_type.Draw
            }
            else
                return actual_game
        }
        else if (typeof (countByRow) == typeof (enum_winner_type))
            actual_game.winner = countByRow
        else if (typeof (countByColumn) == typeof (enum_winner_type))
            actual_game.winner = countByRow
        else if (typeof (countByDiagLeftToRight) == typeof (enum_winner_type))
            actual_game.winner = countByDiagLeftToRight
        else if (typeof (countByDiagRightToLeft) == typeof (enum_winner_type))
            actual_game.winner = countByDiagRightToLeft
        return actual_game
    }

    isFullBoard(board) {
        var isFull = true
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    isFull = false
                    break;
                }
            }
        }
        return isFull;
    }

    isEmptyPosition(board, x, y) {
        return board[x][y] == ''
    }

    continuePlaying(actual_game, x, y) {
        if (this.isEmptyPosition(actual_game.board, x, y)) {
            actual_game.board[x][y] = 'O'
            this.findWinner(actual_game, x, y, 'O')
            if (!this.isFullBoard(actual_game.board)) {
                this.machinePlays(actual_game)
                this.findWinner(actual_game, x, y, 'X')
            }
            return actual_game
        }
        else return 'Choose another position'
    }

    getGames() {
        return this.games
    }
}
module.exports = Logic
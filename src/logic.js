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
        return actual_game
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
    findWinnerDiagRightToLeft(board, symbol) {
        var result = false
        for (let i = 0; i < 3; i++) {
            if (board[i, 2 - i] == symbol) result = true
            else {
                result = false
                break
            }
        }
        return result
    }

    findWinnerDiagLeftToRight(board, symbol) {
        let result = false
        for (let i = 0; i < 3; i++) {
            if (board[i][i] == symbol) result = true
            else {
                result = false
                break
            }
        }
        return result
    }
    isWinner(actual_game, symbol) {
        if (this.findWinnerDiagLeftToRight(actual_game.board, symbol) || this.findWinnerDiagRightToLeft(actual_game.board, symbol)) {
            return true
        }
        else {
            for (let i = 0; i < 3; i++) {
                const winnerRow = this.findWinnerRow(actual_game, i, symbol)
                const winnerColumn = this.findWinnerColumn(actual_game, i, symbol)
                return (winnerRow || winnerColumn)
            }
        }
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
    findWinnerRow(board, row, symbol) {
        let result = false
        for (let j = 0; j < 3; j++) {
            if (board[row, j] == symbol) result = true
            else {
                result = false
                break
            }
        }
        return result
    }
    findWinnerColumn(board, col, symbol) {
        let result = false
        for (let i = 0; i < 3; i++) {
            if (board[i, col] == symbol) result = true
            else {
                result = false
                break
            }
        }
        return result
    }
    isEmptyPosition(board, x, y) {
        return board[x][y] == ''
    }
    continuePlaying(actual_game, x, y) {
        if (actual_game.winner == '') {
            if (this.isEmptyPosition(actual_game.board, x, y)) {
                actual_game.board[x][y] = 'O'
                if (this.isWinner(actual_game, 'O')) {
                    actual_game.winner = enum_winner_type.Human
                }
                if (!this.isFullBoard(actual_game.board)) {
                    this.machinePlays(actual_game)
                    if (this.isWinner(actual_game, 'X')) {
                        actual_game.winner = enum_winner_type.Machine
                    }
                }
                return actual_game
            }
            else return 'Choose another position'
        }
        else {
            let result_game = `Game over! ${actual_game.winner} wins`
            if (actual_game.winner == enum_winner_type.Draw)
                result_game = `Drawn game`
            return result_game
        }
    }
    getGames() {
        return this.games
    }
}
module.exports = Logic
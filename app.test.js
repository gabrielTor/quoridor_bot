const sends = require('./app')
const open = require('./app')
const play = require('./app')
const process_your_turn = require('./app')
const process_move = require('./app')
const put_wall = require('./app')



test('sends message to server ws', () => {
    expect(sends(action, data)).toBe(String)
})

test('opens main function', () => {
    expect(open(play)).toBe()
})

test('accepts challenge and plays the game', () => {
    expect(play()).toBe('accept_challenge')
})

test('renders process_move or puts_walls', () => {
    expect(process_your_turn(request_data)).toBe(process_move() || put_wall())
})

test('makes a move in the game', () => {
    expect(process_move(request_data)).toBe(String)
})

test('sends walls into the game', () => {
    expect(put_wall(request_data)).toBe(String)
})

import WebSocket from 'ws';

const tokenBot = 'secret token'

const ws = new WebSocket(`wss://4yyity02md.execute-api.us-east-1.amazonaws.com/ws?token=${tokenBot}`);

async function sends(ws, action, data){
    let message = JSON.stringify({
        'action': action,
        'data': data,
    })
    console.log(message)
    await ws.send(message)
}

ws.on('open', function open() {
  ws.send(`${play(ws)}`);
});

async function play(ws){
    ws.on('message', function message(data) {
            let request_data = JSON.parse(data)
            console.log('received: %s', data)
            if(request_data['event'] == 'update_user_list'){
                pass
            }
            if(request_data['event'] == 'gameover'){
                pass
            }
            if(request_data['event'] == 'challenge'){
                sends(
                    ws,
                    'accept_challenge',
                    {
                        'challenge_id': request_data['data']['challenge_id']
                    }
                )
               }
          if(request_data['event'] == 'your_turn'){
               return process_your_turn(ws, request_data)
          }
     })      
}


async function process_your_turn(ws, request_data){
    let num = Math.round(Math.random() * 5)
    num % 2 == 0 ? 
    await process_move(ws, request_data):
    await put_wall(ws, request_data);
}

async function process_move(ws, request_data){
    let side = request_data['data']['side']
    let from_row = side == 'N' ? 0 : 8;
    let from_col = side == 'N' ? 1 : 7;         
    let to_row = side == 'N'?
        from_row + 1:
        from_row - 1;
    let to_col = from_col;
    sends(
        ws,
        'move',
        {
            'game_id': request_data['data']['game_id'],
            'turn_token': request_data['data']['turn_token'],
            "from_row": from_row,
            "from_col": from_col,
            "to_row": to_row,
            "to_col": to_col
        }
    )
    
}

async function put_wall(ws, request_data){
    sends(
        ws,
        'wall',
        {
            'game_id': request_data['data']['game_id'],
            'turn_token': request_data['data']['turn_token'],
            'row': list.random(),
            'col': list.random(),
            'orientation': 'h'
        }
    )
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

const list = [0,1,2,3,4,5,6,7,8]

// module.exports = sends
// module.exports = open
// module.exports = play
// module.exports = process_your_turn
// module.exports = process_move
// module.exports = put_wall


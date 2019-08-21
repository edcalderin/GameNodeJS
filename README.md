# GameNodeJS
Challenge for two players!!

* Start new game

POST http://localhost:{port}/api/game/

Body message:
{
    id:0,
    x:0,
    y:0
}
- id: Id for new game
- x: Coordinate x for game board
- y: Coordinate y for game board

API will return a json object with full data about the game, you will notice your move with "O" symbol in "board" property, Machine move will be set with "X" symbol. API will validate whether both x and y coordinates are between 0 and 2 (e.g. (x,y)>=0 and (x,y)<=2), therefore It will valide integers values.
In order to continue an actual game, request with POST method again with same id, but now a different position. If you send same coordinate then you will get an error message.

If you want the machine begins the game, just send id value into body message. Just like this:

POST http://localhost:{port}/api/game/
Body message:
{
    id: 0
}

Next, you will contine playing by specifying both coordinates.
When the game ends, API will show the winner through "winner" property of JSON object response.

In the case you want to continue playing while there is already a winner or it is a drawn game, the api will remind it to you by responsing a message about it.

* You can create as many games as possible, you can see them like this:

GET http://localhost:{port}/api/game/

* Also, you can get details about a particular game:

GET http://localhost:{port}/api/game/{id}


# GameNodeJS
Challenge for two players!!

* Start new game
POST http://localhost:{port}/api/game/
{
    id:0,
    x:0,
    y:0
}
- id: Id for new game
- x: Coordinate x for game board
- y: Coordinate y for game board

API will return a json object with full data about the game, you will notice your movement with "O" character, and Machine movement as well with symbol "X". API will validate that both x and y coordinates are between 0 and 2 (x,y)>=0 (x,y)<=0, and valide integers values.
In order to continue an actual game, POST again with same id number, but a different position. If you type same coordinate then API will show an message as response.

If you want the machine begins the game, just POST with id value. Just like this:

POST http://localhost:{port}/api/game/
{
    id:0
}
Next, you will contine playing by specifying both coordinates.
When the game ends, API will show the winner through "winner" attribute of JSON object response.

* You can create as many games as be possible, you can see all games like this:
GET http://localhost:{port}/api/game/

* Also, you can get details about a particular game:
GET http://localhost:{port}/api/game/{id}


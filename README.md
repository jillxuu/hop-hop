# hop-hop

### [Live](http://dongjinxu.com/hop-hop/)

### Background

Hop-hop is a javascript jumping game using canvas that player is aiming to jump upward and never fall to the bottom of the canvas.

### Functionality & MVP  

With this Hop-hop game, users will be able to:

- [ ] Start and reset the game board
- [ ] Use left and right arrows key on keyboard to decide which panel to land in order to jump upward
- [ ] Move across left and right border to reach the other side
- [ ] Jump in different speeds when stepping on different types of platforms

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start, Stop, and Reset buttons.

![Wireframe](https://i.imgur.com/zjjKITS.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- 'Sprite Canvas' to create animation.

Game Cover Canvas
![Cover](https://i.imgur.com/ghfts8a.png)

Game Canvas
![Game](https://i.imgur.com/cPrNey3.png)

Gameover Canvas
![Gameover](https://i.imgur.com/k9s3dqp.png)


In addition to the entry file, there will be four scripts involved in this project:

`game.js`: this script will handle the game logic for starting and reset the game.
`naruto.js`: this script will handle the single player jumping, falling, moving left, moving right events.
`cloud.js`: this script will handle the cloud moving effects as part of the background.
`platform.js`: this script will handle the platform creating, udpating, and collision based on single player's coordinates.

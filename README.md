# hop-hop

### Background

Hop-hop is a javascript jumping game using canvas that player is aiming to jump above and never fall.

### Functionality & MVP  

With this Hop-hop game, users will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Use left and right arrows key on keyboard to decide which panel to land in order to jump upward
- [ ] Move across left and right border to reach the other side

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start, Stop, and Reset buttons.

![wireframes]()

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `Foo.js` with `HTML5 Baz` for effects rendering,
- `Browserify` to bundle js files.

In addition to the entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Foo.js` elements and rendering them to the DOM.

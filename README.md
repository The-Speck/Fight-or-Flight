## Fight or Flight

[Live Site](https://the-speck.github.io/Fight-or-Flight/)

### Background

Fight or Flight is a 2D air combat game for air superiority. Choose between different planes that have different attributes in speed and dexterity. Enemy planes will track and attempt to shoot you down. The goal is not only to survive but to thrive as king of the skies!

### Functionality & MVP  

Flight or Fight basic functionality:

- [ ] Start and pause the game.
- [ ] Control the plane by shooting, turning, and adjusting the speed.
- [ ] Enemy planes track and shoot the user.

In addition, this project will include:

- [ ] Links to my LinkedIn and GitHub
- [ ] A production README

### Wireframes

The game will consist of a single page with a fullscreen canvas and a top navigation bar with links to GitHub and my LinkedIn. The nav bar will also contain controls for start and stop buttons. The game controls will use arrow keys for movement and space bar for shooting. Colliding planes will destroy each other and map boundaries wrap around to the other side.

![wireframe](https://raw.githubusercontent.com/The-Speck/Fight-or-Flight/master/assets/Fight_or_Flight.png)

### Architecture and Technologies

This project will be implemented mainly with `JavaScript` and `Keymaster`

In addition to the entry file, there will be four main scripts involved in this project:

`board.js`: this script will handle the logic for boundary conditions and rendering elements.

`plane.js`: this script will handle controller logic for the planes. Each plane can shoot, turn and control speed.

`user.js`: this script will handle user input that will feed the `plane.js` controls.

`computer.js`: this script will handle AI logic that will attempt to shoot down the user.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules and webpack. Write a basic entry file and the skeletons of the scripts mentioned above. The main goal of the day is to formalize the physics required for realistic turning and speed for planes. Also, implementing rendering of the planes on the screen.

Goals for the day:

- Get full screen game board
- Get a plane rendered with basic controls

**Day 2**:  Use the plane controller script to begin working on user input controller and testing for responsiveness. Create pause and start functionality. Set the boundaries of the game board and create collisions between objects.

Goals for the day:

- Complete plane controller functionality
- Create pause and start functionality
- Set wrapping boundaries on the board
- Implement collisions between objects

**Day 3**:  Program AI planes. Add different types of planes with similar attributes. Style everything, making it polished, clean-looking and professional.

Goals for the day:

- Create AI enemies
- Add different planes that the user can choose
- Polish the game

### Bonus features

Flight or Flight can be improved with a side-scrolling map with possible land targets, such as turrets, with levels and goals.

Some anticipated updates are:

- [ ] Implement Side Scrolling
- [ ] Create stationary land targets (turrets)
- [ ] Create a backstory with levels and goals.

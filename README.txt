
# Technical Test Instructions

Welcome to the technical test! Please read the following instructions carefully before starting the implementation.

## Tasks to Complete

1. **Implement all TODOs**
   - The test includes several `TODO` comments throughout the code. Ensure each one is addressed and properly implemented as part of the test.

2. **Reels Implementation**
   - Implement the functionality for reels with **horizontal spinning**. Ensure the spinning logic is smooth, performant, and aligns with the expected behaviour.

3. **Small RGS Implementation**
   - Implement a small RGS (Remote Game Server) module or service that the game client uses to request game state.
   - Add an **init** call that is invoked during game loading. This call must return the reels that will be used by the game and the initial stop positions.
   - Add a **spin** call that receives a request for a spin and returns the result stop positions and the reels that should be used for that spin.
   - The client should consume the reels and stop positions returned by the RGS instead of hard-coding them directly in the spin flow.

4. **Sound Player**
   - Implement the basic **sound player** functionality.

5. **Bonus Points**
   - **Refactoring**: Improve the code structure and maintainability where possible. Follow modern coding best practices to enhance readability and performance.
   - **Unit Tests**: Add unit tests to key parts of your implementation to ensure code correctness and stability.
   - **Consistent TypeScript Code**: Write consistent and idiomatic TypeScript code across all files. Adhere to the project's style guidelines and conventions.

## Guidelines

1. **Code Quality**:
   - Follow the principles of clean code. Ensure well-organised, scalable, and reusable code. Add appropriate inline comments and documentation where necessary.

2. **Testing**:
   - Write unit tests where applicable. Use a testing framework of your choice (e.g., Jest, Mocha) for these tests.

3. **Tools**:
   - Use the provided TypeScript framework and adhere to its conventions. All code should be written in TypeScript.

4. **Submission**:
   - Ensure all functionality works as expected.
   - Initialise a local Git repository for your project. Ensure your work is committed in incremental and descriptive commits,
   as the Git history will be evaluated.
   - Include any necessary setup instructions in the documentation if additional tools or configuration are required.

## Evaluation Criteria

Your submission will be evaluated on the following criteria:
- Correct implementation of all required tasks (e.g., TODOs, reels horizontal spinning, sound player).
- Correct implementation and integration of the small RGS, including loading-time init data and spin result responses.
- Code quality, readability, and maintainability.
- Adherence to TypeScript practices and project conventions.
- Bonus points for refactoring, unit tests, and additional enhancements not explicitly required.

## Notes

- Aim for clean, efficient, and well-documented code.
- Do not hesitate to ask questions if any part of the test is unclear.

Good luck, and happy coding!

## Setup

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

## Build

Create a production build:

```bash
npm run build
```

## Lint

Run the TypeScript lint checks:

```bash
npm run lint
```

## Tests

Run the RGS unit tests:

```bash
npm test
```

## Implementation

The game uses a small local RGS module. The `init` call returns the reel
strips and their initial stop positions when the game is loaded. Each `spin`
call returns the reel strips and newly generated stop positions.

The client uses the data returned by the RGS to animate each horizontal reel.
The reels slow down and stop at the requested positions. Winning results are
evaluated from the visible symbols after all reels have stopped.

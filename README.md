# 7×7 Tic-Tac-Toe Search AI

Angular and TypeScript game exploring adversarial search through alpha-beta pruning, iterative deepening, and custom board-evaluation heuristics.

![Game preview](https://github.com/user-attachments/assets/0c73e344-4468-44e4-bc5f-10eefb92b66d)

## Overview

The project expands traditional Tic-Tac-Toe into a **7×7 board** where players attempt to form four connected marks. The larger state space makes exhaustive search impractical, so the computer opponent uses bounded search and heuristics to select moves within an available time or depth budget.

This README intentionally describes the implementation as a search-based opponent rather than claiming it is mathematically unbeatable without formal proof or exhaustive validation.

## Game modes

- Human versus computer
- Human versus human
- Computer versus computer
- Configurable difficulty levels

## AI approach

### Alpha-beta pruning

The search removes branches that cannot affect the final minimax choice, reducing the number of positions evaluated compared with an unpruned search at the same depth.

### Iterative deepening

The engine searches shallow depths first, then increases depth while resources allow. This provides a usable move from the most recently completed depth if the deeper search cannot finish.

### Evaluation heuristics

Board positions are ranked using project-specific signals such as:

- completed lines;
- immediate threats;
- blocking opportunities;
- connected sequences;
- forks and multi-direction pressure;
- positional preference.

Heuristic quality affects move strength and does not guarantee optimal play across every possible position.

## Technology stack

| Area | Technology |
| --- | --- |
| Application | Angular |
| Language | TypeScript |
| Search | Minimax-style search with alpha-beta pruning |
| Search control | Iterative deepening and difficulty limits |
| UI | HTML and responsive CSS |

## Screenshots

![Game board](https://github.com/user-attachments/assets/a8d3de2e-cda3-46f3-a2d9-4ce5ea295c34)

![Game state](https://github.com/user-attachments/assets/164ce580-b145-4275-9c7c-4787e0dd10ec)

## Local setup

```bash
git clone https://github.com/shawky2002020/Tic-tac-toe-game.git
cd Tic-tac-toe-game
npm install
npm start
```

Use the scripts defined in `package.json` if the development command differs.

## Demo status

This is a static frontend project and may be hosted on free frontend infrastructure. A deployed URL may be changed or temporarily unavailable because no paid hosting commitment is maintained.

The source repository and local Angular setup are the reliable evaluation paths.

## Current status

- Algorithm and frontend portfolio project
- Not presented as a formally solved game engine
- No claim of perfect play without exhaustive proof
- Preserved to demonstrate search concepts, TypeScript implementation, and interactive UI work

## Possible future validation

Useful engineering extensions would include:

- recording nodes explored per move;
- reporting completed search depth and elapsed time;
- benchmark positions for threat and fork handling;
- deterministic tests for tactical positions;
- automated comparison between difficulty configurations.

## Author

**Shawky Elsayed**  
Full-Stack Software Engineer  
https://www.shawkyelsayed.com

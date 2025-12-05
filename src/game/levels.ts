import { Level } from './types';

export const levels: Level[] = [
  // LEVEL 1 – Basic straight path (8×8)
  {
    id: 1,
    size: [8, 8],
    start: [1, 1],
    exit: [6, 1],
    stars: [[3, 1], [5, 1]],
    walls: [],
    blockLimit: 12,
    recursionLimit: 0
  },
  // LEVEL 2 – First turn
  {
    id: 2,
    size: [8, 8],
    start: [1, 1],
    exit: [6, 6],
    stars: [[1, 4], [3, 6]],
    walls: [[2, 1], [2, 2], [2, 3]],
    blockLimit: 15,
    recursionLimit: 0
  },
  // LEVEL 3 – Two turns, corridor
  {
    id: 3,
    size: [8, 8],
    start: [1, 1],
    exit: [1, 6],
    stars: [[3, 1], [3, 3], [1, 4]],
    walls: [[2, 0], [2, 1], [2, 2], [2, 4], [2, 5]],
    blockLimit: 20,
    recursionLimit: 0
  },
  // LEVEL 4 – First recursion challenge
  {
    id: 4,
    size: [8, 8],
    start: [0, 0],
    exit: [7, 7],
    stars: [[6, 0], [7, 1], [7, 3], [7, 5]],
    walls: [],
    blockLimit: 25,
    recursionLimit: 1
  },
  // LEVEL 5 – Zigzag
  {
    id: 5,
    size: [8, 8],
    start: [0, 0],
    exit: [7, 7],
    stars: [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]],
    walls: [[1, 2], [2, 3], [3, 4], [4, 5]],
    blockLimit: 30,
    recursionLimit: 1
  },
  // LEVEL 6 – U-turn corridor (10×10)
  {
    id: 6,
    size: [10, 10],
    start: [1, 1],
    exit: [8, 1],
    stars: [[5, 1], [5, 2], [5, 3]],
    walls: [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]],
    blockLimit: 35,
    recursionLimit: 1
  },
  // LEVEL 7 – Loop recommended
  {
    id: 7,
    size: [10, 10],
    start: [2, 2],
    exit: [7, 7],
    stars: [[3, 2], [4, 2], [5, 2], [6, 2]],
    walls: [],
    blockLimit: 20,
    recursionLimit: 2
  },
  // LEVEL 8 – Encapsulated corridor
  {
    id: 8,
    size: [10, 10],
    start: [1, 1],
    exit: [8, 8],
    stars: [[2, 1], [2, 2], [2, 3], [2, 4]],
    walls: [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]],
    blockLimit: 50,
    recursionLimit: 2
  },
  // LEVEL 9 – Box spiral
  {
    id: 9,
    size: [10, 10],
    start: [0, 0],
    exit: [9, 9],
    stars: [[1, 0], [1, 1], [2, 1], [2, 2], [3, 2]],
    walls: [],
    blockLimit: 60,
    recursionLimit: 2
  },
  // LEVEL 10 – Maze (medium)
  {
    id: 10,
    size: [10, 10],
    start: [0, 0],
    exit: [9, 9],
    stars: [[5, 5], [6, 6], [3, 7]],
    walls: [
      [1, 0], [1, 1], [1, 2],
      [3, 3], [3, 4], [3, 5],
      [6, 2], [6, 3], [6, 4],
      [8, 6], [8, 7], [8, 8]
    ],
    blockLimit: 70,
    recursionLimit: 2
  },
  // LEVEL 11 – Large open field (12×12)
  {
    id: 11,
    size: [12, 12],
    start: [1, 1],
    exit: [10, 10],
    stars: [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
    walls: [],
    blockLimit: 60,
    recursionLimit: 2
  },
  // LEVEL 12 – Larger zigzag
  {
    id: 12,
    size: [12, 12],
    start: [0, 0],
    exit: [11, 11],
    stars: [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5]],
    walls: [[3, 4], [4, 5], [5, 6], [6, 7]],
    blockLimit: 100,
    recursionLimit: 3
  },
  // LEVEL 13 – Enclosed corridors maze
  {
    id: 13,
    size: [12, 12],
    start: [1, 1],
    exit: [10, 10],
    stars: [[4, 4], [4, 5], [4, 6]],
    walls: [
      [2, 2], [2, 3], [2, 4],
      [5, 3], [5, 4], [5, 5],
      [8, 6], [8, 7], [8, 8]
    ],
    blockLimit: 120,
    recursionLimit: 3
  },
  // LEVEL 14 – Recursion needed
  {
    id: 14,
    size: [12, 12],
    start: [0, 0],
    exit: [11, 0],
    stars: [[5, 0], [6, 0], [7, 0], [8, 0]],
    walls: [],
    blockLimit: 40,
    recursionLimit: 4
  },
  // LEVEL 15 – Complex maze
  {
    id: 15,
    size: [12, 12],
    start: [0, 0],
    exit: [11, 11],
    stars: [[2, 2], [3, 2], [4, 2], [5, 2], [5, 5]],
    walls: [
      [1, 1], [1, 2], [1, 3], [1, 4],
      [4, 4], [4, 5], [4, 6], [4, 7],
      [7, 2], [7, 3], [7, 4], [7, 5]
    ],
    blockLimit: 150,
    recursionLimit: 3
  },
  // LEVEL 16 – Big open map (14×14)
  {
    id: 16,
    size: [14, 14],
    start: [1, 1],
    exit: [12, 12],
    stars: [[3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1]],
    walls: [],
    blockLimit: 120,
    recursionLimit: 4
  },
  // LEVEL 17 – Long corridor recursion
  {
    id: 17,
    size: [14, 14],
    start: [0, 0],
    exit: [13, 13],
    stars: [[2, 0], [4, 0], [6, 0], [8, 0], [10, 0]],
    walls: [],
    blockLimit: 80,
    recursionLimit: 5
  },
  // LEVEL 18 – Complex turns
  {
    id: 18,
    size: [14, 14],
    start: [1, 1],
    exit: [12, 1],
    stars: [[3, 1], [3, 2], [3, 3], [3, 4], [3, 5]],
    walls: [
      [4, 1], [4, 2], [4, 3], [4, 4], [4, 5],
      [7, 7], [8, 7], [9, 7]
    ],
    blockLimit: 150,
    recursionLimit: 4
  },
  // LEVEL 19 – The ring spiral
  {
    id: 19,
    size: [14, 14],
    start: [0, 0],
    exit: [13, 13],
    stars: [[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, 3]],
    walls: [],
    blockLimit: 200,
    recursionLimit: 5
  },
  // LEVEL 20 – Final labyrinth
  {
    id: 20,
    size: [14, 14],
    start: [1, 1],
    exit: [12, 12],
    stars: [[5, 5], [6, 6], [7, 7], [8, 8], [3, 10]],
    walls: [
      [2, 2], [2, 3], [2, 4], [2, 5],
      [4, 6], [4, 7], [4, 8], [4, 9],
      [7, 2], [7, 3], [7, 4], [7, 5],
      [10, 7], [10, 8], [10, 9], [10, 10]
    ],
    blockLimit: 250,
    recursionLimit: 5
  }
];

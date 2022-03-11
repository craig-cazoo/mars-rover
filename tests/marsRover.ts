export type Position = {
  x: number;
  y: number;
};

enum Direction {
  NORTH = "N",
  EAST = "E",
  SOUTH = "S",
  WEST = "W",
}

function turnRight(direction: Direction): Direction {
  if (direction === Direction.NORTH) {
    return Direction.EAST;
  }
  if (direction === Direction.EAST) {
    return Direction.SOUTH;
  }
  if (direction === Direction.SOUTH) {
    return Direction.WEST;
  }

  return Direction.NORTH;
}

function turnLeft(direction: Direction): Direction {
  return turnRight(turnRight(turnRight(direction)));
}

function moveForward(position: Position, direction: Direction): Position {
  if (direction === Direction.NORTH) {
    return {
      x: position.x,
      y: (position.y + 1) % 10,
    };
  }
  if (direction === Direction.WEST) {
    return {
      x: (position.x + 9) % 10,
      y: position.y,
    };
  }
  if (direction === Direction.SOUTH) {
    return {
      x: position.x,
      y: (position.y + 9) % 10,
    };
  }
  return {
    x: (position.x + 1) % 10,
    y: position.y,
  };
}

function hasObstacleAtPosition({ x, y }: Position, obstacles: Position[]) {
  return obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
}

export function move(instructions: string, obstacles: Position[]): string {
  let direction: Direction = Direction.NORTH;
  let position: Position = { x: 0, y: 0 };

  for (const instruction of instructions) {
    if (instruction === "R") {
      direction = turnRight(direction);
    } else if (instruction === "L") {
      direction = turnLeft(direction);
    } else {
      const nextPosition = moveForward(position, direction);

      if (hasObstacleAtPosition(nextPosition, obstacles)) {
        return `O:${position.x}:${position.y}:${direction}`;
      }

      position = nextPosition;
    }
  }

  return `${position.x}:${position.y}:${direction}`;
}

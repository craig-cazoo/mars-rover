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

type Rover = {
  position: Position;
  direction: Direction;
};

function turnRight(rover: Rover): Rover {
  if (rover.direction === Direction.NORTH) {
    return { ...rover, direction: Direction.EAST };
  }
  if (rover.direction === Direction.EAST) {
    return { ...rover, direction: Direction.SOUTH };
  }
  if (rover.direction === Direction.SOUTH) {
    return { ...rover, direction: Direction.WEST };
  }

  return { ...rover, direction: Direction.NORTH };
}

function turnLeft(rover: Rover): Rover {
  return turnRight(turnRight(turnRight(rover)));
}

function moveForward(rover: Rover): Rover {
  if (rover.direction === Direction.NORTH) {
    return {
      ...rover,
      position: {
        x: rover.position.x,
        y: (rover.position.y + 1) % 10,
      },
    };
  }
  if (rover.direction === Direction.WEST) {
    return {
      ...rover,
      position: {
        x: (rover.position.x + 9) % 10,
        y: rover.position.y,
      },
    };
  }
  if (rover.direction === Direction.SOUTH) {
    return {
      ...rover,
      position: {
        x: rover.position.x,
        y: (rover.position.y + 9) % 10,
      },
    };
  }
  return {
    ...rover,
    position: {
      x: (rover.position.x + 1) % 10,
      y: rover.position.y,
    },
  };
}

function hasObstacleAtPosition({ x, y }: Position, obstacles: Position[]) {
  return obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
}

export function move(instructions: string, obstacles: Position[]): string {
  let rover: Rover = { position: { x: 0, y: 0 }, direction: Direction.NORTH };

  for (const instruction of instructions) {
    if (instruction === "R") {
      rover = turnRight(rover);
    } else if (instruction === "L") {
      rover = turnLeft(rover);
    } else {
      const nextRover = moveForward(rover);

      if (hasObstacleAtPosition(nextRover.position, obstacles)) {
        return `O:${rover.position.x}:${rover.position.y}:${rover.direction}`;
      }

      rover = nextRover;
    }
  }

  return `${rover.position.x}:${rover.position.y}:${rover.direction}`;
}

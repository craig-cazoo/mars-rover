/* eslint-disable */
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
  hasCrashed: boolean;
};

type Command = (obstacles: Position[]) => (rover: Rover) => Rover;

const turnRightCommand: Command = (_obstacles) => (rover) => {
  if (rover.hasCrashed) {
    return rover;
  }

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
};

const turnLeftCommand: Command = (obstacles) => (rover) => {
  const turnRight = turnRightCommand(obstacles);

  return turnRight(turnRight(turnRight(rover)));
};

const moveForwardCommand: Command = (obstacles) => {
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

  return (rover) => {
    const nextRover = moveForward(rover);

    if (hasObstacleAtPosition(nextRover.position, obstacles)) {
      return {
        ...rover,
        hasCrashed: true,
      };
    }

    return nextRover;
  };
};

function hasObstacleAtPosition({ x, y }: Position, obstacles: Position[]) {
  return obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
}

function printRover(rover: Rover) {
  if (rover.hasCrashed) {
    return `O:${rover.position.x}:${rover.position.y}:${rover.direction}`;
  }

  return `${rover.position.x}:${rover.position.y}:${rover.direction}`;
}

export function move(instructions: string, obstacles: Position[]): string {
  let rover: Rover = {
    position: { x: 0, y: 0 },
    direction: Direction.NORTH,
    hasCrashed: false,
  };

  const commands = instructions.split("").map((instruction) => {
    switch (instruction) {
      case "R":
        return turnRightCommand(obstacles);
      case "L":
        return turnLeftCommand(obstacles);
      case "M":
        return moveForwardCommand(obstacles);
      default:
        throw new Error(`instruction ${instruction} not recognised`);
    }
  });

  for (const command of commands) {
    rover = command(rover);
  }

  return printRover(rover);
}

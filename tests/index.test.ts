import { move, Position } from "./marsRover";

describe("mars rover", () => {
  describe("moving forward from the origin", () => {
    test.each`
      instructions    | expectedPosition
      ${""}           | ${"0:0:N"}
      ${"M"}          | ${"0:1:N"}
      ${"MM"}         | ${"0:2:N"}
      ${"MMM"}        | ${"0:3:N"}
      ${"MMMMMMMMMM"} | ${"0:0:N"}
    `(
      `should move forward $instructions step(s)`,
      ({ instructions, expectedPosition }) => {
        expect(move(instructions, [])).toBe(expectedPosition);
      }
    );
  });

  describe("turning right from the origin", () => {
    test.each`
      instructions  | expectedPosition
      ${"R"}        | ${"0:0:E"}
      ${"RR"}       | ${"0:0:S"}
      ${"RRR"}      | ${"0:0:W"}
      ${"RRRR"}     | ${"0:0:N"}
      ${"RRRRR"}    | ${"0:0:E"}
      ${"RRRRRR"}   | ${"0:0:S"}
      ${"RRRRRRR"}  | ${"0:0:W"}
      ${"RRRRRRRR"} | ${"0:0:N"}
    `(
      `should turn right $instructions step(s)`,
      ({ instructions, expectedPosition }) => {
        expect(move(instructions, [])).toBe(expectedPosition);
      }
    );
  });

  describe("turning left from the origin", () => {
    test.each`
      instructions  | expectedPosition
      ${"L"}        | ${"0:0:W"}
      ${"LL"}       | ${"0:0:S"}
      ${"LLL"}      | ${"0:0:E"}
      ${"LLLL"}     | ${"0:0:N"}
      ${"LLLLL"}    | ${"0:0:W"}
      ${"LLLLLL"}   | ${"0:0:S"}
      ${"LLLLLLL"}  | ${"0:0:E"}
      ${"LLLLLLLL"} | ${"0:0:N"}
    `(
      `should turn left $instructions step(s)`,
      ({ instructions, expectedPosition }) => {
        expect(move(instructions, [])).toBe(expectedPosition);
      }
    );
  });

  describe("move  and turn left from the origin", () => {
    test.each`
      instructions | expectedPosition
      ${"ML"}      | ${"0:1:W"}
      ${"MLL"}     | ${"0:1:S"}
    `(
      `should turn left $instructions step(s)`,
      ({ instructions, expectedPosition }) => {
        expect(move(instructions, [])).toBe(expectedPosition);
      }
    );
  });

  describe("turn right and move the origin", () => {
    test.each`
      instructions | expectedPosition
      ${"RM"}      | ${"1:0:E"}
      ${"RMM"}     | ${"2:0:E"}
      ${"RRM"}     | ${"0:9:S"}
      ${"RRRM"}    | ${"9:0:W"}
    `(
      `should turn left $instructions step(s)`,
      ({ instructions, expectedPosition }) => {
        expect(move(instructions, [])).toBe(expectedPosition);
      }
    );
  });

  describe("move and turn right from the origin", () => {
    test.each`
      instructions | expectedPosition
      ${"MR"}      | ${"0:1:E"}
      ${"MRR"}     | ${"0:1:S"}
    `(
      `should turn left $instructions step(s)`,
      ({ instructions, expectedPosition }) => {
        expect(move(instructions, [])).toBe(expectedPosition);
      }
    );
  });

  describe("encounter obstacle", () => {
    test("it should stop at an obstacle", () => {
      const obstacleRepository: Position[] = [{ x: 0, y: 1 }];

      expect(move("M", obstacleRepository)).toBe("O:0:0:N");
    });

    test("should stop at early at an obstacle", () => {
      const obstacleRepository: Position[] = [{ x: 0, y: 3 }];

      expect(move("MMMM", obstacleRepository)).toBe("O:0:2:N");
    });

    test("should not be able to turn right after hitting an obstacle", () => {
      const obstacleRepository: Position[] = [{ x: 0, y: 1 }];

      expect(move("MMR", obstacleRepository)).toBe("O:0:0:N");
    });

    test("should not be able to turn left after hitting an obstacle", () => {
      const obstacleRepository: Position[] = [{ x: 0, y: 1 }];

      expect(move("MML", obstacleRepository)).toBe("O:0:0:N");
    });
  });
});

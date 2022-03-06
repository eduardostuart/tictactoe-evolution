import { Player, TicTacToe, PieceSize, GameOverError, Winner, InvalidPieceError, InvalidMoveError } from "./TicTacToe";

describe("TicTacToe", () => {
  it("should set the initial player", () => {
    const g = new TicTacToe(Player.X);
    expect(g.currentPlayer).toEqual(Player.X);
  });

  it("should start with an empty board", () => {
    const g = new TicTacToe(Player.X);
    expect(g.board).toEqual([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
  });

  it("should update current player", () => {
    const g = new TicTacToe(Player.X);
    expect(g.currentPlayer).toEqual(Player.X);
    g.move(0, 0, PieceSize.LARGE);
    expect(g.currentPlayer).toEqual(Player.O);
    g.move(0, 1, PieceSize.MEDIUM);
    expect(g.currentPlayer).toEqual(Player.X);
  });

  it("should set move", () => {
    const g = new TicTacToe(Player.X);
    expect(g.board).toEqual([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    g.move(0, 0, PieceSize.MEDIUM); // X
    g.move(0, 1, PieceSize.MEDIUM); // O
    g.move(2, 1, PieceSize.MEDIUM); // X
    expect(g.board).toEqual([
      [{ size: PieceSize.MEDIUM, player: Player.X }, { size: PieceSize.MEDIUM, player: Player.O }, undefined],
      [undefined, undefined, undefined],
      [undefined, { size: PieceSize.MEDIUM, player: Player.X }, undefined],
    ]);
  });

  it("should return an exception if game is over", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(1, 0, PieceSize.LARGE); // O
    g.move(0, 1, PieceSize.LARGE); // X
    g.move(1, 1, PieceSize.LARGE); // O
    g.move(0, 2, PieceSize.MEDIUM); // X
    expect(() => g.move(2, 2, PieceSize.MEDIUM)).toThrow(GameOverError);
  });

  it("should return an exception if try to move an invalid/unavailable piece", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(1, 0, PieceSize.LARGE); // O
    g.move(0, 1, PieceSize.LARGE); // X
    g.move(1, 1, PieceSize.LARGE); // O
    expect(() => g.move(1, 2, PieceSize.LARGE)).toThrow(InvalidPieceError);
  });

  it("should return an exception invalid move", () => {
    const g = new TicTacToe(Player.X);
    expect(() => g.move(4, 0, PieceSize.LARGE)).toThrow(InvalidMoveError);
    expect(() => g.move(0, 4, PieceSize.LARGE)).toThrow(InvalidMoveError);
  });

  it("should return an exception if move is trying to eat piece from same player", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(0, 1, PieceSize.LARGE); // O
    expect(() => g.move(0, 0, PieceSize.LARGE)).toThrow(InvalidMoveError);
  });

  it("should return an exception if trying to eat a LARGEger/equal piece", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.LARGE); // X
    expect(() => g.move(0, 0, PieceSize.LARGE)).toThrow(InvalidMoveError);
  });

  it("should update player pieces after move", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(0, 1, PieceSize.LARGE); // O
    expect(g.players![Player.X].pieces.filter((x) => x === PieceSize.LARGE).length).toEqual(1);

    g.move(0, 2, PieceSize.LARGE); // X
    expect(g.players![Player.X].pieces.filter((x) => x === PieceSize.LARGE).length).toEqual(0);
  });

  it("should update winner", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(1, 1, PieceSize.LARGE); // O
    g.move(0, 1, PieceSize.LARGE); // X
    g.move(1, 2, PieceSize.MEDIUM); // O
    g.move(0, 2, PieceSize.MEDIUM); // X
    expect(g.winner).toEqual(Player.X);
  });

  it("should be able to eat pieces if smaller", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.MEDIUM); // X
    g.move(0, 0, PieceSize.LARGE); // O
    g.move(0, 1, PieceSize.MEDIUM); // X
    g.move(0, 1, PieceSize.LARGE); // O
    g.move(0, 2, PieceSize.LARGE); // X
    g.move(1, 0, PieceSize.SMALL); // O
    g.move(1, 0, PieceSize.LARGE); // X
    g.move(1, 1, PieceSize.SMALL); // O
    g.move(2, 0, PieceSize.SMALL); // X

    expect(g.board).toEqual([
      [
        { player: Player.O, size: PieceSize.LARGE },
        { player: Player.O, size: PieceSize.LARGE },
        { player: Player.X, size: PieceSize.LARGE },
      ],
      [{ player: Player.X, size: PieceSize.LARGE }, { player: Player.O, size: PieceSize.SMALL }, undefined],
      [{ player: Player.X, size: PieceSize.SMALL }, undefined, undefined],
    ]);
  });

  it("should check winner (diagonal top left - bottom right", () => {
    const g = new TicTacToe(Player.X);
    // [ X , - , - ]
    // [ - , X , - ]
    // [ - , - , X ]
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(0, 1, PieceSize.LARGE); // O
    g.move(1, 1, PieceSize.LARGE); // X
    g.move(1, 2, PieceSize.MEDIUM); // O
    g.move(2, 2, PieceSize.MEDIUM); // X
    expect(g.winner).toEqual(Player.X);
  });

  it("should check winner (diagonal top right - bottom left", () => {
    const g = new TicTacToe(Player.X);
    // [ - , - , X ]
    // [ - , X , - ]
    // [ X , - , - ]
    g.move(0, 2, PieceSize.LARGE); // X
    g.move(0, 1, PieceSize.LARGE); // O
    g.move(1, 1, PieceSize.LARGE); // X
    g.move(1, 2, PieceSize.MEDIUM); // O
    g.move(2, 0, PieceSize.MEDIUM); // X
    expect(g.winner).toEqual(Player.X);
  });

  it("should check winner column", () => {
    const g = new TicTacToe(Player.X);
    // [ - , X , - ]
    // [ - , X , - ]
    // [ - , X , - ]
    g.move(0, 1, PieceSize.LARGE); // X
    g.move(0, 2, PieceSize.LARGE); // O
    g.move(1, 1, PieceSize.LARGE); // X
    g.move(1, 0, PieceSize.MEDIUM); // O
    g.move(2, 1, PieceSize.MEDIUM); // X
    expect(g.winner).toEqual(Player.X);
  });

  it("should set winner = tie if no winner", () => {
    const g = new TicTacToe(Player.X);
    // [ X , O , X ]
    // [ X , O , O ]
    // [ O , X , X ]
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(0, 1, PieceSize.LARGE); // O
    g.move(0, 2, PieceSize.LARGE); // X
    g.move(1, 1, PieceSize.MEDIUM); // O
    g.move(1, 0, PieceSize.MEDIUM); // X
    g.move(1, 2, PieceSize.MEDIUM); // O
    g.move(2, 1, PieceSize.SMALL); // X
    g.move(2, 0, PieceSize.SMALL); // O
    g.move(2, 2, PieceSize.SMALL); // X

    expect(g.winner).toEqual("Tie");
  });

  it("should emit update event", () => {
    const g = new TicTacToe(Player.X);
    g.on("updated", (data) => {
      expect(data).toEqual({
        currentPlayer: Player.O,
        players: {
          X: {
            fighter: "undead",
            color: "red",
            pieces: [PieceSize.LARGE, PieceSize.MEDIUM, PieceSize.MEDIUM, PieceSize.SMALL, PieceSize.SMALL],
          },
          O: {
            fighter: "human",
            color: "blue",
            pieces: [PieceSize.LARGE, PieceSize.LARGE, PieceSize.MEDIUM, PieceSize.MEDIUM, PieceSize.SMALL, PieceSize.SMALL],
          },
        },
        board: [
          [{ player: Player.X, size: PieceSize.LARGE }, undefined, undefined],
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
        ],
        winner: undefined,
      });
    });
    g.move(0, 0, PieceSize.LARGE);
  });

  it("should be able to reset the game", () => {
    const g = new TicTacToe(Player.X);
    g.move(0, 0, PieceSize.LARGE); // X
    g.move(0, 1, PieceSize.LARGE); // O
    g.reset();

    expect(g.board).toEqual([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    expect(g.players!.O.pieces).toEqual([
      PieceSize.LARGE,
      PieceSize.LARGE,
      PieceSize.MEDIUM,
      PieceSize.MEDIUM,
      PieceSize.SMALL,
      PieceSize.SMALL,
    ]);
    expect(g.players!.X.pieces).toEqual([
      PieceSize.LARGE,
      PieceSize.LARGE,
      PieceSize.MEDIUM,
      PieceSize.MEDIUM,
      PieceSize.SMALL,
      PieceSize.SMALL,
    ]);
    expect(g.winner).toBeUndefined();
    expect(g.currentPlayer).toEqual(Player.X);
  });
});

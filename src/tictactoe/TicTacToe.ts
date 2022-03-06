import { Identifier as FighterIdentifier } from "./fighters";

// TicTacToe Game
export enum PieceSize {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

export enum Player {
  X = "X",
  O = "O",
}

export type Winner = Player | "Tie";

export interface BoardCell {
  player: Player;
  size: PieceSize;
}

export class InvalidMoveError extends Error {
  constructor({ row, col, piece }: { row: number; col: number; piece: PieceSize }) {
    super(`Invalid move on row ${row} and column ${col} using piece: ${piece}`);
  }
}

export class GameOverError extends Error {
  constructor(winner: Winner | undefined) {
    super(`Game is over. Winner: ${winner}`);
  }
}

export class InvalidPieceError extends Error {
  constructor(piece: PieceSize) {
    super(`Piece: ${piece} is invalid or not available`);
  }
}

export type EventType = "updated" | "error";

export interface EventValueCallback {
  currentPlayer: Player | undefined;
  players: Record<Player, PieceSize[]>;
  board: BoardCell[][];
  winner: Winner | undefined;
}

export interface PlayerInfo {
  fighter: FighterIdentifier;
  color: string;
  pieces: PieceSize[];
}

export class TicTacToe {
  //
  private events: Record<EventType, any> = {
    error: () => {},
    updated: () => {},
  };
  //
  public winner: Winner | undefined = undefined;
  //
  public currentPlayer: Player;
  //
  public initialPlayer: Player;
  //
  public players: Record<Player, PlayerInfo> | undefined;
  // Represent the board using a 2D array
  public board: BoardCell[][] | undefined;

  constructor(initialPlayer: Player) {
    this.initialPlayer = initialPlayer;
    this.currentPlayer = initialPlayer;
    this.setDefaults();
  }

  // Restore game into the initial state
  setDefaults() {
    this.players = {
      [Player.O]: {
        fighter: "human",
        color: "blue",
        pieces: [PieceSize.LARGE, PieceSize.LARGE, PieceSize.MEDIUM, PieceSize.MEDIUM, PieceSize.SMALL, PieceSize.SMALL],
      },
      [Player.X]: {
        fighter: "undead",
        color: "red",
        pieces: [PieceSize.LARGE, PieceSize.LARGE, PieceSize.MEDIUM, PieceSize.MEDIUM, PieceSize.SMALL, PieceSize.SMALL],
      },
    };
    this.board = [new Array(3).fill(undefined, 0, 3), new Array(3).fill(undefined, 0, 3), new Array(3).fill(undefined, 0, 3)];
  }

  isFinished(): boolean {
    return this.winner !== undefined;
  }

  reset() {
    this.setDefaults();
    this.winner = undefined;
    this.currentPlayer = this.initialPlayer;
    this.emitUpdated();
  }

  move(row: number, col: number, pieceSize: PieceSize) {
    try {
      this.checkMove(row, col, pieceSize);
    } catch (err) {
      this.emit("error", err);
      throw err;
    }

    // Update cell
    this.board![row][col] = {
      player: this.currentPlayer,
      size: pieceSize,
    };

    // Update player pieces
    const index = this.players![this.currentPlayer].pieces.indexOf(pieceSize);
    this.players![this.currentPlayer].pieces.splice(index, 1);

    // Update current player
    this.currentPlayer = this.currentPlayer === Player.O ? Player.X : Player.O;

    this.winner = this.getWinner(row, col);

    this.emitUpdated();
  }

  getWinner(row: number, col: number): Winner | undefined {
    const isWinner = (cells: BoardCell[]): boolean => {
      if (cells[0] && cells[1] && cells[2]) {
        return cells[0].player === cells[1].player && cells[1].player === cells[2].player;
      }
      return false;
    };

    const board = this.board!;

    if (isWinner(board[row])) {
      return board[row][0].player;
    } else if (isWinner([board[0][col], board[1][col], board[2][col]])) {
      return board[0][col].player;
    } else if (isWinner([board[0][0], board[1][1], board[2][2]])) {
      return board[0][0].player;
    } else if (isWinner([board[0][2], board[1][1], board[2][0]])) {
      return board[0][2].player;
    }

    for (let i = 0; i < 3; i++) {
      if (!board[i][0]?.player || !board[i][1]?.player || !board[i][2]?.player) {
        // There are still empty blocks
        return undefined;
      }
    }

    return "Tie";
  }

  private checkMove(row: number, col: number, pieceSize: PieceSize) {
    const board = this.board!;

    if (this.isFinished()) {
      throw new GameOverError(this.winner);
    } else if (row >= board.length || col >= board[0].length) {
      throw new InvalidMoveError({ row, col, piece: pieceSize });
    } else if (board[row][col]?.player === this.currentPlayer) {
      throw new InvalidMoveError({ row, col, piece: pieceSize });
    } else if (this.players![this.currentPlayer].pieces.indexOf(pieceSize) === -1) {
      throw new InvalidPieceError(pieceSize);
    } else if (board[row][col]?.size && pieceSize <= board[row][col].size) {
      throw new InvalidMoveError({ row, col, piece: pieceSize });
    }
  }

  emitUpdated() {
    this.emit("updated", {
      players: this.players!,
      currentPlayer: this.currentPlayer,
      winner: this.winner,
      board: this.board!,
    });
  }

  on(event: EventType, cb: (data: any) => void) {
    this.events[event] = cb;
  }

  emit(event: EventType, data: any) {
    if (this.events[event]) {
      this.events[event](data);
    }
  }
}

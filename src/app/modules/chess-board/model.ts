import { FENChar } from '../../chess-logic/model';

type SquareWithPiece = {
  piece: FENChar;
  x: number;
  y: number;
};

type SqaureWithoutPiece = {
  piece: null;
};

export type SelectedSqaure = SquareWithPiece | SqaureWithoutPiece;

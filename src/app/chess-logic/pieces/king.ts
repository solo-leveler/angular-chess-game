import { FENChar, Coords, Color } from '../model';
import { Piece } from './piece';

export class King extends Piece {
  protected override _FENChar: FENChar;
  protected override _directions: Coords[] = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
  ];
  private _hasMoved: boolean = false;
  constructor(private pieceColor: Color) {
    super(pieceColor);
    this._FENChar =
      pieceColor === Color.White ? FENChar.WhiteKing : FENChar.BlackKing;
  }

  public get hasMoved(): boolean {
    return this._hasMoved;
  }
  public set hasMoved(_) {
    this._hasMoved = true;
  }
}

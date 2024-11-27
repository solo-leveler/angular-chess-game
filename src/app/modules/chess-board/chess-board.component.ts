import { Component } from '@angular/core';
import { ChessBoard } from '../../chess-logic/chess-board';
import {
  Color,
  Coords,
  FENChar,
  pieceImagePaths,
  SafeSquares,
} from '../../chess-logic/model';
import { SelectedSqaure } from './model';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent {
  public pieceImagePaths = pieceImagePaths;
  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;
  public get playerColor(): Color {
    return this.chessBoard.playerColor;
  }
  public get safeSqaures(): SafeSquares {
    return this.chessBoard.safeSqaures;
  }

  private selectedSqaure: SelectedSqaure = { piece: null };
  private pieceSafeSqaures: Coords[] = [];

  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }

  public isSqaureSelected(x: number, y: number): boolean {
    if (!this.selectedSqaure.piece) return false;
    return this.selectedSqaure.x === x && this.selectedSqaure.y === y;
  }

  public isSqaureSafeForSelectedPiece(x: number, y: number): boolean {
    return this.pieceSafeSqaures.some((coords) => coords.x === x && coords.y===y);
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar | null = this.chessBoardView[x][y];
    if (!piece) return;
    if(this.isWrongPieceSelected(piece)) return;

    this.selectedSqaure = { piece, x, y };
    this.pieceSafeSqaures = this.safeSqaures.get(x + ',' + y) || [];
  }

  private isWrongPieceSelected(piece:FENChar) :boolean{
    const isWhitePieceSelected : boolean = piece === piece.toUpperCase();
    return isWhitePieceSelected && this.playerColor === Color.Black || !isWhitePieceSelected && this.playerColor === Color.White;
  }
}
